(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{408:function(t,e,c){"use strict";var r=c(88);e.a={getPageList:function(t,e){return Object(r.a)({url:"".concat("/eduservice/teacher","/getPageTeacherList/").concat(t,"/").concat(e),method:"get"})},getById:function(t){return Object(r.a)({url:"".concat("/eduservice/teacher","/getTeacher/").concat(t),method:"get"})}}},567:function(t,e,c){"use strict";c.r(e);var r=c(408),n={asyncData:function(t){var e=t.params;t.error;return r.a.getById(e.id).then((function(t){return console.log(t),{teacher:t.data.data.item,courseList:t.data.data.courseList}}))}},l=c(19),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",{staticClass:"bg-fa of",attrs:{id:"aCoursesList"}},[c("section",{staticClass:"container"},[c("section",{staticClass:"path-wrap txtOf hLh30"},[c("a",{staticClass:"c-999 fsize14",attrs:{href:"/",title:""}},[t._v("首页")]),t._v("\n    \\\n    "),c("a",{staticClass:"c-999 fsize14",attrs:{href:"/learn",title:""}},[t._v("学习")]),t._v("\n    \\\n    "),c("a",{staticClass:"c-999 fsize14",attrs:{href:"/teacher",title:""}},[t._v("老师列表")]),t._v("\n    \\\n    "),c("span",{staticClass:"c-333 fsize14"},[t._v(t._s(t.teacher.name))])]),t._v(" "),t._m(0),t._v(" "),c("div",{staticClass:"t-infor-wrap"},[c("section",{staticClass:"fl t-infor-box c-desc-content"},[c("div",{staticClass:"mt20 ml20"},[c("section",{staticClass:"t-infor-pic"},[c("img",{attrs:{src:t.teacher.avatar,alt:t.teacher.name}})]),t._v(" "),c("h3",{staticClass:"hLh30"},[c("span",{staticClass:"fsize24 c-333"},[t._v("\n              "+t._s(t.teacher.name)+"\n               \n              "+t._s(1===t.teacher.level?"高级讲师":"首席讲师")+"\n            ")])]),t._v(" "),c("section",{staticClass:"mt10"},[c("span",{staticClass:"t-tag-bg"},[t._v(t._s(t.teacher.intro))])]),t._v(" "),c("section",{staticClass:"t-infor-txt"},[c("p",{staticClass:"mt20"},[t._v(t._s(t.teacher.career))])]),t._v(" "),c("div",{staticClass:"clear"})])]),t._v(" "),c("div",{staticClass:"clear"})]),t._v(" "),c("section",{staticClass:"mt30"},[c("div",[t._m(1),t._v(" "),0==t.courseList.total?c("section",{staticClass:"no-data-wrap"},[c("em",{staticClass:"icon30 no-data-ico"},[t._v(" ")]),t._v(" "),c("span",{staticClass:"c-666 fsize14 ml10 vam"},[t._v("没有相关数据，小编正在努力整理中...")])]):t._e(),t._v(" "),c("article",{staticClass:"comm-course-list"},[c("ul",{staticClass:"of"},t._l(t.courseList,(function(e){return c("li",{key:e.id},[c("div",{staticClass:"cc-l-wrap"},[c("section",{staticClass:"course-img"},[c("img",{staticClass:"img-responsive",attrs:{src:e.cover}}),t._v(" "),c("div",{staticClass:"cc-mask"},[c("router-link",{attrs:{to:"/course/"+e.id}},[c("a",{staticClass:"comm-btn c-btn-1",attrs:{href:"/course/"+e.id,title:"开始学习",target:"_blank"}},[t._v("开始学习")])])],1)]),t._v(" "),c("h3",{staticClass:"hLh30 txtOf mt10"},[c("a",{staticClass:"course-title fsize18 c-333",attrs:{href:"/course/"+e.id,title:e.title,target:"_blank"}},[t._v(t._s(e.title))])])])])})),0),t._v(" "),c("div",{staticClass:"clear"})])])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("header",{staticClass:"comm-title"},[e("h2",{staticClass:"fl tac"},[e("span",{staticClass:"c-333"},[this._v("讲师介绍")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("header",{staticClass:"comm-title all-teacher-title c-course-content"},[e("h2",{staticClass:"fl tac"},[e("span",{staticClass:"c-333"},[this._v("主讲课程")])]),this._v(" "),e("section",{staticClass:"c-tab-title"},[e("a",{attrs:{href:"javascript: void(0)"}},[this._v(" ")])])])}],!1,null,null,null);e.default=component.exports}}]);