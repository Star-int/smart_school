<template>
    <div class="app-container">
      <div class="goods-container">
        <el-form ref="goodsList" :model="goodsList" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="goodsList.productName" style="width: 600px"></el-input>
          </el-form-item>
  
          <el-form-item label="商品分类">
            <el-select v-model="goodsList.category" placeholder="请选择">
              <el-option label="数码产品" value="数码产品"></el-option>
              <el-option label="体育用品" value="体育用品"></el-option>
              <el-option label="书籍报刊" value="书籍报刊"></el-option>
              <el-option label="其他二手" value="其他二手"></el-option>
            </el-select>
          </el-form-item>
  
          <el-form-item label="交易方式">
            <el-input v-model="goodsList.transactionMethod" style="width: 600px"></el-input>
          </el-form-item>
  
          <el-form-item label="价格">
            <el-input v-model="goodsList.price" style="width: 600px"></el-input>
          </el-form-item>
  
          <!-- <el-form-item label="商品简介">
            <tinymce :height="300" v-model="goodsList.description" />
          </el-form-item>-->
  
          <el-form-item label="商品简介">
            <el-input type="text" v-model="goodsList.description" style="width: 600px"></el-input>
          </el-form-item>
  
          <el-form-item label="商品图片">
            <el-upload
              class="upload-demo"
              action="http://localhost:8222/flea/upload/goods"
              :on-success="handleAvatarSuccess"
              :show-file-list="false"
              :limit="20971520"
            >
              <img :src="this.goodsList.cover" style="height:200px;width:300px;" />
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过20MB</div>
            </el-upload>
          </el-form-item>
  
          <!-- <img :src="companyList.logo" style="height:200px;width:300px;" /> -->
  
          <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
            <router-link :to="'/ucenter/selling'">
              <el-button :disabled="saveBtnDisabled" type="primary" >返回</el-button>
            </router-link>
          
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>
      
<script>
  import goods from "@/api/goods";
  import cookie from "js-cookie";
  //   import Tinymce from "@/components/Tinymce";
  
export default {
    // components: { Tinymce },
  
    data() {
      return {
        goodsList: {
          cover:
            "http://localhost:9528/src/static/img/recruit/company/chaijun.jpg"
        },
        user:{},
  
        saveBtnDisabled: false // 表示保存按钮是否禁用，默认不禁用
      };
    },
  
    created() {
      console.log("created");
  
      this.init();
    },
  
    watch: {
      $route(to, from) {
        console.log("watch $route");
        this.init();
      }
    },
  
    methods: {
      init() {
        this.getUserInfo(); // 获取用户信息，用于获取sellerId
        console.log(this.goodsList.sellerId);
        if (this.$route.params && this.$route.params.id) {
          const id = this.$route.params.id;
          this.fetchDataById(id);
        } else {
          this.goodsList = {
            cover:
              "http://localhost:9528/src/static/img/recruit/company/chaijun.jpg"
          }; // 初始化数据，防止空指针错误
        }
      },
  
      getUserInfo(){
          var jsonStr = cookie.get("guli_ucenter");
        if (jsonStr) {
          try {
            this.user = JSON.parse(jsonStr);
            this.goodsList.sellerId=this.user.id;
            console.log("成功解析 JSON 数据");
          } catch (error) {
            console.error("JSON 解析失败:", error);
          }
        }
  
      },
  
      saveOrUpdate() {
      
        if(this.user.id==null){
          this.$message({type: "error", message: "请先登录"});
          this.$router.push({ path: "/login" }); // 跳转到登录页面
          return false; // 返回false，阻止后续代码执行
  
        }
  
        if (this.goodsList.id) {
          this.updateGoods();
        } else {
          this.saveGoods();
        }
  
       
      },
  
      fetchDataById(id) {
        goods
          .getGoodsById(id)
          .then(response => {
            this.goodsList = response.data.data.items; // 假设响应数据中包含parttimeList字段，并且该字段包含所需的数据
            console.log(JSON.stringify("啊啊啊啊啊啊啊啊啊"+this.goodsList)); // 打印数据，方便调试
          })
          .catch(error => {
            // 处理错误 }
            this.$message({
              type: "error",
              message: "获取数据失败"
            });
          });
      },
  
      saveGoods() {
        // 新增
        goods
          .addGoods(this.goodsList)
          .then(
            repsonse =>
              this.$message({
                // 提示成功信息
                type: "success",
                message: "添加成功!"
              }), // 提示成功信息结束
            this.$router.push({ path: "/ucenter/selling" }) // 跳转到列表页面
          )
          .catch(
            error => {
              // 提示失败信息
              this.$message({
                // 提示失败信息
                type: "error",
                message: "添加失败!" // 提示信息为添加失败
              });
            } // 提示失败信息结束
          ); // 调用recruitment.addRecruit方法结束，并传入this.recruitmentList作为参数
      },
  
      updateGoods() {
        goods
          .updateGoods(this.goodsList)
          .then(response => {
            this.$message(
              {
                type: "success",
                message: "修改成功"
              },
              this.$router.push({ path: "/ucenter/selling" }) // 跳转到列表页面
            );
          })
          .catch(error => {
            this.$message({
              type: "error",
              message: "修改失败"
            });
          });
      }, // 更新方法，待实现
  
      //上传封面成功调用的方法
      handleAvatarSuccess(file) {
        const fileName = file.split("\\").pop(); // 获取图片名称
        this.goodsList.cover =
          "http://localhost:9528/src/static/img/flea/" + fileName;
        console.log("图片名称:", fileName); // 打印封面图片的名称
      },
  
      //图片队列
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      }
    }
  };
</script>
      
      
<style scoped>
  .app-container {
    display: flex;
    justify-content: center; /* 在主轴上水平居中 */
    align-items: center; /* 在交叉轴上垂直居中 */
    height: 120vh; /* 设置容器高度为视口高度 */
  }
  
  .goods-container {
      border: 2px solid #000; /* 边框样式，黑色边框，可以根据需要修改颜色和宽度 */
    background-color: #f0f0f0; /* 背景颜色，灰色背景，可以根据需要修改颜色 */
    padding: 20px; /* 内边距，根据需要调整 */
    box-sizing: border-box; /* 让内边距和边框计入盒模型的总宽度 */
    width: 66%; /* 宽度，根据需要调整 */
    margin-right:220px ;
  }
  
  
  .tinymce-container {
    line-height: 29px;
  }
</style>
       
      