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
        <span class="c-333 fsize14">商品列表</span>
      </section>
      <!-- /课程所属分类 结束 -->

      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部商品</span>
        </h2>
      </header>

      <!-- 分类列表 -->
      <section class="c-s-dl">
        <span class="c-999 fsize14">商品类别</span>
        <el-button @click="queryAll" type="text" >全部</el-button>
        <el-button @click="query('数码产品')" type="text" >数码产品</el-button>
        <el-button @click="query('体育用品')" type="text" >体育用品</el-button>
        <el-button @click="query('书籍报刊')" type="text" >书籍报刊</el-button>
        <el-button @click="query('其他二手')" type="text" >其他二手</el-button>
      </section>

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
    this.fetchData(this.page); // 获取数据。
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



<style scoped>
.c-s-dl {
  margin-bottom: 30px; /* 设置分类列表的底部间距 */
  padding: 0 20px; /* 设置分类列表的内边距 */
  background: #fff; /* 设置分类列表的背景色 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 设置分类列表的阴影效果 */
  border-radius: 4px; /* 设置分类列表的圆角 */
  overflow: hidden; /* 设置分类列表的溢出内容隐藏 */
  display: flex; /* 设置分类列表的布局为flex布局 */

  height: 60px; /* 设置分类列表的高度 */
  line-height: 60px; /* 设置分类列表的行高 */
  font-size: 14px; /* 设置分类列表的字体大小 */
  color: #333; /* 设置分类列表的字体颜色 */
  background-color: #dce178; /* 设置分类列表的背景颜色 */
}

.c-s-dl .el-button {
  margin-left:50px ;
  margin-right: 20px; /* 设置每个按钮之间的右侧间距 */
}


.c-s-dl a.active {
  font-weight: bold; /* 设置选中的商品类别链接的字体加粗 */
  text-decoration: underline; /* 设置选中的商品类别链接的下划线 */
}
</style>
  