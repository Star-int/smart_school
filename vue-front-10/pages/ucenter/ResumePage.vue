<template>
  <div class="app-container">
    <!-- 表格 -->

    <el-table :data="resumeList" style="width: 100%" border>
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <i class="el-icon"></i>
          <span style="margin-left: 10px">{{ (page - 1) * limit + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="简历" width="280" heght="100">
        <template slot-scope="scope">
          <img :src="scope.row.cover" @click="showImage(scope.row.cover)" width="200" height="200" />
        </template>
      </el-table-column>

      <el-table-column label="公司名称" width="100" heght="50">
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="岗位" width="100" heght="50">
        <template slot-scope="scope">
          <span>{{ scope.row.positionName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="100" heght="50">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0" style="color: blue;">未查看</span>
          <span v-else-if="scope.row.status === 1" style="color: red;">不符合</span>
          <span v-else-if="scope.row.status === 2" style="color: green;">符合</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
          >编辑</el-button>

          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" width="50%">
      <img :src="currentImage" style="width: 100%;" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible1" width="50%">
      <el-form ref="resumeForm" :model="resume" label-width="80px">
        <el-form-item label="上传简历">
          <el-upload
            class="upload-demo"
            action="http://localhost:8222/recuit/upload/resume"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            :limit="20971520"
          >
            <img :src="this.resume.cover" style="height:200px;width:300px;" />
          </el-upload>
        </el-form-item>

        <!-- 其他简历信息字段 -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取消</el-button>
        <el-button type="primary" @click="submitResume">提交</el-button>
      </span>
    </el-dialog>

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
import resume from "@/api/resume"; // 导入简历接口
import company from "@/api/company"; // 导入公司接口
import ucenter from "@/api/user"; // 导入用户接口
import cookie from "js-cookie";

export default {
  data() {
    return {
      user: {},
      dialogTitle: "",
      companylist: {}, //公司列表，用于存储公司信息
      recruitmentslist: {},
      sellerList: {},
      page: 1, //当前页码
      limit: 4, //每页记录数
      total: "", //总记录数
      resumeList: [], //简历列表，用于存储简历信息
      dialogVisible: false, // 是否显示对话框
      dialogVisible1: false, // 是否显示对话框
      resume: {
        cover: "",
        companyName: "",
        positionName: "",
        id: "",
        userId: "",
        companyId: "",
        recruitmentId: ""
        // 其他简历信息字段
      },
      currentImage: "" // 当前显示的图片地址
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData(page = 1) {
      this.page = page;
      this.getUserInfo();
      resume
        .getUserResume(this.page, this.limit, this.user.id)
        .then(response => {
          this.resumeList = response.data.data.items.records; //获取数据列表
          this.total = response.data.data.items.total;
          console.log(JSON.stringify(this.resumeList)); //打印数据列表到控制台
        })
        .catch(error => {
          console.log(error); //打印错误信息到控制台
        });

      company.getCompanyList().then(response => {
        this.companylist = response.data.data.items;
      });

      ucenter.getSellerList().then(response => {
        this.sellerList = response.data.data.items; //获取数据列表
      });
    },



    showImage(imageUrl) {
      this.currentImage = imageUrl; // 设置当前图片地址
      this.dialogVisible = true; // 打开对话框
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

    handleEdit(row) {
      // 将当前行的数据填充到弹窗中
      this.dialogTitle = "编辑"; // 设置弹窗标题为“编辑”

      this.resume = row; // 使用对象拷贝以避免直接修改原始数据
      this.dialogVisible1 = true; // 显示弹窗
    },

    submitResume() {
      // 在这里提交简历信息，可以调用后端接口保存数据

      resume
        .updateResume(this.resume)
        .then(response => {
          this.$message({
            // 提交成功后的提示信息
            type: "success",
            message: "提交成功!"
          });
          // 提交成功后的处理逻辑，例如提示用户提交成功等操作
        })
        .catch(error => {
          console.log(error); // 打印错误信息到控制台
          this.$message({
            // 提交失败后的提示信息
            type: "error",
            message: "提交失败!"
          });
        });
      this.dialogVisible1 = false;
      // 清空表单数据
      this.$refs.resumeForm.resetFields();
    },

    //上传封面成功调用的方法
    handleAvatarSuccess(file) {
      const fileName = file.split("\\").pop(); // 获取图片名称
      this.resume.cover =
        "http://localhost:9528/src/static/img/recruit/resume/" + fileName;
      console.log("图片名称:", fileName); // 打印封面图片的名称
    },

    //图片队列
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },

    handleDelete(id) {
      this.$confirm("此操作将永久删除该兼职信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          resume.deleteResumeById(id).then(response => {
          
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetchData(); // 重新加载数据列表
          });
         
        }).catch(error => {
          this.$message({
            type: "error",
            message: "删除失败!"
          });
        });
      
    }
  }
};
</script>
  
<style scoped>
</style>