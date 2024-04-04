import request from '@/utils/request'

export default{

    getSellerList() { // 获取卖家列表数据
        return request({
            url:`/ucenterservice/apimember/getAllucenter`,
            method: 'get',
            
        })
    }




}