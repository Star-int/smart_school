(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-50e1"],{"0oKk":function(e,t,i){},VTSi:function(e,t,i){"use strict";i.r(t);var o=i("t3Un"),s="/eduservice/chapter",a=function(e){return Object(o.a)({url:s+"/getChapterById/"+e,method:"get"})},n=function(e){return Object(o.a)({url:s+"/deleteById/"+e,method:"delete"})},r=function(e){return Object(o.a)({url:s+"/save",method:"post",data:e})},l=function(e){return Object(o.a)({url:s+"/getById/"+e,method:"get"})},d=function(e){return Object(o.a)({url:s+"/update",method:"post",data:e})},c=function(e){return Object(o.a)({url:"/eduservice/video/save",method:"post",data:e})},u=function(e){return Object(o.a)({url:"/eduservice/video/getVideoById/"+e,method:"get"})},h=function(e){return Object(o.a)({url:"/eduservice/video/updateVideoInfo/"+e.id,method:"put",data:e})},v=function(e){return Object(o.a)({url:"/eduservice/video/deleteById/"+e,method:"delete"})},p=function(e){return Object(o.a)({url:"/eduservice/video/setOssNull/"+e,method:"put"})},m=function(e){return Object(o.a)({url:"/vod/video/removeAlyVideo/"+e,method:"delete"})},f={data:function(){return{saveBtnDisabled:!1,dialogChapterFormVisible:!1,courseId:" ",chapterVideoList:[],saveVideoBtnDisabled:!1,dialogVideoFormVisible:!1,chapterId:"",activeName:1,fileList:[],BASE_API:"http://localhost:8222",nowVideoId:"",chapter:{title:"",sort:0},video:{title:"",sort:0,isFree:0,videoSourceId:"",videoOriginalName:""}}},created:function(){console.log("chapter created"),this.init()},methods:{getChapterVideo:function(){var e=this;a(this.courseId).then(function(t){e.chapterVideoList=t.data.allChapterVideo,console.log(e.chapterVideoList)})},init:function(){this.$route.params&&this.$route.params.id&&(this.courseId=this.$route.params.id,this.getChapterVideo())},previous:function(){console.log("previous"),this.$router.push({path:"/course/info/"+this.courseId})},next:function(){console.log("next"),this.$router.push({path:"/course/publish/"+this.courseId})},saveOrUpdate:function(){this.saveBtnDisabled=!0,this.chapter.id?this.updateData():this.saveData()},openAddChapterDialog:function(){this.dialogChapterFormVisible=!0,this.chapter.title="",this.chapter.sort=0,this.chapter.id=null},saveData:function(){var e=this;this.chapter.courseId=this.courseId,r(this.chapter).then(function(t){e.$message({type:"success",message:"保存成功!"}),e.helpSave()}).catch(function(t){e.$message({type:"error",message:t.message})})},editChapter:function(e){var t=this;this.dialogChapterFormVisible=!0,l(e).then(function(e){t.chapter=e.data.chapter})},updateData:function(){var e=this;d(this.chapter).then(function(t){e.$message({type:"success",message:"修改成功!"}),e.helpSave()}).catch(function(t){e.$message({type:"error",message:t.message})})},removeChapter:function(e){var t=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return n(e)}).then(function(){t.getChapterVideo(),t.$message({type:"success",message:"删除成功!"})}).catch(function(e){"cancel"===e?t.$message({type:"info",message:"已取消删除"}):t.$message({type:"error",message:e.message})})},helpSave:function(){this.dialogChapterFormVisible=!1,this.getChapterVideo(),this.chapter.title="",this.chapter.sort=0,this.saveBtnDisabled=!1},saveOrUpdateVideo:function(){this.saveVideoBtnDisabled=!0,this.video.id?this.updateDataVideo():this.saveDataVideo()},openVideo:function(){this.dialogVideoFormVisible=!0,this.video.title="",this.video.sort=0,this.video.isFree=0,this.video.videoSourceId="",this.video.videoOriginalName="",this.video.id=null,this.videoList={},this.videoList={}},saveDataVideo:function(){var e=this;this.video.courseId=this.courseId,this.video.chapterId=this.chapterId,c(this.video).then(function(t){e.$message({type:"success",message:"保存成功!"}),e.helpSaveVideo()})},updateDataVideo:function(){var e=this;h(this.video).then(function(t){e.$message({type:"success",message:"修改成功!"}),e.helpSaveVideo()})},editVideo:function(e){var t=this;this.dialogVideoFormVisible=!0,this.nowVideoId=e,u(e).then(function(e){t.video=e.data.item,""==t.video.videoSourceId?t.fileList=[]:t.fileList=[{name:t.video.videoOriginalName}]})},removeVideo:function(e){var t=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return v(e)}).then(function(){t.getChapterVideo(),t.$message({type:"success",message:"删除成功!"})}).catch(function(e){"cancel"===e&&t.$message({type:"info",message:"已取消删除"})})},helpSaveVideo:function(){this.dialogVideoFormVisible=!1,this.getChapterVideo(),this.video.title="",this.video.sort=0,this.video.videoSourceId="",this.saveVideoBtnDisabled=!1},handleVodUploadSuccess:function(e,t,i){this.video.videoSourceId=e.data.videoSourceId,this.video.videoOriginalName=t.name},handleUploadExceed:function(e,t){this.$message.warning("想要重新上传视频，请先删除已上传的视频")},beforeVodRemove:function(e,t){return this.$confirm("确定移除 "+e.name+"？")},handleVodRemove:function(e,t){var i=this;console.log(e),p(this.nowVideoId).then(function(e){i.$message({type:"success",message:"oss设置为空"})}),m(this.video.videoSourceId).then(function(e){i.video.videoSourceId="",i.video.videoOriginalName="",i.fileList=[],i.$message({type:"success",message:e.message})})}}},g=(i("oyw5"),i("KHd+")),b=Object(g.a)(f,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("h2",{staticStyle:{"text-align":"center"}},[e._v("发布新课程")]),e._v(" "),i("el-steps",{staticStyle:{"margin-bottom":"40px"},attrs:{active:2,"process-status":"wait","align-center":""}},[i("el-step",{attrs:{title:"填写课程基本信息"}}),e._v(" "),i("el-step",{attrs:{title:"创建课程大纲"}}),e._v(" "),i("el-step",{attrs:{title:"提交审核"}})],1),e._v(" "),i("el-dialog",{attrs:{visible:e.dialogChapterFormVisible,title:"添加章节"},on:{"update:visible":function(t){e.dialogChapterFormVisible=t}}},[i("el-form",{attrs:{model:e.chapter,"label-width":"120px"}},[i("el-form-item",{attrs:{label:"章节标题"}},[i("el-input",{model:{value:e.chapter.title,callback:function(t){e.$set(e.chapter,"title",t)},expression:"chapter.title"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"章节排序"}},[i("el-input-number",{attrs:{min:0,"controls-position":"right"},model:{value:e.chapter.sort,callback:function(t){e.$set(e.chapter,"sort",t)},expression:"chapter.sort"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogChapterFormVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.saveOrUpdate}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{attrs:{visible:e.dialogVideoFormVisible,title:"添加课时"},on:{"update:visible":function(t){e.dialogVideoFormVisible=t}}},[i("el-form",{attrs:{model:e.video,"label-width":"120px"}},[i("el-form-item",{attrs:{label:"课时标题"}},[i("el-input",{model:{value:e.video.title,callback:function(t){e.$set(e.video,"title",t)},expression:"video.title"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"课时排序"}},[i("el-input-number",{attrs:{min:0,"controls-position":"right"},model:{value:e.video.sort,callback:function(t){e.$set(e.video,"sort",t)},expression:"video.sort"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"是否免费"}},[i("el-radio-group",{model:{value:e.video.isFree,callback:function(t){e.$set(e.video,"isFree",t)},expression:"video.isFree"}},[i("el-radio",{attrs:{label:!0}},[e._v("免费")]),e._v(" "),i("el-radio",{attrs:{label:!1}},[e._v("默认")])],1)],1),e._v(" "),i("el-form-item",{attrs:{label:"上传视频"}},[i("el-upload",{staticClass:"upload-demo",attrs:{"on-success":e.handleVodUploadSuccess,"on-remove":e.handleVodRemove,"before-remove":e.beforeVodRemove,"on-exceed":e.handleUploadExceed,"file-list":e.fileList,action:e.BASE_API+"/vod/video/uploadAlyiVideo",limit:1}},[i("el-button",{attrs:{size:"small",type:"primary"}},[e._v("上传视频")]),e._v(" "),i("el-tooltip",{attrs:{placement:"right-end"}},[i("div",{attrs:{slot:"content"},slot:"content"},[e._v("\n              最大支持1G，\n              "),i("br"),e._v("支持3GP、ASF、AVI、DAT、DV、FLV、F4V、\n              "),i("br"),e._v("GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、\n              "),i("br"),e._v("MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、\n              "),i("br"),e._v("SWF、TS、VOB、WMV、WEBM 等视频格式上传\n            ")]),e._v(" "),i("i",{staticClass:"el-icon-question"})])],1)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogVideoFormVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{disabled:e.saveVideoBtnDisabled,type:"primary"},on:{click:e.saveOrUpdateVideo}},[e._v("确 定")])],1)],1),e._v(" "),i("el-button",{attrs:{type:"text"},on:{click:e.openAddChapterDialog}},[e._v("添加章节")]),e._v(" "),i("ul",{staticClass:"chanpterList"},e._l(e.chapterVideoList,function(t){return i("li",{key:t.id},[i("el-collapse",{attrs:{accordion:""},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[i("el-collapse-item",{attrs:{title:t.title}},[i("p",[e._v("\n            "+e._s(t.title)+"\n            "),i("span",{staticClass:"acts"},[i("el-button",{attrs:{type:"text"},on:{click:function(i){e.openVideo(),e.chapterId=t.id}}},[e._v("添加课时")]),e._v(" "),i("el-button",{attrs:{type:"text"},on:{click:function(i){e.editChapter(t.id)}}},[e._v("编辑")]),e._v(" "),i("el-button",{attrs:{type:"text"},on:{click:function(i){e.removeChapter(t.id)}}},[e._v("删除")])],1)]),e._v(" "),i("ul",{staticClass:"chanpterList videoList"},e._l(t.children,function(t){return i("li",{key:t.id},[i("p",[e._v("\n                "+e._s(t.title)+"\n                "),i("span",{staticClass:"acts"},[i("el-button",{attrs:{type:"text"},on:{click:function(i){e.editVideo(t.id)}}},[e._v("编辑")]),e._v(" "),i("el-button",{attrs:{type:"text"},on:{click:function(i){e.removeVideo(t.id)}}},[e._v("删除")])],1)])])}))])],1)],1)})),e._v(" "),i("div",[i("el-button",{on:{click:e.previous}},[e._v("上一步")]),e._v(" "),i("el-button",{attrs:{disabled:e.saveBtnDisabled,type:"primary"},on:{click:e.next}},[e._v("下一步")])],1)],1)},[],!1,null,"959fced8",null);b.options.__file="chapter.vue";t.default=b.exports},oyw5:function(e,t,i){"use strict";var o=i("0oKk");i.n(o).a}}]);