(window.webpackJsonp=window.webpackJsonp||[]).push([[39,31,32,33,34,35],{357:function(t,e,o){"use strict";var n=o(88);e.a={getGoodsPage:function(t,e,o){return Object(n.a)({url:"flea/goods/getGoodsFrontPage/".concat(t,"/").concat(e),method:"get",params:o})},getBanner:function(){return Object(n.a)({url:"flea/banner/getCarousel",method:"get"})},getAllGoods:function(){return Object(n.a)({url:"flea/goods/getAllGoods",method:"get"})},getGoodsById:function(t){return Object(n.a)({url:"flea/goods/getGoodsById/".concat(t),method:"get"})},getGoodsByCategory:function(t){return Object(n.a)({url:"flea/goods/getGoodsByCategory",method:"get",params:{category:t}})},getSellerInfoBySellerId:function(t){return Object(n.a)({url:"ucenterservice/apimember/getSellerInfo/".concat(t),method:"post"})},getSellingGoodsPage:function(t,e,o){return Object(n.a)({url:"flea/goods/getSellingGoodsPage/".concat(t,"/").concat(e),method:"get",params:{sellerId:o}})},getGoodsCollect:function(t,e,o){return Object(n.a)({url:"flea/goods/getGoodsCollect/".concat(t,"/").concat(e),method:"get",params:{userId:o}})}}},358:function(t,e,o){"use strict";var n=o(88),r="ucenterservice/collect";e.a={getCollectList:function(t){return Object(n.a)({url:"".concat(r,"/getCollectByUserId/").concat(t),method:"get"})},addCollect:function(t){return Object(n.a)({url:"".concat(r,"/addCollect"),method:"post",data:t})},deleteCollect:function(t){return Object(n.a)({url:"".concat(r,"/deleteCollect"),method:"delete",data:t})}}},359:function(t,e,o){"use strict";var n=o(88);e.a={getPartTimeJob:function(){return Object(n.a)({url:"/recuit/partTime/getAllInfo",method:"get"})},getById:function(t){return Object(n.a)({url:"/recuit/partTime/getInfoById/".concat(t),method:"get",params:t})},getRecruitInfo:function(){return Object(n.a)({url:"/recuit/recruitment/getAllInfo",method:"get"})},getRecruitInfoById:function(t){return Object(n.a)({url:"/recuit/recruitment/getRecruitInfoById/".concat(t),method:"get"})},getCompanyInfo:function(t){return Object(n.a)({url:"/recuit/recruitmentCompany/getCompanyInfoById/".concat(t),method:"get"})},getParttimePage:function(t,e,o){return Object(n.a)({url:"/recuit/partTime/getPartimePage/".concat(t,"/").concat(e),method:"get",params:o})},getRecruitmentPage:function(t,e,o){return Object(n.a)({url:"/recuit/recruitment/getRecruitmentPage/".concat(t,"/").concat(e),method:"get",params:o})},getCollectRecruit:function(t,e,o){return Object(n.a)({url:"/recuit/recruitment/getCollectRecruit/".concat(t,"/").concat(e),method:"get",params:{userId:o}})},getWebList:function(){return Object(n.a)({url:"/recuit/recruitment/getWebList",method:"get"})}}},363:function(t,e,o){var content=o(410);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(16).default)("67e9ccf0",content,!0,{sourceMap:!1})},364:function(t,e,o){"use strict";var n=o(88),r="/flea/goods/";e.a={getAllGoods:function(){return Object(n.a)({url:"".concat(r,"/getAllGoods"),method:"get"})},getGoodsPage:function(t,e,o){return Object(n.a)({url:"".concat(r,"/getGoodsFrontPage/").concat(t,"/").concat(e),method:"get",params:o})},addGoods:function(t){return Object(n.a)({url:"".concat(r,"/addGoods"),method:"post",data:t})},updateGoods:function(t){return Object(n.a)({url:"".concat(r,"/updateGoods"),method:"put",data:t})},getGoodsById:function(t){return Object(n.a)({url:"".concat(r,"/getGoodsById/").concat(t),method:"get"})},deleteGoods:function(t){return Object(n.a)({url:"".concat(r,"/deleteGoodsById/").concat(t),method:"delete"})},getGoodsFrontPage:function(t,e,o){return Object(n.a)({url:"".concat(r,"/getGoodsUserPage/").concat(t,"/").concat(e),method:"get",params:{sellerId:o}})},upOrDownGoods:function(t,e){return Object(n.a)({url:"".concat(r,"/upOrDownGoods"),method:"put",params:{goodsId:t,status:e}})}}},365:function(t,e,o){var content=o(412);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(16).default)("218304ca",content,!0,{sourceMap:!1})},366:function(t,e,o){"use strict";var n=o(88),r="/recuit/recruitmentCompany";e.a={getCompanyList:function(){return Object(n.a)({url:"".concat(r,"/getCompanyList"),method:"get"})},getCompanyJobList:function(t){return Object(n.a)({url:"".concat(r,"/getRecruitmentsById/").concat(t),method:"get"})}}},367:function(t,e,o){var content=o(414);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(16).default)("13b9c95a",content,!0,{sourceMap:!1})},370:function(t,e,o){"use strict";var n=o(88);e.a={updateUserInfo:function(t){return Object(n.a)({url:"/ucenterservice/apimember/updateUserInfo",method:"put",data:t})},getSellerList:function(){return Object(n.a)({url:"/ucenterservice/apimember/getAllucenter",method:"get"})},updatePassword:function(t){return Object(n.a)({url:"/ucenterservice/apimember/updatePassword",method:"put",data:t})}}},379:function(t,e,o){"use strict";var n=o(88),r="/recuit/recruitmentResume";e.a={getResumePage:function(t,e,o){return Object(n.a)({url:"".concat(r,"/getAllResumePage/").concat(t,"/").concat(e),method:"get",params:o})},deleteResumeById:function(t){return Object(n.a)({url:"".concat(r,"/deteleById/").concat(t),method:"delete"})},addResume:function(t){return Object(n.a)({url:"".concat(r,"/addResume"),method:"post",data:t})},updateResume:function(t){return Object(n.a)({url:"".concat(r,"/updateResume"),method:"put",data:t})},getUserResume:function(t,e,o){return Object(n.a)({url:"".concat(r,"/getResumePageByUserId/").concat(t,"/").concat(e,"/").concat(o),method:"get"})}}},388:function(t,e,o){"use strict";o.r(e);var n=o(360),r=o(358),l=o(25),c=o.n(l),d={data:function(){return{list:[],user:{},collectInfo:{},page:1,limit:6,total:0}},created:function(){this.getUserInfo(),this.fetchData()},methods:{fetchData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.page=e,n.a.getCollectList(this.page,this.limit,this.user.id).then((function(e){t.list=e.data.data.items.records,t.total=e.data.data.items.total}))},getUserInfo:function(){var t=c.a.get("guli_ucenter");if(t)try{this.user=JSON.parse(t)}catch(t){console.error("JSON 解析失败:",t)}},removeDataById:function(t){var e=this;this.collectInfo.courseId=t,this.collectInfo.userId=this.user.id,r.a.deleteCollect(this.collectInfo).then((function(t){e.$message({type:"success",message:"取消收藏成功"}),e.fetchData(e.page,e.limit,e.user.id)})).catch((function(t){console.error(t),e.$message({type:"error",message:"取消收藏失败"})}))}}},f=o(19),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"page-container"},[o("h1",[t._v("我的课程收藏")]),t._v(" "),o("el-table",{attrs:{data:t.list,border:"",fit:"","highlight-current-row":"","row-class-name":"myClassList"}},[o("el-table-column",{attrs:{label:"序号",width:"70",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s((t.page-1)*t.limit+e.$index+1))]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"课程信息",width:"470",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("div",{staticClass:"info"},[o("div",{staticClass:"pic"},[o("router-link",{attrs:{to:"/course/"+e.row.id}},[o("img",{attrs:{src:e.row.cover,alt:"scope.row.title",width:"150px"}})])],1),t._v(" "),o("div",{staticClass:"title"},[o("a",[t._v(t._s(e.row.title))]),t._v(" "),o("p",[t._v(t._s(e.row.lessonNum)+"课时")])])])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"操作",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{staticStyle:{width:"98px"},attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(o){return t.removeDataById(e.row.id)}}},[t._v("取消收藏")])]}}])})],1),t._v(" "),o("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":t.page,"page-size":t.limit,total:t.total,layout:"total, prev, pager, next, jumper"},on:{"current-change":t.fetchData}})],1)}),[],!1,null,null,null);e.default=component.exports},389:function(t,e,o){"use strict";o.r(e);var n=o(359),r=o(358),l=o(25),c=o.n(l),d={data:function(){return{list:[],user:{},collectInfo:{},page:1,limit:6,total:0}},created:function(){this.getUserInfo(),this.fetchData()},methods:{fetchData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.page=e,n.a.getCollectRecruit(this.page,this.limit,this.user.id).then((function(e){t.list=e.data.data.items.records,t.total=e.data.data.items.total,console.log(JSON.stringify(t.list))}))},getUserInfo:function(){var t=c.a.get("guli_ucenter");if(t)try{this.user=JSON.parse(t)}catch(t){console.error("JSON 解析失败:",t)}},removeDataById:function(t){var e=this;this.collectInfo.recruitmentId=t,this.collectInfo.userId=this.user.id,r.a.deleteCollect(this.collectInfo).then((function(t){e.$message({type:"success",message:"取消收藏成功"}),e.fetchData(e.page,e.limit,e.user.id)})).catch((function(t){console.error(t),e.$message({type:"error",message:"取消收藏失败"})}))}}},f=o(19),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"page-container"},[o("h1",[t._v("我的岗位收藏")]),t._v(" "),o("el-table",{attrs:{data:t.list,border:"",fit:"","highlight-current-row":"","row-class-name":"myClassList"}},[o("el-table-column",{attrs:{label:"序号",width:"70",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s((t.page-1)*t.limit+e.$index+1))]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"公司图片",width:"200",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[o("div",{staticClass:"info"},[o("div",{staticClass:"pic"},[o("router-link",{attrs:{to:"/recuit/"+t.row.id}},[o("img",{attrs:{src:t.row.companyLogo,alt:"scope.row.title",width:"150px"}})])],1)])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"岗位",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.positionName))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"工资",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.salary))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"公司名称",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.companyName))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"招聘状态",width:"100",height:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?o("span",{staticStyle:{color:"green"}},[t._v("招聘中")]):o("span",{staticStyle:{color:"red"}},[t._v("招聘完")])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"操作",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{staticStyle:{width:"98px"},attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(o){return t.removeDataById(e.row.id)}}},[t._v("取消收藏")])]}}])})],1),t._v(" "),o("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":t.page,"page-size":t.limit,total:t.total,layout:"total, prev, pager, next, jumper"},on:{"current-change":t.fetchData}})],1)}),[],!1,null,null,null);e.default=component.exports},390:function(t,e,o){"use strict";o.r(e);var n=o(357),r=o(358),l=o(25),c=o.n(l),d={data:function(){return{list:[],user:{},collectInfo:{},page:1,limit:4,total:0}},created:function(){this.getUserInfo(),this.fetchData()},methods:{fetchData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.page=e,n.a.getGoodsCollect(this.page,this.limit,this.user.id).then((function(e){t.list=e.data.data.items.records,t.total=e.data.data.items.total,console.log(JSON.stringify(t.list))}))},getUserInfo:function(){var t=c.a.get("guli_ucenter");if(t)try{this.user=JSON.parse(t)}catch(t){console.error("JSON 解析失败:",t)}},removeDataById:function(t){var e=this;this.collectInfo.goodsId=t,this.collectInfo.userId=this.user.id,r.a.deleteCollect(this.collectInfo).then((function(t){e.$message({type:"success",message:"取消收藏成功"}),e.fetchData(e.page,e.limit,e.user.id)})).catch((function(t){console.error(t),e.$message({type:"error",message:"取消收藏失败"})}))}}},f=o(19),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"page-container"},[o("h1",[t._v("我的商品收藏")]),t._v(" "),o("el-table",{attrs:{data:t.list,border:"",fit:"","highlight-current-row":"","row-class-name":"myClassList"}},[o("el-table-column",{attrs:{label:"序号",width:"70",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s((t.page-1)*t.limit+e.$index+1))]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"商品图片",width:"200",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[o("div",{staticClass:"info"},[o("div",{staticClass:"pic"},[o("router-link",{attrs:{to:"/flea/"+t.row.id}},[o("img",{attrs:{src:t.row.cover,alt:"scope.row.title",width:"150px"}})])],1)])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"商品名称",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.productName))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"分类",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.category))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"价格",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v("￥"+t._s(e.row.price))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"状态",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.status?"上架":"下架"))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"操作",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{staticStyle:{width:"98px"},attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(o){return t.removeDataById(e.row.id)}}},[t._v("取消收藏")])]}}])})],1),t._v(" "),o("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":t.page,"page-size":t.limit,total:t.total,layout:"total, prev, pager, next, jumper"},on:{"current-change":t.fetchData}})],1)}),[],!1,null,null,null);e.default=component.exports},409:function(t,e,o){"use strict";var n=o(363);o.n(n).a},410:function(t,e,o){(e=o(15)(!1)).push([t.i,".el-form-item__label[data-v-09e12200]{font-weight:700}.el-upload[data-v-09e12200]{border-radius:50%}.avatar-uploader .el-upload[data-v-09e12200]{border:1px dashed #d9d9d9;cursor:pointer;position:relative;overflow:hidden;border-radius:50%}.avatar-uploader .el-upload[data-v-09e12200]:hover{border-color:#409eff}.avatar-uploader-icon[data-v-09e12200]{font-size:28px;color:#8c939d;line-height:120px;text-align:center}.avatar[data-v-09e12200],.avatar-uploader-icon[data-v-09e12200]{width:120px;height:120px;border-radius:50%}.avatar[data-v-09e12200]{display:block}",""]),t.exports=e},411:function(t,e,o){"use strict";var n=o(365);o.n(n).a},412:function(t,e,o){(e=o(15)(!1)).push([t.i,".app-container{justify-content:center;margin-left:200px;margin-top:-70px;width:100%}.description-container{width:180px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.description-text{cursor:pointer}",""]),t.exports=e},413:function(t,e,o){"use strict";var n=o(367);o.n(n).a},414:function(t,e,o){(e=o(15)(!1)).push([t.i,".app-container[data-v-d09eff22]{margin-top:-60px}",""]),t.exports=e},418:function(t,e,o){var content=o(498);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(16).default)("cbbc1250",content,!0,{sourceMap:!1})},456:function(t,e,o){"use strict";o.r(e);o(192);var n=o(25),r=o.n(n),l=o(370),c={data:function(){return{user:{avatar:"https://guili-wenjian.oss-cn-guangzhou.aliyuncs.com/avatar/keli.jpeg"},dialogVisible:!1,newPassword:"",confirmPassword:"",confirmPasswordRules:[{validator:this.validateConfirmPassword,trigger:"blur"}]}},created:function(){this.showInfo()},mounted:function(){var t=this;this.$nextTick((function(){console.log(t.$refs.formRef)}))},methods:{showInfo:function(){var t=r.a.get("guli_ucenter");if(t)try{this.user=JSON.parse(t),console.log("成功解析 JSON 数据"),console.log(JSON.stringify(this.user.nickname))}catch(t){console.error("JSON 解析失败:",t)}},update:function(){var t=this;l.a.updateUserInfo(this.user).then((function(e){t.$message.success("保存成功"),r.a.set("guli_ucenter",JSON.stringify(t.user),{domain:"localhost"}),t.showInfo()})).catch((function(t){console.log(t.message)}))},validateConfirmPassword:function(t,e,o){""===this.confirmPassword?o(new Error("请再次输入密码")):this.confirmPassword!==this.newPassword?o(new Error("两次输入密码不一致")):o()},handleAvatarSuccess:function(t){var e=t.split("\\").pop();this.user.avatar="http://localhost:9528/src/static/img/userAvatar/"+e,console.log("图片名称:",e)},openDiag:function(){this.dialogVisible=!0},updatePassword:function(){var t=this;l.a.updatePassword(this.user).then((function(e){t.$message.success("密码修改成功，请重新登录！"),r.a.set("guli_token","",{domain:"localhost"}),r.a.set("guli_ucenter","",{domain:"localhost"}),t.$router.push({path:"/login"})})).catch((function(e){console.log(e.message),t.$message.error("密码修改失败！"),t.dialogVisible=!1,t.newPassword="",t.confirmPassword="",t.$refs.formRef.resetFields()}))},save:function(){var t=this;this.$refs.formRef.validate((function(e){if(!e)return!1;t.user.password=t.newPassword,t.updatePassword(),t.dialogVisible=!1}))}}},d=(o(409),o(19)),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"app-container"},[o("el-card",[o("el-form",{staticStyle:{"padding-left":"300px",width:"50%"},attrs:{model:t.user,"label-width":"80px"}},[o("div",{staticStyle:{margin:"15px","text-align":"center"}},[o("el-upload",{staticClass:"upload-demo",attrs:{action:"http://localhost:8222/ucenterservice/upload/avatar","on-success":t.handleAvatarSuccess,"show-file-list":!1,limit:20971520}},[t.user.avatar?o("img",{staticClass:"avatar",attrs:{src:t.user.avatar}}):t._e()])],1),t._v(" "),o("el-form-item",{attrs:{label:"用户名",prop:"mobile"}},[o("el-input",{attrs:{placeholder:"用户名",disabled:""},model:{value:t.user.mobile,callback:function(e){t.$set(t.user,"mobile",e)},expression:"user.mobile"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"姓名",prop:"nickname"}},[o("el-input",{attrs:{placeholder:"姓名"},model:{value:t.user.nickname,callback:function(e){t.$set(t.user,"nickname",e)},expression:"user.nickname"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"电话",prop:"mobile"}},[o("el-input",{attrs:{placeholder:"电话"},model:{value:t.user.mobile,callback:function(e){t.$set(t.user,"mobile",e)},expression:"user.mobile"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"地址",prop:"address"}},[o("el-input",{attrs:{placeholder:"地址"},model:{value:t.user.address,callback:function(e){t.$set(t.user,"address",e)},expression:"user.address"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"个性签名",prop:"sign"}},[o("el-input",{attrs:{type:"text",placeholder:"个性签名"},model:{value:t.user.sign,callback:function(e){t.$set(t.user,"sign",e)},expression:"user.sign"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"年龄",prop:"age"}},[o("el-input",{attrs:{placeholder:"年龄"},model:{value:t.user.age,callback:function(e){t.$set(t.user,"age",e)},expression:"user.age"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"性别",prop:"sex"}},[o("el-radio-group",{model:{value:t.user.sex,callback:function(e){t.$set(t.user,"sex",e)},expression:"user.sex"}},[o("el-radio",{attrs:{label:"1"}},[t._v("男")]),t._v(" "),o("el-radio",{attrs:{label:"2"}},[t._v("女")])],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"微信",prop:"openid"}},[o("el-input",{attrs:{placeholder:"微信"},model:{value:t.user.openid,callback:function(e){t.$set(t.user,"openid",e)},expression:"user.openid"}})],1),t._v(" "),o("div",{staticStyle:{"text-align":"center","margin-bottom":"20px"}},[o("el-button",{attrs:{type:"danger"},on:{click:t.openDiag}},[t._v("修改密码")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.update}},[t._v("保 存")])],1)],1)],1),t._v(" "),o("el-dialog",{attrs:{title:"修改密码",visible:t.dialogVisible,width:"30%","close-on-click-modal":!1,"destroy-on-close":""},on:{"update:visible":function(e){t.dialogVisible=e}}},[o("el-form",{ref:"formRef",staticStyle:{"padding-right":"20px"},attrs:{model:t.user,"label-width":"80px"}},[o("el-form-item",{attrs:{label:"新密码",prop:"newPassword"}},[o("el-input",{attrs:{"show-password":"",placeholder:"新密码"},model:{value:t.newPassword,callback:function(e){t.newPassword=e},expression:"newPassword"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"确认密码",prop:"confirmPassword",rules:t.confirmPasswordRules}},[o("el-input",{attrs:{"show-password":"",placeholder:"确认密码"},model:{value:t.confirmPassword,callback:function(e){t.confirmPassword=e},expression:"confirmPassword"}})],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v("确 定")])],1)],1)],1)}),[],!1,null,"09e12200",null);e.default=component.exports},457:function(t,e,o){"use strict";o.r(e);var n=o(364),r=o(25),l=o.n(r),c={data:function(){return{goodsList:[],user:{},searchObj:{productName:"",price:"",category:""},page:1,limit:6,total:""}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.getUserInfo(),this.page=e,console.log(this.page),console.log(this.limit),n.a.getGoodsFrontPage(this.page,this.limit,this.user.id).then((function(e){t.goodsList=e.data.data.items.records,t.total=e.data.data.items.total,console.log(JSON.stringify(t.goodsList))})).catch((function(t){console.log(t)}))},getUserInfo:function(){var t=l.a.get("guli_ucenter");if(t)try{this.user=JSON.parse(t),this.goodsList.sellerId=this.user.id,console.log("成功解析 JSON 数据")}catch(t){console.error("JSON 解析失败:",t)}},handleChangeStatus:function(t,e){var o=this;n.a.upOrDownGoods(t,e).then((function(t){!0===e?o.$message({type:"success",message:"上架成功"}):o.$message({type:"success",message:"下架成功"})}))},resetData:function(){this.searchObj={productName:"",price:"",category:""},this.fetchData()},handleDelete:function(t){var e=this;this.$confirm("此操作将永久删除该商品, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){n.a.deleteGoods(t).then((function(t){e.fetchData(),e.$message({type:"success",message:"删除成功!"})})).catch((function(t){e.$message({type:"error",message:"删除失败!"})}))}))}}},d=(o(411),o(19)),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"app-container"},[t._m(0),t._v(" "),o("el-table",{staticStyle:{width:"100%"},attrs:{data:t.goodsList,border:""}},[o("el-table-column",{attrs:{label:"序号",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("i",{staticClass:"el-icon"}),t._v(" "),o("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s((t.page-1)*t.limit+e.$index+1))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"商品图片",width:"200",prop:"cover"},scopedSlots:t._u([{key:"default",fn:function(t){return[o("router-link",{attrs:{to:"/flea/"+t.row.id}},[o("img",{staticStyle:{height:"100px",width:"100%","object-fit":"cover"},attrs:{src:t.row.cover}})])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"商品名称",width:"100",prop:"productName"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.productName))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"交易方式",width:"100px",prop:"transactionMethod"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.transactionMethod))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"商品描述",width:"180px",prop:"description"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("div",{staticClass:"description-container"},[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.description,placement:"top"}},[o("span",{domProps:{innerHTML:t._s(e.row.description)}})])],1)]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"商品价格",width:"100",prop:"price",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v("￥"+t._s(e.row.price))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"状态",width:"100",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(o){return t.handleChangeStatus(e.row.id,e.row.status)}},model:{value:e.row.status,callback:function(o){t.$set(e.row,"status",o)},expression:"scope.row.status"}}),t._v(" "),o("span",[t._v(t._s(e.row.status?"上架":"下架"))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("router-link",{attrs:{to:"/flea/edit/"+e.row.id}},[o("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"}},[t._v("编辑")])],1),t._v(" "),o("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(o){return t.handleDelete(e.row.id)}}},[t._v("删除")])]}}])})],1),t._v(" "),o("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":t.page,"page-size":t.limit,total:parseInt(t.total),layout:"total, prev, pager, next, jumper"},on:{"current-change":t.fetchData}})],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"tac pt20"},[e("a",{staticClass:"comm-btn c-btn-2",staticStyle:{"margin-right":"1000px",color:"red"},attrs:{href:"/flea/add",title:"再卖一件"}},[this._v("再卖一件")])])}],!1,null,null,null);e.default=component.exports},458:function(t,e,o){"use strict";o.r(e);o(193),o(192);var n=o(379),r=o(366),l=o(370),c=o(25),d=o.n(c),f={data:function(){return{user:{},dialogTitle:"",companylist:{},recruitmentslist:{},sellerList:{},page:1,limit:4,total:"",resumeList:[],dialogVisible:!1,dialogVisible1:!1,resume:{cover:"",companyName:"",positionName:"",id:"",userId:"",companyId:"",recruitmentId:""},currentImage:""}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.page=e,this.getUserInfo(),n.a.getUserResume(this.page,this.limit,this.user.id).then((function(e){t.resumeList=e.data.data.items.records,t.total=e.data.data.items.total,console.log(JSON.stringify(t.resumeList))})).catch((function(t){console.log(t)})),r.a.getCompanyList().then((function(e){t.companylist=e.data.data.items})),l.a.getSellerList().then((function(e){t.sellerList=e.data.data.items}))},showImage:function(t){this.currentImage=t,this.dialogVisible=!0},getUserInfo:function(){var t=d.a.get("guli_ucenter");if(t)try{this.user=JSON.parse(t),console.log("成功解析 JSON 数据")}catch(t){console.error("JSON 解析失败:",t)}},handleEdit:function(t){this.dialogTitle="编辑",this.resume=t,this.dialogVisible1=!0},submitResume:function(){var t=this;n.a.updateResume(this.resume).then((function(e){t.$message({type:"success",message:"提交成功!"})})).catch((function(e){console.log(e),t.$message({type:"error",message:"提交失败!"})})),this.dialogVisible1=!1,this.$refs.resumeForm.resetFields()},handleAvatarSuccess:function(t){var e=t.split("\\").pop();this.resume.cover="http://localhost:9528/src/static/img/recruit/resume/"+e,console.log("图片名称:",e)},handleChange:function(t,e){this.fileList=e.slice(-3)},handleDelete:function(t){var e=this;this.$confirm("此操作将永久删除该兼职信息，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){n.a.deleteResumeById(t).then((function(t){e.$message({type:"success",message:"删除成功!"}),e.fetchData()}))})).catch((function(t){e.$message({type:"error",message:"删除失败!"})}))}}},m=o(19),component=Object(m.a)(f,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"app-container"},[o("el-table",{staticStyle:{width:"100%"},attrs:{data:t.resumeList,border:""}},[o("el-table-column",{attrs:{label:"序号",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("i",{staticClass:"el-icon"}),t._v(" "),o("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s((t.page-1)*t.limit+e.$index+1))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"简历",width:"280",heght:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("img",{attrs:{src:e.row.cover,width:"200",height:"200"},on:{click:function(o){return t.showImage(e.row.cover)}}})]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"公司名称",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.companyName))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"岗位",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.positionName))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"状态",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.status?o("span",{staticStyle:{color:"blue"}},[t._v("未查看")]):1===e.row.status?o("span",{staticStyle:{color:"red"}},[t._v("不符合")]):2===e.row.status?o("span",{staticStyle:{color:"green"}},[t._v("符合")]):t._e()]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(o){return t.handleEdit(e.row)}}},[t._v("编辑")]),t._v(" "),o("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(o){return t.handleDelete(e.row.id)}}},[t._v("删除")])]}}])})],1),t._v(" "),o("el-dialog",{attrs:{visible:t.dialogVisible,width:"50%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[o("img",{staticStyle:{width:"100%"},attrs:{src:t.currentImage}}),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("关闭")])],1)]),t._v(" "),o("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogVisible1,width:"50%"},on:{"update:visible":function(e){t.dialogVisible1=e}}},[o("el-form",{ref:"resumeForm",attrs:{model:t.resume,"label-width":"80px"}},[o("el-form-item",{attrs:{label:"上传简历"}},[o("el-upload",{staticClass:"upload-demo",attrs:{action:"http://localhost:8222/recuit/upload/resume","on-success":t.handleAvatarSuccess,"show-file-list":!1,limit:20971520}},[o("img",{staticStyle:{height:"200px",width:"300px"},attrs:{src:this.resume.cover}})])],1)],1),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialogVisible1=!1}}},[t._v("取消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.submitResume}},[t._v("提交")])],1)],1),t._v(" "),o("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":t.page,"page-size":t.limit,total:parseInt(t.total),layout:"total, prev, pager, next, jumper"},on:{"current-change":t.fetchData}})],1)}),[],!1,null,"25b458b5",null);e.default=component.exports},459:function(t,e,o){"use strict";o.r(e);var n=o(388),r=o(389),l=o(390),c={components:{CoursePage:n.default,RecruitCollect:r.default,GoodsCollect:l.default},data:function(){return{activeName:"课程收藏"}},methods:{handleClick:function(t,e){console.log(t,e)}}},d=(o(413),o(19)),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"app-container"},[o("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[o("el-tab-pane",{attrs:{label:"课程收藏",name:"课程收藏"}},[o("course-page",{staticClass:"course-collect"})],1),t._v(" "),o("el-tab-pane",{attrs:{label:"岗位收藏",name:"岗位收藏"}},[o("recruit-collect",{staticClass:"recruit-collect"})],1),t._v(" "),o("el-tab-pane",{attrs:{label:"商品收藏",name:"商品收藏"}},[o("goods-collect",{staticClass:"goods-collect"})],1)],1)],1)}),[],!1,null,"d09eff22",null);e.default=component.exports},497:function(t,e,o){"use strict";var n=o(418);o.n(n).a},498:function(t,e,o){(e=o(15)(!1)).push([t.i,".el-row[data-v-3b6e8cb6]{margin:0!important;width:100%}.el-col[data-v-3b6e8cb6]{padding:0;margin-left:100px;margin-bottom:-220px}.el-menu-vertical-demo[data-v-3b6e8cb6]{width:180px;border:1px solid #29bda7;border-radius:5px}.el-form-item__label[data-v-3b6e8cb6]{font-weight:700}.el-upload[data-v-3b6e8cb6]{border-radius:50%}.avatar-uploader .el-upload[data-v-3b6e8cb6]{border:1px dashed #d9d9d9;cursor:pointer;position:relative;overflow:hidden;border-radius:50%}.avatar-uploader .el-upload[data-v-3b6e8cb6]:hover{border-color:#409eff}.avatar-uploader-icon[data-v-3b6e8cb6]{font-size:28px;color:#8c939d;line-height:120px;text-align:center}.avatar[data-v-3b6e8cb6],.avatar-uploader-icon[data-v-3b6e8cb6]{width:120px;height:120px;border-radius:50%}.avatar[data-v-3b6e8cb6]{display:block}",""]),t.exports=e},554:function(t,e,o){"use strict";o.r(e);var n=o(456),r=o(457),l=o(458),c=o(459),d=o(540),f=o(25),m=o.n(f),h={components:{PersonPage:n.default,SellingPage:r.default,ResumePage:l.default,CollectPage:c.default,application:d.default},data:function(){return{user:{},dialogVisible:!1,activeMenu:"/ucenter/profile"}},created:function(){this.showInfo()},watch:{$route:function(){this.updateActiveMenu()}},mounted:function(){this.updateActiveMenu()},methods:{showInfo:function(){var t=m.a.get("guli_ucenter");if(t)try{this.user=JSON.parse(t),console.log("成功解析 JSON 数据"),console.log(JSON.stringify(this.user.nickname))}catch(t){console.error("JSON 解析失败:",t)}if(null==this.user.id)return this.$message({type:"error",message:"请先登录"}),this.$router.push({path:"/login"}),!1},updateActiveMenu:function(){var path=this.$route.path;this.activeMenu=path},handleMenuSelect:function(t){this.activeMenu=t},clickTab:function(){}}},v=(o(497),o(19)),component=Object(v.a)(h,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"main-content",staticStyle:{width:"100%",height:"1200px",margin:"auto"}},[o("el-row",[o("el-col",{attrs:{span:6}},[o("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":t.activeMenu},on:{select:t.handleMenuSelect}},[o("el-menu-item",{attrs:{index:"/ucenter/profile"}},[t._v("个人资料")]),t._v(" "),o("el-menu-item",{attrs:{index:"/ucenter/applicationCenter"}},[t._v("应用中心")]),t._v(" "),o("el-menu-item",{attrs:{index:"/ucenter/selling"}},[t._v("在挂二手")]),t._v(" "),o("el-menu-item",{attrs:{index:"/ucenter/resume"}},[t._v("已投简历")]),t._v(" "),o("el-menu-item",{attrs:{index:"/ucenter/collectlist"}},[t._v("收藏列表")])],1)],1),t._v(" "),o("el-col",{attrs:{span:18}},["/ucenter/profile"===t.activeMenu?o("div",[o("person-page")],1):t._e(),t._v(" "),"/ucenter/applicationCenter"===t.activeMenu?o("div",[o("application")],1):t._e(),t._v(" "),"/ucenter/selling"===t.activeMenu?o("div",[o("selling-page")],1):t._e(),t._v(" "),"/ucenter/resume"===t.activeMenu?o("div",[o("resume-page")],1):t._e(),t._v(" "),"/ucenter/collectlist"===t.activeMenu?o("div",[o("collect-page")],1):t._e()])],1)],1)}),[],!1,null,"3b6e8cb6",null);e.default=component.exports}}]);