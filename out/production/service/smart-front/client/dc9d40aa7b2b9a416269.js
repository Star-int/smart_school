(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{358:function(t,e,c){"use strict";var r=c(88),n="ucenterservice/collect";e.a={getCollectList:function(t){return Object(r.a)({url:"".concat(n,"/getCollectByUserId/").concat(t),method:"get"})},addCollect:function(t){return Object(r.a)({url:"".concat(n,"/addCollect"),method:"post",data:t})},deleteCollect:function(t){return Object(r.a)({url:"".concat(n,"/deleteCollect"),method:"delete",data:t})}}},360:function(t,e,c){"use strict";var r=c(88);e.a={getPageList:function(t,e,c){return Object(r.a)({url:"/eduservice/course/getfrontCourseList/".concat(t,"/").concat(e),method:"post",data:c})},getNestedTreeList2:function(){return Object(r.a)({url:"/eduservice/subject/list",method:"get"})},getById:function(t){return Object(r.a)({url:"/eduservice/course/getfrontCourseByCourseId/".concat(t),method:"get"})},getCollectList:function(t,e,c){return Object(r.a)({url:"/eduservice/course/searchCollectCourse/".concat(t,"/").concat(e),method:"get",params:{userId:c}})},getAllCourse:function(){return Object(r.a)({url:"/eduservice/course//getAllCourse",method:"get"})}}},449:function(t,e,c){t.exports=c.p+"img/2949467.gif"},450:function(t,e,c){var content=c(529);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,c(16).default)("5740095a",content,!0,{sourceMap:!1})},528:function(t,e,c){"use strict";var r=c(450);c.n(r).a},529:function(t,e,c){(e=c(15)(!1)).push([t.i,".iframe-container[data-v-6ed34480]{position:fixed;top:50px;left:100px;width:60%;height:100%;z-index:9999}.iframe-container iframe[data-v-6ed34480]{width:80%;height:70%}.close-button[data-v-6ed34480]{position:absolute;top:10px;right:10px}",""]),t.exports=e},545:function(t,e,c){"use strict";c.r(e);var r=[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"c-attr-mt of"},[e("span",{staticClass:"ml10 vam"},[e("em",{staticClass:"icon18 scIcon"}),this._v(" "),e("a",{staticClass:"c-fff vam",attrs:{title:"收藏",href:"#"}},[this._v("收藏")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("section",{staticClass:"c-infor-tabTitle c-tab-title",attrs:{id:"c-i-tabTitle"}},[e("a",{staticClass:"current",attrs:{name:"c-i",title:"课程详情"}},[this._v("课程详情")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h6",{staticClass:"c-i-content c-infor-title"},[e("span",[this._v("课程介绍")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"mt50"},[e("h6",{staticClass:"c-g-content c-infor-title"},[e("span",[this._v("课程大纲")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"fr"},[e("i",{staticClass:"free-icon vam mr10"},[this._v("立即观看")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"c-infor-tabTitle c-tab-title"},[e("a",{attrs:{title:"",href:"javascript:void(0)"}},[this._v("主讲讲师")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h6",{staticClass:"c-c-content c-infor-title",attrs:{id:"i-art-comment"}},[e("span",{staticClass:"commentTitle"},[this._v("课程评论")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("aside",{staticClass:"noter-pic"},[e("img",{staticClass:"picImg",attrs:{width:"50",height:"50",src:c(449)}})])}],n=c(360),o=c(88),l=function(t,e,c){return Object(o.a)({url:"/eduservice/comment/".concat(t,"/").concat(e),method:"get",params:{courseId:c}})},f=function(t){return Object(o.a)({url:"/eduservice/comment/auth/save",method:"post",data:t})},d=c(358),v=c(25),h=c.n(v),m={asyncData:function(t){var e=t.params;t.error;return n.a.getById(e.id).then((function(t){return console.log(t),{course:t.data.data.course,chapterList:t.data.data.chapterVoList,courseId:e.id}}))},data:function(){return{user:{},collectInfo:{},data:{},page:1,limit:4,total:10,comment:{content:"",courseId:""},courseInfo:{},chapterVideoList:[],isFavorite:!1,isbuyCourse:!1,showPlayer:!1,bilibiliVideoUrl:"//player.bilibili.com/player.html?aid=203821664&bvid=BV1fh411y7R8&cid=299710389&p=1&autoplay=0"}},created:function(){this.initCourseInfo(),this.initComment(),this.getUserInfo()},methods:{togglePlayer:function(){if(this.showPlayer=!this.showPlayer,null==this.user.id)return this.$message({type:"error",message:"请先登录"}),this.$router.push({path:"/login"}),!1},getUserInfo:function(){var t=h.a.get("guli_ucenter");if(t)try{this.user=JSON.parse(t),console.log("成功解析 JSON 数据")}catch(t){console.error("JSON 解析失败:",t)}},initCourseInfo:function(){var t=this;n.a.getById(this.courseId).then((function(e){t.courseInfo=e.data.data.course,t.chapterVideoList=e.data.data.chapterVideoList}))},initComment:function(){var t=this;l(this.page,this.limit,this.courseId).then((function(e){t.data=e.data.data}))},addComment:function(){var t=this;this.comment.courseId=this.courseId,this.comment.teacherId=this.courseInfo.teacherId,f(this.comment).then((function(e){e.data.success&&(t.comment.content="",t.initComment())}))},gotoPage:function(t){var e=this;l(t,this.limit,this.courseId).then((function(t){e.data=t.data.data}))},isLogin:function(){if(null==this.user.id)return this.$message({type:"error",message:"请先登录"}),this.$router.push({path:"/login"}),!1},toggleFavorite:function(){var t=this;if(this.collectInfo.courseId=this.courseId,this.collectInfo.userId=this.user.id,null==this.user.id)return this.$message({type:"error",message:"请先登录"}),this.$router.push({path:"/login"}),!1;d.a.addCollect(this.collectInfo).then((function(e){e.data.success?(t.isFavorite=!0,t.$message({type:"success",message:"收藏成功!"})):t.$message({type:"error",message:"收藏失败!"})}))}}},_=(c(528),c(19)),component=Object(_.a)(m,(function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",{staticClass:"bg-fa of",attrs:{id:"aCoursesList"}},[c("section",{staticClass:"container"},[c("section",{staticClass:"path-wrap txtOf hLh30"},[c("a",{staticClass:"c-999 fsize14",attrs:{href:"/",title:""}},[t._v("首页")]),t._v("\n      \\\n      "),c("a",{staticClass:"c-999 fsize14",attrs:{href:"/course",title:""}},[t._v("课程列表")]),t._v("\n      \\\n      "),c("span",{staticClass:"c-333 fsize14"},[t._v(t._s(t.course.subjectLevelOne))]),t._v("\n      \\\n      "),c("span",{staticClass:"c-333 fsize14"},[t._v(t._s(t.course.subjectLevelTwo))])]),t._v(" "),c("div",[c("article",{staticClass:"c-v-pic-wrap",staticStyle:{height:"357px"}},[c("section",{staticClass:"p-h-video-box",attrs:{id:"videoPlay"}},[c("img",{staticClass:"dis c-v-pic",attrs:{src:t.course.cover,alt:t.course.title}})])]),t._v(" "),c("aside",{staticClass:"c-attr-wrap"},[c("section",{staticClass:"ml20 mr15"},[c("h2",{staticClass:"hLh30 txtOf mt15"},[c("span",{staticClass:"c-fff fsize24"},[t._v(t._s(t.course.title))])]),t._v(" "),c("section",{staticClass:"c-attr-jg"},[c("span",{staticClass:"c-fff"},[t._v("价格：")]),t._v(" "),c("b",{staticClass:"c-yellow",staticStyle:{"font-size":"24px"}},[t._v("￥"+t._s(t.course.price))])]),t._v(" "),c("section",{staticClass:"c-attr-mt c-attr-undis"},[c("span",{staticClass:"c-fff fsize14"},[t._v("主讲： "+t._s(t.course.teacherName)+"   ")])]),t._v(" "),t._m(0),t._v(" "),c("section",{staticClass:"c-attr-mt"},[c("a",{staticClass:"comm-btn c-btn-3",attrs:{title:"立即观看"},on:{click:t.togglePlayer}},[t._v("立即观看")]),t._v(" "),c("a",{staticClass:"comm-btn c-btn-3",attrs:{title:"收藏课程"},on:{click:t.toggleFavorite}},[t._v("收藏课程")]),t._v(" "),t.showPlayer?c("div",{staticClass:"iframe-container"},[c("iframe",{attrs:{id:"bilibiliPlayer",src:t.bilibiliVideoUrl,scrolling:"no",border:"0",frameborder:"no",framespacing:"0",allowfullscreen:"true",width:"100%",height:"100%"}}),t._v(" "),c("el-button",{attrs:{type:"danger"},on:{click:t.togglePlayer}},[t._v("关闭视频")])],1):t._e()])])]),t._v(" "),c("aside",{staticClass:"thr-attr-box"},[c("ol",{staticClass:"thr-attr-ol clearfix"},[c("li",[c("p",[t._v(" ")]),t._v(" "),c("aside",[c("span",{staticClass:"c-fff f-fM"},[t._v("购买数")]),t._v(" "),c("br"),t._v(" "),c("h6",{staticClass:"c-fff f-fM mt10"},[t._v(t._s(t.course.buyCount))])])]),t._v(" "),c("li",[c("p",[t._v(" ")]),t._v(" "),c("aside",[c("span",{staticClass:"c-fff f-fM"},[t._v("课时数")]),t._v(" "),c("br"),t._v(" "),c("h6",{staticClass:"c-fff f-fM mt10"},[t._v(t._s(t.course.lessonNum))])])]),t._v(" "),c("li",[c("p",[t._v(" ")]),t._v(" "),c("aside",[c("span",{staticClass:"c-fff f-fM"},[t._v("浏览数")]),t._v(" "),c("br"),t._v(" "),c("h6",{staticClass:"c-fff f-fM mt10"},[t._v(t._s(t.course.viewCount))])])])])]),t._v(" "),c("div",{staticClass:"clear"})]),t._v(" "),c("div",{staticClass:"mt20 c-infor-box"},[c("article",{staticClass:"fl col-7"},[c("section",{staticClass:"mr30"},[c("div",{staticClass:"i-box"},[t._m(1),t._v(" "),c("article",{staticClass:"ml10 mr10 pt20"},[c("div",[t._m(2),t._v(" "),c("div",{staticClass:"course-txt-body-wrap"},[c("section",{staticClass:"course-txt-body"},[c("p",{domProps:{innerHTML:t._s(t.course.description)}})])])]),t._v(" "),t._m(3),t._v(" "),c("section",{staticClass:"mt20"},[c("div",{staticClass:"lh-menu-wrap"},[c("menu",{staticClass:"lh-menu mt10 mr10",attrs:{id:"lh-menu"}},[c("ul",t._l(t.chapterList,(function(e){return c("li",{key:e.id,staticClass:"lh-menu-stair"},[c("a",{staticClass:"current-1",attrs:{title:e.title,href:"javascript: void(0)"}},[c("em",{staticClass:"lh-menu-i-1 icon18 mr10"}),t._v("\n                          "+t._s(e.title)+"\n                        ")]),t._v(" "),c("ol",{staticClass:"lh-menu-ol",staticStyle:{display:"block"}},t._l(e.children,(function(video){return c("li",{key:video.id,staticClass:"lh-menu-second ml30"},[null!=t.user.id?c("a",{attrs:{href:"/player/"+video.videoSourceId}},[t._m(4,!0),t._v(" "),c("em",{staticClass:"lh-menu-i-2 icon16 mr5"},[t._v(" ")]),t._v("\n                              "+t._s(video.title)+"\n                            ")]):c("p",[t._v("登录之后才能观看此章节视频")])])})),0)])})),0)])])])])])])]),t._v(" "),c("aside",{staticClass:"fl col-3"},[c("div",{staticClass:"i-box"},[c("div",[t._m(5),t._v(" "),c("section",{staticClass:"stud-act-list"},[c("ul",{staticStyle:{height:"auto"}},[c("li",[c("div",{staticClass:"u-face"},[c("router-link",{attrs:{to:"/teacher/"+t.course.teacherId}},[c("img",{attrs:{src:t.course.avatar,width:"50",height:"50",alt:""}})])],1),t._v(" "),c("section",{staticClass:"hLh30 txtOf"},[c("a",{staticClass:"c-333 fsize16 fl",attrs:{href:"/teacher/"+t.course.teacherId,target:"_blank"}},[t._v(t._s(t.course.teacherName))])]),t._v(" "),c("section",{staticClass:"hLh20 txtOf"},[c("span",{staticClass:"c-999"},[t._v(t._s(t.course.intro))])])])])])])])]),t._v(" "),c("div",{staticClass:"clear"})])]),t._v(" "),c("div",{staticClass:"mt50 commentHtml"},[c("div",[t._m(6),t._v(" "),c("section",{staticClass:"lh-bj-list pr mt20 replyhtml"},[c("ul",[c("li",{staticClass:"unBr"},[t._m(7),t._v(" "),c("div",{staticClass:"of"},[c("section",{staticClass:"n-reply-wrap"},[c("fieldset",[c("textarea",{directives:[{name:"model",rawName:"v-model",value:t.comment.content,expression:"comment.content"}],attrs:{name:"",placeholder:"输入您要评论的文字",id:"commentContent"},domProps:{value:t.comment.content},on:{input:function(e){e.target.composing||t.$set(t.comment,"content",e.target.value)}}})]),t._v(" "),c("p",{staticClass:"of mt5 tar pl10 pr10"},[c("span",{staticClass:"fl "},[c("tt",{staticClass:"c-red commentContentmeg",staticStyle:{display:"none"}})],1),t._v(" "),c("input",{staticClass:"lh-reply-btn",attrs:{type:"button",value:"回复"},on:{click:function(e){return t.addComment()}}})])])])])])]),t._v(" "),c("section",{},[c("section",{staticClass:"question-list lh-bj-list pr"},[c("ul",{staticClass:"pr10"},t._l(t.data.items,(function(e,r){return c("li",{key:r},[c("aside",{staticClass:"noter-pic"},[c("img",{staticClass:"picImg",attrs:{width:"50",height:"50",src:e.avatar}})]),t._v(" "),c("div",{staticClass:"of"},[c("span",{staticClass:"fl"},[c("font",{staticClass:"fsize12 c-blue"},[t._v(" \n                    "+t._s(e.nickname))]),t._v(" "),c("font",{staticClass:"fsize12 c-999 ml5"},[t._v("评论：")])],1)]),t._v(" "),c("div",{staticClass:"noter-txt mt5"},[c("p",[t._v(t._s(e.content))])]),t._v(" "),c("div",{staticClass:"of mt5"},[c("span",{staticClass:"fr"},[c("font",{staticClass:"fsize12 c-999 ml5"},[t._v(t._s(e.gmtCreate))])],1)])])})),0)])]),t._v(" "),c("div",{staticClass:"paging"},[c("a",{class:{undisable:!t.data.hasPrevious},attrs:{href:"#",title:"首页"},on:{click:function(e){return e.preventDefault(),t.gotoPage(1)}}},[t._v("首")]),t._v(" "),c("a",{class:{undisable:!t.data.hasPrevious},attrs:{href:"#",title:"前一页"},on:{click:function(e){return e.preventDefault(),t.gotoPage(t.data.current-1)}}},[t._v("<")]),t._v(" "),t._l(t.data.pages,(function(e){return c("a",{key:e,class:{current:t.data.current==e,undisable:t.data.current==e},attrs:{title:"第"+e+"页",href:"#"},on:{click:function(c){return c.preventDefault(),t.gotoPage(e)}}},[t._v(t._s(e))])})),t._v(" "),c("a",{class:{undisable:!t.data.hasNext},attrs:{href:"#",title:"后一页"},on:{click:function(e){return e.preventDefault(),t.gotoPage(t.data.current+1)}}},[t._v(">")]),t._v(" "),c("a",{class:{undisable:!t.data.hasNext},attrs:{href:"#",title:"末页"},on:{click:function(e){return e.preventDefault(),t.gotoPage(t.data.pages)}}},[t._v("末")]),t._v(" "),c("div",{staticClass:"clear"})],2)])])])}),r,!1,null,"6ed34480",null);e.default=component.exports}}]);