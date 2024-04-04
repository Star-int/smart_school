import request from '@/utils/request';


const base_api='/application/leave';

export default{

    getAllLeavePage(page,limit,searchObj){
        return request({
            url: `${base_api}/getAllLeavePage/${page}/${limit}`,
            method: 'get', // 请求方法，默认为GET，也可以根据实际情况设置为POST等方法
           params: searchObj // 请求参数，可以是对象、字符串等，根据实际情况设置
        })


    },

    getPageById(page,limit,searchObj){
        return request({
            url: `${base_api}/getAllLeaveByIdPage/${page}/${limit}`,
            method: 'get', // 请求方法，默认为GET，也可以根据实际情况设置为POST等方法
           params: searchObj // 请求参数，可以是对象、字符串等，根据实际情况设置
        })


    },

    

    getLeaveById(id){
        return request({
            url: `${base_api}/getLeaveInfoById/${id}`,
            method: 'get', // 请求方法，默认为GET，也可以根据实际情况设置为POST等方法
        })
    },

    deleteLeaveById(id){
        return request({
            url: `${base_api}/deleteLeaveById/${id}`,
            method: 'delete', // 请求方法，默认为GET，也可以根据实际情况设置为POST等方法
        })
    },

    updateLeave(leave){
        return request({
            url: `${base_api}/updateLeave`,
            method: 'put', // 请求方法，默认为GET，也可以根据实际情况设置为POST等方法
           data: leave // 请求参数，可以是对象、字符串等，根据实际情况设置
        })
    },

    deleteBrach(idList){
        return request({
            url: `${base_api}/deleteBrach`,
            method: 'delete', // 请求方法，默认为GET，也可以根据实际情况设置为POST等方法
            data: idList // 请求参数，可以是对象、字符串等，根据实际情况设置
        })    
    },

    addLeave(leave){
        return request({
            url: `${base_api}/addLeave`,
            method: 'post', // 请求方法，默认为GET，也可以根据实际情况设置为POST等方法
            data: leave // 请求参数，可以是对象、字符串等，根据实际情况设置
        })
    }




}

