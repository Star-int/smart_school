
import request from '@/utils/request'
const api_name = 'ucenterservice/collect'

export default {


    // 获取收藏列表
    getCollectList(userId) { 
        return request({ 
            url: `${api_name}/getCollectByUserId/${userId}`,
            method: 'get' 
        })
     },

     // 添加收藏
     addCollect(collect) { 
        return request({ 
            url: `${api_name}/addCollect`,
            method: 'post',
            data: collect // 这里使用data: 是因为collect是一个对象，需要以JSON格式发送到后端
        })
     },

     // 删除收藏
     deleteCollect(collect) {
         
        return request({ 
            url: `${api_name}/deleteCollect`,
            method: 'delete' ,
            data:collect
        })
         
     },



}