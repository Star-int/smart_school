<template>
  <div>
    <div v-if="Object.keys(goodsInfo).length > 0" class="goods-container">
      <section class="path-wrap txtOf hLh30" style="margin-left: 100px;">
        <a href="/" title class="c-999 fsize14">首页</a>
        \
        <a href="/flea/all" title class="c-999 fsize14">全部商品</a>
        \
        <span class="c-333 fsize14">商品详情</span>
      </section>
      <div class="goods-info">
        <img
          :src="goodsInfo.cover"
          alt="商品封面"
          style="height: 390px; width: 390px; margin-left: 200px;border: 1px solid #ccc; 
           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"
        />

        <div class="goods-details">
          <h1>{{ goodsInfo.productName }}</h1>

          <el-descriptions class="goodsInfo" :column="1" size="medium" border>
            <el-descriptions-item
              label-style="background-color: #B3E6F5;width:10px"
              content-style="background-color: #E1F3D8; width:100px"
            >
              <template slot="label">
                <i class="el-icon-money"></i>
                价格
              </template>
              {{ goodsInfo.price }}元
            </el-descriptions-item>

            <el-descriptions-item
            label-style="background-color: #B3E6F5;width:10px"
              content-style="background-color: #E1F3D8; width:100px"
            >
              <template slot="label">
                <i class="el-icon-s-ticket"></i>
                类别
              </template>
              {{ goodsInfo.category }}
            </el-descriptions-item>

            <el-descriptions-item
            label-style="background-color: #B3E6F5;width:10px"
              content-style="background-color: #E1F3D8; width:100px"
            >
              <template slot="label">
                <i class="el-icon-s-order"></i>
                商品描述
              </template>
              <p v-html="goodsInfo.description"></p>
            </el-descriptions-item>

            <el-descriptions-item
              label="发布时间"
              label-style="background-color: #B3E6F5;width:10px"
              content-style="background-color: #E1F3D8; width:100px"
            >
              <template slot="label">
                <i class="el-icon-date"></i>
                发布时间
              </template>
              {{goodsInfo.gmtCreate}}
            </el-descriptions-item>
          </el-descriptions>

           <h2>卖家信息</h2>
          <img :src="sellerInfo.avatar" alt style="width: 90px;height: 90px;" />
          <el-descriptions style="margin-left:100px;margin-top:-95px" :column="1" border>
            <el-descriptions-item
            label-style="background-color: #B3E6F5;width:10px"
              content-style="background-color: #E1F3D8; width:100px"
            >
              <template slot="label">
                <i class="el-icon-user"></i>
                卖家昵称
              </template>
              {{ sellerInfo.nickname }}
            </el-descriptions-item>
            <el-descriptions-item
            label-style="background-color: #B3E6F5;width:10px"
              content-style="background-color: #E1F3D8; width:100px"
            >
              <template slot="label">
                <i class="el-icon-phone"></i>
                卖家联系方式
              </template>
              {{ sellerInfo.mobile }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>

      <div>
        <el-button style="margin-left: 1000px;" @click="toggleFavorite">
          <i :class="isFavorite ? 'el-icon-star-on' : 'el-icon-star-off'"></i> 加入收藏
        </el-button>
      </div>

      <div class="goods-order">
        <h1 style="margin-left: 150px; color:chocolate;">推荐其他商品：</h1>

        <div class="recommend-container">
          <div
            v-for="recommendItem in recommendList"
            :key="recommendItem.id"
            class="recommend-item"
          >
            <router-link :to="'/flea/'+recommendItem.id">
              <img :src="recommendItem.cover" alt="商品封面" class="recommend-img" />
            </router-link>
            <div class="recommend-info">
              <p v-html="recommendItem.productName"></p>
              <p>价格: {{ recommendItem.price }}元</p>
              <!-- 添加其他商品信息 -->
            </div>
          </div>
        </div>

        <div class="mt50 commentHtml">
          <div>
            <h6 class="c-c-content c-infor-title" id="i-art-comment">
              <span class="commentTitle">商品评论</span>
            </h6>
            <section class="lh-bj-list pr mt20 replyhtml">
              <ul>
                <li class="unBr">
                  <aside class="noter-pic">
                    <img width="50" height="50" class="picImg" src="~/assets/img/avatar-boy.gif" />
                  </aside>
                  <div class="of">
                    <section class="n-reply-wrap">
                      <fieldset>
                        <textarea
                          name
                          v-model="comment.content"
                          placeholder="输入您要评论的文字"
                          id="commentContent"
                        ></textarea>
                      </fieldset>
                      <p class="of mt5 tar pl10 pr10">
                        <span class="fl">
                          <tt class="c-red commentContentmeg" style="display: none;"></tt>
                        </span>
                        <input type="button" @click="addComment()" value="回复" class="lh-reply-btn" />
                      </p>
                    </section>
                  </div>
                </li>
              </ul>
            </section>
            <section class>
              <section class="question-list lh-bj-list pr">
                <ul class="pr10">
                  <li v-for="(comment,index) in data.items" v-bind:key="index">
                    <aside class="noter-pic">
                      <img width="50" height="50" class="picImg" :src="comment.avatar" />
                    </aside>
                    <div class="of">
                      <span class="fl">
                        <font class="fsize12 c-blue">{{comment.nickname}}</font>
                        <font class="fsize12 c-999 ml5">评论：</font>
                      </span>
                    </div>
                    <div class="noter-txt mt5">
                      <p>{{comment.content}}</p>
                    </div>
                    <div class="of mt5">
                      <span class="fr">
                        <font class="fsize12 c-999 ml5">{{comment.gmtCreate}}</font>
                      </span>
                    </div>
                  </li>
                </ul>
              </section>
            </section>

            <!-- 公共分页 开始 -->
            <div class="paging">
              <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
              <a
                :class="{undisable: !data.hasPrevious}"
                href="#"
                title="首页"
                @click.prevent="gotoPage(1)"
              >首</a>
              <a
                :class="{undisable: !data.hasPrevious}"
                href="#"
                title="前一页"
                @click.prevent="gotoPage(data.current-1)"
              >&lt;</a>
              <a
                v-for="page in data.pages"
                :key="page"
                :class="{current: data.current == page, undisable: data.current == page}"
                :title="'第'+page+'页'"
                href="#"
                @click.prevent="gotoPage(page)"
              >{{ page }}</a>
              <a
                :class="{undisable: !data.hasNext}"
                href="#"
                title="后一页"
                @click.prevent="gotoPage(data.current+1)"
              >&gt;</a>
              <a
                :class="{undisable: !data.hasNext}"
                href="#"
                title="末页"
                @click.prevent="gotoPage(data.pages)"
              >末</a>
              <div class="clear" />
            </div>
            <!-- 公共分页 结束 -->
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import flea from "../../api/flea";
import comment from "../../api/commentflea";
import collect from "../../api/collect";
import cookie from "js-cookie";

export default {
  data() {
    return {
      id: this.$route.params.id, // 获取路由中的id参数，用于查询商品信息
      goodsInfo: {}, // 存储商品信息的数据结构，具体字段根据需求定义
      recommendList: {}, // 存储推荐商品信息的数据结构，具体字段根据需求定义
      sellerInfo: {}, // 存储卖家信息的数据结构，具体字段根据需求定义
      data: {},
      page: 1,
      limit: 4,
      total: 10,
      isFavorite: false,
      comment: {
        content: "",
        courseId: ""
      },
      collectInfo: {},
      user: {}
    };
  },

  created() {
    // 页面加载时执行的代码块，可以在这里调用接口获取商品信息
    this.getInfoById(this.id); // 调用获取商品信息的方法，传入id参数
    this.initComment(); // 调用初始化评论的方法，传入id参数，用于获取评论信息
    this.getUserInfo(); // 调用获取用户信息的方法，用于获取用户信息，判断是否已收藏该页面
  },

  methods: {
    // 定义页面中的方法，用于处理业务逻辑等
    getInfoById(id) {
      // 获取商品信息的方法，具体实现根据接口文档定义
      flea.getGoodsById(id).then(res => {
        // 调用接口获取商品信息，具体接口方法根据实际情况定义，这里假设为getGoodsById(id)，返回一个Promise对象，res为接口返回的数据
        this.goodsInfo = res.data.data.items;
        flea.getGoodsByCategory(this.goodsInfo.category).then(res => {
          this.recommendList = res.data.data.items;
        });
        flea.getSellerInfoBySellerId(this.goodsInfo.sellerId).then(res => {
          this.sellerInfo = res.data.data.items;
          console.log(JSON.stringify(this.sellerInfo)); // 输出卖家信息，用于调试
        });
      });
    },

    getUserInfo() {
      var jsonStr = cookie.get("guli_ucenter");
      if (jsonStr) {
        try {
          this.user = JSON.parse(jsonStr);
          console.log("成功解析 JSON 数据");
        } catch (error) {
          console.error("JSON 解析失败:", error);
        }
      }
    },

    initComment() {
      comment.getPageList(this.page, this.limit, this.id).then(response => {
        this.data = response.data.data;
        console.log(JSON.stringify(this.data)); // 输出评论信息，用于调试
      });
    },

    addToFavorites() {
      // 将页面添加到收藏夹的逻辑
    },

    toggleFavorite() {
      this.collectInfo.goodsId = this.id;
      this.collectInfo.userId = this.user.id;
      if (this.user.id == null) {
        this.$message({ type: "error", message: "请先登录" });
        this.$router.push({ path: "/login" }); // 跳转到登录页面
        return false; // 返回false，阻止后续代码执行
      }

      collect.addCollect(this.collectInfo).then(response => {
        if (response.data.success) {
          this.isFavorite = true; // 收藏成功后，将isFavorite设置为true，表示已收藏
          this.$message({
            type: "success",
            message: "收藏成功!"
          });
        } else {
          this.$message({
            type: "error",
            message: "收藏失败!"
          });
        }
      });
    },

    addComment() {
      this.comment.goodsId = this.id;
      this.comment.sellerId = this.goodsInfo.sellerId;
      comment.addComment(this.comment).then(response => {
        if (response.data.success) {
          this.comment.content = "";
          this.initComment();
        }
      });
    },

    gotoPage(page) {
      comment.getPageList(page, this.limit, this.id).then(response => {
        this.data = response.data.data;
      });
    }
  }
};
</script>


<style scoped>
.goods-container {
  background-color: #f0ead6; /* 卡其色背景 */
  padding: 20px; /* 添加一些内边距以增加美观度 */
  border-radius: 8px; /* 添加圆角以使容器更具吸引力 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影以增加立体感 */
}

.goods-info {
  display: flex; /* 使用 Flexbox 布局 */
  height: 300px; /* 设置容器高度 */
  margin-bottom: 100px;
}

.goods-details {
  height: 370px;
  width: 600px;

  
  font: 14px/1.5 "Microsoft YaHei", sans-serif; /* 设置字体样式 */
  color: #333; /* 设置文字颜色 */
  line-height: 1.5; /* 设置行高 */
  background-color: rgba(255, 165, 0, 0.5); /* 白色背景，半透明度为50% */

  padding: 10px; /* 添加一些内边距以增加美观度 */
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.goods-order {
  margin-top: 20px;
}

.recommend-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px; /* 添加一些底部外边距 */
  margin-left: 200px;
}

.recommend-item {
  background-color: #f5f9fa; /* 白色背景 */
  padding: 10px; /* 添加一些内边距以增加美观度 */
  width: 300px;
  height: 300px;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recommend-img {
  width: 200px;
  height: 200px;
  margin: 10px auto 0; /* 居中显示图片 */
  display: block; /* 防止图片下方出现空白 */
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.recommend-info {
  padding: 10px;
}

.recommend-info p {
  margin: 5px 0;
  margin-left: 50px;
  font-size: 20px;
  color: #333;
}

.my-label {
  background: #4ac80b;
}
</style>