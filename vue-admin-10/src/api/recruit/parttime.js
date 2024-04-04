import request from '@/utils/request'

const  api_name='/recuit/partTime'

export default{

    //获取分页信息
    getPage(page,limit,searchKey){
      return request(
        {
          url: `${api_name}/getPartimePage/${page}/${limit}`,
          method: 'get',
          params: searchKey
        }
      )

        
    },

    //获取全部兼职信息
    getAllInfo(){
      return request({
        url: `${api_name}/getAllInfo`,
        method: 'get'
        
      })


    },

    //添加兼职信息
    addParttimeInfo(partTimeInfo){
      return request({
        url: `${api_name}/addParttimeInfo`,
        method: 'post',
        data: partTimeInfo
        
      })
    },

    //根据id删除兼职信息
    deleteParttimeInfo(id){
      return request({
        url: `${api_name}/deleteById/${id}`,
        method: 'delete'

      })
      
    },

    //根据id更新兼职信息
    updateParttimeInfo(partTimeInfo){
      return request({
        url: `${api_name}/edit`,
        method: 'put',
        data: partTimeInfo
        
      })
    },

    //根据id获取兼职信息
    getParttimeInfo(id){
      return request({
        url: `${api_name}/getInfoById/${id}`,
        method: 'get'

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