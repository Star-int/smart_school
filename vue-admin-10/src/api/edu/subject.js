import request from '@/utils/request'

const api_name = '/eduservice/subject'

export default {

  getNestedTreeList(page,limit) {
    return request({
      url: `${api_name}/list`,
      method: 'get'
    })
  },

  getNestedTreeListPage(page,limit) {
    return request({
      url: `${api_name}/list1/${page}/${limit}`,
      method: 'get'
    })
  },



  addOneSuject(oneSuject){
    return request({
      url: `${api_name}/addOneSuject`,
      method: 'post',
      data: oneSuject // 这里使用data属性来传递参数，因为这是一个对象，而不是字符串。
    })
  },


  addTwoSubject(oneSuject){
    return request({
      url: `${api_name}/addTwoSubject`,
      method: 'post',
      data: oneSuject // 这里使用data属性来传递参数，因为这是一个对象，而不是字符串。
    })
  },


  deleteSubjuct(id){
    return request({
      url:  `${api_name}/deleteSubject/${id}`,
      method: 'delete'
      
    })
  },


  updateSubject(subject){
    return request({
      url: `${api_name}/updateSubject`,
      method: 'put',
      data: subject 
    })
  }





}