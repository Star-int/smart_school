<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户名:{{ name }}</div>
    <div class="dashboard-text">用户角色:<span v-for="role in roles" :key="role">{{ role }}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import index from "@/api/acl/index"; 

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
     
      'name',
      'roles'
    ])
  },

  data() {
    return{

      userInfo:[],

    }
  },

  created() {
    this.getInfo();
    
  },

  methods: {
    getInfo() {
      index.getUserInfo().then(response => {
          
        const name = response.data.name;
        console.log("啊啊啊啊啊啊啊啊啊啊"+name);
      })
      
    },


  }


}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
