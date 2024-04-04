import request from '@/utils/request'

const api_name = '/eduservice/teacher'

export default {
  //讲师列表（条件查询分页）
  //current当前页，limit每页记录数、teacherQueru条件对象
  getTeacherListPage(current, limit, teacherQuery) {

    return request(
      {

        url: `${api_name}/pageTeacherCondition/${current}/${limit}`,
        method: 'get',
        params: teacherQuery
      }
    )


  },

  removeById(teacherId) {
    return request({
      url: `${api_name}/delete/${teacherId}`,
      method: 'delete'
    })
  },

  addTeacher(teacher) {
    return request({
      url: `${api_name}/addTeacher`,
      method: 'post',
      data: teacher
    })
  },

  getTeacherInfo(id) {
    return request({

      url: `${api_name}/getTeacher/${id}`,
      method: 'get',

    })
  },

   //获得所有讲师信息
   getAllTeacher() {
    return request({
      url: `/eduservice/teacher/findAll`,
      method: 'get'
      
    })

  },

  updateTeacher(teacher) {
    return request({

      url: `${api_name}/updateTeacher/${teacher.id}`,
      method: 'put',
      data: teacher

    })

  },


  removeBrach(teacherIdList) {
    return request({
      url: `${api_name}/deleteBrach`,
      method: 'delete',
      data: teacherIdList
    })
  },


  

}