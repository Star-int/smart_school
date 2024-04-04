import request from '@/utils/request'

const api_name = '/flea/banner/'


export default {

    getCarousel(){
        return request({
            url:`${api_name}/getCarousel`,
            method: 'get'
            
        })

    },

    changeBanner(goodsId,changId){
        return request({
            url:`${api_name}/changBanner/${goodsId}/${changId}`,
            method: 'put',
            
           
        })

    }

    

}