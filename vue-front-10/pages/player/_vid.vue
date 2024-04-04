<template>
  <div class="smart-player" style="height: 1000px;">
    <div class="head"></div>

    <div class="body">
      <div class="content">
        <nuxt />
      </div>

      <div style="margin-top: 200px;">
        <a href="/learn">
          
            <el-button type="primary" >返回课程列表</el-button>
          
        </a>

        <!-- 阿里云视频播放器样式 -->
        <link
          rel="stylesheet"
          href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css"
        />
        <!-- 阿里云视频播放器脚本 -->
        <script
          charset="utf-8"
          type="text/javascript"
          src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"
        />

        <!-- 定义播放器dom -->
        <div id="J_prismPlayer" class="prism-player" />
      </div>
    </div>
  </div>
</template>

<script>
import vod from "@/api/vod";
export default {
  layout: "video", //应用video布局
  asyncData({ params, error }) {
    return vod.getPlayAuth(params.vid).then(response => {
      // console.log(response.data.data)
      return {
        vid: params.vid,
        playAuth: response.data.data.playAuth
      };
    });
  },

  mounted() {
    new Aliplayer(
      {
        id: "J_prismPlayer",
        vid: this.vid, // 视频id
        autoplay: true, // 自动播放
        useH5Prism: true,
        playauth: this.playAuth, // 播放凭证
        encryptType: "1", // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
        width: "100%",
        height: "400px"
      },
      function(player) {
        console.log("播放器创建成功");
      }
    );
  }
};
</script>
  
  <style>
html,
body {
  height: 100%;
}
</style>
  
  <style scoped>
.head {
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.head .logo {
  height: 50px;
  margin-left: 10px;
}

.body {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
</style>