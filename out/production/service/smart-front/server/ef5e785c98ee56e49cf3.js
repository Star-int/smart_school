exports.ids=[19],exports.modules={163:function(e,t,r){var content=r(240);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);var o=r(2).default;e.exports.__inject__=function(e){o("2ca46856",content,!0,e)}},164:function(e,t,r){var content=r(242);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);var o=r(2).default;e.exports.__inject__=function(e){o("436d4d42",content,!0,e)}},239:function(e,t,r){"use strict";r.r(t);var o=r(163),d=r.n(o);for(var n in o)"default"!==n&&function(e){r.d(t,e,(function(){return o[e]}))}(n);t.default=d.a},240:function(e,t,r){(t=r(1)(!1)).push([e.i,"body,html{height:100%}",""]),e.exports=t},241:function(e,t,r){"use strict";r.r(t);var o=r(164),d=r.n(o);for(var n in o)"default"!==n&&function(e){r.d(t,e,(function(){return o[e]}))}(n);t.default=d.a},242:function(e,t,r){(t=r(1)(!1)).push([e.i,".head[data-v-4e9f7e6e]{height:50px;position:absolute;top:0;left:0;width:100%}.head .logo[data-v-4e9f7e6e]{height:50px;margin-left:10px}.body[data-v-4e9f7e6e]{position:absolute;top:50px;left:0;right:0;bottom:0;overflow:hidden}",""]),e.exports=t},253:function(e,t,r){"use strict";r.r(t);var o=r(12);var d={getPlayAuth:e=>Object(o.a)({url:`/vod/video/getPlayAuth/${e}`,method:"get"})},n={layout:"video",asyncData:({params:e,error:t})=>d.getPlayAuth(e.vid).then(t=>({vid:e.vid,playAuth:t.data.data.playAuth})),mounted(){new Aliplayer({id:"J_prismPlayer",vid:this.vid,autoplay:!0,useH5Prism:!0,playauth:this.playAuth,encryptType:"1",width:"100%",height:"400px"},(function(e){console.log("播放器创建成功")}))}},l=r(3);var component=Object(l.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"smart-player",staticStyle:{height:"1000px"}},[e._ssrNode('<div class="head" data-v-4e9f7e6e></div> '),e._ssrNode('<div class="body" data-v-4e9f7e6e>',"</div>",[e._ssrNode('<div class="content" data-v-4e9f7e6e>',"</div>",[r("nuxt")],1),e._ssrNode(" "),e._ssrNode('<div style="margin-top: 200px;" data-v-4e9f7e6e>',"</div>",[e._ssrNode('<a href="/learn" data-v-4e9f7e6e>',"</a>",[r("el-button",{attrs:{type:"primary"}},[e._v("返回课程列表")])],1),e._ssrNode(' <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css" data-v-4e9f7e6e> <div id="J_prismPlayer" class="prism-player" data-v-4e9f7e6e></div>')],2)],2)],2)}),[],!1,(function(e){var t=r(239);t.__inject__&&t.__inject__(e);var o=r(241);o.__inject__&&o.__inject__(e)}),"4e9f7e6e","ef05fcce");t.default=component.exports}};