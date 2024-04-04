<template>
    <div id="aCoursesList" class="bg-fa of">
      <!-- /课程列表 开始 -->
      <section class="container">
        <!-- 课程所属分类 开始 -->
        <section class="path-wrap txtOf hLh30">
          <a href="/" title class="c-999 fsize14">首页</a>
          \
          <a href="/flea" title class="c-999 fsize14">跳蚤市场</a>
          \
          <span class="c-333 fsize14">书籍报刊</span>
        </section>
        <!-- /课程所属分类 结束 -->
  
        <header class="comm-title">
          <h2 class="fl tac">
            <span class="c-333">书籍报刊</span>
          </h2>
        </header>
  

  
        <div>
          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="(goods,index) in goodsList" v-bind:key="index">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img
                      :src="goods.cover"
                      class="img-responsive"
                      :alt="goods.productName"
                      style="height: 200px;width: 100%;object-fit: cover; border: 1px solid black; box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);"
                    />
                    <div class="cc-mask">
                      <a :href="'/flea/'+goods.id" title="查看详情" class="comm-btn c-btn-1">查看详情</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a
                      href="#"
                      :title="goods.productName"
                      class="course-title fsize18 c-333"
                    >{{goods.productName}}</a>
  
                  </h3>
                  <a style="margin-left:200px ;color:red; font-size:20px;">￥{{ goods.price }}</a>
  
              
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
      </section>
    </div>
</template>
  
<script>
  import flea from "../../api/flea";
  
  export default {
    data() {
      return {
        goodsList: {}, // 招聘信息列表
        page: 1, // 当前页数
        limit: 8, // 每页数据条数
        total: 0, // 总条数
        searchObj: {} // 查询条件对象
      };
    },
  
    created() {
      this.query('书籍报刊'); // 获取数据。
    },

    methods: {
      fetchData(page = 1) {
        // 获取数据方法，默认获取第一页数据，也可以传入页数获取指定页数数据。
        this.page = page; // 更新当前页数。
        flea
          .getGoodsPage(this.page, this.limit, this.searchObj)
          .then(response => {
            // 调用API获取数据。
            this.goodsList = response.data.data.items.records; // 更新招聘信息列表。
            this.total = response.data.data.items.total; // 更新总条数。
            console.log(JSON.stringify(this.goodsList)); // 打印招聘信息列表。
          });
      },
  
      query(category) {
        // 查询方法，根据类别查询数据。
        this.searchObj.category = category; // 更新查询条件。
        this.fetchData(); // 获取数据。
      },
  
      queryAll() {
        this.searchObj = {}; // 重置查询条件。
        this.fetchData(); // 获取数据。
      }
    }
  };
</script>
  
  

    