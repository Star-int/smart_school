<template>
  <div>
 
    <div id="aCoursesList">
      <!-- 网校课程 开始 -->

      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门课程</span>
            </h2>
          </header>
          <div>
            <!-- 加加俩个路由跳转，跳转到/course和/teacher -->
          

            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="(course, index) in courseList" v-bind:key="index">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <!-- ~/assets/photo/course/01.jpg -->
                      <img
                        :src="course.cover"
                        class="img-responsive"
                        :alt="course.title"
                      />
                      <div class="cc-mask">
                        <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a
                        href="#"
                        :title="course.title"
                        class="course-title fsize18 c-333"
                      >{{course.title}}</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green" v-if="Number(course.price) === 0">
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span>
                      <span class="fr jgTag bg-green" v-else>
                        <i class="c-fff fsize12 f-fA">￥{{course.price}}</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{course.buyCount}} 人学习</i>
                        |
                        <i class="c-999 f-fA">{{course.viewCount}} 人浏览</i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/course" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>
          </div>
        </section>
      </div>

      <!-- /网校课程 结束 -->

      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师大咖</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="(teacher,index) in teacherList" v-bind:key="index">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <a :href="'/teacher/'+teacher.id" :title="teacher.name">
                        <img :alt="teacher.name" :src="teacher.avatar" />
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a
                        :href="'/teacher/'+teacher.id"
                        :title="teacher.name"
                        class="fsize18 c-666"
                      >{{teacher.name}}</a>
                    </div>
                    <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999">{{teacher.intro}}</span>
                    </div>
                    <div class="mt15 i-q-txt">
                      <p class="c-999 f-fA">{{teacher.career}}</p>
                    </div>
                  </section>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/teacher" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
            </section>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import banner from "@/api/banner";
import index from "@/api/index";

export default {
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 3000, // 自动轮播的延迟时间，单位毫秒
          disableOnInteraction: false // 用户交互时是否停止自动轮播
        },
        //配置分页
        pagination: {
          el: ".swiper-pagination", //分页的dom节点
          clickable: true
        },
        //配置导航
        navigation: {
          nextEl: ".swiper-button-next", //下一页dom节点
          prevEl: ".swiper-button-prev" //前一页dom节点
        }
      },
      //轮播图数组
      bannerList: {},
      //名师列表
      teacherList: {},
      //课程列表
      courseList: {}
    };
  },

  created() {
    this.initDataBanner();
    this.initDataObj();
  },
  methods: {
    initDataBanner() {
      banner.getList().then(response => {
        this.bannerList = response.data.data.items;
        // console.log(JSON.stringify(this.bannerList));
      });
    },

    initDataObj() {
      index.getList().then(response => {
        this.teacherList = response.data.data.teachers;
        console.log(JSON.stringify(this.teacherList));

        this.courseList = response.data.data.courses;
        console.log(JSON.stringify(this.courseList));
      });
    }
  }
};
</script>