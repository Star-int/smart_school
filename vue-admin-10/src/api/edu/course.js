import request from '@/utils/request'

const api_name = '/eduservice/course'

export default {


  //添加课程信息
  saveCourseInfo(courseInfo) {
    return request({
      url: `${api_name}/addCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },



  //根据课程id查询课程基本信息
  getCourseInfo(courseId) {
    return request({
      url: `${api_name}/getCourseInfo/` + courseId,
      method: 'get'


    })
  },

  //修改课程信息
  updateCourseInfo(courseInfoVo) {
    return request({
      url: `${api_name}/updateCourseInfo`,
      method: 'post',
      data: courseInfoVo
    })

  },


  //获取发布课程信息
  getCoursePublishInfoById(id) {
    return request({
      url: `${api_name}/getPublishCourseInfo/${id}`,
      method: 'get'
    })
  },

  //发布课程
  publishCourse(id) {
    return request({
      url: `${api_name}/publish/${id}`,
      method: 'put'
    })
  },


  //查询课程列表list
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/searchCourse/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  //删除课程
  removeById(id) {
    return request({
      url: `${api_name}/deleteById/${id}`,
      method: 'delete'
    })
  },

  //获取所有课程
  getAllCourse() {
    return request({
      url: `${api_name}/getAllCourse`,
      method: 'get'
    })
  }
   

}