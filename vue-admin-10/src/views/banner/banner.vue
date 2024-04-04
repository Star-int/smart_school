<template>
  <div class="app-container">
    <!-- 轮播图 -->
    <el-button type="success" @click="handleAddBanner">添加新的轮播图</el-button>

    <el-carousel class="carousel-container" arrow="always">
      <el-carousel-item v-for="(item, index) in allList" :key="index">
        <div class="carousel-item-content">
          <img class="carousel-item-image" :src="item.imageUrl" :alt="item.title" />
        </div>
      </el-carousel-item>
    </el-carousel>

    <el-table :data="bannerList" border >
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <i class="el-icon"></i>
          <span style="margin-left: 10px">{{scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title" width="80"></el-table-column>

      <el-table-column label="图片地址" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.imageUrl" height="100" width="180" />
        </template>
      </el-table-column>

      <el-table-column label="跳转链接" prop="linkUrl" width="180"></el-table-column>

      <el-table-column label="序列" prop="sort" width="180"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
         
            <el-button type="primary" size="mini" icon="el-icon-edit"  @click="handleEditBanner(scope.row.id)">编辑</el-button>
    
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 用el-diag新增banner -->
    <el-dialog :title="this.diagTitel" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form :model="formInfo" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="formInfo.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <el-upload
            class="upload-demo"
            action="http://localhost:8222/educms/upload/banner"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            :limit="20971520"
          >
            <img
              :src="formInfo.imageUrl"
              style="height:200px;width:300px;"
            />
           
          </el-upload>
      </el-form-item>

        <el-form-item label="跳转链接">
          <el-input v-model="formInfo.linkUrl" autocomplete="off"></el-input>
        </el-form-item>  
         
        <el-form-item label="序列">
            <el-input v-model="formInfo.sort" autocomplete="off"></el-input>
        </el-form-item>


        <div>
          <el-button @click="dialogFormVisible = false"  style="margin-left:230px ;">取消</el-button>
        <el-button type="primary"  @click="sumbit()" >确定</el-button>
        </div>
      

        
      </el-form>
    </el-dialog>

    <!--分页-->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="parseInt(total)"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="initDataBanner"
    />
  </div>
</template>
  
<script>
import banner from "@/api/lunbo/banner";

export default {
  data() {
    return {

      diagTitel:"",
      //轮播图数组
      allList: [],
      bannerList: [],
      page: 1, //当前页码
      limit: 3, //每页记录数
      total: "", //总记录数
      dialogFormVisible: false,
      formInfo: {} // 表单数据对象，用于存储表单数据
    };
  },

  created() {
    this.initDataBanner();
  },

  methods: {
    initDataBanner(page = 1) {
      this.page = page; // 设置当前页码为传入的页码或1（如果未传入）

      banner.getPageBanner(this.page, this.limit).then(response => {
        this.bannerList = response.data.items;
        this.total = response.data.total; // 更新总记录数
      });

      banner.getList().then(response => {
        // 获取所有轮播图数据，用于展示在轮播图组件中
        this.allList = response.data.items; // 更新轮播图数组为所有数据，用于展示在轮播图组件中
      });
    },

    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        banner.removeBanner(id).then(response => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.initDataBanner(); // 重新加载数据列表
        });
      });
    },

      //上传封面成功调用的方法
      handleAvatarSuccess(file) {
      const fileName = file.split("\\").pop(); // 获取图片名称
      this.formInfo.imageUrl =
        "http://localhost:9528/src/static/img/banner/" + fileName;
      console.log("图片名称:", fileName); // 打印封面图片的名称
      this.$forceUpdate();
    },

    //图片队列
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },

    handleAddBanner() {
      this.diagTitel="新增"
      this.formInfo={}
      this.dialogFormVisible = true; // 显示表单对话框，用于添加新的轮播图数据

    },

    handleEditBanner(id){
      this.diagTitel="编辑"
      this.dialogFormVisible = true; // 显示表单对话框，用于编辑轮播图数据
      banner.getBannerById(id).then(response => { // 根据id获取轮播图数据，用于编辑表单数据对象formInfo
        this.formInfo = response.data.item; // 更新表单数据对象formInfo为根据id获取到的数据，用于编辑表单数据对象formInfo
      });
    },

    sumbit(){
      if(this.diagTitel=="新增"){
      banner.saveBanner(this.formInfo).then(response => { // 调用添加轮播图数据的方法，将表单数据对象formInfo作为参数传递进去，用于添加新的轮播图数据到数据库中
          this.$message({ // 弹出消息提示框，提示用户添加成功
            type: "success", // 消息类型为成功类型
            message: "添加成功!" // 消息内容为添加成功!
          })
          this.initDataBanner(this.page)
      })
      }
      if(this.diagTitel=="编辑"){
        banner.updateBanner(this.formInfo).then(response => { // 调用编辑轮播图数据的方法，将表单数据对象formInfo作为参数传递进去，用于编辑轮播图数据到数据库中
            this.$message({ // 弹出消息提示框，提示用户编辑成功
              type: "success", // 消息类型为成功类型
              message: "编辑成功!" // 消息内容为编辑成功!
        })
        this.initDataBanner(this.page)


      })
     
      }
      this.formInfo={},
       this.dialogFormVisible=false 
    },



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
  
  
