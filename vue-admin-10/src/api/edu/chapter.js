import request from '@/utils/request'

const api_name = '/eduservice/chapter'

export default {


    //根据课程id获取章节和小节数据列表
    getAllChapterterVideo(courseId) {
      return request({
        url: `${api_name}/getChapterById/`+courseId,
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


    removeById(id) {
      return request({
        url: `${api_name}/deleteById/${id}`,
        method: 'delete'
      })
    },
  
    save(chapter) {
      return request({
        url: `${api_name}/save`,
        method: 'post',
        data: chapter
      })
    },
  
    getById(id) {
      return request({
        url: `${api_name}/getById/${id}`,
        method: 'get'
      })
    },
  
    updateById(chapter) {
      return request({
        url: `${api_name}/update`,
        method: 'post',
        data: chapter
      })
    }
  
    
  }