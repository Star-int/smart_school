<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-button type="success" @click=" showAddOneLevelDialog">添加一级分类</el-button>

    <router-link :to="'/course/updateSubject'">
      <el-button type="primary" size="mini" icon="el-icon-plus" style="height: 42px;">修改</el-button>
    </router-link>

    <el-tree
      ref="subjectTree"
      :data="subjectList"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      :default-expand-all="true"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="custom-tree-button">
          <el-button
            v-if="data.children"
            type="text"
            size="medium"
            @click="() => showAddDialog(data)"
          >添加</el-button>
          <el-button  type="text" size="medium" @click="() => showEditDialog(data)">编辑</el-button>
          <el-button  style="color: red;"  type="text" size="medium" @click="() => removeDataById(data.id)">删除</el-button>
        </span>
      </span>
    </el-tree>

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
    
  </div>
</template>
  
<script>
import subject from "@/api/edu/subject";

export default {
  data() {
    return {
      listLoading: false, // 加载状态
      filterText: "",
      subjectList: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
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
  watch: {
    filterText(val) {
      this.$refs.subjectTree.filter(val);
    }
  },

  created() {
    this.fetchNodeList();
  },

  methods: {
    fetchNodeList() {
      subject.getNestedTreeList().then(response => {
        if (response.success === true) {
          this.subjectList = response.data.items;
        }
      });
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },

    update(data) {},

    //显示添加一级分类弹窗
    showAddOneLevelDialog() {
      this.dialogTitle = "添加一级分类";
      this.formData = {
        // 清空表单数据
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
      if (this.dialogTitle === "编辑") {
        // 如果存在id，则执行编辑操作，否则执行添加操作
        subject
          .updateSubject(this.formData)
          .then(response => {
            // 调用添加方法，并将表单数据作为参数传递进去
            this.fetchNodeList(); // 添加成功后，重新获取数据
            this.$message.success("添加成功");
          })
          .catch(error => {
            // 添加失败时，显示错误信息并关闭弹窗
            console.error(error); // 打印错误信息到控制台，根据需要进行处理
          });
      }
      if (this.dialogTitle === "添加") {
        // 如果id不存在，则执行添加操作，否则执行编辑操作
        subject
          .addTwoSubject(this.formData)
          .then(response => {
            // 调用添加方法，并将表单数据作为参数传递进去
            this.fetchNodeList(); // 添加成功后，重新获取数据
            this.$message.success("添加成功");
          })
          .catch(error => {
            // 添加失败时，显示错误信息并关闭弹窗
            console.error(error); // 打印错误信息到控制台，根据需要进行处理
          });
      }

      if (this.dialogTitle === "添加一级分类") {
        subject
          .addOneSuject(this.formData)
          .then(response => {
            // 调用添加方法，并将表单数据作为参数传递进去
            this.fetchNodeList(); // 添加成功后，重新获取数据
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
          this.fetchNodeList();
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

<style>
.custom-tree-button {
  margin-left: 600px;
  padding: 5px 10px; /* 增加内边距 */
  display: flex;
  align-items: center;
  margin-top: -32px;
}

.filter-tree {
  font-family: "Arial", sans-serif;
  background-color: #f5f7fa;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  margin-top: 30px;
  width: 60%;
}

.filter-tree .el-tree-node {
  margin-bottom: 15px;
  margin-top: 10px;
  
}



.filter-tree .el-tree-node__content:hover {
  background-color: #ebebeb;
}

.filter-tree .el-tree-node__content .el-tree-node__expand-icon {
  color: #40f9ff;
  font-size: 18px;
  cursor: pointer;
  margin-top: -12px;
}




</style>