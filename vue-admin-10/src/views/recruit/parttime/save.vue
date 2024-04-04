<template>
  <div class="app-container">
    <el-form ref="parttimeList" :model="parttimeList" label-width="80px">
      <el-form-item label="兼职类型">
        <el-input v-model="parttimeList.type" style="width: 600px"></el-input>
      </el-form-item>

      <el-form-item label="薪水">
        <el-input v-model="parttimeList.salary" style="width: 600px"></el-input>
      </el-form-item>
      <el-form-item label="联系信息">
        <el-input v-model="parttimeList.contactInfo" style="width: 600px"></el-input>
      </el-form-item>
      <el-form-item label="工作地点">
        <el-input v-model="parttimeList.workplace" style="width: 600px"></el-input>
      </el-form-item>
      <el-form-item label="HR姓名">
        <el-input v-model="parttimeList.hrName" style="width: 600px"></el-input>
      </el-form-item>
      <!-- <el-form-item label="封面">
        <el-input v-model="parttimeList.cover"></el-input>
      </el-form-item>-->
      <!-- <el-form-item label="HR的id">
        <el-input v-model="parttimeList.hrId"></el-input>
      </el-form-item>-->
      <el-form-item label="工作时间">
        <el-input v-model="parttimeList.workTime" style="width: 600px"></el-input>
      </el-form-item>
      <el-form-item label="兼职描述">
        <!-- <el-input type="textarea" v-model="parttimeList.description"></el-input> -->
        <Tinymce v-model="parttimeList.description"></Tinymce>
      </el-form-item>
      <el-form-item label="要求">
        <el-input type="textarea" v-model="parttimeList.requirement" style="width: 600px"></el-input>
      </el-form-item>
      <el-form-item label="兼职封面">
        <el-upload
          class="upload-demo"
          action="http://localhost:8222/recuit/upload/parttime"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          :limit="20971520"
        >
          <!-- <el-button size="small" type="primary">上传封面</el-button> -->
          <img :src="this.parttimeList.cover" style="height:200px;width:300px;" />
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过20MB</div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import parttime from "@/api/recruit/parttime";
import Tinymce from "@/components/Tinymce";

export default {
  components: { Tinymce }, // 添加Tinymce组件
  data() {
    return {
      parttimeList: {
        type: "",
        description: "",
        requirement: "",
        salary: "",
        contactInfo: "",
        workplace: "",
        hrName: "",
        cover:
          "http://localhost:9528/src/static/img/recruit/parttime/chaijun.jpg",
        hrId: "",
        workTime: ""
      }, // 表单数据

      fileList: [],

      saveBtnDisabled: false // 保存按钮是否禁用,
    };
  },

  created() {
    console.log("created");
    this.init();
  },

  watch: {
    $route(to, from) {
      console.log("watch $route");
      this.init();
    }
  },

  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.fetchDataById(id);
      } else {
        this.parttimeList = {
          cover:
            "http://localhost:9528/src/static/img/recruit/parttime/chaijun.jpg"
        }; // 初始化数据，防止空指针错误
      }
    },

    saveOrUpdate() {
      this.saveBtnDisabled = true; // 防止表单重复提交

      if (!this.parttimeList.id) {
        this.saveParttime();
      } else {
        this.updateParttime();
      }
    },

    saveParttime() {
      parttime
        .addParttimeInfo(this.parttimeList)
        .then(response => {
          //提示信息
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          //回到列表页面 路由跳转
          this.$router.push({ path: "/parttime/list" });
          // 处理响应数据
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "添加失败!"
          });
          // 处理错误
        });
    },
    //数据回显
    fetchDataById(id) {
      parttime
        .getParttimeInfo(id)
        .then(response => {
          this.parttimeList = response.data.items; // 假设响应数据中包含parttimeList字段，并且该字段包含所需的数据
        })
        .catch(error => {
          // 处理错误 }
          this.$message({
            type: "error",
            message: "获取数据失败"
          });
        });
    },

    updateParttime() {
      parttime.updateParttimeInfo(this.parttimeList).then(response => {
        this.$message(
          {
            type: "success",
            message: "修改成功"
          },
          this.$router.push({ path: "/parttime/list" })
        ).catch(error => {
          this.$message({
            type: "error",
            message: "修改失败"
          });
        });
      });
    },

    //上传封面成功调用的方法
    handleAvatarSuccess(file) {
      const fileName = file.split("\\").pop(); // 获取图片名称
      this.parttimeList.cover =
        "http://localhost:9528/src/static/img/recruit/parttime/" + fileName;
      console.log("图片名称:", fileName); // 打印封面图片的名称
    },

    //图片队列
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    }
  }
};
</script>
