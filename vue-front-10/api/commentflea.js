import request from '@/utils/request'

export default {

  getPageList(page, limit, goodsId) {
    return request({
      url: `/flea/comment/${page}/${limit}`,
      method: 'get',
      params: {goodsId}
    })
  },
  addComment(comment) {
    return request({
      url: `/flea/comment/auth/save`,
      method: 'post',
      data: comment
    })
  }
}