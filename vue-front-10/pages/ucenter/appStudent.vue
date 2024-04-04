<template>
  <div class="app-student-page">
    <div>
      <!-- 如果isDefine为true，则显示以下内容 -->
      <el-form>
        <el-form-item label="姓名" prop="studentName">
          <el-input v-model="student.studentName" placeholder="姓名" disabled></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="studentId">
          <el-input v-model="student.studentId" placeholder="学号" disabled></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="schoolName">
          <el-input v-model="student.schoolName" placeholder="学校" disabled></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="student.major" placeholder="专业" disabled></el-input>
        </el-form-item>

        <el-button v-if="this.isDefine==true" type="primary" @click="define()">进行学生认证</el-button>
      </el-form>
      <School @init-options="handleInitOptions" />

      <el-dialog title="学生认证" :visible.sync="dialogVisible">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="自行认证" name="selfAuth">
            <el-form
              ref="studentInfo"
              :model="studentInfo"
              label-width="80px"
              class="student-content"
            >
              <el-form-item label="学校名称">
                <el-select
                  v-model="studentInfo.schoolName"
                  placeholder="请选择学校"
                  style="width: 600px"
                  filterable
                >
                  <el-option
                    v-for="school in options"
                    :key="school"
                    :label="school"
                    :value="school"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="学生姓名">
                <el-input v-model="studentInfo.studentName" style="width: 600px"></el-input>
              </el-form-item>

              <el-form-item label="学生学号">
                <el-input v-model="studentInfo.studentId" style="width: 600px"></el-input>
              </el-form-item>

              <el-form-item label="学生专业班别" label-width="100px">
                <el-input v-model=" studentInfo.major" style="width: 600px"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="close()">取消</el-button>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveStudenInfo">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="选择认证" name="selectAuth">
            <el-form
              ref="studentInfo"
              :model="studentInfo"
              label-width="80px"
              class="student-content"
            >
              <el-form-item label="学校名称">
                <el-select
                  v-model="studentInfo.schoolName"
                  placeholder="请选择学校"
                  style="width: 600px"
                  filterable
                  disabled
                >
                  <el-option
                    v-for="school in options"
                    :key="school"
                    :label="school"
                    :value="school"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="学生姓名">
                <el-input v-model="studentInfo.studentName" style="width: 600px" disabled></el-input>
               
              </el-form-item>

              <el-form-item label="学生学号">
                <!-- <el-input v-model="studentInfo.studentId" style="width: 600px"></el-input> -->
                <el-select
                  v-model="studentInfo.studentId"
                  placeholder="请选择学生id"
                  style="width: 600px"
                  filterable
                  @change="handleStudentChange()"
                >
                  <el-option
                    v-for="student in undefinedstudentInfoList"
                    :key="student.studentId"
                    :label="student.studentId"
                    :value="student.studentId"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="学生专业班别" label-width="100px" >
                <el-input v-model=" studentInfo.major" style="width: 600px" disabled></el-input>
              </el-form-item>

              <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="close()">取消</el-button>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="updateStudenInfo">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import student from "@/api/student"; // 导入学生认证的API模块
import School from "./school.vue";
import cookie from "js-cookie"; // 导入cookie操作模块，用于获取用户信息。

export default {
  components: { School },
  data() {
    return {
      saveBtnDisabled:false,
      isDefine: "",
      student: {}, // 定义一个空对象，用于存储学生信息。
      studentInfo: {},
      undefinedstudentInfoList: {},
      user:{},
      activeName: "selectAuth",
      options: [
        // 用于下拉框选择的选项数据，需要根据实际情况获取或定义
      ],
      dialogVisible: false
    };
  },

  created() {
    // 组件创建完成后，立即执行以下代码。
    this.fetchData();
  },

  methods: {
    define() {
      this.dialogVisible = true;
      // 定义变量的方法，当isDefine为false时调用。
     
    },

    fetchData() {
      this.getUserInfo();

      student.getStudentInfoByUserId(this.user.id).then(response => {
        // 调用API获取学生信息。
        this.student = response.data.data.items; // 将API返回的学生信息存储到student变量中。
        if (this.student == null) {
          this.student = {};
          this.isDefine = true;
        }

        console.log(JSON.stringify(this.student));
      });


      student.getUndefineStudent().then(response => {
        // 调用API获取未定义的学生信息。
        this.undefinedstudentInfoList = response.data.data.items;
        console.log(JSON.stringify(undefinedstudentInfoList))
      }); // 将API返回的学生信息存储到undefinedstudentInfoList变量中。
    },

    handleInitOptions(options) {
      // 将子组件传递过来的 options 常量存入父组件的 options 属性中
      this.options = options;
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

    handleStudentChange() {
      // 根据选定的学生姓名查找对应的学生信息
      const selectedStudent = this.undefinedstudentInfoList.find(student => student.studentId === this.studentInfo.studentId);
      // 如果找到对应的学生信息，则填充其他字段
      if (selectedStudent) {
        // this.studentInfo.studentName = selectedStudent.studentName;
        // this.studentInfo.major = selectedStudent.major;
        // this.studentInfo.schoolName = selectedStudent.schoolName;
         this.studentInfo = selectedStudent; // 直接将整个对象赋值给studentInfo，避免逐个字段赋值。
      }
    },

    close(){
      this.dialogVisible = false; // 关闭弹窗
      this.studentInfo={}; // 清空学生信息。
      this.fetchData(); // 重新加载数据。

    },

    saveStudenInfo() {
      // 保存学生信息的方法，需要根据实际情况实现
      this.studentInfo.userId=this.user.id;
      student.addStudent(this.studentInfo).then(response => {
        if (response.data.code == 20000) {
          this.$message({ type: "success", message: "保存成功" });
        }
        this.dialogVisible = false; // 关闭弹窗
        this.isDefine = false; // 更新isDefine的值，表示已经定义了变量。
        this.fetchData(); // 重新加载数据
      });
    },

    updateStudenInfo(){
      this.studentInfo.userId=this.user.id;
      student.updateStudent(this.studentInfo).then(response => {
        if (response.data.code == 20000) {
          this.$message({ type: "success", message: "保存成功" });
          this.dialogVisible = false; // 关闭弹窗
          this.fetchData(); // 重新加载数据
          this.isDefine = false; // 更新isDefine的值，表示已经定义了变量。
        } else {
          this.$message({ type: "error", message: "保存失败" });
        }
      });


    }


  }
};
</script>


<style scoped>
.el-dialog {
  height: 600px;
  width: 800px;
}
</style>