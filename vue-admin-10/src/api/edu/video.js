import request from '@/utils/request'

const api_name = '/eduservice/video'

export default {

    saveVideoInfo(videoInfo) {
      return request({
        url: `${api_name}/save`,
        method: 'post',
        data: videoInfo
      })
    },
  
    getVideoInfoById(id) {
      return request({
        url: `${api_name}/getVideoById/${id}`,
        method: 'get'
      })
    },
  
    updateVideoInfoById(videoInfo) {
      return request({
        url: `${api_name}/updateVideoInfo/${videoInfo.id}`,
        method: 'put',
        data: videoInfo
      })
    },
  
    removeById(id) {
      return request({
        url: `${api_name}/deleteById/${id}`,
        method: 'delete'
      })
    },

    setOssVideoNull(id){
      return request({
        url: `${api_name}/setOssNull/${id}`,
        method: 'put'
      })

    }

    
  }