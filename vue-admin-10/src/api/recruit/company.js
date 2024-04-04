import request from '@/utils/request'

const api_name = '/recuit/recruitmentCompany'

export default {

  //获取分页信息
  getPage(page, limit, searchKey) {
    return request(
      {
        url: `${api_name}/getRecruitmentCompanyPage/${page}/${limit}`,
        method: 'get',
        params: searchKey
      }
    )


  },


  //添加招聘信息
  addCompanyInfo(recruitInfo) {
    return request({
      url: `${api_name}/addCompanyInfo`,
      method: 'post',
      data: recruitInfo

    })
  },

  //根据id删除招聘信息
  deleteCompanyInfo(id) {
    return request({
      url: `${api_name}/deleteById/${id}`,
      method: 'delete'

    })

  },

  //根据id获取招聘信息
  getCompanyInfo(id) {

    return request({
      url: `${api_name}/getCompanyInfoById/${id}`,
      method: 'get'

    })

  },

  //根据id更新招聘信息
  updateCompanyInfo(companyInfo) {
    return request({
      url: `${api_name}/updateCompanyInfo`,
      method: 'put',
      data: companyInfo

    })
  },

  //获取公司队列
  getCompanyList() {
    return request({
      url: `${api_name}/getCompanyList`,
      method: 'get'

    })
  },

  //查询公司在招聘岗位
  getCompanyJobList(companyId) {
    return request({
      url: `${api_name}/getRecruitmentsById/${companyId}`,
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