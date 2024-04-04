<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->

          <section class="path-wrap txtOf hLh30">
            <a href="/" title class="c-999 fsize14">首页</a>
            \
            <a href="/learn" title class="c-999 fsize14">学习</a>
            \
            <span class="c-333 fsize14">老师列表</span>
          </section>

          <!-- /数据列表 开始-->
          <article v-if="data.total>0" class="i-teacher-list">
            <ul class="of">
              <li v-for="item in teachers" :key="item.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="'/teacher/'+item.id" :title="item.name">
                      <img :src="item.avatar" :alt="item.name" height="142" hright="142" />
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a
                      :href="'/teacher/'+item.id"
                      :title="item.name"
                      class="fsize18 c-666"
                    >{{ item.name }}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{ item.career }}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{ item.intro }}</p>
                  </div>
                </section>
              </li>
            </ul>
            <div class="clear" />
          </article>
          <!-- /数据列表 结束-->
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a href="#" title="首页" @click.prevent="gotoPage(1)">首</a>
            <a href="#" title="前一页" @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)"
            >{{ page }}</a>
            <a
              :class="{ undisable: hasNextPage }"
              href="#"
              title="后一页"
              @click.prevent="hasNextPage? gotoPage(data.current + 1) : null"
            >&gt;</a>

            <a href="#" title="末页" @click.prevent="gotoPage(data.pages)">末</a>
            <div class="clear" />
          </div>
        </div>
      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>


<script>
import teacher from "@/api/teacher";
export default {
  data() {
    return {
      data: {}, // 用于存储响应数据中的rows属性
      teachers: {},
      page: 1, // 当前页码数，默认为第一页
      current: 8, // 每页显示的记录数，默认为3条
      hasNextPage: true // 是否有下一页
    };
  },

  created() {
    this.getData(this.page, this.current);
  },

  methods: {
    getData(page, current) {
      teacher.getPageList(page, current).then(response => {
        // console.log(response.data.data);
        // console.log(JSON.stringify(response.data.data)); // 打印响应数据中的rows属性
        this.data = response.data.data.items; // 将响应数据中的rows属性赋值给data变量
        this.teachers = response.data.data.items.records;
        console.log(JSON.stringify(this.teachers));
        if (page == this.data.pages) {
          this.hasNextPage = false; // 没有下一页了
          console.log("没有下一页了");
        } else {
          this.hasNextPage = true; // 还有下一页
          console.log("还有下一页");
        }
      });
    },

    gotoPage(page) {
      this.getData(page, this.current); // 调用方法获取数据
    }
  }
};
</script>