exports.ids=[15],exports.modules={268:function(t,e,o){"use strict";o.r(e);var r=o(64),l={data:()=>({goodsList:{},page:1,limit:8,total:0,searchObj:{}}),created(){this.query("体育用品")},methods:{fetchData(t=1){this.page=t,r.a.getGoodsPage(this.page,this.limit,this.searchObj).then(t=>{this.goodsList=t.data.data.items.records,this.total=t.data.data.items.total,console.log(JSON.stringify(this.goodsList))})},query(t){this.searchObj.category=t,this.fetchData()},queryAll(){this.searchObj={},this.fetchData()}}},c=o(3),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"bg-fa of",attrs:{id:"aCoursesList"}},[t._ssrNode('<section class="container">',"</section>",[t._ssrNode('<section class="path-wrap txtOf hLh30"><a href="/" title class="c-999 fsize14">首页</a>\n      \\\n      <a href="/flea" title class="c-999 fsize14">跳蚤市场</a>\n      \\\n      <span class="c-333 fsize14">体育用品</span></section> <header class="comm-title"><h2 class="fl tac"><span class="c-333">体育用品</span></h2></header> <div><article class="comm-course-list"><ul id="bna" class="of">'+t._ssrList(t.goodsList,(function(e,o){return'<li><div class="cc-l-wrap"><section class="course-img"><img'+t._ssrAttr("src",e.cover)+t._ssrAttr("alt",e.productName)+' class="img-responsive" style="height: 200px;width: 100%;object-fit: cover; border: 1px solid black; box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);"> <div class="cc-mask"><a'+t._ssrAttr("href","/flea/"+e.id)+' title="查看详情" class="comm-btn c-btn-1">查看详情</a></div></section> <h3 class="hLh30 txtOf mt10"><a href="#"'+t._ssrAttr("title",e.productName)+' class="course-title fsize18 c-333">'+t._ssrEscape(t._s(e.productName))+'</a></h3> <a style="margin-left:200px ;color:red; font-size:20px;">'+t._ssrEscape("￥"+t._s(e.price))+"</a></div></li>"}))+'</ul> <div class="clear"></div></article></div> '),o("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":t.page,"page-size":t.limit,total:parseInt(t.total),layout:"total, prev, pager, next, jumper"},on:{"current-change":t.fetchData}})],2)])}),[],!1,null,null,"320ac7fe");e.default=component.exports},64:function(t,e,o){"use strict";var r=o(12);e.a={getGoodsPage:(t,e,o)=>Object(r.a)({url:`flea/goods/getGoodsFrontPage/${t}/${e}`,method:"get",params:o}),getBanner:()=>Object(r.a)({url:"flea/banner/getCarousel",method:"get"}),getAllGoods:()=>Object(r.a)({url:"flea/goods/getAllGoods",method:"get"}),getGoodsById:t=>Object(r.a)({url:`flea/goods/getGoodsById/${t}`,method:"get"}),getGoodsByCategory:t=>Object(r.a)({url:"flea/goods/getGoodsByCategory",method:"get",params:{category:t}}),getSellerInfoBySellerId:t=>Object(r.a)({url:`ucenterservice/apimember/getSellerInfo/${t}`,method:"post"}),getSellingGoodsPage:(t,e,o)=>Object(r.a)({url:`flea/goods/getSellingGoodsPage/${t}/${e}`,method:"get",params:{sellerId:o}}),getGoodsCollect:(t,e,o)=>Object(r.a)({url:`flea/goods/getGoodsCollect/${t}/${e}`,method:"get",params:{userId:o}})}}};