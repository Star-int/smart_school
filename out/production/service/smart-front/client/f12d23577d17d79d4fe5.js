(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{357:function(t,e,o){"use strict";var c=o(88);e.a={getGoodsPage:function(t,e,o){return Object(c.a)({url:"flea/goods/getGoodsFrontPage/".concat(t,"/").concat(e),method:"get",params:o})},getBanner:function(){return Object(c.a)({url:"flea/banner/getCarousel",method:"get"})},getAllGoods:function(){return Object(c.a)({url:"flea/goods/getAllGoods",method:"get"})},getGoodsById:function(t){return Object(c.a)({url:"flea/goods/getGoodsById/".concat(t),method:"get"})},getGoodsByCategory:function(t){return Object(c.a)({url:"flea/goods/getGoodsByCategory",method:"get",params:{category:t}})},getSellerInfoBySellerId:function(t){return Object(c.a)({url:"ucenterservice/apimember/getSellerInfo/".concat(t),method:"post"})},getSellingGoodsPage:function(t,e,o){return Object(c.a)({url:"flea/goods/getSellingGoodsPage/".concat(t,"/").concat(e),method:"get",params:{sellerId:o}})},getGoodsCollect:function(t,e,o){return Object(c.a)({url:"flea/goods/getGoodsCollect/".concat(t,"/").concat(e),method:"get",params:{userId:o}})}}},561:function(t,e,o){"use strict";o.r(e);var c=o(357),r={data:function(){return{goodsList:{},page:1,limit:8,total:0,searchObj:{}}},created:function(){this.query("数码产品")},methods:{fetchData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.page=e,c.a.getGoodsPage(this.page,this.limit,this.searchObj).then((function(e){t.goodsList=e.data.data.items.records,t.total=e.data.data.items.total,console.log(JSON.stringify(t.goodsList))}))},query:function(t){this.searchObj.category=t,this.fetchData()},queryAll:function(){this.searchObj={},this.fetchData()}}},n=o(19),component=Object(n.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"bg-fa of",attrs:{id:"aCoursesList"}},[o("section",{staticClass:"container"},[t._m(0),t._v(" "),t._m(1),t._v(" "),o("div",[o("article",{staticClass:"comm-course-list"},[o("ul",{staticClass:"of",attrs:{id:"bna"}},t._l(t.goodsList,(function(e,c){return o("li",{key:c},[o("div",{staticClass:"cc-l-wrap"},[o("section",{staticClass:"course-img"},[o("img",{staticClass:"img-responsive",staticStyle:{height:"200px",width:"100%","object-fit":"cover",border:"1px solid black","box-shadow":"5px 5px 10px rgba(0, 0, 0, 0.5)"},attrs:{src:e.cover,alt:e.productName}}),t._v(" "),o("div",{staticClass:"cc-mask"},[o("a",{staticClass:"comm-btn c-btn-1",attrs:{href:"/flea/"+e.id,title:"查看详情"}},[t._v("查看详情")])])]),t._v(" "),o("h3",{staticClass:"hLh30 txtOf mt10"},[o("a",{staticClass:"course-title fsize18 c-333",attrs:{href:"#",title:e.productName}},[t._v(t._s(e.productName))])]),t._v(" "),o("a",{staticStyle:{"margin-left":"200px",color:"red","font-size":"20px"}},[t._v("￥"+t._s(e.price))])])])})),0),t._v(" "),o("div",{staticClass:"clear"})])]),t._v(" "),o("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":t.page,"page-size":t.limit,total:parseInt(t.total),layout:"total, prev, pager, next, jumper"},on:{"current-change":t.fetchData}})],1)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"path-wrap txtOf hLh30"},[e("a",{staticClass:"c-999 fsize14",attrs:{href:"/",title:""}},[this._v("首页")]),this._v("\n      \\\n      "),e("a",{staticClass:"c-999 fsize14",attrs:{href:"/flea",title:""}},[this._v("跳蚤市场")]),this._v("\n      \\\n      "),e("span",{staticClass:"c-333 fsize14"},[this._v("数码产品")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("header",{staticClass:"comm-title"},[e("h2",{staticClass:"fl tac"},[e("span",{staticClass:"c-333"},[this._v("数码产品")])])])}],!1,null,null,null);e.default=component.exports}}]);