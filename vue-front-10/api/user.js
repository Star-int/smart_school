import request from '@/utils/request'

export default{
    
    updateUserInfo(user){
        return request({
            url: '/ucenterservice/apimember/updateUserInfo', // 替换为实际的接口URL
            method: 'put', // 替换为实际的请求方法，如GET、POST等
            data: user // 替换为实际的请求数据

        })
        
    },

    getSellerList() { // 获取卖家列表数据
        return request({
            url:`/ucenterservice/apimember/getAllucenter`,
            method: 'get',
            
        })
    },

    updatePassword(user) { // 更新密码数据
        return request({
            url: '/ucenterservice/apimember/updatePassword', // 替换为实际的接口URL
            method: 'put', // 替换为实际的请求方法，如GET、POST等
            data: user 

        })
    }
    
   
}