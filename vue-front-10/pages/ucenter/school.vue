
<script>


export default {
  data() {
    return {
      options: [
        "中山大学",
        "华南理工大学",
        "暨南大学",
        "华南师范大学",
        "广东工业大学",
        "广州大学",
        "深圳大学",
        "汕头大学",
        "广东海洋大学",
        "广东药科大学",
        "广东医科大学",
        "仲恺农业工程学院",
        "五邑大学",
        "广州中医药大学",
        "南方医科大学",
        "华南农业大学",
        "广东外语外贸大学",
        "广东财经大学",
        "广东技术师范大学",
        "星海音乐学院",
        "广州美术学院",
        "深圳音乐学院",
        "广州体育学院",
        "广州医科大学",
        "广东药科大学",
        "仲恺农业工程学院",
        "五邑大学",
        "韶关学院",
        "韩山师范学院",
        "岭南师范学院",
        "惠州学院",
        "嘉应学院",
        "东莞理工学院",
        "广东石油化工学院",
        "肇庆学院",
        "广东金融学院",
        "仲恺农业工程学院",
        "五邑大学",
        "韶关学院",
        "韩山师范学院",
        "岭南师范学院",
        "惠州学院",
        "嘉应学院",
        "东莞理工学院",
        "广东石油化工学院",
        "肇庆学院",
        "广东金融学院",
        "广东白云学院",
        "广东科技学院",
        "广东理工学院",
        "广东培正学院",
        "广东第二师范学院",
        "广州华商学院",
        "广州南方学院",
        "广州现代学院",
        "广州康大职业技术学院",
        "广东工商职业学院",
        "广东创新科技职业学院",
        "广东理工职业学院",
        "广东水利电力职业技术学院",
        "广东交通职业技术学院",
        "广东科贸职业学院",
        "广东女子职业技术学院",
        "广东机电职业技术学院",
        "广东建设职业技术学院",
        "广东邮电职业技术学院",
        "广东电力职业技术学院",
        "广东食品药品职业学院",
        "广东行政职业学院",
        "广东体育职业技术学院",
        "广东司法警官职业学院",
        "广东信息工程职业学院",
        "广东松山职业技术学院",
        "广东岭南职业技术学院",
        "广东新安职业技术学院",
        "广东亚视演艺职业学院",
        "广州涉外经济职业技术学院",
        "广州南洋理工职业学院",
        "广州科技贸易职业学院",
        "广州华立科技职业学院",
        "广州城市职业学院",
        "广州铁路职业技术学院",
        "广州民航职业技术学院",
        "广州卫生职业技术学院",
        "广州番禺职业技术学院",
        "广州珠江职业技术学院",
        "佛山科学技术学院",
        "广东东软学院",
        "佛山职业技术学院",
        "广东轻工职业技术学院",
        "广东舞蹈戏剧职业学院",
        "广东环境保护工程职业学院",
        "广东文艺职业学院",
        "顺德职业技术学院"
        
        
        
       
    
     
      ]
    };
  },
  created() {

    this.$emit("init-options", this.options);
  },

  methods: {}
};
</script>