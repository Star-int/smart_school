(window.webpackJsonp=window.webpackJsonp||[]).push([[29,30,31,33],{357:function(t,e,n){"use strict";var o=n(88);e.a={getGoodsPage:function(t,e,n){return Object(o.a)({url:"flea/goods/getGoodsFrontPage/".concat(t,"/").concat(e),method:"get",params:n})},getBanner:function(){return Object(o.a)({url:"flea/banner/getCarousel",method:"get"})},getAllGoods:function(){return Object(o.a)({url:"flea/goods/getAllGoods",method:"get"})},getGoodsById:function(t){return Object(o.a)({url:"flea/goods/getGoodsById/".concat(t),method:"get"})},getGoodsByCategory:function(t){return Object(o.a)({url:"flea/goods/getGoodsByCategory",method:"get",params:{category:t}})},getSellerInfoBySellerId:function(t){return Object(o.a)({url:"ucenterservice/apimember/getSellerInfo/".concat(t),method:"post"})},getSellingGoodsPage:function(t,e,n){return Object(o.a)({url:"flea/goods/getSellingGoodsPage/".concat(t,"/").concat(e),method:"get",params:{sellerId:n}})},getGoodsCollect:function(t,e,n){return Object(o.a)({url:"flea/goods/getGoodsCollect/".concat(t,"/").concat(e),method:"get",params:{userId:n}})}}},358:function(t,e,n){"use strict";var o=n(88),r="ucenterservice/collect";e.a={getCollectList:function(t){return Object(o.a)({url:"".concat(r,"/getCollectByUserId/").concat(t),method:"get"})},addCollect:function(t){return Object(o.a)({url:"".concat(r,"/addCollect"),method:"post",data:t})},deleteCollect:function(t){return Object(o.a)({url:"".concat(r,"/deleteCollect"),method:"delete",data:t})}}},359:function(t,e,n){"use strict";var o=n(88);e.a={getPartTimeJob:function(){return Object(o.a)({url:"/recuit/partTime/getAllInfo",method:"get"})},getById:function(t){return Object(o.a)({url:"/recuit/partTime/getInfoById/".concat(t),method:"get",params:t})},getRecruitInfo:function(){return Object(o.a)({url:"/recuit/recruitment/getAllInfo",method:"get"})},getRecruitInfoById:function(t){return Object(o.a)({url:"/recuit/recruitment/getRecruitInfoById/".concat(t),method:"get"})},getCompanyInfo:function(t){return Object(o.a)({url:"/recuit/recruitmentCompany/getCompanyInfoById/".concat(t),method:"get"})},getParttimePage:function(t,e,n){return Object(o.a)({url:"/recuit/partTime/getPartimePage/".concat(t,"/").concat(e),method:"get",params:n})},getRecruitmentPage:function(t,e,n){return Object(o.a)({url:"/recuit/recruitment/getRecruitmentPage/".concat(t,"/").concat(e),method:"get",params:n})},getCollectRecruit:function(t,e,n){return Object(o.a)({url:"/recuit/recruitment/getCollectRecruit/".concat(t,"/").concat(e),method:"get",params:{userId:n}})},getWebList:function(){return Object(o.a)({url:"/recuit/recruitment/getWebList",method:"get"})}}},360:function(t,e,n){"use strict";var o=n(88);e.a={getPageList:function(t,e,n){return Object(o.a)({url:"/eduservice/course/getfrontCourseList/".concat(t,"/").concat(e),method:"post",data:n})},getNestedTreeList2:function(){return Object(o.a)({url:"/eduservice/subject/list",method:"get"})},getById:function(t){return Object(o.a)({url:"/eduservice/course/getfrontCourseByCourseId/".concat(t),method:"get"})},getCollectList:function(t,e,n){return Object(o.a)({url:"/eduservice/course/searchCollectCourse/".concat(t,"/").concat(e),method:"get",params:{userId:n}})},getAllCourse:function(){return Object(o.a)({url:"/eduservice/course//getAllCourse",method:"get"})}}},367:function(t,e,n){var content=n(414);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(16).default)("13b9c95a",content,!0,{sourceMap:!1})},388:function(t,e,n){"use strict";n.r(e);var o=n(360),r=n(358),c=n(25),l=n.n(c),d={data:function(){return{list:[],user:{},collectInfo:{},page:1,limit:6,total:0}},created:function(){this.getUserInfo(),this.fetchData()},methods:{fetchData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.page=e,o.a.getCollectList(this.page,this.limit,this.user.id).then((function(e){t.list=e.data.data.items.records,t.total=e.data.data.items.total}))},getUserInfo:function(){var t=l.a.get("guli_ucenter");if(t)try{this.user=JSON.parse(t)}catch(t){console.error("JSON 解析失败:",t)}},removeDataById:function(t){var e=this;this.collectInfo.courseId=t,this.collectInfo.userId=this.user.id,r.a.deleteCollect(this.collectInfo).then((function(t){e.$message({type:"success",message:"取消收藏成功"}),e.fetchData(e.page,e.limit,e.user.id)})).catch((function(t){console.error(t),e.$message({type:"error",message:"取消收藏失败"})}))}}},f=n(19),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-container"},[n("h1",[t._v("我的课程收藏")]),t._v(" "),n("el-table",{attrs:{data:t.list,border:"",fit:"","highlight-current-row":"","row-class-name":"myClassList"}},[n("el-table-column",{attrs:{label:"序号",width:"70",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s((t.page-1)*t.limit+e.$index+1))]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"课程信息",width:"470",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{staticClass:"info"},[n("div",{staticClass:"pic"},[n("router-link",{attrs:{to:"/course/"+e.row.id}},[n("img",{attrs:{src:e.row.cover,alt:"scope.row.title",width:"150px"}})])],1),t._v(" "),n("div",{staticClass:"title"},[n("a",[t._v(t._s(e.row.title))]),t._v(" "),n("p",[t._v(t._s(e.row.lessonNum)+"课时")])])])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticStyle:{width:"98px"},attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(n){return t.removeDataById(e.row.id)}}},[t._v("取消收藏")])]}}])})],1),t._v(" "),n("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":t.page,"page-size":t.limit,total:t.total,layout:"total, prev, pager, next, jumper"},on:{"current-change":t.fetchData}})],1)}),[],!1,null,null,null);e.default=component.exports},389:function(t,e,n){"use strict";n.r(e);var o=n(359),r=n(358),c=n(25),l=n.n(c),d={data:function(){return{list:[],user:{},collectInfo:{},page:1,limit:6,total:0}},created:function(){this.getUserInfo(),this.fetchData()},methods:{fetchData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.page=e,o.a.getCollectRecruit(this.page,this.limit,this.user.id).then((function(e){t.list=e.data.data.items.records,t.total=e.data.data.items.total,console.log(JSON.stringify(t.list))}))},getUserInfo:function(){var t=l.a.get("guli_ucenter");if(t)try{this.user=JSON.parse(t)}catch(t){console.error("JSON 解析失败:",t)}},removeDataById:function(t){var e=this;this.collectInfo.recruitmentId=t,this.collectInfo.userId=this.user.id,r.a.deleteCollect(this.collectInfo).then((function(t){e.$message({type:"success",message:"取消收藏成功"}),e.fetchData(e.page,e.limit,e.user.id)})).catch((function(t){console.error(t),e.$message({type:"error",message:"取消收藏失败"})}))}}},f=n(19),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-container"},[n("h1",[t._v("我的岗位收藏")]),t._v(" "),n("el-table",{attrs:{data:t.list,border:"",fit:"","highlight-current-row":"","row-class-name":"myClassList"}},[n("el-table-column",{attrs:{label:"序号",width:"70",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s((t.page-1)*t.limit+e.$index+1))]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"公司图片",width:"200",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("div",{staticClass:"info"},[n("div",{staticClass:"pic"},[n("router-link",{attrs:{to:"/recuit/"+t.row.id}},[n("img",{attrs:{src:t.row.companyLogo,alt:"scope.row.title",width:"150px"}})])],1)])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"岗位",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.positionName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"工资",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.salary))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"公司名称",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.companyName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"招聘状态",width:"100",height:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?n("span",{staticStyle:{color:"green"}},[t._v("招聘中")]):n("span",{staticStyle:{color:"red"}},[t._v("招聘完")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticStyle:{width:"98px"},attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(n){return t.removeDataById(e.row.id)}}},[t._v("取消收藏")])]}}])})],1),t._v(" "),n("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":t.page,"page-size":t.limit,total:t.total,layout:"total, prev, pager, next, jumper"},on:{"current-change":t.fetchData}})],1)}),[],!1,null,null,null);e.default=component.exports},390:function(t,e,n){"use strict";n.r(e);var o=n(357),r=n(358),c=n(25),l=n.n(c),d={data:function(){return{list:[],user:{},collectInfo:{},page:1,limit:4,total:0}},created:function(){this.getUserInfo(),this.fetchData()},methods:{fetchData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.page=e,o.a.getGoodsCollect(this.page,this.limit,this.user.id).then((function(e){t.list=e.data.data.items.records,t.total=e.data.data.items.total,console.log(JSON.stringify(t.list))}))},getUserInfo:function(){var t=l.a.get("guli_ucenter");if(t)try{this.user=JSON.parse(t)}catch(t){console.error("JSON 解析失败:",t)}},removeDataById:function(t){var e=this;this.collectInfo.goodsId=t,this.collectInfo.userId=this.user.id,r.a.deleteCollect(this.collectInfo).then((function(t){e.$message({type:"success",message:"取消收藏成功"}),e.fetchData(e.page,e.limit,e.user.id)})).catch((function(t){console.error(t),e.$message({type:"error",message:"取消收藏失败"})}))}}},f=n(19),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-container"},[n("h1",[t._v("我的商品收藏")]),t._v(" "),n("el-table",{attrs:{data:t.list,border:"",fit:"","highlight-current-row":"","row-class-name":"myClassList"}},[n("el-table-column",{attrs:{label:"序号",width:"70",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s((t.page-1)*t.limit+e.$index+1))]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"商品图片",width:"200",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("div",{staticClass:"info"},[n("div",{staticClass:"pic"},[n("router-link",{attrs:{to:"/flea/"+t.row.id}},[n("img",{attrs:{src:t.row.cover,alt:"scope.row.title",width:"150px"}})])],1)])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"商品名称",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.productName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"分类",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.category))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"价格",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v("￥"+t._s(e.row.price))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"状态",width:"100",heght:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.status?"上架":"下架"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticStyle:{width:"98px"},attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(n){return t.removeDataById(e.row.id)}}},[t._v("取消收藏")])]}}])})],1),t._v(" "),n("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":t.page,"page-size":t.limit,total:t.total,layout:"total, prev, pager, next, jumper"},on:{"current-change":t.fetchData}})],1)}),[],!1,null,null,null);e.default=component.exports},413:function(t,e,n){"use strict";var o=n(367);n.n(o).a},414:function(t,e,n){(e=n(15)(!1)).push([t.i,".app-container[data-v-d09eff22]{margin-top:-60px}",""]),t.exports=e},459:function(t,e,n){"use strict";n.r(e);var o=n(388),r=n(389),c=n(390),l={components:{CoursePage:o.default,RecruitCollect:r.default,GoodsCollect:c.default},data:function(){return{activeName:"课程收藏"}},methods:{handleClick:function(t,e){console.log(t,e)}}},d=(n(413),n(19)),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[n("el-tab-pane",{attrs:{label:"课程收藏",name:"课程收藏"}},[n("course-page",{staticClass:"course-collect"})],1),t._v(" "),n("el-tab-pane",{attrs:{label:"岗位收藏",name:"岗位收藏"}},[n("recruit-collect",{staticClass:"recruit-collect"})],1),t._v(" "),n("el-tab-pane",{attrs:{label:"商品收藏",name:"商品收藏"}},[n("goods-collect",{staticClass:"goods-collect"})],1)],1)],1)}),[],!1,null,"d09eff22",null);e.default=component.exports}}]);