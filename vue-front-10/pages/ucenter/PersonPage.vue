<template>
  <div class="app-container">
    <el-card>
      <el-form :model="user" label-width="80px" style="padding-left: 300px;   width: 50%;">
        <div style="margin: 15px; text-align: center">
          <el-upload
            class="upload-demo"
            action="http://localhost:8222/ucenterservice/upload/avatar"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            :limit="20971520"
           
          >
            <img v-if="user.avatar" :src="user.avatar"  class="avatar" />
          </el-upload>
        </div>

        <el-form-item label="用户名" prop="mobile">
          <el-input v-model="user.mobile" placeholder="用户名" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="user.nickname" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="user.mobile" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="user.address" placeholder="地址"></el-input>
        </el-form-item>

        <el-form-item label="个性签名" prop="sign">
          <el-input type="text" v-model="user.sign" placeholder="个性签名"></el-input>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <el-input v-model="user.age" placeholder="年龄"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="user.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          
          </el-radio-group>
          
        </el-form-item>

        <el-form-item label="微信" prop="openid">
          <el-input v-model="user.openid" placeholder="微信"></el-input>
        </el-form-item>

        <div style="text-align: center; margin-bottom: 20px">
          <el-button type="danger" @click="openDiag">修改密码</el-button>
          <el-button type="primary" @click="update">保 存</el-button>
        </div>
      </el-form>
    </el-card>

    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <el-form :model="user" label-width="80px" style="padding-right: 20px" ref="formRef">
        <el-form-item label="新密码" prop="newPassword">
          <el-input show-password v-model="newPassword" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" :rules="confirmPasswordRules">
          <el-input show-password v-model="confirmPassword" placeholder="确认密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cookie from "js-cookie";
import user from "@/api/user";

export default {
  data() {
    return {
      user:{avatar:"https://guili-wenjian.oss-cn-guangzhou.aliyuncs.com/avatar/keli.jpeg"},
    
      dialogVisible: false,
      newPassword: "",
      confirmPassword: "",
      confirmPasswordRules: [
        { validator: this.validateConfirmPassword, trigger: "blur" }
      ]
    };
  },

  created() {
    this.showInfo();
   

  },

  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs.formRef);
    });
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
    },

    // 保存个人信息
    update() {
      // 保存当前的用户信息到数据库

      user
        .updateUserInfo(this.user)
        .then(res => {
          // 成功更新
          this.$message.success("保存成功");
          // 更新浏览器缓存里的用户信息

          cookie.set("guli_ucenter", JSON.stringify(this.user), {
            domain: "localhost"
          });
          this.showInfo(); // 重新加载用户信息，以更新浏览器缓存里的用户信息。
        })
        .catch(error => {
          console.log(error.message); // 输出错误信息，例如 "Network Error" 或 "Request failed with status code 500"
        });
    },

 

    // 校验确认密码是否与新密码一致
    validateConfirmPassword(rule,value,callback) {
        
      if (this.confirmPassword ==="") {
        callback(new Error("请再次输入密码"));
      } else if (this.confirmPassword !== this.newPassword) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    },

    //上传封面成功调用的方法
    handleAvatarSuccess(file) {
      const fileName = file.split("\\").pop(); // 获取图片名称
      this.user.avatar =
        "http://localhost:9528/src/static/img/userAvatar/" + fileName;
      console.log("图片名称:", fileName); // 打印封面图片的名称
    },

    // 修改密码
    openDiag() {
      this.dialogVisible = true;
    },
    
      // 修改密码
     updatePassword() {  // 更新密码到数据库中。
      user.updatePassword(this.user).then(res => {

        this.$message.success("密码修改成功，请重新登录！"); // 提示用户重新登录。
        cookie.set("guli_token", "", { domain: "localhost" }); // 清除浏览器缓存里的token信息。
        cookie.set("guli_ucenter", "", { domain: "localhost" }); // 清除浏览器缓存里的用户信息。
        this.$router.push({ path: "/login" }); // 跳转到登录页面。
        
      }).catch(error => { // 处理错误。
        
        console.log(error.message); // 输出错误信息，例如 "Network Error" 或 "Request failed with status code 500"
        this.$message.error("密码修改失败！"); // 提示用户密码修改失败。
        this.dialogVisible = false; // 关闭修改密码对话框。
        this.newPassword = ""; // 清空新密码输入框。
        this.confirmPassword = ""; // 清空确认密码输入框。
        this.$refs.formRef.resetFields(); // 重置表单验证。
       });
      },
       
     

    
    save() {

      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.user.password = this.newPassword; // 更新密码到user对象中，以便保存到数据库中。
          this.updatePassword();
          this.dialogVisible = false;
        } else {
          return false;
        }
      });
     }
  }
};
</script>

<style scoped>


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