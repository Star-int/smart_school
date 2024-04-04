<template>
  <div id="app">
    <!-- 表格 -->

    <el-button type="success" size="mini" @click=" showAddOneLevelDialog">添加一级分类</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column label="标题" width="120">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <!-- 嵌套表格 -->
      <el-table-column label="Children" align="center">
        <template slot-scope="scope">
          <el-table :data="scope.row.children" border>
            <!-- 子表格的列定义 -->
            <el-table-column label="子标题" prop="title"></el-table-column>
            <el-table-column label="子节点操作" align="center">
              <template slot-scope="childScope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  @click="showEditDialog(childScope.row)"
                >修改</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="removeDataById(childScope.row.id)"
                >删除子节点</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column label="父节点操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showEditDialog(scope.row)">修改父节点</el-button>
            <el-button type="success" size="mini" @click="showAddDialog(scope.row)">添加子节点</el-button>
            <el-button type="danger" size="mini" @click="removeDataById(scope.row.id)">删除父节点</el-button>
        </template>
      </el-table-column>

     
    </el-table>

    <!-- 添加或编辑弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
      <el-form :model="formData" ref="form" :rules="formRules" label-width="80px">
        <!-- 表单项 -->
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <!-- 其他表单项 -->

        <!-- 操作按钮 -->
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

       <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
  </div>

</template>>
  
<script>
import subject from "@/api/edu/subject";

export default {
  data() {
    return {
      list: null, // 列表
      listLoading: false, // 加载状态
      page: 1, // 当前页码
      limit: 6, // 每页记录数
      total: 0, // 总记录数
      dialogVisible: false, // 弹窗显示控制
      dialogTitle: "", // 弹窗标题
      formData: {
        // 表单数据
        id: "",
        title: ""
      },
      formRules: {
        // 表单验证规则
        title: [{ required: true, message: "请输入标题", trigger: "blur" }]
      }
    };
  },

  created() {
    // 页面加载前调用这个方法
    this.fetchData();
  },

  methods: {
    fetchData(page=1) {
      // 获取数据的方法
      this.page = page;
      subject.getNestedTreeListPage(this.page,this.limit).then(response => {
        // 调用subject.getList()方法获取数据，并赋值给list变量
        this.list = response.data.page.records; // 将获取到的数据赋值给list变量
        this.total = response.data.page.total;
      });
    },
     

    //显示添加一级分类弹窗
    showAddOneLevelDialog() {
      this.dialogTitle = "添加一级分类";
      this.formData = { // 清空表单数据
    
      };
      this.dialogVisible = true; // 显示弹窗
    },
    
    // 显示添加弹窗
    showAddDialog(row) {
      this.dialogTitle = "添加"; // 设置弹窗标题为“添加”
      this.formData = {
        // 清空表单数据
      };
      this.formData.parentId = row.id; // 设置父级id为当前行的id
      this.dialogVisible = true; // 显示弹窗
    },
    // 显示编辑弹窗
    showEditDialog(row) {
      this.dialogTitle = "编辑"; // 设置弹窗标题为“编辑”
      this.formData = { ...row }; // 将当前行数据赋值给表单数据
      this.dialogVisible = true; // 显示弹窗
    },
    // 保存表单数据
    saveForm() {
      if (this.dialogTitle==="编辑") {
        // 如果存在id，则执行编辑操作，否则执行添加操作
      }
      if (this.dialogTitle==="添加") {
        // 如果id不存在，则执行添加操作，否则执行编辑操作
        subject
          .addTwoSubject(this.formData)
          .then(response => {
            // 调用添加方法，并将表单数据作为参数传递进去
            this.fetchData(); // 添加成功后，重新获取数据
            this.$message.success("添加成功");
          })
          .catch(error => {
            // 添加失败时，显示错误信息并关闭弹窗
            console.error(error); // 打印错误信息到控制台，根据需要进行处理
          });
      }


      if (this.dialogTitle==="添加一级分类"){
        subject
          .addOneSuject(this.formData)
          .then(response => {
            // 调用添加方法，并将表单数据作为参数传递进去
            this.fetchData(); // 添加成功后，重新获取数据
            this.$message.success("添加成功");
         
          })
          .catch(error => {
            // 添加失败时，显示错误信息并关闭弹窗
            console.error(error); // 打印错误信息到控制台，根据需要进行处理
          });

      }

      this.dialogVisible = false; // 关闭弹窗
    },

   

    // 重置表单数据
    resetForm() {
      this.$refs.form.resetFields(); // 重置表单
    },

    // 根据ID删除数据
    removeDataById(id) {
      // debugger
      // console.log(memberId)
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return subject.deleteSubjuct(id);
        })
        .then(() => {
          this.fetchData();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(response => {
          // 失败
          if (response === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败"
            });
          }
        });
    }
  }
};
</script>