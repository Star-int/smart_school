import request from '@/utils/request'
export default {
  getPageList(page, limit, searchObj) {
    return request({
      url: `/eduservice/course/getfrontCourseList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  // 获取课程二级分类
  getNestedTreeList2() {
    return request({
      url: `/eduservice/subject/list`,
      method: 'get'
    })
  },

  getById(courseId) {
    return request({
        url: `/eduservice/course/getfrontCourseByCourseId/${courseId}`,
        method: 'get'
    })
},



getCollectList(page,limit,userId){
  return request({
    url: `/eduservice/course/searchCollectCourse/${page}/${limit}`,
    method: 'get',
    params: {userId:userId}
  })
},

 //获取所有课程
 getAllCourse() {
  return request({
    url: `/eduservice/course//getAllCourse`,
    method: 'get'
  })
}



}