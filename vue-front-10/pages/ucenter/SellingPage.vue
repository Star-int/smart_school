
<template>
  <div class="app-container">
 

    <!--表格-->
    <section class="tac pt20">
      <a
        href="/flea/add"
        title="再卖一件"
        class="comm-btn c-btn-2"
        style="margin-right: 1000px;color:red"
      >再卖一件</a>
    </section>
    <el-table :data="goodsList" style="width: 100%" border>
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <i class="el-icon"></i>
          <span style="margin-left: 10px">{{ (page - 1) * limit + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="商品图片" width="200" prop="cover">
        <template slot-scope="scope">
          <router-link :to="'/flea/'+scope.row.id">
          <img :src="scope.row.cover" style="height: 100px; width: 100%;object-fit: cover;" />
          </router-link>
        </template>
          
      </el-table-column>

      <el-table-column label="商品名称" width="100" prop="productName">
        <template slot-scope="scope">
          <span>{{ scope.row.productName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="交易方式" width="100px" prop="transactionMethod">
        <template slot-scope="scope">
          <span>{{ scope.row.transactionMethod }}</span>
        </template>
      </el-table-column>

      <el-table-column label="商品描述" width="180px" prop="description">
        <template slot-scope="scope">
          <div class="description-container">
            <el-tooltip class="item" effect="dark" :content="scope.row.description" placement="top">
              <span v-html="scope.row.description"></span>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="商品价格" width="100" prop="price" sortable>
        <template slot-scope="scope">
          <span>￥{{ scope.row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="100" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            @change="handleChangeStatus(scope.row.id, scope.row.status)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
          <span>{{ scope.row.status ? "上架" : "下架" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" >
        <template slot-scope="scope">
          <router-link :to="'/flea/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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
import goods from "@/api/goods";
import cookie from "js-cookie";

export default {
  data() {
    return {
      goodsList: [], //数据列表
      user:{},
      searchObj: {
        productName: "",
        price: "",
        category: ""
      }, //查询条件对象
      page: 1, //当前页码
      limit: 6, //每页记录数
      total: "" //总记录数
    };
  },

  created() {
    //页面加载就调用该方法，获取数据列表

    this.fetchData();
  },

  methods: {
    fetchData(page = 1) {
      this.getUserInfo();
      this.page = page;
      console.log(this.page); //打印当前页码到控制台
      console.log(this.limit); //打印查询条件到控制台
      goods
        .getGoodsFrontPage(this.page, this.limit, this.user.id)
        .then(response => {
          this.goodsList = response.data.data.items.records; //获取数据列表
          this.total = response.data.data.items.total;
          console.log(JSON.stringify(this.goodsList)); //打印数据列表到控制台
        })
        .catch(error => {
          console.log(error); //打印错误信息到控制台
        });
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

    handleChangeStatus(id, status) {
      goods.upOrDownGoods(id, status).then(response =>{
        if(status===true){
          this.$message({type:'success',message:'上架成功'})//提示上架成功信息
        }else{
          this.$message({type:'success',message:'下架成功'})//提示下架成功信息
        }

      });
    },

    resetData() {
      this.searchObj = {
        productName: "",
        price: "",
        category: ""
      }; //重置查询条件对象为空，以清空查询条件
      this.fetchData(); //重新加载数据列表，以显示所有数据。
    },

    // handleDelete(id) {
    //   this.$confirm("此操作将永久删除该商品，是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       goods.deleteGoods(id);
    //       this.fetchData();
    //     })
    //     .then(response => {
        
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!"
    //       });
    //     })
    //     .catch(error => {
    //       this.$message({
    //         type: "error",
    //         message: "删除失败!"
    //       });
    //     });
       
    // }
       
     handleDelete(id) {
       this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
         confirmButtonText: "确定",
         cancelButtonText: "取消",
         type: "warning"
       }).then(() => {
        goods.deleteGoods(id).then(response => {
          this.fetchData(); // 删除后重新加载数据列表，以显示所有数据。
        this.$message({type: 'success', message: '删除成功!'}); // 提示删除成功信息。
           
        }).catch(error => { // 捕捉删除操作的错误。
          this.$message({type: 'error', message: '删除失败!'}); // 提示删除失败信息。
        });
       
       })
    }
    


  }
};
</script>


<style>

.app-container{

  justify-content: center; /* 水平居中 */
  margin-left:200px ;
  margin-top:-70px;
  width: 100%;
 
 
}

.description-container {
  width: 180px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.description-text {
  cursor: pointer;
}
</style>
      
    