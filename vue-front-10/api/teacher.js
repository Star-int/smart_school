import request from '@/utils/request'
const api_name = '/eduservice/teacher'

export default {
  getPageList(page, limit) {   
    return request({
      url: `${api_name}/getPageTeacherList/${page}/${limit}`,
      method: 'get'
    })
  },

  getById(teacherId) {
    return request({
        url: `${api_name}/getTeacher/${teacherId}`,
        method: 'get'
    })
}

}