import request from '@/utils/request'

const api_name = '/admin/acl/index'

export default{
    
    getUserInfo() {
        return request({
            url: `${api_name}/info`,
            method: 'get'

        })
        
    }
}