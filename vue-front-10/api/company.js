import request from '../utils/request'

export const api_name = '/recuit/recruitmentCompany'

export default {

      //获取公司队列
      getCompanyList(){
        return request({
          url: `${api_name}/getCompanyList`,
          method: 'get'
      
        })
      },

      //查询公司在招聘岗位
      getCompanyJobList(companyId){
        return request({
          url: `${api_name}/getRecruitmentsById/${companyId}`,
          method: 'get'
        })
      }
    
    

}