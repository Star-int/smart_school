<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="公司">
        <el-select
          v-model="searchObj.companyName"
          style="width: 200px"
          placeholder="请选择公司"
          @change="handleCompanyChange2"
          filterable
        >
          <el-option
            v-for="item in companylist"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="工作岗位">
        <el-select
          v-model="searchObj.positionName"
          placeholder="请选择对应职位"
          style="width: 200px"
          filterable
          allow-create
          :filter-method="filterPosition"
        >
          <el-option
            v-for="item in recruitmentslist"
            :key="item.id"
            :label="item.positionName"
            :value="item.positionName"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-button
      type="success"
      size="mini"
      icon="el-icon-plus"
      style="height: 42px;"
      @click="addResume"
    >添加简历</el-button>

    <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>

    <!-- 表格 -->

    <el-table :data="resumeList" style="width: 100%"  @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55"></el-table-column>
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
        <el-form-item label="简历">
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

        <el-form-item label="公司ID" style=" width:200px">
          <el-input v-model="resume.companyId" disabled></el-input>
        </el-form-item>

        <el-form-item label="公司名称">
          <!-- <el-input v-model="resume.companyName" placeholder="请输入公司名称"></el-input> -->
          <el-select
            v-model="resume.companyName"
            style="width: 200px"
            placeholder="请选择公司"
            @change="handleCompanyChange"
            filterable
          >
            <el-option
              v-for="item in companylist"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="岗位" style=" width:200px">
          <el-select
            v-model="resume.recruitmentId"
            placeholder="请选择对应职位"
            style="width: 200px"
            @change="handleCompanyChange1"
            filterable
          >
            <el-option
              v-for="item in recruitmentslist"
              :key="item.id"
              :label="item.positionName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="应聘者" style=" width:200px" disabled>
          <el-select
            v-model="resume.userId"
            placeholder="请选择对应招聘者"
            style="width: 200px"
            @change="handleCompanyChange1"
            filterable
          >
            <el-option
              v-for="item in sellerList"
              :key="item.id"
              :label="item.nickname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" style="width: 200px">
          <el-select v-model="resume.status" placeholder="请选择状态" style="width: 200px">
            <el-option label="未查看" value="0"></el-option>
            <el-option label="不符合" value="1"></el-option>
            <el-option label="符合" value="2"></el-option>
          </el-select>
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
import resume from "@/api/recruit/resume"; // 导入简历接口
import company from "@/api/recruit/company"; // 导入公司接口
import ucenter from "@/api/ucenter"; // 导入用户接口

export default {
  data() {
    return {
      selectedResumes: [],
      dialogTitle: "",
      searchObj: {}, // 搜索对象，用于存储搜索条件
      companylist: {}, //公司列表，用于存储公司信息
      recruitmentslist: {},
      sellerList: {},
      page: 1, //当前页码
      limit: 5, //每页记录数
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
      resume
        .getResumePage(this.page, this.limit, this.searchObj)
        .then(response => {
          this.resumeList = response.data.items.records; //获取数据列表
          this.total = response.data.items.total;
          console.log(JSON.stringify(this.resumeList)); //打印数据列表到控制台
        })
        .catch(error => {
          console.log(error); //打印错误信息到控制台
        });

      company.getCompanyList().then(response => {
        this.companylist = response.data.items;
      });

      ucenter.getSellerList().then(response => {
        this.sellerList = response.data.items; //获取数据列表
      });
    },
    filterPosition(query) {
      if (query) {
        // 如果有输入，使用包含查询字符串的岗位名称过滤列表
        return this.recruitmentslist.filter(item => {
          return (
            item.positionName.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        });
      } else {
        // 如果没有输入，返回全部岗位名称列表
        return this.recruitmentslist;
      }
    },

    showImage(imageUrl) {
      this.currentImage = imageUrl; // 设置当前图片地址
      this.dialogVisible = true; // 打开对话框
    },

    addResume() {
      this.resume = {}; // 清空表单数据，避免数据残留
      this.dialogTitle = "新增"; // 设置弹窗标题为“新增”
      this.dialogVisible1 = true; // 打开对话框
    },

    handleEdit(row) {
      // 将当前行的数据填充到弹窗中
      this.dialogTitle = "编辑"; // 设置弹窗标题为“编辑”

      this.resume = row; // 使用对象拷贝以避免直接修改原始数据
      this.getRecuitments(row.companyId); // 获取公司下的岗位列表
      this.dialogVisible1 = true; // 显示弹窗
    },

    submitResume() {
      // 在这里提交简历信息，可以调用后端接口保存数据
      if (this.dialogTitle === "新增") {
        resume
          .addResume(this.resume)
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
            // 提交失败后的处理逻辑，例如提示用户提交失败等操作
          });
        // 提交成功后关闭对话框
        this.dialogVisible1 = false;

        // 清空表单数据
        this.$refs.resumeForm.resetFields();
      } else if (this.dialogTitle === "编辑") {
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
      }
      // 提交成功后重新加载数据列表，以更新页面显示的数据
      //刷新表单数据
      this.fetchData(this.page); // 重新加载数据列表
    },

    resetData() {
      this.searchObj = {}; // 重置查询条件
      this.fetchData(); // 重新加载数据列表
    },

    getRecuitments(companyId) {
      company.getCompanyJobList(companyId).then(response => {
        this.recruitmentslist = response.data.items; //获取数据列表
      });
    },

    handleCompanyChange() {
      const selectedCompany = this.companylist.find(
        company => company.name === this.resume.companyName
      );
      if (selectedCompany) {
        this.resume.companyId = selectedCompany.id;
        this.getRecuitments(selectedCompany.id); // 获取公司下的岗位列表
      }
    },

    handleCompanyChange2() {
      const selectedCompany = this.companylist.find(
        company => company.name === this.searchObj.companyName
      );
      if (selectedCompany) {
        this.getRecuitments(selectedCompany.id); // 获取公司下的岗位列表
      }
    },

    handleCompanyChange1() {
      const selectedRecruitment = this.recruitmentslist.find(
        recruitment => recruitment.id === this.resume.recruitmentId
      );
      if (selectedRecruitment) {
        this.resume.positionName = selectedRecruitment.positionName; // 设置岗位
      }
      console.log("selectedRecruitment:" + JSON.stringify(selectedRecruitment)); // 打印选中的岗位信息，方便调试
      console.log("recruitmentId:" + this.resume.positionName); // 打印选中的岗位ID，方便调试
    },

  

    //上传封面成功调用的方法
    handleAvatarSuccess(file) {
      const fileName = file.split("\\").pop(); // 获取图片名称
      this.resume.cover =
        "http://localhost:9528/src/static/img/recruit/resume/" + fileName;
      console.log("图片名称:", fileName); // 打印封面图片的名称
      this.$forceUpdate();
    },

    //图片队列
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },

    
    handleSelectionChange(selection) {
      this.selectedResumes = selection;
    },

    handleBatchDelete() {
      if (this.selectedResumes.length === 0) {
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
        const selectedIds = this.selectedResumes.map(item => item.id);
        
        resume
          .deteleBrach(selectedIds)
          .then(response => {
            this.fetchData(this.page); // 重新加载数据列表
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
      this.$confirm("此操作将永久删除该兼职信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          resume.deleteResumeById(id);
        })
        .then(response => {
          this.fetchData(this.page); // 重新加载数据列表
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

<style scoped>
</style>