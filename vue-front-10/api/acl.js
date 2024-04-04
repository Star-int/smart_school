import request from '../utils/request'


export default{

    getAllAdmins() {
        return request({
            url: '/ucenterservice/Acluser/getAllAdminInfo',
            method: 'get'
        })
    }
}