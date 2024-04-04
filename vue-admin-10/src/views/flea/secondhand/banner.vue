<template>
  <div class="app-container">
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
          <div class="carousel-item-content" @click="showArrow(index)">
            <img :src="item.cover" class="carousel-item-image" />
            <div class="carousel-item-text">
              <div class="carousel-item-title">{{index + 1}}.{{ item.productName }}</div>
             
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>



    <!-- 弹窗 -->
    <el-dialog :visible.sync="dialogVisible" title="轮播图信息">
      <span>商品id: {{ currentCarouselItem.id }}</span>
      <br />
      <span>商品名称: {{ currentCarouselItem.productName }}</span>
      <br />
      <span  v-html="currentCarouselItem.description"> </span>
      <br />
     
      <img :src="currentCarouselItem.cover" style="height: 200px; width:200px" alt="商品图片" />
      <br />

      <div class="carousel-item-action" >
      <!-- 在这里添加其他需要显示的信息 -->
      <el-select v-model="changeId" placeholder="请选择要更换的商品" filterable @change="handleChange">
        <el-option
          v-for="goods in goodsList"
          :key="goods.id"
          :label="goods.productName"
          :value="goods.id"
        >
         <!-- 添加商品图片 -->
      <img :src="goods.cover" class="select-item-image" slot="prefix" />
        </el-option>
      </el-select>
      <br />
      <el-button type="success" @click="changeGoods(goodsId)">更换商品</el-button>
      </div>

    </el-dialog>
  </div>
</template>
  
<script>
import banner from "@/api/flea/banner";
import goods from "@/api/flea/goods";

export default {
  data() {
    return {
      carouselItems: {},
      goodsList: {}, // 商品列表数据
      dialogVisible: false, // 控制弹窗显示隐藏
      currentCarouselItem: {}, // 当前轮播项信息
      changeId:"",
      goodsId:"",
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
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

    fetchData() {
      banner.getCarousel().then(response => {
        this.carouselItems = response.data.items; // 获取商品列表数据，并赋值给carouselItems变量。具体数据结构需要根据接口返回的数据来确定。
      });

      goods.getAllGoods().then(response => {
        this.goodsList = response.data.items; // 获取商品列表数据，并赋值给goodsList变量。具体数据结构需要根据接口返回的数据来确定。
      });
    },

    handleChange(value) {
    // 根据选择的商品ID更新当前选中的商品信息
    this.currentCarouselItem = this.goodsList.find(item => item.id === value);
    },

    showArrow(index) {
      // 获取当前轮播项信息
      this.currentCarouselItem = this.carouselItems[index];
      this.goodsId=this.carouselItems[index].id;
      console.log(this.goodsId);
      // 显示弹窗
      // 打开弹窗
      this.dialogVisible = true;
    },

    changeGoods(goodsid) {
      if (this.changeId==null) {
        this.$message({ message: "请选择要更换的商品", type: "warning" });
        return false; // 阻止代码继续执行，或者抛出异常。具体根据你的业务逻辑来决定。
      }

      banner
        .changeBanner(goodsid, this.changeId)
        .then(response => {
          this.fetchData();
          this.$message({
            message: "更换成功",
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
        });

      this.dialogVisible = false; // 关闭弹窗
      this.changeId = ""; // 重置选择框的值
      this.goodsId = "";
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

.carousel-item-action {
  position: absolute;
  top: 100px; /* 向上移动10px */
  right: 200px; /* 向右移动10px */
}
</style>
  
  
