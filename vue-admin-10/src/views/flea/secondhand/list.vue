<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="searchObj.productName" placeholder="商品名称" />
      </el-form-item>

      <el-form-item label="商品分类">
        <el-select v-model="searchObj.category" placeholder="商品分类">
          <el-option label="数码产品" value="数码产品"></el-option>
          <el-option label="体育用品" value="体育用品"></el-option>
          <el-option label="书籍报刊" value="书籍报刊"></el-option>
          <el-option label="其他二手" value="其他二手"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品价格">
        <el-input v-model="searchObj.price" placeholder="输入查询比该价格低的" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!--表格-->
    <router-link :to="'/flea/save'">
      <el-button type="success" size="mini" icon="el-icon-plus" style="height: 42px;">添加商品信息</el-button>
    </router-link>
    <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
    <el-table
      :data="goodsList"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <i class="el-icon"></i>
          <span style="margin-left: 10px">{{ (page - 1) * limit + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="商品图片" width="200" prop="logo">
        <template slot-scope="scope">
          <img :src="scope.row.cover" style="height: 100px; width: 100%;object-fit: cover;" />
        </template>
      </el-table-column>

      <el-table-column label="商品名称" width="100" prop="name">
        <template slot-scope="scope">
          <span>{{ scope.row.productName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="交易方式" width="100px" prop="address">
        <template slot-scope="scope">
          <span>{{ scope.row.transactionMethod }}</span>
        </template>
      </el-table-column>

      <el-table-column label="商品描述" width="180" prop="website">
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

      <el-table-column label="操作">
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
import goods from "@/api/flea/goods";

export default {
  data() {
    return {
      selectedGoods: [], // 存储用户选择的商品
      goodsList: [], //数据列表
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
      this.page = page;
      console.log(this.page); //打印当前页码到控制台
      console.log(this.limit); //打印查询条件到控制台
      goods
        .getGoodsPage(this.page, this.limit, this.searchObj)
        .then(response => {
          this.goodsList = response.data.items.records; //获取数据列表
          this.total = response.data.items.total;
          console.log(JSON.stringify(this.goodsList)); //打印数据列表到控制台
        })
        .catch(error => {
          console.log(error); //打印错误信息到控制台
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

    handleChangeStatus(id, status) {
      goods.upOrDownGoods(id, status).then(response => {
        if (status === true) {
          this.$message({ type: "success", message: "上架成功" }); //提示上架成功信息
        } else {
          this.$message({ type: "success", message: "下架成功" }); //提示下架成功信息
        }
      });
    },

    handleSelectionChange(selection) {
      this.selectedGoods = selection;
    },

    handleBatchDelete() {
      if (this.selectedGoods.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的记录!'
        })
        return
      }

      this.$confirm("此操作将永久删除这些信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const selectedIds = this.selectedGoods.map(item => item.id);
        
        goods
          .deleteGoodsbrach(selectedIds)
          .then(response => {
            this.fetchData(); // 重新加载数据列表
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(error => {
            this.$message({
              type: "error",
              message: "删除失败!"
            });
          });
      });
    },

    handleDelete(id) {
      this.$confirm("此操作将永久删除该商品信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          goods.deleteGoods(id);
        })
        .then(response => {
          this.fetchData(); // 重新加载数据列表
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "删除失败!"
          });
        });
    }
  }
};
</script>


<style>
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
      
    