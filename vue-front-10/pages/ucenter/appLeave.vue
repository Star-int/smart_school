<template>
  <div class="leave-list-page">
    <!-- 页面内容 -->
    <h1>请假记录</h1>

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

      <el-table-column label="原因" prop="reason" width="130px">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.reason" placement="top-start">
            <span>{{ scope.row.reason.length > 6 ? scope.row.reason.substring(0, 6) + '...' : scope.row.reason }}</span>
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

      <el-table-column label="意见" prop="comment" width="100px">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.comment" placement="top-start">
            <span>{{ scope.row.comment.length > 6 ? scope.row.comment.substring(0, 6) + '...' : scope.row.comment }}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="handleApproval(scope.row.id,scope.row.status)"
          >修改</el-button>
          <!-- 审批按钮 -->

          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹窗 -->
    <el-dialog title="修改请假信息" :visible.sync="dialogVisible">
      <el-form :model="leaveInfo" label-width="80px">
        <el-form-item label="学生姓名">
          <el-input v-model="leaveInfo.studentName" disabled></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="leaveInfo.startDate"
            type="datetime"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
          />
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            v-model="leaveInfo.endDate"
            type="datetime"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
          />
        </el-form-item>
        <el-form-item label="请假类型">
          <el-select v-model="leaveInfo.leaveType" placeholder="请选择请假类型">
            <el-option label="病假" value="病假"></el-option>
            <el-option label="事假" value="事假"></el-option>

            <!-- 根据学校需求添加其他请假类型 -->
            <el-option label="探亲假" value="探亲假"></el-option>
            <el-option label="婚假" value="婚假"></el-option>
            <el-option label="丧假" value="丧假"></el-option>
            <!-- 添加其他类型 -->
          </el-select>
        </el-form-item>
        <el-form-item label="请假原因">
          <el-input v-model="leaveInfo.reason" type="textarea" rows="3" placeholder="请输入请假原因"></el-input>
        </el-form-item>
        <el-form-item label="审批意见">
          <el-input
            v-model="leaveInfo.comment"
            type="textarea"
            rows="3"
            placeholder="请输入审批意见"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateLeave">确 定</el-button>
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
import leave from "@/api/leave"; // 导入请假接口。
import student from "@/api/student";
import cookie from "js-cookie";

export default {
  data() {
    return {
      user: {},
      dialogVisible: false, // 弹窗可见性
      selectedLeaves: [], // 存储用户选择的学生
      searchObj: {}, //查询条件
      leaveList: [],
      leaveInfo: [],
      page: 1, // 当前页码
      limit: 10, // 每页记录数
      total: 0, // 总记录数。
      studentId: ""
    };
  },

  created() {
    // 页面加载时调用该方法，获取数据列表。
    this.fetchData(); // 获取数据列表。
  },

  methods: {
    fetchData(page = 1) {
      this.getUserInfo();

      this.page = page; // 设置当前页码。
      student.getStudentInfoByUserId(this.user.id).then(response => {
        this.studentId = response.data.data.items.studentId; //获取学生id，这里假设有一个名为getStudentInfoByUserId的方法。
        console.log("学生id为" + this.studentId);
        this.searchObj.studentId = this.studentId; // 设置查询条件。

        leave
        .getPageById(this.page, this.limit, this.searchObj)
        .then(response => {
          // 调用接口。
          this.leaveList = response.data.data.items.records; // 获取数据列表。
          console.log(JSON.stringify(this.searchObj));
          this.total = response.data.data.items.total; // 获取总记录数。
        });
      });
 
   

     
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

    resetData() {
      // 重置查询表单。
      this.searchObj.studentId =this.studentId // 重置查询表单。

      this.fetchData(); // 获取数据列表。
    },

    handleApproval(id, status) {
      if (status != 1) {
        this.dialogVisible = true; // 显示弹窗。
      } else {
        this.$message({
          // 提示信息。
          message: "已通过，无法修改", // 提示信息。
          type: "warning" // 提示类型。
        });
      }
      leave.getLeaveById(id).then(response => {
        // 获取请假信息。
        this.leaveInfo = response.data.data.items; // 获取请假信息。
      });
    },

    handleSelectionChange(selection) {
      this.selectedLeaves = selection;
    },

    handleBatchDelete() {
      if (this.selectedLeaves.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择要删除的记录!"
        });
        return;
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
     
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.fetchData(this.page)
        
          })
          .catch(error => {
            this.$message({
              type: "error",
              message: "删除失败!"
            });
          });
      });
   
    },

    updateLeave() {
      this.leaveInfo.status = "0"; // 设置状态为未审批。
      leave.updateLeave(this.leaveInfo).then(response => {
        // 更新请假信息。
        this.$message({ // 提示信息。
          type: "success", // 提示类型。
          message: "修改成功" // 提示信息。
          
        })
        this.dialogVisible = false; // 关闭弹窗。
        this.fetchData(); // 获取数据列表。
      });
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
            this.fetchData(this.page)
           
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
    
    }
  }
};
</script>
  
  <style>
</style>