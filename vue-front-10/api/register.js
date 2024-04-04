import request from '../utils/request'

export default {
  
    //用户注册
    submitRegister(formItem) {
      return request({
        url: `/ucenterservice/apimember/register`,
        method: 'post',
        data: formItem
      })
    }
  }