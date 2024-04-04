<template>
  <div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          v-for="banner in bannerList"
          :key="banner.id"
          class="swiper-slide"
          style="background: #040B1B;width: 80%;height: 60%;margin: 0 auto;"
        >
          <a target="_blank" :href="banner.linkUrl">
            <img
              width="100%"
              :src="banner.imageUrl"
              :alt="banner.title"
            />
          </a>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </div>
    <!-- 幻灯片 结束 -->

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
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="(course, index) in filteredcourseList" v-bind:key="index">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <!-- ~/assets/photo/course/01.jpg -->
                      <img :src="course.cover" class="img-responsive" :alt="course.title" />
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
            <!-- <section class="tac pt20">
              <a href="/course" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>-->
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
            <!-- <section class="tac pt20">
              <a href="/teacher" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
            </section>-->
          </div>
        </section>
      </div>
      

      <!-- 网校名师 结束 -->

      <!-- 招聘开始 -->
      <div class="idx-widgets">
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">招聘信息</span>
            </h2>
          </header>

          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="(recruitment, index) in filteredRecruitmentList" v-bind:key="index">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        :src="recruitment.companyLogo"
                        class="img-responsive"
                        :alt="recruitment.companyName"
                        style="height: 200px;width: 100%;object-fit: cover; border: 1px solid black; box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);"
                      />
                      <div class="cc-mask">
                        <a
                          :href="'/recuit/'+recruitment.id"
                          title="查看详情"
                          class="comm-btn c-btn-1"
                        >查看详情</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a
                        href="#"
                        :title="recruitment.positionName"
                        class="course-title fsize18 c-333"
                      >{{recruitment.positionName}}</a>
                    </h3>
                   
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
         
          </div>
        </section>
      </div>
     
      <!-- 招聘结束 -->

      <!-- 兼职开始 -->
      <div class="idx-widgets2">
    <section class="container">
      <header class="comm-title">
        <h2 class="tac">
          <span class="c-333">兼职信息</span>
        </h2>
      </header>
        
      <div>
      <article class="comm-course-list">
        <ul class="of" id="bna">
          <li v-for="(partTimeWork, index) in filteredpartTimeWorks" v-bind:key="index">
            <div class="cc-l-wrap">
              <section class="course-img">
                <!-- ~/assets/photo/course/01.jpg -->
                <img
                  :src="partTimeWork.cover"
                  class="img-responsive"
                  :alt="partTimeWork.type"
                  style="height: 200px;width: 100%;object-fit: cover;"
                />
                <div class="cc-mask">
                  <a
                    @click="showDialog(partTimeWork.id)"
                    title="查看详情"
                    class="comm-btn c-btn-1"
                  >查看详情</a>
                </div>
              </section>
              <h3 class="hLh30 txtOf mt10">
                <a
                  href="#"
                  :title="partTimeWork.type"
                  class="course-title fsize18 c-333"
                >{{partTimeWork.type}}</a>
              </h3>
             
            </div>
          </li>
        </ul>
        <div class="clear"></div>
      </article>

      <div>
        <!-- 弹窗 -->
        <el-dialog
          title="兼职信息"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleClose"
        >
          <!-- <img :src="parttimeDetails.cover" style="height: 200px; width: 300px;" /> -->


          <el-descriptions class="margin-top"  :column="2" size="medium" border>
            <el-descriptions-item label="类型">{{ parttimeDetails.type }}</el-descriptions-item>
            <el-descriptions-item label="描述">{{ parttimeDetails.description }}</el-descriptions-item>
            <el-descriptions-item label="要求">{{ parttimeDetails.requirement }}</el-descriptions-item>
            <el-descriptions-item label="工资">{{ parttimeDetails.salary }}元/时</el-descriptions-item>
            <el-descriptions-item label="工作时间">{{ parttimeDetails.workTime }}</el-descriptions-item>
            <el-descriptions-item label="联系信息">{{ parttimeDetails.contactInfo }}</el-descriptions-item>
            <el-descriptions-item label="工作地点">{{ parttimeDetails.workplace }}</el-descriptions-item>
            <el-descriptions-item label="HR姓名">{{ parttimeDetails.hrName }}</el-descriptions-item>
          </el-descriptions>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">关闭</el-button>
          </span>
        </el-dialog>
      </div>
    </div>  
      
    </section>
    <!--兼职结束-->


    <!--跳蚤市场开始-->
    <header class="comm-title">
        <h2 class="tac">
          <span class="c-333">跳蚤市场</span>
        </h2>
      </header>
    <div class="carousel-container">
      <el-carousel
        :interval="4000"
        :show-arrow="true"
        @before-change="handleCarouselChange"
        type="card"
        height="400px"
      >
        <!-- 商品轮播项 -->
        <el-carousel-item v-for="(item, index) in carouselItems" :key="index">
          <!-- 商品内容 -->
          <div class="carousel-item-content">
            <router-link :to="'/flea/'+item.id">
              <img :src="item.cover" class="carousel-item-image" />
            </router-link>
            <div class="carousel-item-text">
              <div class="carousel-item-title">{{ item.productName }}</div>
              <div class="carousel-item-description" v-html="item.description"></div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>


    <!--跳蚤市场结束-->


  
 </div>
  


    </div>
  </div>
</template>

<script>
import banner from "../api/banner";
import index from "../api/index";
import recuit from "../api/recuit";
import flea from "../api/flea";

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
      courseList: [],
      recruitmentList: [],
      parttimeDetails: [],
      partTimeWorks: [],
      carouselItems:[],
      dialogVisible: false //弹窗默认为关闭状态
    };
  },

 

  created() {
    this.initDataBanner();
    this.initDataObj();
  },

  computed: {
    
    filteredcourseList() {
      return this.courseList.slice(0, 4);
    },

    filteredpartTimeWorks() {
      return this.partTimeWorks.slice(0, 4);
    },

    filteredRecruitmentList() {
      return this.recruitmentList.slice(0, 4);
    }
  },

  methods: {
    showDialog(id) {
      this.dialogVisible = true;
      recuit.getById(id).then(response => {
        this.parttimeDetails = response.data.data.items;
        console.log(JSON.stringify(this.parttimeDetails));
      });
    },
    handleClose(done) {
      this.dialogVisible = false;
      done();
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.queryList();
    },

    handleCarouselChange(index) {
      // 在切换前处理左右移动时的商品列表更新逻辑
      // index为即将显示的第一个商品的索引
      const currentIndex = this.$refs.carousel.activeIndex;
      const itemsCount = this.carouselItems.length;
      const shiftCount = 1; // 每次移动的商品数量

      // 如果即将显示的第一个商品索引小于当前第一个商品的索引
      // 则将最后几个商品移动到最前面
      if (index < currentIndex) {
        for (let i = 0; i < shiftCount; i++) {
          const lastItem = this.carouselItems.pop();
          this.carouselItems.unshift(lastItem);
        }
      }
      // 如果即将显示的第一个商品索引大于当前第一个商品的索引
      // 则将前几个商品移动到最后面
      else if (index > currentIndex) {
        for (let i = 0; i < shiftCount; i++) {
          const firstItem = this.carouselItems.shift();
          this.carouselItems.push(firstItem);
        }
      }
    },

    initDataBanner() {
      banner.getList().then(response => {
        this.bannerList = response.data.data.items;
        // console.log(JSON.stringify(this.bannerList));
      });
    },

    initDataObj() {
      index.getList().then(response => {
        this.teacherList = response.data.data.teachers;
        // console.log(JSON.stringify(this.teacherList));

        this.courseList = response.data.data.courses;
        // console.log(JSON.stringify(this.courseList));
      });

      recuit.getPartTimeJob().then(response => {
        this.partTimeWorks = response.data.data.items;
        // console.log(JSON.stringify(this.partTimeWorks));
      });

      recuit.getRecruitInfo().then(response => {
        this.recruitmentList = response.data.data.items;
        console.log(JSON.stringify(this.recruitmentList));
      });

      flea.getBanner().then(response => {
        this.carouselItems = response.data.data.items;
        // console.log(JSON.stringify(this.carouselItems));
      });
    }
  }
};
</script>

<style scoped>
.carousel-container {
  margin-top: 60px; /* 增加元素之间的垂直间距 */
}

.carousel-item-content {
  /* 自定义样式 */
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.carousel-item-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.carousel-item-title {
  font-weight: bold;
}

.carousel-item-description {
  color: #666;
}

</style>