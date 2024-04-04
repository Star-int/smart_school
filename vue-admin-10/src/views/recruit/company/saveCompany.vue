<template>
  <div class="app-container">
    <el-form ref="recruitList" :model="companyList" label-width="80px">
      <el-form-item label="公司名称">
        <el-input v-model="companyList.name" style="width: 600px"></el-input>
      </el-form-item>
      <el-form-item label="公司地址">
        <el-input v-model="companyList.address" style="width: 600px"></el-input>
      </el-form-item>

      <!-- <el-form-item label="HR_ID">
        <el-input v-model="recruitList.hrId" style="width: 600px"></el-input>
      </el-form-item>-->

      <el-form-item label="手机">
        <el-input v-model="companyList.phone" style="width: 600px"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="companyList.email" style="width: 600px"></el-input>
      </el-form-item>
      <el-form-item label="官网">
        <el-input v-model="companyList.website" style="width: 600px"></el-input>
      </el-form-item>

      <el-form-item label="公司简介">
        <tinymce :height="300" v-model="companyList.description" />
      </el-form-item>

      <el-form-item label="公司logo">
        <el-upload
          class="upload-demo"
          action="http://localhost:8222/recuit/upload/company"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          :limit="20971520"
        >
          <img
            :src="this.companyList.logo"
            style="height:200px;width:300px;"
          />
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过20MB</div>
        </el-upload>
      </el-form-item>

      <!-- <img :src="companyList.logo" style="height:200px;width:300px;" /> -->

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import company from "@/api/recruit/company";
import Tinymce from "@/components/Tinymce";

export default {
  components: { Tinymce },

  data() {
    return {
      companyList: {
        logo: "http://localhost:9528/src/static/img/recruit/company/chaijun.jpg"
      },

      saveBtnDisabled: false // 表示保存按钮是否禁用，默认不禁用
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
        console.log(this.companyList.logo);
      } else {
   
        this.companyList = {
          logo:
            "http://localhost:9528/src/static/img/recruit/company/chaijun.jpg"
        }; // 初始化数据，防止空指针错误
      }
    },

    saveOrUpdate() {
      if (this.companyList.id) {
        this.updateRecruit();
      } else {
        this.saveRecruit();
      }
    },

    fetchDataById(id) {
      company
        .getCompanyInfo(id)
        .then(response => {
          this.companyList = response.data.items; // 假设响应数据中包含parttimeList字段，并且该字段包含所需的数据
        })
        .catch(error => {
          // 处理错误 }
          this.$message({
            type: "error",
            message: "获取数据失败"
          });
        });
    },

    saveRecruit() {
      // 新增
      company
        .addCompanyInfo(this.companyList)
        .then(
          repsonse =>
            this.$message({
              // 提示成功信息
              type: "success",
              message: "添加成功!"
            }), // 提示成功信息结束
          this.$router.push({ path: "/recruitment/clist" }) // 跳转到列表页面
        )
        .catch(
          error => {
            // 提示失败信息
            this.$message({
              // 提示失败信息
              type: "error",
              message: "添加失败!" // 提示信息为添加失败
            });
          } // 提示失败信息结束
        ); // 调用recruitment.addRecruit方法结束，并传入this.recruitmentList作为参数
    },

    updateRecruit() {
      company.updateCompanyInfo(this.companyList).then(response => {
        this.$message(
          {
            type: "success",
            message: "修改成功"
          },
          this.$router.push({ path: "/recruitment/clist" }) // 跳转到列表页面
        ).catch(error => {
          this.$message({
            type: "error",
            message: "修改失败"
          });
        });
      });
    }, // 更新方法，待实现

    //上传封面成功调用的方法
    handleAvatarSuccess(file) {
      const fileName = file.split("\\").pop(); // 获取图片名称
      this.companyList.logo =
        "http://localhost:9528/src/static/img/recruit/company/" + fileName;
      console.log("图片名称:", fileName); // 打印封面图片的名称
    },

    //图片队列
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    }
  }
};
</script>


<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>
 
