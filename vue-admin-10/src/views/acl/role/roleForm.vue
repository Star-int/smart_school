<template>
  <div style="margin: 20px 20px">
    <div class="custom-tree">
    <el-tree
      :data="data"
      show-checkbox
      :default-expand-all="false"
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
    
    ></el-tree>
    </div>
    <el-button :disabled="saveBtnDisabled" type="primary" @click="save">保存</el-button>
  </div>

</template>
<script>
import menu from "@/api/acl/menu";

export default {
  data() {
    return {
      saveBtnDisabled: false,
      data: [],
      defaultProps: {
        children: "children",
        label: "name",
  
      },
      roleId: "",
     

    };
  },
  // 监听器
  watch: {
    $route(to, from) {
      console.log("路由变化......");
      console.log(to);
      console.log(from);
      this.init();
    }
  },

  created() {
    this.init();
  },

 
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.roleId = this.$route.params.id;
        this.fetchDataById(this.roleId);
      }
    },
    fetchDataById(roleId) {
      menu.toAssign(roleId).then(response => {
        this.data = response.data.children;
         console.log(JSON.stringify(this.data));
        var jsonList = JSON.parse(JSON.stringify(this.data));
        debugger;
        var list = [];
        this.getJsonToList(list, jsonList[0]["children"]);
        console.log("最终集合");
        console.log(list);
       
        this.setCheckedKeys(list);
      });
    },
    //把json数据转成string再转成对象，根据Key获取value数据
    getJsonToList(list, jsonList) {
      //遍历这个集合对象，获取key的值
      for (var i = 0; i < jsonList.length; i++) {
        // if (jsonList[i]["select"] == true && jsonList[i]["level"] == 4) {
        if (jsonList[i]["select"] == true ) {

          list.push(jsonList[i]["id"]);
        }
        if (jsonList[i]["children"] != null) {
          this.getJsonToList(list, jsonList[i]["children"]);
        }
      }
    },

    // getCheckedNodes() {
    //   console.log(this.$refs.tree.getCheckedNodes());
    // },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },

    setCheckedKeys(list) {
      this.$refs.tree.setCheckedKeys(list);
    },

  

    save() {
      this.saveBtnDisabled = true;
      // console.log("节点节点节点节点"+JSON.stringify(this.$refs.tree.getCheckedNodes()))

      var ids = this.$refs.tree.getCheckedKeys().join(",");

      console.log("节点ID" + ids);
  
      //vue elementUI tree树形控件获取父节点ID的实例
      //node_modules\element-ui\lib\element-ui.common.js
      //25348行修改源码
      menu.doAssign(this.roleId, ids).then(response => {
        if (response.success) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.$router.push({ path: "/acl/role/list" });
        }
      });
    }
  }
};
</script>

<style>
.custom-tree {
  font-family: Arial, sans-serif; /* 设置字体 */


}

/* 自定义节点样式 */
.custom-tree .el-tree-node {
  padding: 8px; /* 设置节点内边距 */
}

/* 自定义复选框样式 */
.custom-tree .el-checkbox {
  margin-right: 8px; /* 设置复选框右边距 */
}

/* 自定义展开/折叠图标样式 */
.custom-tree .el-tree-node__expand-icon {
  font-size: 14px; /* 设置图标字体大小 */
  color: #888; /* 设置图标颜色 */
}

/* 自定义选中样式 */
.custom-tree .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #409eff; /* 设置选中时的背景色 */
  border-color: #409eff; /* 设置选中时的边框颜色 */
}
</style>
