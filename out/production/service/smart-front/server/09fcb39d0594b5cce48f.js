exports.ids=[11],exports.modules={159:function(t,e,o){var content=o(234);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var r=o(2).default;t.exports.__inject__=function(t){r("8ed35728",content,!0,t)}},233:function(t,e,o){"use strict";o.r(e);var r=o(159),l=o.n(r);for(var d in r)"default"!==d&&function(t){o.d(e,t,(function(){return r[t]}))}(d);e.default=l.a},234:function(t,e,o){(e=o(1)(!1)).push([t.i,".app-container[data-v-67fd65f0]{display:flex;justify-content:center;align-items:center;height:120vh}.goods-container[data-v-67fd65f0]{border:2px solid #000;background-color:#f0f0f0;padding:20px;box-sizing:border-box;width:66%;margin-right:220px}.tinymce-container[data-v-67fd65f0]{line-height:29px}",""]),t.exports=e},271:function(t,e,o){"use strict";o.r(e);var r=o(72),l=o(4),d=o.n(l),c={data:()=>({goodsList:{cover:"http://localhost:9528/src/static/img/recruit/company/chaijun.jpg"},user:{},saveBtnDisabled:!1}),created(){console.log("created"),this.init()},watch:{$route(t,e){console.log("watch $route"),this.init()}},methods:{init(){if(this.getUserInfo(),console.log(this.goodsList.sellerId),this.$route.params&&this.$route.params.id){const t=this.$route.params.id;this.fetchDataById(t)}else this.goodsList={cover:"http://localhost:9528/src/static/img/recruit/company/chaijun.jpg"}},getUserInfo(){var t=d.a.get("guli_ucenter");if(t)try{this.user=JSON.parse(t),this.goodsList.sellerId=this.user.id,console.log("成功解析 JSON 数据")}catch(t){console.error("JSON 解析失败:",t)}},saveOrUpdate(){if(null==this.user.id)return this.$message({type:"error",message:"请先登录"}),this.$router.push({path:"/login"}),!1;this.goodsList.id?this.updateGoods():this.saveGoods()},fetchDataById(t){r.a.getGoodsById(t).then(t=>{this.goodsList=t.data.data.items,console.log(JSON.stringify("啊啊啊啊啊啊啊啊啊"+this.goodsList))}).catch(t=>{this.$message({type:"error",message:"获取数据失败"})})},saveGoods(){r.a.addGoods(this.goodsList).then(t=>this.$message({type:"success",message:"添加成功!"}),this.$router.push({path:"/ucenter/selling"})).catch(t=>{this.$message({type:"error",message:"添加失败!"})})},updateGoods(){r.a.updateGoods(this.goodsList).then(t=>{this.$message({type:"success",message:"修改成功"},this.$router.push({path:"/ucenter/selling"}))}).catch(t=>{this.$message({type:"error",message:"修改失败"})})},handleAvatarSuccess(t){const e=t.split("\\").pop();this.goodsList.cover="http://localhost:9528/src/static/img/flea/"+e,console.log("图片名称:",e)},handleChange(t,e){this.fileList=e.slice(-3)}}},n=o(3);var component=Object(n.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"app-container"},[t._ssrNode('<div class="goods-container" data-v-67fd65f0>',"</div>",[o("el-form",{ref:"goodsList",attrs:{model:t.goodsList,"label-width":"80px"}},[o("el-form-item",{attrs:{label:"商品名称"}},[o("el-input",{staticStyle:{width:"600px"},model:{value:t.goodsList.productName,callback:function(e){t.$set(t.goodsList,"productName",e)},expression:"goodsList.productName"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"商品分类"}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:t.goodsList.category,callback:function(e){t.$set(t.goodsList,"category",e)},expression:"goodsList.category"}},[o("el-option",{attrs:{label:"数码产品",value:"数码产品"}}),t._v(" "),o("el-option",{attrs:{label:"体育用品",value:"体育用品"}}),t._v(" "),o("el-option",{attrs:{label:"书籍报刊",value:"书籍报刊"}}),t._v(" "),o("el-option",{attrs:{label:"其他二手",value:"其他二手"}})],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"交易方式"}},[o("el-input",{staticStyle:{width:"600px"},model:{value:t.goodsList.transactionMethod,callback:function(e){t.$set(t.goodsList,"transactionMethod",e)},expression:"goodsList.transactionMethod"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"价格"}},[o("el-input",{staticStyle:{width:"600px"},model:{value:t.goodsList.price,callback:function(e){t.$set(t.goodsList,"price",e)},expression:"goodsList.price"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"商品简介"}},[o("el-input",{staticStyle:{width:"600px"},attrs:{type:"text"},model:{value:t.goodsList.description,callback:function(e){t.$set(t.goodsList,"description",e)},expression:"goodsList.description"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"商品图片"}},[o("el-upload",{staticClass:"upload-demo",attrs:{action:"http://localhost:8222/flea/upload/goods","on-success":t.handleAvatarSuccess,"show-file-list":!1,limit:20971520}},[o("img",{staticStyle:{height:"200px",width:"300px"},attrs:{src:this.goodsList.cover}}),t._v(" "),o("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过20MB")])])],1),t._v(" "),o("el-form-item",[o("el-button",{attrs:{disabled:t.saveBtnDisabled,type:"primary"},on:{click:t.saveOrUpdate}},[t._v("保存")]),t._v(" "),o("router-link",{attrs:{to:"/ucenter/selling"}},[o("el-button",{attrs:{disabled:t.saveBtnDisabled,type:"primary"}},[t._v("返回")])],1)],1)],1)],1)])}),[],!1,(function(t){var e=o(233);e.__inject__&&e.__inject__(t)}),"67fd65f0","6e811364");e.default=component.exports},72:function(t,e,o){"use strict";var r=o(12);const l="/flea/goods/";e.a={getAllGoods:()=>Object(r.a)({url:`${l}/getAllGoods`,method:"get"}),getGoodsPage:(t,e,o)=>Object(r.a)({url:`${l}/getGoodsFrontPage/${t}/${e}`,method:"get",params:o}),addGoods:t=>Object(r.a)({url:`${l}/addGoods`,method:"post",data:t}),updateGoods:t=>Object(r.a)({url:`${l}/updateGoods`,method:"put",data:t}),getGoodsById:t=>Object(r.a)({url:`${l}/getGoodsById/${t}`,method:"get"}),deleteGoods:t=>Object(r.a)({url:`${l}/deleteGoodsById/${t}`,method:"delete"}),getGoodsFrontPage:(t,e,o)=>Object(r.a)({url:`${l}/getGoodsUserPage/${t}/${e}`,method:"get",params:{sellerId:o}}),upOrDownGoods:(t,e)=>Object(r.a)({url:`${l}/upOrDownGoods`,method:"put",params:{goodsId:t,status:e}})}}};