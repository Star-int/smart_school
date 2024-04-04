import request from '@/utils/request'

const  api_name='/recuit/recruitment'

export default{

    //获取分页信息
    getPage(page,limit,searchKey){
      return request(
        {
          url: `${api_name}/getRecruitmentPage/${page}/${limit}`,
          method: 'get',
          params: searchKey
        }
      )

        
    },

   

    //添加招聘信息
    addRecruit(recruitInfo){
      return request({
        url: `${api_name}/addRecruitInfo`,
        method: 'post',
        data: recruitInfo
        
      })
    },

    //根据id删除招聘信息
    deleteRecruitInfo(id){
      return request({
        url: `${api_name}/deleteById/${id}`,
        method: 'delete'

      })
      
    },

    //根据id获取招聘信息
    getRecruitInfo(id){

      return request({
        url: `${api_name}/getRecruitInfoById/${id}`,
        method: 'get'

      })
      
    },

    //根据id更新招聘信息
    updateParttimeInfo(partTimeInfo){
      return request({
        url: `${api_name}/updateParttimeInfo`,
        method: 'put',
        data: partTimeInfo
        
      })
    },

    deleteBrach(idList){
      return request({
        url: `${api_name}/deleteBrach`,
        method: 'delete',
        data: idList
        
      })
    }

 

}