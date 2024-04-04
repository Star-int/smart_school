<template>
  <div class="app-addstudent">
    <div class="student-addfrom">
      <h1>学生信息</h1>
      <School @init-options="handleInitOptions" />
      <el-form ref="studentInfo" :model="studentInfo" label-width="80px" class="student-content">
        <el-form-item label="学校名称">
          <el-select v-model="studentInfo.schoolName" placeholder="请选择学校" style="width: 600px" filterable>
            <el-option
              v-for="school in options"
              :key="school"
              :label="school"
              :value="school"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="学生名称">
          <el-input v-model="studentInfo.studentName" style="width: 600px"></el-input>
        </el-form-item>

        <el-form-item label="学生学号">
          <el-input v-model="studentInfo.studentId" style="width: 600px"></el-input>
        </el-form-item>

        <el-form-item label="学生专业班别" label-width="100px">
          <el-input v-model=" studentInfo.major" style="width: 600px"></el-input>
        </el-form-item>

        <el-form-item>
          <router-link :to="'/application/studentlist'">
            <el-button :disabled="saveBtnDisabled" type="primary">取消</el-button>
          </router-link>
          <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import student from "@/api/application/student";
import School from "./school.vue";

export default {
  components: {
    School
  },
  data() {
  
    return {
      studentInfo: [],
      saveBtnDisabled: false, // 表示保存按钮是否禁用，默认不禁用
        options: [ // 用于下拉框选择的选项数据，需要根据实际情况获取或定义
           
       ]
    };
  },

  created() {
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
        this.getStudentInfo(id);
      } else {
        this.studentInfo = {}; // 初始化数据，防止空指针错误
      }
    },

    handleInitOptions(options) {
      // 将子组件传递过来的 options 常量存入父组件的 options 属性中
      this.options = options;
    },
    
    getStudentInfo(id) {

      student.getStudentById(id).then(response => {
        this.studentInfo = response.data.items; // 将列表数据赋值给this.studentInfo，用于下拉框选择
        console.log(JSON.stringify(studentInfo)); // 打印this.studentInfo，检查数据是否正确
      });
    },

    saveOrUpdate() {
      // 保存或更新学生信息的方法，需要根据实际情况实现
      if (this.studentInfo.id) {
        this.updateStudentInfo();
      } else {
        this.saveStudenInfo();
      }
    },

    updateStudentInfo() {
      student.updateStudent(this.studentInfo).then(response => {
        this.$message({ type: "success", message: "更新成功" });
        this.$router.push({ path: "/application/studentlist" });
      });
    },

    saveStudenInfo() {
      // 保存学生信息的方法，需要根据实际情况实现
      this.studentInfo.userId = ""; // 假设用户ID为空，需要根据实际情况设置
      student.addStudent(this.studentInfo).then(response => {
        this.$message({ type: "success", message: "保存成功" });
        this.$router.push({ path: "/application/studentlist" });
      });
    }
  }
};
</script>

<style>
.app-addstudent {
  width: 100%;
  height: 100%;
  margin-left: 100px;
}

.student-addfrom {
  height: 600px;
  width: 800px;

  background-color: rgba(255, 255, 255, 0.5); /* 半透明的白色背景 */
  border: 1px solid #000000; /* 黑色边框 */
  background-image: url("./from.jpg"); /* 添加背景图片 */
  background-size: cover; /* 背景图片自适应元素大小 */
  background-position: center; /* 背景图片居中 */
  opacity: 0.8; /* 设置元素整体透明度，0.5表示50%透明 */
}
.student-content {
  margin-top: 60px;
}
</style>