<template>
  <div class="main-content" style="width: 100%;height:1200px; margin: auto;">
    <!-- <el-tabs class="tabs" v-model="activeName" @tab-click="clickTab">
      <el-tab-pane label="个人资料" name="个人资料">
        <person-page />
      </el-tab-pane>
      <el-tab-pane label="应用中心" name="应用中心"></el-tab-pane>
      <el-tab-pane label="在挂二手" name="在挂二手">
        <Selling-Page />
      </el-tab-pane>
      <el-tab-pane label="已投简历" name="已投简历"></el-tab-pane>
    </el-tabs>-->

    <el-row>
      <el-col :span="6">
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo"
          @select="handleMenuSelect"
        >
        <el-menu-item index="/ucenter/profile">个人资料</el-menu-item>
      <el-menu-item index="/ucenter/applicationCenter">应用中心</el-menu-item>
      <el-menu-item index="/ucenter/selling">在挂二手</el-menu-item>
      <el-menu-item index="/ucenter/resume">已投简历</el-menu-item>
      <el-menu-item index="/ucenter/collectlist">收藏列表</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <div v-if="activeMenu === '/ucenter/profile'">
          <person-page />
        </div>
        <div v-if="activeMenu === '/ucenter/applicationCenter'">
          <application />
        </div>
        <div v-if="activeMenu === '/ucenter/selling'">
          <selling-page />
        </div>
        <div v-if="activeMenu === '/ucenter/resume'">
          <resume-page />
          <!-- 已投简历组件内容 -->
        </div>
        <div v-if="activeMenu === '/ucenter/collectlist'">
          <collect-page />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PersonPage from "../ucenter/PersonPage.vue";
import SellingPage from "../ucenter/SellingPage.vue";
import ResumePage from "../ucenter/ResumePage.vue";
import CollectPage from "../ucenter/CollectPage.vue";
import application from "./application.vue";
import cookie from "js-cookie";

export default {
  components: { PersonPage, SellingPage, ResumePage,CollectPage,application },
  data() {
    return {
      user: {},

      dialogVisible: false,
      // activeName: "个人资料",
      // activeMenu: "个人资料" // 默认激活的菜单项
      activeMenu: '/ucenter/profile'
    };
  },
  created() {
    this.showInfo();
  },

  watch: {
    '$route'() {
      // 在路由变化时更新菜单激活状态
      this.updateActiveMenu();
    }
  },
  mounted() {
    // 组件加载时更新菜单激活状态
    this.updateActiveMenu();
  },

  methods: {
    showInfo() {
      //debugger
      var jsonStr = cookie.get("guli_ucenter");
      if (jsonStr) {
        try {
          this.user = JSON.parse(jsonStr);
          console.log("成功解析 JSON 数据");
          console.log(JSON.stringify(this.user.nickname));
        } catch (error) {
          console.error("JSON 解析失败:", error);
        }
      }

      if(this.user.id==null){
        this.$message({type: "error", message: "请先登录"});
        this.$router.push({ path: "/login" }); // 跳转到登录页面
        return false; // 返回false，阻止后续代码执行

      }
    },

    updateActiveMenu() {
      const path = this.$route.path;
      // 设置当前激活菜单项
      this.activeMenu = path;
    },

    handleMenuSelect(index) {
      this.activeMenu = index; // 更新当前激活的菜单项
    },

    clickTab() {}
  }
};
</script>

<style scoped>
.el-row {
  margin: 0 !important; /* 去除 el-row 的外边距 */
  width: 100%;
}

.el-col {
  padding: 0; /* 去除 el-col 的内边距 */
  margin-left: 100px;
  margin-bottom: -220px;
}

.el-menu-vertical-demo {
  width: 180px;

  border: 1px solid #29bda7; /* 添加边框样式 */
  border-radius: 5px; /* 添加边框圆角 */
}

.el-form-item__label {
  font-weight: bold;
}

.el-upload {
  border-radius: 50%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border-radius: 50%;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
  border-radius: 50%;
}
</style>