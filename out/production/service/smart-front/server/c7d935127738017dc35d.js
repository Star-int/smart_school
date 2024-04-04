exports.ids=[35],exports.modules={102:function(e,t,l){"use strict";l.r(t);var o=l(76),n=l(67),r=l(66),c=l(4),d=l.n(c),h={data:()=>({user:{},dialogVisible:!1,selectionCourse:{},SelectionsList:[],courseList:[],selectedCourse:[],page:1,limit:10,total:0,studentId:""}),created(){this.fetchData()},computed:{filteredCourseList(){return this.courseList.filter(e=>!this.isCourseSelected(e.title))}},methods:{fetchData(e=1){this.getUserInfo(),this.page=e,n.a.getAllCourse().then(e=>{this.courseList=e.data.data.list}),r.a.getStudentInfoByUserId(this.user.id).then(e=>{this.studentId=e.data.data.items.studentId,console.log("学生id为"+this.studentId),o.a.getSelectionPage(this.page,this.limit,this.studentId).then(e=>{this.SelectionsList=e.data.data.items.records,this.total=e.data.data.items.total})})},getUserInfo(){var e=d.a.get("guli_ucenter");if(e)try{this.user=JSON.parse(e),console.log("成功解析 JSON 数据")}catch(e){console.error("JSON 解析失败:",e)}},handleAdd(){this.selectionCourse.studentId=this.studentId,o.a.addSelection(this.selectionCourse).then(e=>{this.fetchData(this.page),this.dialogVisible=!1,this.$message({type:"success",message:"添加成功!"})})},handleCourseChange(){const e=this.courseList.find(e=>e.title===this.selectionCourse.courseName);e&&(this.selectionCourse.courseId=e.id,console.log("选中的课程ID是："+this.selectionCourse.courseId))},isCourseSelected(e){return this.SelectionsList.some(t=>t.courseName===e)},handleSelectionChange(e){this.selectedCourse=e},handleBatchDelete(){0!==this.selectedCourse.length?this.$confirm("此操作将永久删除这些信息，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{const e=this.selectedCourse.map(e=>e.id);o.a.deleteBrach(e).then(e=>{this.fetchData(this.page),this.$message({type:"success",message:"删除成功!"})}).catch(e=>{this.$message({type:"error",message:"删除失败!"})})}):this.$message({type:"warning",message:"请选择要删除的记录!"})},handleDelete(e){this.$confirm("此操作将永久删除这些信息，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{o.a.deteleSelection(e).then(e=>{this.fetchData(this.page),this.$message({type:"success",message:"删除成功!"})}).catch(e=>{this.$message({type:"error",message:"删除失败!"})})})}}},m=l(3);var component=Object(m.a)(h,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[e._ssrNode("<h1 data-v-03d73e94>选课中心</h1> "),l("el-button",{staticStyle:{height:"42px"},attrs:{type:"success",size:"mini",icon:"el-icon-plus"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("添加选课")]),e._ssrNode(" "),l("el-button",{attrs:{type:"danger"},on:{click:e.handleBatchDelete}},[e._v("批量删除")]),e._ssrNode(" "),l("el-table",{staticStyle:{width:"100%"},attrs:{data:e.SelectionsList,border:""},on:{"selection-change":e.handleSelectionChange}},[l("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),l("el-table-column",{attrs:{label:"序号",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("i",{staticClass:"el-icon"}),e._v(" "),l("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s((e.page-1)*e.limit+t.$index+1))])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"课程名称",width:"300",heght:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("router-link",{attrs:{to:"/course/"+t.row.courseId}},[l("el-button",{attrs:{type:"text"}},[e._v(e._s(t.row.courseName))])],1)]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(l){return e.handleDelete(t.row.id)}}},[e._v("删除")])]}}])})],1),e._ssrNode(" "),l("el-dialog",{attrs:{title:"",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[l("el-form",{ref:"courseForm",attrs:{model:e.selectionCourse,"label-width":"80px"}},[l("el-form-item",{attrs:{label:"课程id"}},[l("el-input",{staticStyle:{width:"180px"},attrs:{disabled:""},model:{value:e.selectionCourse.courseId,callback:function(t){e.$set(e.selectionCourse,"courseId",t)},expression:"selectionCourse.courseId"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"课程名称"}},[l("el-select",{attrs:{placeholder:"请选择课程名称",filterable:""},on:{change:e.handleCourseChange},model:{value:e.selectionCourse.courseName,callback:function(t){e.$set(e.selectionCourse,"courseName",t)},expression:"selectionCourse.courseName"}},e._l(e.filteredCourseList,(function(e){return l("el-option",{key:e.id,attrs:{label:e.title,value:e.title}})})),1)],1),e._v(" "),l("div",{staticStyle:{"margin-left":"200px"}},[l("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.handleAdd}},[e._v("确定")])],1)],1)],1),e._ssrNode(" "),l("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":e.page,"page-size":e.limit,total:parseInt(e.total),layout:"total, prev, pager, next, jumper"},on:{"current-change":e.fetchData}})],2)}),[],!1,(function(e){}),"03d73e94","688d4dd2");t.default=component.exports},66:function(e,t,l){"use strict";var o=l(12);const n="/application/student";t.a={getStudentInfoByUserId:e=>Object(o.a)({url:`${n}/getStudentInfoByUserId/${e}`,method:"get"}),addStudent:e=>Object(o.a)({url:`${n}/addStudent`,method:"post",data:e}),getUndefineStudent:()=>Object(o.a)({url:`${n}/getUndefineStuedentInfo`,method:"get"}),updateStudent:e=>Object(o.a)({url:`${n}/updateStudent`,method:"put",data:e})}},67:function(e,t,l){"use strict";var o=l(12);t.a={getPageList:(e,t,l)=>Object(o.a)({url:`/eduservice/course/getfrontCourseList/${e}/${t}`,method:"post",data:l}),getNestedTreeList2:()=>Object(o.a)({url:"/eduservice/subject/list",method:"get"}),getById:e=>Object(o.a)({url:`/eduservice/course/getfrontCourseByCourseId/${e}`,method:"get"}),getCollectList:(e,t,l)=>Object(o.a)({url:`/eduservice/course/searchCollectCourse/${e}/${t}`,method:"get",params:{userId:l}}),getAllCourse:()=>Object(o.a)({url:"/eduservice/course//getAllCourse",method:"get"})}},76:function(e,t,l){"use strict";var o=l(12);const n="/application/selection";t.a={getAllSelection:()=>Object(o.a)({url:`${n}/getAllSelection`,method:"get"}),getSelectionPage:(e,t,l)=>Object(o.a)({url:`${n}/getSelectionPage/${e}/${t}`,method:"get",params:{studentId:l}}),addSelection:e=>Object(o.a)({url:`${n}/addSelection`,method:"post",data:e}),updateSelection:e=>Object(o.a)({url:`${n}/updateStudent`,method:"put",data:e}),deteleSelection:e=>Object(o.a)({url:`${n}/deleteSelectionById/${e}`,method:"delete"}),deteleSelectionsByStudentId:e=>Object(o.a)({url:`${n}/deleteSelectionsByStudentId/${e}`,method:"delete"}),deleteBrachByStudentId:e=>Object(o.a)({url:`${n}/deleteSelectionsByStudentId`,method:"delete",data:e}),deleteBrach:e=>Object(o.a)({url:`${n}/deteleBrach`,method:"delete",data:e})}}};