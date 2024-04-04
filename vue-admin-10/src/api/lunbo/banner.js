import request from '@/utils/request'


export default {
  getList() {
    return request({
      url: `/educms/bannerfront/getAllBanner`,
      method: 'get'
    })
  },


  getPageBanner(page,limit){
    return request({
      url: `/educms/banneradmin/pageBanner/${page}/${limit}`,
      method: 'get'

    })

  },

  getBannerById(id){
    return request({
      url: `/educms/banneradmin/get/${id}`,
      method: 'get'
    })
  },

  saveBanner(crmBanner){
    return request({
      url: `/educms/banneradmin/save`,
      method: 'post',
      data: crmBanner

    })
  },

  updateBanner(crmBanner){
    return request({
      url: `/educms/banneradmin/update`,
      method: 'put',
      data: crmBanner
    })
  },

  removeBanner(id){
    return request({
      url: `/educms/banneradmin/remove/${id}`,
      method: 'delete'
    })
  }



}