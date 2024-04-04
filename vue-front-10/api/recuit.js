import request from '../utils/request'

export default {
  
    //查询兼职信息
    getPartTimeJob() {
      return request({
        url: `/recuit/partTime/getAllInfo`,
        method: 'get'
          
      })
    },
   
    //根据id查询兼职详细信息
    getById(id){
        return request({
          url:`/recuit/partTime/getInfoById/${id}`,
          method:'get',
          params:id

        })
    },
    
       //查询招聘信息
       getRecruitInfo() {
        return request({
          url: `/recuit/recruitment/getAllInfo`,
          method: 'get'
            
        })
      },

      //根据id查询招聘详细信息
      getRecruitInfoById(id){
        return request({
          url:`/recuit/recruitment/getRecruitInfoById/${id}`,
          method:'get',
        })
        
      },
     

      //根据公司id来查询对应岗位的公司信息
      getCompanyInfo(companyId){
        return request({
          url:`/recuit/recruitmentCompany/getCompanyInfoById/${companyId}`,
          method:'get',
        })
        
      },

      //查询兼职分页信息
      getParttimePage(page,limit,searchObj){
        return request({

          url:`/recuit/partTime/getPartimePage/${page}/${limit}`,
          method:'get',
          params:searchObj

        })

      },

      //查询招聘分页信息

      getRecruitmentPage(page,limit,searchObj){
        return request({
          url:`/recuit/recruitment/getRecruitmentPage/${page}/${limit}`,
          method:'get',
          params:searchObj
        })

        

      },

      //
      getCollectRecruit(page,limit,userId){
        return request({
          url:`/recuit/recruitment/getCollectRecruit/${page}/${limit}`,
          method:'get',
          params:{userId:userId}
          
        })
      },

      getWebList(){
        return request({
          url:`/recuit/recruitment/getWebList`,
          method:'get',
        })
      }






     
  }