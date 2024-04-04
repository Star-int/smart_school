<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API+'/vod/video/uploadAlyiVideo'"
            :limit="1"
            class="upload-demo"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">
                最大支持1G，
                <br />支持3GP、ASF、AVI、DAT、DV、FLV、F4V、
                <br />GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、
                <br />MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、
                <br />SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 章节 -->
    <el-button type="text" @click="openAddChapterDialog">添加章节</el-button>

    <ul class="chanpterList">
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item :title="chapter.title">
            <p>
              {{ chapter.title }}
              <span class="acts">
                <el-button type="text" @click="openVideo(); chapterId = chapter.id">添加课时</el-button>
                <el-button type="text" @click="editChapter(chapter.id)">编辑</el-button>
                <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
              </span>
            </p>

            <ul class="chanpterList videoList">
              <li v-for="video in chapter.children" :key="video.id">
                <p>
                  {{ video.title }}
                  <span class="acts">
                    <el-button type="text" @click="editVideo(video.id)">编辑</el-button>
                    <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
                  </span>
                </p>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </li>
    </ul>

    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>
  </div>
</template>
  

<script>
import chapter from "@/api/edu/chapter";
import video from "@/api/edu/video";
import vod from "@/api/edu/vod";

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      dialogChapterFormVisible: false, //是否显示章节表单
      courseId: " ",
      chapterVideoList: [],
      saveVideoBtnDisabled: false, // 课时按钮是否禁用
      dialogVideoFormVisible: false, // 是否显示课时表单
      chapterId: "", // 课时所在的章节id
      activeName: 1, // 默认展开的章节
      fileList: [], //上传文件列表
      BASE_API: process.env.BASE_API, // 接口API地址
      nowVideoId:"",
      chapter: {
        // 章节对象
        title: "",
        sort: 0
      },

      video: {
        // 课时对象
        title: "",
        sort: 0,
        isFree: 0,
        videoSourceId: "",
        videoOriginalName: ''
      }
    };
  },

  created() {
    console.log("chapter created");
    this.init();
  },

  methods: {
    getChapterVideo() {
      chapter.getAllChapterterVideo(this.courseId).then(response => {
        this.chapterVideoList = response.data.allChapterVideo;
        console.log(this.chapterVideoList);
      });
    },

    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        // 根据id获取课程基本信息
        this.getChapterVideo();
      }
    },

    previous() {
      console.log("previous");
      this.$router.push({ path: "/course/info/" + this.courseId });
    },

    next() {
      console.log("next");
      this.$router.push({ path: "/course/publish/" + this.courseId });
    },

    saveOrUpdate() {
      this.saveBtnDisabled = true;
      if (!this.chapter.id) {
        this.saveData();
      } else {
        this.updateData();
      }
    },

    //弹出添加章节页面
    openAddChapterDialog() {
      this.dialogChapterFormVisible = true;
      //清空chapter
      this.chapter.title = "";
      this.chapter.sort = 0;
      this.chapter.id = null;
    },

    //添加章节
    saveData() {
      this.chapter.courseId = this.courseId;
      chapter
        .save(this.chapter)
        .then(response => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.helpSave();
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: response.message
          });
        });
    },

    //编辑章节
    editChapter(chapterId) {
      this.dialogChapterFormVisible = true;
      chapter.getById(chapterId).then(response => {
        this.chapter = response.data.chapter;
      });
    },

    //更新章节
    updateData() {
      chapter
        .updateById(this.chapter)
        .then(response => {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.helpSave();
        })
        .catch(response => {
          // console.log(response)
          this.$message({
            type: "error",
            message: response.message
          });
        });
    },

    //删除章节
    removeChapter(chapterId) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return chapter.removeById(chapterId);
        })
        .then(() => {
          this.getChapterVideo(); // 刷新列表
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(response => {
          // 失败
          if (response === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          } else {
            this.$message({
              type: "error",
              message: response.message
            });
          }
        });
    },

    helpSave() {
      this.dialogChapterFormVisible = false; // 如果保存成功则关闭对话框
      this.getChapterVideo(); // 刷新列表
      this.chapter.title = ""; // 重置章节标题
      this.chapter.sort = 0; // 重置章节标题
      this.saveBtnDisabled = false;
    },

    //小节方法
    //添加或者保存小节
    saveOrUpdateVideo() {
      this.saveVideoBtnDisabled = true;
      if (!this.video.id) {
        this.saveDataVideo();
      } else {
        this.updateDataVideo();
      }
    },

    //弹出添加小节窗口
    openVideo() {
      this.dialogVideoFormVisible = true; // 显示窗口
      this.video.title = ""; // 重置小节标题
      this.video.sort = 0;
      this.video.isFree = 0;
      this.video.videoSourceId = "";
      this.video.videoOriginalName = "";
      this.video.id = null; // 重置id，确保添加操作

      this.videoList={};//重置视频列表
      this.videoList={};//重置视频列表
    },

    //添加小节
    saveDataVideo() {
      this.video.courseId = this.courseId;
      this.video.chapterId = this.chapterId;
      video.saveVideoInfo(this.video).then(response => {
        this.$message({
          type: "success",
          message: "保存成功!"
        });
        this.helpSaveVideo();
      });
    },

    //更新小节
    updateDataVideo() {
      video.updateVideoInfoById(this.video).then(response => {
        this.$message({
          type: "success",
          message: "修改成功!"
        });
        this.helpSaveVideo();
      });
    },

    //编辑小节
    editVideo(videoId) {
      this.dialogVideoFormVisible = true;
      this.nowVideoId = videoId; // 保存当前小节id，用于删除视频
   
      video.getVideoInfoById(videoId).then(response => {
        this.video = response.data.item;
         if(this.video.videoSourceId==""){
            this.fileList = []; // 清空文件列表，确保上传视频按钮显示出来
         }else{
          this.fileList = [{'name': this.video.videoOriginalName}] // 显示上传的文件列表
         }
       
      });
    },

    //删除小节
    removeVideo(videoId) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return video.removeById(videoId);
        })
        .then(() => {
          this.getChapterVideo(); // 刷新列表
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(response => {
          // 失败
          if (response === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          }
        });
    },

    helpSaveVideo() {
      this.dialogVideoFormVisible = false; // 如果保存成功则关闭对话框
      this.getChapterVideo(); // 刷新列表
      this.video.title = ""; // 重置章节标题
      this.video.sort = 0; // 重置章节标题
      this.video.videoSourceId = ""; // 重置视频资源id
      this.saveVideoBtnDisabled = false;
    },

    //成功回调
    handleVodUploadSuccess(response, file, fileList) {
      this.video.videoSourceId = response.data.videoSourceId;
      this.video.videoOriginalName = file.name;
    },
    //视图上传多于一个视频
    handleUploadExceed(files, fileList) {
      this.$message.warning("想要重新上传视频，请先删除已上传的视频");
    },

    //删除视频前的处理
    beforeVodRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    //删除视频后的处理
    handleVodRemove(file, fileList) {
      console.log(file);
      video.setOssVideoNull(this.nowVideoId).then(response => {
        this.$message({
          type: "success",
          message: "oss设置为空"
        })
      });

      vod.removeById(this.video.videoSourceId).then(response => {
        this.video.videoSourceId = ''
        this.video.videoOriginalName = ''
        this.fileList = []
        this.$message({
          type: "success",
          message: response.message
        });
      });
    }
  }
};
</script>

<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>