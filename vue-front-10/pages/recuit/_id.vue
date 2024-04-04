<!-- _id.vue -->

<template>
  <div id="contain" class="contain-container">
    <div id="aRecuitList" class="bg-fa of">
      <section class="container">
        <!-- 招聘所属分类 开始 -->
        <section class="path-wrap txtOf hLh30">
          <a href="/" title class="c-999 fsize14">首页</a>
          \
          <a href="/recuit/recruitment" title class="c-999 fsize14">兼职招聘</a>
          \
          <span class="c-333 fsize14">{{ recuitmentList.companyName }}</span>
        </section>

        <!-- 工作详情 开始 -->
        <div class="details">
          <article class="c-v-pic-wrap" style="height: 240px;width:300px">
            <section id="fenmian" class="p-h-video-box">
              <img :src="list.logo" :alt="list.logo" class="dis c-v-pic" style="height: 200px;" />
            </section>
          </article>
          <div style="margin-right: 100px;">
            <div class="move-down">
              <h1 style="color: lightblue;">公司简介</h1>

              <p v-html="list.description" style="font-size: large;font-family: 'SimSun';"></p>
            </div>
          </div>

          <div class="recruitmentDeatils">
            <section>
              <el-descriptions class="margin-top" :border="true" size="medium">
                <el-descriptions-item label="岗位">{{ recuitmentList.positionName }}</el-descriptions-item>
                <el-descriptions-item label="薪水">{{ recuitmentList.salary }}</el-descriptions-item>

                <el-descriptions-item label="要求学历">{{ recuitmentList.education }}</el-descriptions-item>
              </el-descriptions>
            </section>
          </div>
        </div>

        <!-- 工作详情 开始 -->
        <div class="Companydetails">
          <div class="CompanyDeatils">
            <section>
              <el-descriptions class="margin-top" :border="true" :size="size">
                <el-descriptions-item label="公司名称">{{ list.name }}</el-descriptions-item>
                <el-descriptions-item label="位置">{{ list.address}}</el-descriptions-item>
                <el-descriptions-item label="公司官网">
                  <a :href="list.website" target="_blank">{{ list.website }}</a>
                </el-descriptions-item>
                <el-descriptions-item label="公司电话">{{ list.phone}}</el-descriptions-item>
                <el-descriptions-item label="公司邮箱">{{ list.email}}</el-descriptions-item>
              </el-descriptions>
            </section>
          </div>
        </div>

        <div>
          <h2 v-bind:style="{color: 'lightblue'}">技能要求</h2>
          <p v-html="recuitmentList.description" style="font-size: large;font-family: 'SimSun';"></p>
        </div>
        <!-- 投递简历按钮 -->
        <div class="deliver-resume-btn" style="margin-top:50px ;">
          <el-button type="primary" @click="deliverResume">投递简历</el-button>
          <el-button style="margin-left: 20px;" @click="toggleFavorite">
      <i :class="isFavorite ? 'el-icon-star-on' : 'el-icon-star-off'"></i> 加入收藏
    </el-button>
        </div>

     

        <el-dialog title="投递简历" :visible.sync="dialogVisible" width="50%">
          <el-form ref="resumeForm" :model="resume" label-width="80px">
            <el-form-item label="简历图片">
              <el-upload
                class="upload-demo"
                action="http://localhost:8222/recuit/upload/resume"
                :on-success="handleAvatarSuccess"
                :show-file-list="false"
                :limit="20971520"
              >
                <img :src="this.resume.cover" style="height:600px;width:500px;" />
              </el-upload>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible= false">取消</el-button>
            <el-button type="primary" @click="submitResume">提交</el-button>
          </span>
        </el-dialog>

        <div class="more-contain">
          <h1>公司在招其他岗位</h1>
          <!-- 公司在招其他岗位 -->
          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="(recruitment, index) in recuitments" v-bind:key="index">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img
                      :src="recruitment.companyLogo"
                      class="img-responsive"
                      :alt="recruitment.companyName"
                      style="height: 200px;width: 100%;object-fit: cover; border: 1px solid black; box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);"
                    />
                    <div class="cc-mask">
                      <a
                        :href="'/recuit/'+recruitment.id"
                        title="查看详情"
                        class="comm-btn c-btn-1"
                      >查看详情</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a
                      href="#"
                      :title="recruitment.positionName"
                      class="course-title fsize18 c-333"
                    >{{recruitment.positionName}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize18 f-fA">￥{{recruitment.salary}}</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>
  
<script>
import recuit from "@/api/recuit";
import company from "@/api/company";
import resumeapi from "@/api/resume";
import collect from"@/api/collect";
import cookie from "js-cookie";

export default {
  created() {
    this.fetchRecruitment(); // 获取当前公司下的其他招聘信息，并过滤掉当前招聘信息，只显示其他招聘信息。
  },

  mounted() {},

  data() {
    return {
      user: {},
      dialogVisible: false,
      recuitments: [], // 存储所有招聘信息，包括当前公司下的所有招聘信息
      recuitmentList: {}, //
      size: "medium",
      list: {},
      RdescriptionWithoutTags: "",
      CdescriptionWithoutTags: "",
      resume: {},
      collectInfo:{},
      isFavorite: false,
    };
  },

  methods: {
    fetchRecruitment() {
      this.getUserInfo();
      recuit.getRecruitInfoById(this.$route.params.id).then(response => {
        this.recuitmentList = response.data.data.items;
        recuit.getCompanyInfo(this.recuitmentList.companyId).then(response => {
          this.list = response.data.data.items;
        });
        company
          .getCompanyJobList(this.recuitmentList.companyId)
          .then(response => {
            this.recuitments = response.data.data.items.filter(
              item => item.id !== this.recuitmentList.id
            ); // 过滤掉当前招聘信息，只显示其他招聘信息
          });
      });
    },

    getUserInfo() {
      var jsonStr = cookie.get("guli_ucenter");
      if (jsonStr) {
        try {
          this.user = JSON.parse(jsonStr);
          console.log("成功解析 JSON 数据");
        } catch (error) {
          console.error("JSON 解析失败:", error);
        }
      }
    },

    
    toggleFavorite() {
     
      
     this.collectInfo.recruitmentId=this.$route.params.id;
     this.collectInfo.userId=this.user.id;
     if(this.user.id==null){
        this.$message({type: "error", message: "请先登录"});
        this.$router.push({ path: "/login" }); // 跳转到登录页面
        return false; // 返回false，阻止后续代码执行

      }

     collect.addCollect(this.collectInfo).then(response => {
       if (response.data.success) {
         this.isFavorite = true; // 收藏成功后，将isFavorite设置为true，表示已收藏
         this.$message({type: "success", message: "收藏成功"});
       }
       else{this.$message({type: "error", message: "收藏失败"});
         
       }
      
     });
   },

    submitResume() {
      this.resume.companyId = this.list.id;
      this.resume.recruitmentId = this.recuitmentList.id;
      this.resume.positionName = this.recuitmentList.positionName;
      this.resume.companyName = this.list.name;
      this.resume.userId = this.user.id;
      if(this.user.id==null){
        this.$message({type: "error", message: "请先登录"});
        this.$router.push({ path: "/login" }); // 跳转到登录页面
        return false; // 返回false，阻止后续代码执行

      }
      resumeapi
        .addResume(this.resume)
        .then(response => {
          if(response.data.code==20000)
          {this.$message({
            // 提交成功后的提示信息
            type: "success",
            message: "提交成功!"
          });
          }
          // 提交成功后的处理逻辑，例如提示用户提交成功等操作
        }).catch(error => {
          console.log(error); // 打印错误信息到控制台
          this.$message({
            // 提交失败后的提示信息
            type: "error",
            message: "提交失败!"
          });
          // 提交失败后的处理逻辑，例如提示用户提交失败等操作
        });
      // 提交成功后关闭对话框
      this.dialogVisible = false;
      this.resume = {};
    },

    //上传封面成功调用的方法
    handleAvatarSuccess(file) {
      const fileName = file.split("\\").pop(); // 获取图片名称
      this.resume.cover =
        "http://localhost:9528/src/static/img/recruit/resume/" + fileName;
      console.log("图片名称:", fileName); // 打印封面图片的名称
      console.log(this.resume.cover);
      this.$forceUpdate();
    },

    //图片队列
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },

    deliverResume() {
      this.dialogVisible = true;
    }
  }
};
</script>
  
<style scoped>
/* 在这里添加组件特定的样式 */

.more-contain {
  margin-top: 90px;
}

.contain-container {
  margin-top: 20px;
  height: auto; /* 使用 auto 或者更大的值来确保内容可以完全显示 */
}
</style>

