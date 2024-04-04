<template>
   <div>
      <!-- 课程所属分类 开始 -->
      <section class="path-wrap txtOf hLh30">
        <a href="/" title class="c-999 fsize14">首页</a>
        \
        <a href="/recuit" title class="c-999 fsize14">招聘</a>
        \
        <span class="c-333 fsize14">全部兼职信息</span>
      </section>
      <!-- /课程所属分类 结束 -->
      <!--查询表单-->
  
      <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="工作类型">
        <el-input v-model="searchObj.type" placeholder="什么类型" />
      </el-form-item>

      <el-form-item label="工资">
        <el-input v-model="searchObj.salary" placeholder="工资要求多少/小时" />
      </el-form-item>

      <el-form-item label="工作地点">
        <el-input v-model="searchObj.workplace" placeholder />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
     
    </el-form>

    <div>
          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="(partTimeWork, index) in parttimelist" v-bind:key="index">
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
  
   
   </div>
</template>
  
<script>
  import recuit from "@/api/recuit";
  
  export default {
    data() {
      return {
        parttimelist: {},
        page: 1, //当前页数，默认为1，从后端获取数据时使用。
        limit: 8, //每页显示的数据量，默认为10，从后端获取数据时使用。
        total: 0, //总数据量，从后端获取数据时使用。
        searchObj: {
            type:"",  
            salary:"",  
            workplace:""
        },
        dialogVisible: false, //弹窗默认为关闭状态
        parttimeDetails:[],


      
      };
    },
  
    created() {
      this.fetchData();
    },
  
    methods: {
      fetchData(page = 1) {
        this.page = page;
        recuit
          .getParttimePage(this.page, this.limit, this.searchObj)
          .then(response => {
            this.parttimelist = response.data.data.items.records;
            console.log(JSON.stringify(this.searchObj));
            this.total = response.data.data.items.total;
          });
      },

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
  
      resetData(){
          this.searchObj = { type:"",  
            salary:"",  
            workplace:""};
          this.fetchData(1); // 查询第一页的数据
      }
    }
  };
</script>>
  
  
  
  
  
  