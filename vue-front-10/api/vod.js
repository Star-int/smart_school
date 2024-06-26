import request from '@/utils/request'
const api_name = '/vod/video'

export default {

  getPlayAuth(vid) {
    return request({
      url: `${api_name}/getPlayAuth/${vid}`,
      method: 'get'
    })
  }

}