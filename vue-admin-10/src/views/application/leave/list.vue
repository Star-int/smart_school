<template>
  <div class="leave-list-page">
    <!-- 页面内容 -->
    <h1>请假列表</h1>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="学生姓名">
        <el-input v-model="searchObj.studentName" placeholder="学生姓名" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!--表格-->

    <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
    <el-table
      :data="leaveList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <i class="el-icon"></i>
          <span style="margin-left: 10px">{{ (page - 1) * limit + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学生姓名" width="100px" prop="studentName">
        <template slot-scope="scope">
          <span>{{ scope.row.studentName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="请假类型" width="100px" prop="leaveType">
        <template slot-scope="scope">
          <span>{{ scope.row.leaveType }}</span>
        </template>
      </el-table-column>

      <el-table-column label="原因" prop="reason" width="200px">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.reason" placement="top-start">
            <span>{{ scope.row.reason.length > 10 ? scope.row.reason.substring(0, 10) + '...' : scope.row.reason }}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="开始日期" width="150px" prop="startDate">
        <template slot-scope="scope">
          <span>{{ scope.row.startDate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="结束日期" width="150px" prop="endDate">
        <template slot-scope="scope">
          <span>{{ scope.row.endDate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" prop="status" width="100px">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.status == 0">未审批</el-tag>
          <el-tag type="success" v-if="scope.row.status == 1">通过</el-tag>
          <el-tag type="danger" v-if="scope.row.status == 2">未通过</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="handleApproval(scope.row.id)"
          >审批</el-button>
          <!-- 审批按钮 -->

          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 审批弹窗 -->
    <el-dialog title="审批" :visible.sync="dialogVisible">
      <el-form :model="leaveInfo" label-width="80px">
        <el-form-item label="状态">
          <el-select v-model="leaveInfo.status" placeholder="请选择审批状态">
            <el-option label="未审批" value="0"></el-option>
            <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审批意见">
          <el-input v-model="leaveInfo.comment" type="textarea" rows="3" placeholder="请输入审批意见"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateLeave()">确 定</el-button>
      </div>
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
import leave from "@/api/application/leave"; // 导入请假接口。


export default {
  data() {
    return {
      dialogVisible: false, // 弹窗可见性
      selectedLeaves: [], // 存储用户选择的学生
      searchObj: {}, //查询条件
      leaveList: [],
      leaveInfo: [],
      page: 1, // 当前页码
      limit: 10, // 每页记录数
      total: 0, // 总记录数。
      multipleSelection: [] // 批量删除选中的记录列表。
    };
  },

  created() {
    // 页面加载时调用该方法，获取数据列表。
    this.fetchData(); // 获取数据列表。
  },

  methods: {
    fetchData(page = 1) {
      this.page = page; // 设置当前页码。
      // 获取数据列表。
      leave
        .getPageById(this.page, this.limit, this.searchObj)
        .then(response => {
          // 调用接口。
          this.leaveList = response.data.items.records; // 获取数据列表。
          console.log(JSON.stringify(this.leaveList));
          this.total = response.data.items.total; // 获取总记录数。
        });
    },

    resetData() {
      // 重置查询表单。
      this.searchObj = {}; // 重置查询表单。

      this.fetchData(); // 获取数据列表。
    },

    handleApproval(id) {
      this.dialogVisible = true; // 显示弹窗。

      leave.getLeaveById(id).then(response => {
        // 获取请假信息。
        this.leaveInfo = response.data.items; // 获取请假信息。
      });
    },

    handleSelectionChange(selection) {
      this.selectedLeaves = selection;
    },

    handleBatchDelete() {
      if (this.selectedLeaves.length === 0) {
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
        const selectedIds = this.selectedLeaves.map(item => item.id);
        
        leave
          .deleteBrach(selectedIds)
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
    updateLeave(){
        leave.updateLeave(this.leaveInfo).then(response => { // 更新请假信息。
          this.dialogVisible = false; // 关闭弹窗。
          this.fetchData(); // 获取数据列表。
        })

    },

    handleDelete(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定", // 确认按钮文本。
        cancelButtonText: "取消", // 取消按钮文本。
        type: "warning" // 提示类型。
      }).then(() => {
        // 确认删除。
        leave
          .deleteLeaveById(id)
          .then(response => {
            // 删除请假信息。

            this.$message({
              // 提示信息。
              type: "success", // 提示类型。
              message: "删除成功" // 提示信息。
            });
          })
          .catch(error => {
            // 错误处理。
            this.$message({
              // 提示信息。
              type: "error", // 提示类型。
              message: "删除失败" // 提示信息。
            });
          });
      });
    },




  }
};
</script>

<style>
</style>