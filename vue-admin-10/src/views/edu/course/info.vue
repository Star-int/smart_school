<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
      </el-form-item>

      <!-- 一级分类 TODO -->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类"
          @change="subjectListLevelOneChange()"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 TODO -->
      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>

      <!-- 课程封面 TODO -->
      <!--使用阿里云oss -->
      <!-- <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/fileoss/upload'"
          class="avatar-uploader"
        >
     
          <img :src="require('@/static/img/course/'+courseInfo.cover)"/>
        </el-upload>
      </el-form-item> --> 

        <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          action="http://localhost:8222/eduservice/upload/course"
          class="avatar-uploader"
        >
     
          <img :src="courseInfo.cover"   style="height:300px;width:350px;"/>
        </el-upload>
      </el-form-item> 

      

      

      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from "@/api/edu/course";
import subject from "@/api/edu/subject";
import Tinymce from "@/components/Tinymce";
import teacher from "@/api/edu/teacher";

const defaultForm = {
  title: "",
  subjectId: "", // 二级分类id
  teacherId: "",
  subjectParentId: "", // 一级分类id
  lessonNum: 0,
  description: "",
  price: 0,
  cover: "http://localhost:9528/src/static/img/course/javaLearn.jpg",
  isDeleted: 0
};

export default {
  components: { Tinymce },
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo: defaultForm,
      teacherList: [], // 封装所有讲师
      subjectOneList: [], // 一级分类
      subjectTwoList: [], // 二级分类
      BASE_API: process.env.BASE_API, // 接口API地址
      courseId: "",
    

    };
  },
  watch: {
    $route(to, from) {
      console.log("watch $route");
      this.init();
    }
  },

  created() {
    console.log("info created");

    this.init();
    this.getListTeacher();
    this.getOneSubject();
  },

  methods: {
    next() {
      console.log("next");
      this.saveBtnDisabled = true;
      if (!this.courseInfo.id) {
        this.saveData();
      } else {
        this.updateData();
      }
      this.$router.push({ path: "/course/chapter/" + this.courseId });
    },

    init() {
      if (this.$route.params && this.$route.params.id) {
        console.log("init");
        this.courseId = this.$route.params.id;
        this.getCourseInfo();
        console.log("courseId：" + this.courseId);
      } else {
        this.courseInfo = { ...defaultForm };
      }
    },

    //上传封面成功调用的方法
    handleAvatarSuccess(file) {
      const fileName = file.split("\\").pop(); // 获取图片名称
      this.courseInfo.cover = "http://localhost:9528/src/static/img/course/"+fileName;
      console.log("图片名称:", fileName); // 打印封面图片的名称
    
    },

    //上传之前调用的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 保存
    saveData() {
      course
        .saveCourseInfo(this.courseInfo)
        .then(response => {
          this.$message({
            type: "success",
            message: "添加课程信息成功!"
          });
          return response; // 将响应结果传递给then
        })
        .then(response => {
          this.$router.push({
            path: "/course/chapter/" + response.data.courseId
          });
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: response.message
          });
        });
    },

    updateData() {
      course
        .updateCourseInfo(this.courseInfo)
        .then(response => {
          this.$message({
            type: "success",
            message: "修改课程信息成功!"
          });
          return response; // 将响应结果传递给then
        })
        .then(response => {
          this.$router.push({
            path: "/course/list" 
          });
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: response.message
          });
        });
    },

    //根据课程id查询课程基本信息
    getCourseInfo() {
      course.getCourseInfo(this.courseId).then(response => {
        this.courseInfo = response.data.courseInfo;
      });
    },

    //获取所有讲师信息
    getListTeacher() {
      teacher.getAllTeacher().then(response => {
        this.teacherList = response.data.item;
        console.log("获取所有讲师信息");
        console.log(this.teacherList);
      });
    },

    //查询一级分类
    getOneSubject() {
      subject.getNestedTreeList().then(response => {
        this.subjectOneList = response.data.items;
        console.log("查询一级分类");
        console.log(this.subjectOneList);
        if (this.$route.params && this.$route.params.id) {
          //把所有一级分类进行遍历，比较当前courseInfo里面一级分类id和所有的一级分类id
          for (let i = 0; i < this.subjectOneList.length; i++) {
            //获取每个一级分类
            var oneSubject = this.subjectOneList[i];
            //比较当前courseInfo里面一级分类id和所有的一级分类id
            if (this.courseInfo.subjectParentId == oneSubject.id) {
              //获取一级分类所有的二级分类
              this.subjectTwoList = oneSubject.children;
            }
          }
        }
      });
    },

    //点击某个一级分类触发change，显示对应二级分类
    subjectListLevelOneChange() {
      console.log("一级分类id" + this.courseInfo.subjectParentId);
      for (var i = 0; i < this.subjectOneList.length; i++) {
        if (this.courseInfo.subjectParentId == this.subjectOneList[i].id) {
          this.subjectTwoList = this.subjectOneList[i].children;
          break;
        }
      }
    }
  }
};
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>