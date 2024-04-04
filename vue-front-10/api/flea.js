import request from '@/utils/request'

export default{

    getGoodsPage(page,limit,searchObj){
        return request({
            url:`flea/goods/getGoodsFrontPage/${page}/${limit}`,
            method:'get',
            params:searchObj
        })
    },

    getBanner(){
        return request({
            url:'flea/banner/getCarousel',
            method:'get'
        })

    },

    getAllGoods(){
        return request({
            url:'flea/goods/getAllGoods',
            method:'get'

        })
        
    },

    getGoodsById(id){
        return request({
            url:`flea/goods/getGoodsById/${id}`,
            method:'get'
        })
    },

    getGoodsByCategory(category){
        return request({
            url:`flea/goods/getGoodsByCategory`,
            method:'get',
            params:{ category: category }
        })
    },

    getSellerInfoBySellerId(sellerId){
        return request({
            url:`ucenterservice/apimember/getSellerInfo/${sellerId}`,
            method:'post'
        })
    },

    getSellingGoodsPage(page,limit,sellerId){
        return request({
            url:`flea/goods/getSellingGoodsPage/${page}/${limit}`,
            method:'get',
            params:{sellerId:sellerId}
        })
    },

   
    getGoodsCollect(page,limit,userId){
        return request({
          url:`flea/goods/getGoodsCollect/${page}/${limit}`,
          method:'get',
          params:{userId:userId}
          
        })
      },

  




}
