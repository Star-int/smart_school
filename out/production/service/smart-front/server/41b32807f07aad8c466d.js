exports.ids=[4],exports.modules={262:function(t,e,o){"use strict";o.r(e);var r=o(76),l=o(67),d=o(66),n=o(4),c=o.n(n),h={data:()=>({user:{},selectionCourse:{},SelectionsList:[],courseList:[],coursePageList:[],page:1,limit:6,total:0,studentId:"",searchObj:{}}),created(){this.fetchData()},computed:{filteredCourseList(){return this.courseList.filter(t=>!this.isCourseSelected(t.title))}},methods:{fetchData(t=1){if(this.getUserInfo(),null==this.user.id)return this.$message({type:"error",message:"请先登录"}),this.$router.push({path:"/login"}),!1;this.page=t,l.a.getAllCourse().then(t=>{this.courseList=t.data.data.list}),l.a.getPageList(this.page,this.limit,this.searchObj).then(t=>{this.coursePageList=t.data.data.items,this.total=t.data.data.total,console.log("课程列表为"+JSON.stringify(t.data)),console.log("总记录数为"+this.total)}),d.a.getStudentInfoByUserId(this.user.id).then(t=>{this.studentId=t.data.data.items.studentId,console.log("学生id为"+this.studentId)})},getUserInfo(){var t=c.a.get("guli_ucenter");if(t)try{this.user=JSON.parse(t),console.log("成功解析 JSON 数据")}catch(t){console.error("JSON 解析失败:",t)}},handleAdd(t,title){this.$confirm("是否选择该课程","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.selectionCourse.courseId=t,this.selectionCourse.courseName=title,this.selectionCourse.studentId=this.studentId,r.a.addSelection(this.selectionCourse).then(t=>{2e4==t.data.code&&this.$message({type:"success",message:"选课成功"})})})}}},m=o(3);var component=Object(m.a)(h,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[t._ssrNode("<h1 data-v-06a61cf8>选课中心</h1> "),o("router-link",{attrs:{to:"/application/application"}},[o("el-button",{staticStyle:{height:"42px"},attrs:{type:"primary",size:"mini"}},[t._v("返回")])],1),t._ssrNode(" "),o("el-table",{staticStyle:{width:"100%"},attrs:{data:t.coursePageList,border:""}},[o("el-table-column",{attrs:{label:"序号",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("i",{staticClass:"el-icon"}),t._v(" "),o("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s((t.page-1)*t.limit+e.$index+1))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"课程名称",width:"300",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("router-link",{staticStyle:{"text-decoration":"none",color:"#409EFF"},attrs:{to:"/course/"+e.row.id}},[t._v(t._s(e.row.title))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"课程图片",width:"300",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(t){return[o("router-link",{staticStyle:{"text-decoration":"none",color:"#409EFF"},attrs:{to:"/course/"+t.row.id}},[o("img",{attrs:{src:t.row.cover,alt:"课程图片",width:"100%",height:"100%"}})])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"发布时间",width:"300",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.gmtCreate))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(o){return t.handleAdd(e.row.id,e.row.title)}}},[t._v("选择该课")])]}}])})],1),t._ssrNode(" "),o("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":t.page,"page-size":t.limit,total:parseInt(t.total),layout:"total, prev, pager, next, jumper"},on:{"current-change":t.fetchData}})],2)}),[],!1,(function(t){}),"06a61cf8","799ceaa7");e.default=component.exports},66:function(t,e,o){"use strict";var r=o(12);const l="/application/student";e.a={getStudentInfoByUserId:t=>Object(r.a)({url:`${l}/getStudentInfoByUserId/${t}`,method:"get"}),addStudent:t=>Object(r.a)({url:`${l}/addStudent`,method:"post",data:t}),getUndefineStudent:()=>Object(r.a)({url:`${l}/getUndefineStuedentInfo`,method:"get"}),updateStudent:t=>Object(r.a)({url:`${l}/updateStudent`,method:"put",data:t})}},67:function(t,e,o){"use strict";var r=o(12);e.a={getPageList:(t,e,o)=>Object(r.a)({url:`/eduservice/course/getfrontCourseList/${t}/${e}`,method:"post",data:o}),getNestedTreeList2:()=>Object(r.a)({url:"/eduservice/subject/list",method:"get"}),getById:t=>Object(r.a)({url:`/eduservice/course/getfrontCourseByCourseId/${t}`,method:"get"}),getCollectList:(t,e,o)=>Object(r.a)({url:`/eduservice/course/searchCollectCourse/${t}/${e}`,method:"get",params:{userId:o}}),getAllCourse:()=>Object(r.a)({url:"/eduservice/course//getAllCourse",method:"get"})}},76:function(t,e,o){"use strict";var r=o(12);const l="/application/selection";e.a={getAllSelection:()=>Object(r.a)({url:`${l}/getAllSelection`,method:"get"}),getSelectionPage:(t,e,o)=>Object(r.a)({url:`${l}/getSelectionPage/${t}/${e}`,method:"get",params:{studentId:o}}),addSelection:t=>Object(r.a)({url:`${l}/addSelection`,method:"post",data:t}),updateSelection:t=>Object(r.a)({url:`${l}/updateStudent`,method:"put",data:t}),deteleSelection:t=>Object(r.a)({url:`${l}/deleteSelectionById/${t}`,method:"delete"}),deteleSelectionsByStudentId:t=>Object(r.a)({url:`${l}/deleteSelectionsByStudentId/${t}`,method:"delete"}),deleteBrachByStudentId:t=>Object(r.a)({url:`${l}/deleteSelectionsByStudentId`,method:"delete",data:t}),deleteBrach:t=>Object(r.a)({url:`${l}/deteleBrach`,method:"delete",data:t})}}};