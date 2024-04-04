<template>
  <div class="app-container">
    <el-form ref="recruitList" :model="recruitList" label-width="80px">
      <!-- <el-form-item label="公司名称">
        <el-input v-model="recruitList.companyName" style="width: 600px"></el-input>
      </el-form-item>-->

      <el-form-item label="公司id">
        <el-input v-model="recruitList.companyId" style="width: 300px" disabled></el-input>
      </el-form-item>

      <el-form-item label="公司名称">
        <el-select
          v-model="recruitList.companyName"
          style="width: 600px"
          placeholder="请选择公司"
          @change="handleCompanyChange"
          filterable
        >
          <el-option
            v-for="item in companylist"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="公司地址">
        <el-input v-model="recruitList.location" style="width: 600px" disabled></el-input>
      </el-form-item>

      <el-form-item label="职位名称">
        <el-input v-model="recruitList.positionName" style="width: 600px"></el-input>
      </el-form-item>

      <!-- <el-form-item label="HR_ID">
        <el-input v-model="recruitList.hrId" style="width: 600px"></el-input>
      </el-form-item>-->

      <el-form-item label="薪资">
        <el-input v-model="recruitList.salary" style="width: 600px"></el-input>
      </el-form-item>
      <!-- <el-form-item label="地点">
        <el-input v-model="recruitList.location" style="width: 600px"></el-input>
      </el-form-item>-->

      <el-form-item label="经验要求">
        <el-input v-model="recruitList.experience" style="width: 600px"></el-input>
      </el-form-item>

      <el-form-item label="学历要求" style="width:auto">
        <el-select v-model="recruitList.education">
          <el-option label="大专" value="大专"></el-option>
          <el-option label="本科" value="本科"></el-option>
          <el-option label="硕士" value="硕士"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="职位描述">
        <tinymce :height="300" v-model="recruitList.description" />
      </el-form-item>

      <el-form-item label="招聘状态" style="width:auto">
        <el-select v-model="recruitList.status">
          <el-option label="招聘中" value="1"></el-option>
          <el-option label="招聘完" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="公司logo">
        <el-upload
          class="upload-demo"
          action="http://localhost:8222/recuit/upload/recruitment"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          :limit="20971520"
        >
          <img :src="this.recruitList.companyLogo" style="height:200px;width:300px;" />
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
import recruitment from "@/api/recruit/recruitment";
import company from "@/api/recruit/company";
import Tinymce from "@/components/Tinymce";

export default {
  components: { Tinymce },
  data() {
    return {
      recruitList: {
        companyLogo:
          "http://localhost:9528/src/static/img/recruit/recruitment/chaijun.jpg"
      },

      companylist: {}, // 用于存储公司列表

      saveBtnDisabled: false // 表示保存按钮是否禁用，默认不禁用
    };
  },

  created() {
    console.log("created");
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      this.fetchDataById(id);
    } else {
      this.recruitList = {
        companyLogo:
          "http://localhost:9528/src/static/img/recruit/recruitment/chaijun.jpg"
      }; // 初始化数据，防止空指针错误
    }

    this.getCompanyList(); // 获取公司列表数据
  },

  methods: {
    saveOrUpdate() {
      if (this.recruitList.id) {
        this.updateRecruit();
      } else {
        this.saveRecruit();
      }
    },

    handleCompanyChange() {
      const selectedCompany = this.companylist.find(
        company => company.name === this.recruitList.companyName
      );
      if (selectedCompany) {
        this.recruitList.location = selectedCompany.address;
        this.recruitList.companyId = selectedCompany.id;
      }
      console.log("selectedCompany:", selectedCompany); // 打印选中的公司信息，方便调试
    },

    getCompanyList() {
      company.getCompanyList().then(response => {
        this.companylist = response.data.items; // 假设响应数据中包含companylist字段，并且该字段包含所需的数据
      });
    },

    fetchDataById(id) {
      recruitment
        .getRecruitInfo(id)
        .then(response => {
          this.recruitList = response.data.items; // 假设响应数据中包含parttimeList字段，并且该字段包含所需的数据
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
      recruitment
        .addRecruit(this.recruitList)
        .then(
          repsonse =>
            this.$message({
              // 提示成功信息
              type: "success",
              message: "添加成功!"
            }), // 提示成功信息结束
          this.$router.push({ path: "/recruitment/list" }) // 跳转到列表页面
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
      recruitment.updateParttimeInfo(this.recruitList).then(response => {
        this.$message(
          {
            type: "success",
            message: "修改成功"
          },
          this.$router.push({ path: "/recruitment/list" }) // 跳转到列表页面
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
      this.recruitList.companyLogo =
        "http://localhost:9528/src/static/img/recruit/recruitment/" + fileName;
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
