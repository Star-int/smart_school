<template>
  <div class="application-appleave">
    <div class="leave-form">
      <h1>提交请假信息</h1>
      <el-form ref="leaveForm" :model="leaveForm" label-width="80px">
        <el-form-item label="学生姓名">
          <el-input v-model="leaveForm.studentName" disabled></el-input>
        </el-form-item>

        <el-form-item label="请假类型">
          <el-select v-model="leaveForm.leaveType" placeholder="请选择请假类型">
            <el-option label="病假" value="病假"></el-option>
            <el-option label="事假" value="事假"></el-option>

            <!-- 根据学校需求添加其他请假类型 -->
            <el-option label="探亲假" value="探亲假"></el-option>
            <el-option label="婚假" value="婚假"></el-option>
            <el-option label="丧假" value="丧假"></el-option>
            <!-- 添加其他类型 -->
          </el-select>
        </el-form-item>
        <el-form-item label="请假原因">
          <el-input v-model="leaveForm.reason" type="textarea" rows="3" placeholder="请输入请假原因"></el-input>
        </el-form-item>

        <el-form-item label="开始日期">
          <el-date-picker
            v-model="leaveForm.startDate"
            type="datetime"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
          />
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            v-model="leaveForm.endDate"
            type="datetime"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
          />
        </el-form-item>

        <el-form-item label="审批人">
          <el-select v-model="leaveForm.approverId" placeholder="请选择审批人">
            <el-option
              v-for="approver in approverList"
              :key="approver.id"
              :label="approver.nickName"
              :value="approver.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item> 
           <router-link :to="'/application/application'">
          <el-button type="primary" style="margin-left: 400px;">取消</el-button>
        </router-link>
        <el-button type="primary" @click="submitForm" >提交</el-button>
        </el-form-item>
      
      
      </el-form>
    </div>
  </div>
</template>>

<script>
import leave from "@/api/leave"; // 导入请假接口。
import student from "@/api/student";
import acl from "@/api/acl";
import cookie from "js-cookie";


export default {
  name: "ApplicationAppleave",
  data() {
    return {
      user: {},
      leaveForm: {comment:""},
      approverList: [], // 审批人列表，根据实际情况从后端获取。

   
    };
  },

  created() {
    this.fetchData(); // 调用fetchData方法，获取学生信息。
  },

  methods: {
    fetchData() {
      this.getUserInfo();
      if(this.user.id==null){
        this.$message({type: "error", message: "请先登录"});
        this.$router.push({ path: "/login" }); // 跳转到登录页面
        return false; // 返回false，阻止后续代码执行

      }
      student.getStudentInfoByUserId(this.user.id).then(response => {
        this.leaveForm.studentId = response.data.data.items.studentId; //获取学生id，这里假设有一个名为getStudentInfoByUserId的方法。
        this.leaveForm.studentName =response.data.data.items.studentName;
        console.log(JSON.stringify(this.leaveForm))
      }).catch(error => { // 获取学生信息失败时的处理。
       
        this.$message({
            type: 'error', // 错误提示的类型。
            message: '获取学生信息失败,进先进行认证' // 错误提示的信息。
            
        })
      })

      acl.getAllAdmins().then(response => { //获取审批人列表，这里假设有一个名为getAllAdmins的方法。
        this.approverList = response.data.data.items; //获取审批人列表，这里假设有一个名为getAllAdmins的方法。)
      })
 
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
    

    submitForm(){
        leave.addLeave(this.leaveForm).then(response => { //调用addLeave方法，将请假信息提交到后台。
            this.$message({
                type: 'success',
                message: '提交成功' //提交成功后的提示信息。
            })
            this.$router.push({path: '/ucenter/applicationCenter'}) //提交成功后跳转的页面。
        })
    }


  }
};
</script>

<style scoped>
.application-appleave {
  width: 100%;
  height: 1000px;
  padding: 20px;
  box-sizing: border-box;

  border-radius: 5px; /* 设置边框圆角 */
}

.leave-form {
  margin-left: 300px;
  height: 500px;
  width: 800px; /* 设置表单的宽度 */
  background-color: aliceblue;
}
</style>