<template>
  <div class="team-content-wrap">
    <div class="team-content">
      <div class="classify-info">
        <div class="classify-info-h1">专业的团队</div>
        <div class="classify-info-h2">最全最便宜的各类二手物品</div>
      </div>
      <div class="team-advantage">
        <ul class="team-advantage-ul">
          <li class="team-advantage-li">
            <img
              src="@/static/icon/all.png"
              alt
              class="team-advantage-li-img"
              width="150px"
              height="150px"
            />
            <div class="team-advantage-li-h1" style="color:#00BFFF; font-size: 24px;">品类最全</div>
            <div class="team-advantage-li-h2" style="font-size:16px;">最全最便宜的各类校园二手物品</div>
          </li>
          <li class="team-advantage-li">
            <img
              src="@/static/icon/second.png"
              alt
              class="team-advantage-li-img"
              width="150px"
              height="150px"
            />
            <div class="team-advantage-li-h1" style="color: #00BFFF; font-size: 24px;">一手信息</div>
            <div class="team-advantage-li-h2" style="font-size:16px;">校园二手第一线信息</div>
          </li>
          <li class="team-advantage-li">
            <img
              src="@/static/icon/customer.png"
              alt
              class="team-advantage-li-img"
              width="150px"
              height="150px"
            />
            <div class="team-advantage-li-h1" style="color: #00BFFF; font-size: 24px;">真实个人</div>
            <div class="team-advantage-li-h2" style="font-size:16px;">各项实名认证 层层把关</div>
          </li>
          <li class="team-advantage-li">
            <img
              src="@/static/icon/paimai.png"
              alt
              class="team-advantage-li-img"
              width="150px"
              height="150px"
            />
            <div class="team-advantage-li-h1" style="color: #00BFFF; font-size: 24px;">帮你卖</div>
            <div class="team-advantage-li-h2" style="font-size:16px;">多种出售方式 帮你卖高价</div>
          </li>
        </ul>
      </div>
    </div>

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

    <section class="tac pt20">
      <a href="/flea/all" title="全部课程" class="comm-btn c-btn-2">全部商品</a>
      <a
            href="/flea/add"
            title="闲置物品"
            class="comm-btn c-btn-2"
            style="margin-right: 80px;color:red"
          >我有闲置物品</a>
    </section>
   


    <div class="buy">
      <div class="buy-content">
        <ul class="buy-content-ul">
          <li class="buy-content-li">
            <!--数码产品-->
            <div class="buy-li-content">
              <div class="buy-li-goods-li-img">
                <a href="/flea/shuma">
                  <img
                    src="@/static/img/flea/shumachanpin.png"
                    style="height: 100px; width: 470px;"
                    alt="描述图片的文字"
                  />
                </a>
              </div>
              <div topic="数码产品" class="buy-li-goods-content">
                <ul class="buy-li-goods-ul">
                  <li v-for="item in shumaList" :key="item.goodsId" class="buy-li-goods-li">
                    <div :goods="item.goodsId" class="buy-li-goods-area"></div>
                    <div class="buy-li-goods-li-content">
                      <div class="buy-li-goods-li-img">
                        <router-link :to="'/flea/'+item.id">
                          <img :src="item.cover" style="height: 150px; width: 150px;" />
                        </router-link>
                      </div>
                      <div class="buy-li-goods-li-title">{{ item.productName }}</div>
                      <div class="buy-li-goods-li-info">
                        <img :src="item.avatar" alt class="buy-li-goods-li-info-avatar" />
                        <div class="buy-li-goods-li-info-price">
                          <div class="buy-li-goods-li-info-price-now">
                            <span>¥</span>
                            {{ item.price }}
                          </div>
                          <div class="buy-li-goods-li-info-price-before"></div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li class="buy-content-li">
            <!--书籍报刊-->
            <div class="buy-li-content">
              <div class="buy-li-goods-li-img">
                <a href="/flea/book">
                  <img
                    src="@/static/img/flea/book.jpg"
                    style="height: 100px; width: 470px;"
                    alt="描述图片的文字"
                  />
                </a>
              </div>
              <div topic="书籍报刊" class="buy-li-goods-content">
                <ul class="buy-li-goods-ul">
                  <li v-for="item in bookList" :key="item.goodsId" class="buy-li-goods-li">
                    <div :goods="item.goodsId" class="buy-li-goods-area"></div>
                    <div class="buy-li-goods-li-content">
                      <div class="buy-li-goods-li-img">
                        <router-link :to="'/flea/'+item.id">
                          <img :src="item.cover" style="height: 150px; width: 150px;" />
                        </router-link>
                      </div>
                      <div class="buy-li-goods-li-title">{{ item.productName }}</div>
                      <div class="buy-li-goods-li-info">
                        <img :src="item.avatar" alt class="buy-li-goods-li-info-avatar" />
                        <div class="buy-li-goods-li-info-price">
                          <div class="buy-li-goods-li-info-price-now">
                            <span>¥</span>
                            {{ item.price }}
                          </div>
                          <div class="buy-li-goods-li-info-price-before"></div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li class="buy-content-li">
            <!--体育用品-->
            <div class="buy-li-content">
              <div class="buy-li-goods-li-img">
                <a href="/flea/sport">
                  <img
                    src="@/static/img/flea/tiyu.jpg"
                    style="height: 100px; width: 470px;"
                    alt="描述图片的文字"
                  />
                </a>
              </div>
              <div topic="体育用品" class="buy-li-goods-content">
                <ul class="buy-li-goods-ul">
                  <li v-for="item in sportList" :key="item.goodsId" class="buy-li-goods-li">
                    <div :goods="item.goodsId" class="buy-li-goods-area"></div>
                    <div class="buy-li-goods-li-content">
                      <div class="buy-li-goods-li-img">
                        <router-link :to="'/flea/'+item.id">
                          <img :src="item.cover" style="height: 150px; width: 150px;" />
                        </router-link>
                      </div>
                      <div class="buy-li-goods-li-title">{{ item.productName }}</div>
                      <div class="buy-li-goods-li-info">
                        <img :src="item.avatar" alt class="buy-li-goods-li-info-avatar" />
                        <div class="buy-li-goods-li-info-price">
                          <div class="buy-li-goods-li-info-price-now">
                            <span>¥</span>
                            {{ item.price }}
                          </div>
                          <div class="buy-li-goods-li-info-price-before"></div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li class="buy-content-li">
            <!--其他二手-->
            <div class="buy-li-content">
              <div class="buy-li-goods-li-img">
                <a href="/flea/other">
                  <img
                    src="@/static/img/flea/pikaqiu.jpg"
                    style="height: 100px; width: 470px;"
                    alt="描述图片的文字"
                  />
                </a>
              </div>
              <div topic="其他二手" class="buy-li-goods-content">
                <ul class="buy-li-goods-ul">
                  <li v-for="item in otherList" :key="item.goodsId" class="buy-li-goods-li">
                    <div :goods="item.goodsId" class="buy-li-goods-area"></div>
                    <div class="buy-li-goods-li-content">
                      <div class="buy-li-goods-li-img">
                        <router-link :to="'/flea/'+item.id">
                          <img :src="item.cover" style="height: 150px; width: 150px;" />
                        </router-link>
                      </div>
                      <div class="buy-li-goods-li-title">{{ item.productName }}</div>
                      <div class="buy-li-goods-li-info">
                        <img :src="item.avatar" alt class="buy-li-goods-li-info-avatar" />
                        <div class="buy-li-goods-li-info-price">
                          <div class="buy-li-goods-li-info-price-now">
                            <span>¥</span>
                            {{ item.price }}
                          </div>
                          <div class="buy-li-goods-li-info-price-before"></div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>

     
      </div>
    </div>

    <div class="bottom-content" style="height:500px; background:#399f67; width:100%;">
      <img
        src="@/static/img/flea/sencondlogo.png"
        style="width: 100%;height: auto;object-fit:cover;margin-top:100px;"
      />
    </div>
  </div>
</template>

<script>
import flea from "@/api/flea";
import cookie from "js-cookie";

export default {
  data() {
    return {
      carouselItems: [
        {
          imageSrc: require("@/static/img/flea/bookbanner.jpeg"),

          alt: "Image 1",
          title: "商品1",
          description: "商品1描述"
        },
        {
          imageSrc: require("@/static/img/flea/bookbanner.jpeg"),

          alt: "Image 2",
          title: "商品2",
          description: "商品2描述"
        },
        {
          imageSrc: require("@/static/img/flea/bookbanner.jpeg"),
          alt: "Image 3",
          title: "商品3",
          description: "商品3描述"
        },
        {
          imageSrc: require("@/static/img/flea/bookbanner.jpeg"),

          alt: "Image 4",
          title: "商品4",
          description: "商品3描述"
        },
        {
          imageSrc: require("@/static/img/flea/bookbanner.jpeg"),

          alt: "Image 5",
          title: "商品5",
          description: "商品3描述"
        },
        {
          imageSrc: require("@/static/img/flea/bookbanner.jpeg"),

          alt: "Image 6",
          title: "商品6",
          description: "商品3描述"
        }
        // 更多商品
      ],

      goodsList: {},
      shumaList: {},
      bookList: {},
      sportList: {},
      otherList: {},
    
    };
  },

  created() {
    this.fetchData();
    console.log("create");
  
    // 以此类推，根据需要访问其他属性
  },

  methods: {
    
 

    fetchData() {
      flea.getBanner().then(response => {
        this.carouselItems = response.data.data.items;
        // console.log(JSON.stringify(this.carouselItems));
      });

      const category1 = "数码产品";
      const category2 = "书籍报刊";
      const category3 = "体育用品";
      const category4 = "其他二手";

      flea
        .getGoodsByCategory(category1)
        .then(response => {
          this.shumaList = response.data.data.items;
        })
        .catch(error => {
          console.error("获取数码产品列表时出错：", error);
          // 在这里添加适当的错误处理，比如向用户显示错误信息或执行其他操作
        });

      flea
        .getGoodsByCategory(category2)
        .then(response => {
          this.bookList = response.data.data.items;
        })
        .catch(error => {
          console.error("获取书籍报刊列表时出错：", error);
          // 在这里添加适当的错误处理，比如向用户显示错误信息或执行其他操作
        });

      flea
        .getGoodsByCategory(category3)
        .then(response => {
          this.sportList = response.data.data.items;
        })
        .catch(error => {
          console.error("获取体育用品列表时出错：", error);
          // 在这里添加适当的错误处理，比如向用户显示错误信息或执行其他操作
        });

      flea
        .getGoodsByCategory(category4)
        .then(response => {
          this.otherList = response.data.data.items;
        })
        .catch(error => {
          console.error("获取其他二手列表时出错：", error);
          // 在这里添加适当的错误处理，比如向用户显示错误信息或执行其他操作
        });
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
    }
  }
};
</script>
  
<style scoped>
.team-content {
  margin-top: 20px;
  background-color: #f9e6e6; /* 淡粉色背景 */
  padding: 20px;
  border-radius: 10px;
  text-align: center; /* 内容居中 */
}

.team-title {
  margin-bottom: 20px;
}

.classify-info-h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
}

.classify-info-h2 {
  font-size: 20px;
  color: #666;
}

.team-advantage-ul {
  margin-bottom: 20px;
  display: flex;
  justify-content: center; /* 水平居中 */
}

.team-advantage-li {
  margin-right: 80px; /* 图片间距增加 */
  margin-bottom: 20px; /* 增加元素之间的垂直间距 */
}

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

.buy {
  display: flex; /* 设置为弹性布局 */
  margin-bottom: 60px;
  margin-left: 18%; /* 向右移动 18% */
}

.buy-li-goods-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* 垂直方向上顶部对齐 */
  flex-direction: row; /* 横向排列 */
}

.buy-content-ul {
  display: flex; /* 设置为弹性布局 */
  flex-wrap: wrap; /* 允许内容换行 */
}

.buy-content-li {
  flex: 0 0 calc(40% - 10px); /* 让每个div项占据容器的三分之一，并留出一些间距 */
  margin-right: 10px; /* 添加右侧间距 */
  margin-bottom: 10px; /* 添加下方间距 */
}

.buy-li-goods-ul {
  display: flex; /* 设置为弹性布局 */
  flex-wrap: wrap; /* 允许内容换行 */
}

.buy-li-goods-li {
  flex: 0 0 calc(33.33% - 10px); /* 让每个商品项占据容器的三分之一，并留出一些间距 */
  margin-right: 10px; /* 添加右侧间距 */
  margin-bottom: 10px; /* 添加下方间距 */
}

.buy-li-goods-li-img {
  margin-bottom: 10px; /* 图片与标题之间的间距 */
}

.buy-li-goods-li-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px; /* 限制标题宽度 */
}

.buy-li-goods-li-info {
  display: flex;
  align-items: center;
}

.buy-li-goods-li-info-price {
  margin-left: auto; /* 将价格信息推到右侧 */
}

.buy-li-goods-li-info-price-now {
  font-size: 16px; /* 设置字体大小 */
  color: red; /* 设置字体颜色为红色 */
}
</style>