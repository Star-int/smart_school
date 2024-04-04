<!--模仿index.xue写一个招聘兼职的模版-->
<template>
  <div id="app">
    
    <el-tabs type="border-card" v-model="activeName">
      <!--招聘信息-->
      <el-tab-pane label="招聘信息" name="first" style="font-size: 18px;">
        <!-- 轮播器 -->
        <el-carousel :interval="4000" type="card" height="400px">
          <!-- 第一张轮播图 -->
          <el-carousel-item>
            <img
              src="~/static/img/recruit/banner/mihoyo.jpg"
              style="width: 100%;object-fit: cover;"
              alt="Image 1"
            />
          </el-carousel-item>

          <!-- 第二张轮播图 -->
          <el-carousel-item>
            <img
              src="~/static/img/recruit/banner/alibaba.jpg"
              style="width: 100%;object-fit: cover;"
              alt="Image 2"
            />
          </el-carousel-item>

          <!-- 第三张轮播图 -->
          <el-carousel-item>
            <img
              src="~/static/img/recruit/banner/wangyi.jpg"
              style="width: 100%;object-fit: cover;"
              alt="Image 3"
            />
          </el-carousel-item>
        </el-carousel>

        <div>
          <h1 style="margin-left:600px;">最新招聘信息</h1>

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
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize18 f-fA">￥{{recruitment.salary}}</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
          <section class="tac pt20">
            <a href="/recuit/recruitment" title="更多招聘信息" class="comm-btn c-btn-2">更多招聘信息</a>
          </section>
        </div>

        <hr />
        <!--智联模版-->
        <div class="newset m_auto clearfix">
          <!-- 最新网申 -->
          <div class="newset-column" style=" background-color: #87CEFA;">
            <div class="wangshen">
              <div class="newset-content clearfix">
                <div class="newset-content-top">
                  <img src="//cimg.zhaopin.cn/img/newIndexImages/wangshen.png" alt />
                  <span>最新网申</span>
                  <a href="https://xiaoyuan.zhaopin.com/search/index" target="_blank">
                    <span>更多</span>
                    <i>&gt;</i>
                  </a>
                </div>
                <ul>
                  <li v-for="job in jobList" :key="job.id">
                    <!-- 网申内容的模板 -->
                    <dd>{{ job.positionName }}</dd>
                    <dd>{{ job.companyName }}</dd>
                    <div>
                      <div class>
                        <section class="tac pt20" style="margin-top: -60px;margin-left: 200px;">
                          <a
                            :href="job.website"

                            title="全部课程"
                            class="comm-btn c-btn-2"
                          >立即申请</a>
                        </section>
                        <hr />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 最新实习 -->
          <div class="newset-column" style="background-color: aquamarine;">
            <div class="newset-content clearfix newset-shixi">
              <!-- 实习内容的模板 -->
              <div class="newset-content clearfix">
                <div class="newset-content-top">
                  <img src="//cimg.zhaopin.cn/img/newIndexImages/shixi.png" alt />
                  <span>最新实习</span>
                  <a href="https://xiaoyuan.zhaopin.com/search/index" target="_blank">
                    <span>更多</span>
                    <i>&gt;</i>
                  </a>
                </div>
                <ul>
                  <li v-for="job in jobList" :key="job.id">
                    <!-- 网申内容的模板 -->
                    <dd>{{ job.positionName }}</dd>
                    <dd>{{ job.companyName }}</dd>
                    <div>
                      <div class>
                        <section class="tac pt20" style="margin-top: -60px;margin-left: 200px;">
                          <a
                            :href="job.website"
                            title="全部课程"
                            class="comm-btn c-btn-2"
                          >立即申请</a>
                        </section>
                        <hr />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 最新空中宣讲会 -->
          <div class="newset-column" style=" background-color: #BDB76B;">
            <div class="newset-xuanjiang newset-content clearfix">
              <!-- 宣讲会内容的模板 -->
              <div class="newset-content clearfix">
                <div class="newset-content-top">
                  <img src="//cimg.zhaopin.cn/img/newIndexImages/xuanjiang.png" alt />
                  <span>最新空中宣讲会</span>
                  <a href="https://xiaoyuan.zhaopin.com/search/index" target="_blank">
                    <span>更多</span>
                    <i>&gt;</i>
                  </a>
                </div>
                <ul>
                  <li v-for="job in jobList" :key="job.id">
                    <!-- 网申内容的模板 -->
                    <dd>{{ job.positionName }}</dd>
                    <dd>{{ job.companyName }}</dd>
                    <div>
                      <div class>
                        <section class="tac pt20" style="margin-top: -60px;margin-left: 200px;">
                          <a
                            :href="job.website"

                            title="全部课程"
                            class="comm-btn c-btn-2"
                          >立即申请</a>
                        </section>
                        <hr />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="hot-company-contain">
          <h3
            style="color: #fff;font-size: 32px; letter-spacing: 5px; line-height: 32px; padding: 64px 0;margin: 0 auto; width: 1200px; height: 100%;"
          >知名企业覆盖超过776万</h3>
          <el-tabs v-model="activeName1" class="hot-company">
            <el-tab-pane label="IT互联网" name="first1">
              <img
                src="~/static/img/recruit/it.png"
                alt="IT互联网"
                title="IT互联网"
                width="1200"
                height="416"
              />
            </el-tab-pane>
            <el-tab-pane label="制造业" name="second1">
              <img
                src="~/static/img/recruit/zhizaoye.png"
                alt="制造业"
                title="制造业"
                width="1200"
                height="416"
              />
            </el-tab-pane>
            <el-tab-pane label="房地产" name="third1">
              <img
                src="~/static/img/recruit/house.png"
                alt="房地产"
                title="房地产"
                width="1200"
                height="416"
              />
            </el-tab-pane>
            <el-tab-pane label="消费品" name="fourth1">
              <img src="~/static/img/recruit/cost.png" height="416" />
            </el-tab-pane>
            <el-tab-pane label="金融" name="five1">
              <img
                src="~/static/img/recruit/finance.png"
                alt="金融"
                title="金融"
                width="1200"
                height="416"
              />
            </el-tab-pane>
            <el-tab-pane label="服务业" name="six1">
              <img
                src="~/static/img/recruit/service.png"
                alt="服务业"
                title="服务业"
                width="1200"
                height="416"
              />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>

      <el-tab-pane label="兼职信息" name="second" style="font-size: 18px;">
        <header class="comm-title">
          <h2 class="tac">
            <span class="c-333">最新兼职信息</span>
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
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize18 f-fA">￥{{partTimeWork.salary}}每小时</i>
                    </span>
                  </section>
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
              <img :src="parttimeDetails.cover" style="height: 200px; width: 300px;" />


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

          <section class="tac pt20">
            <a href="/recuit/parttime" title="更多兼职信息" class="comm-btn c-btn-2">更多兼职信息</a>
          </section>
        </div>


        
      </el-tab-pane>
    </el-tabs>

    <div>
      <img src="~/static/img/zhilian.jpg" style="width: 100%; height: auto;" />
    </div>
  </div>
</template>


<script>
import recuit from "../../api/recuit";

export default {
  // components: {
  //   JobDetails

  // },

  data() {
    return {
      dialogVisible: false, //弹窗默认为关闭状态
      activeName: "first",
      activeName1: "first1",
      selectedJob: null,
      // dialogVisible: false,
      isVisible: false,
      partTimeWorks: [],
      // arrays:[],
      searchKeyword: "", // 用于存储输入的查询关键字
      itemsPerPage: 8, // 每页显示的项数
      currentPage: 1, // 当前页码
      totalRecords: 0,
      recruitmentList: [],
      parttimeDetails: [],
      jobList: [
        {
          id: 1,
          positionName: "2024届职能管理岗",
          companyName: "中交四航局",
          website:"https://www.cccc4.com/"
        },

        {
          id: 2,
          positionName: "测试职位（请勿投递）",
          companyName: "乐山市商业银行股份有限公司",
          website:"https://www.lsccb.com/"
        },

        {
          id: 3,
          positionName: "工艺技术岗",
          companyName: "广东省白云人才发展有限公司",
          website:"https://talents.baiyunholding.com/"
        },

        {
          id: 4,
          positionName: "仓储物流管理管培生",
          companyName: "上海寻梦信息技术有限公司",
          website:"http://shxlxxjsyx124.cn.gongxuku.com/"
        }
        // Add more job objects as needed
      ],


    };
  },

  created() {
    this.queryList();
  },

  computed: {
      

    filteredpartTimeWorks() {
      return this.partTimeWorks.slice(0, 8);
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

    queryList() {
      // 调用接口查询数据
      recuit.getPartTimeJob().then(response => {
        this.partTimeWorks = response.data.data.items;
      });

      recuit.getRecruitInfo().then(response => {
        this.recruitmentList = response.data.data.items;
      });

      recuit.getWebList().then(response => {
        this.jobList = response.data.data.items;
      });
    },

  }
};
</script>


<style>
.hot-company-contain {
  background: url(~@/static/img/recruit/background1.jpg);
  background-size: cover;
  padding-bottom: 100px;
}

.hot-company {
  /* 位置水平居中 */
  margin: 0 auto;
  width: 1200px;
  height: 100%;
}

.hot-company .el-tabs__item {
  color: white;
  margin-left: 100px;
  font-size: 20px;
}

.hot-company .el-tabs__item.is-active {
  color: #3498db;
  font-size: 25px;
}

.hot-company .el-tabs__active-bar {
  background-color: #3498db;
  display: none;
}

/* .hot-company .el-tabs__nav-wrap::after{
  background-color: #3498db;
  display:none;
} */

body {
  font-family: "Arial", sans-serif;
}

.modal {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
  color: #333;
  cursor: pointer;
}

.carousel {
  width: 100%;
  height: 500px;
}

.el-pagination {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.zhilian {
  width: 20%;
  height: auto;
}

.newset {
  display: flex;
}

.newset-column {
  width: 33.33%;
  box-sizing: border-box;
  padding: 0 10px;
}
</style>

<style src="@/static/css/index.css" scoped></style>
<style src="@/static/css/bootstrap.min.css" scoped></style>
