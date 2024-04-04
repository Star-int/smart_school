<template>
  <div>
    <!-- 课程所属分类 开始 -->
    <section class="path-wrap txtOf hLh30">
      <a href="/" title class="c-999 fsize14">首页</a>
      \
      <a href="/recuit" title class="c-999 fsize14">招聘</a>
      \
      <span class="c-333 fsize14">全部招聘信息</span>
    </section>
    <!-- /课程所属分类 结束 -->
    <!--查询表单-->

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="工作岗位">
        <el-input v-model="searchObj.postitionName" placeholder="什么类型" />
      </el-form-item>

      <el-form-item label="工作地点">
        <el-input v-model="searchObj.location" placeholder />
      </el-form-item>

      <el-form-item label="公司">
        <el-select
          v-model="searchObj.companyName"
          style="width: 200px"
          placeholder="请选择公司"
          @change="handleCompanyChange"
          filterable
        >
          <el-option
            v-for="item in companylist"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学历要求">
        <el-select v-model="searchObj.education" placeholder="请选择" style="width: 90px;">
          <el-option label="大专" value="大专"></el-option>
          <el-option label="本科" value="本科"></el-option>
          <el-option label="硕士" value="硕士"></el-option>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <div>
      <article class="comm-course-list">
        <ul class="of" id="bna">
          <li v-for="(recruitment,index) in recruitment" v-bind:key="index">
            <div class="cc-l-wrap">
              <section class="course-img">
                <img
                  :src="recruitment.companyLogo"
                  class="img-responsive"
                  :alt="recruitment.companyName"
                  style="height: 200px;width: 100%;object-fit: cover; border: 1px solid black; box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);"
                />
                <div class="cc-mask">
                  <a :href="'/recuit/'+recruitment.id" title="查看详情" class="comm-btn c-btn-1">查看详情</a>
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
    </div>

    <!--分页-->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="parseInt(total)"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />


  </div>
</template>

<script>
import recuit from "@/api/recuit";
import company from "@/api/company";

export default {
  data() {
    return {
      recruitment: {},
      companylist: {},
      page: 1, //当前页数，默认为1，从后端获取数据时使用。
      limit: 8, //每页显示的数据量，默认为10，从后端获取数据时使用。
      total: 0, //总数据量，从后端获取数据时使用。
      searchObj: {
        positionName: "" ,//搜索条件，默认为空字符串，从前端获取数据时使用。
        experience:"", 
        location:"", 
        education:""
      }
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData(page = 1) {
      this.page = page;
      recuit
        .getRecruitmentPage(this.page, this.limit, this.searchObj)
        .then(response => {
          this.recruitment = response.data.data.items.records;
          console.log(JSON.stringify(this.searchObj));
          this.total = response.data.data.items.total;
        });

        company.getCompanyList().then(response =>{
          this.companylist=response.data.data.items

        })
    },

    resetData(){
        this.searchObj = { positionName: "" ,//搜索条件，默认为空字符串，从前端获取数据时使用。
        experience:"", 
        location:"", 
        education:""};
        this.fetchData(1); // 查询第一页的数据
    }
  }
};
</script>>





