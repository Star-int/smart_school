import request from '@/utils/request';


const base_api='/application/student';

export default {

    getAllStudent() {
        return request({
            url: `${base_api}/getAllstudent`,
            method: 'get'
        })

    },


    getStudentPage(page,limit,searchObj){

        return request({
            url: `${base_api}/getAllstudentPage/${page}/${limit}`,
            method: 'get', // 请求方法，默认为GET，也可以根据实际情况设置为POST等方法
            params: searchObj

        })

    },


    getStudentById(id){
        return request({
            url: `${base_api}/getstudentById/${id}`,
            method: 'get'
        })
    },

    addStudent(student){
        return request({
            url: `${base_api}/addStudent`,
            method: 'post',
            data: student
        })
    },


    updateStudent(student){
        return request({
            url: `${base_api}/updateStudent`,
            method: 'put',
            data: student
        })
    },

    deteleStudent(id){
        return request({
            url: `${base_api}/deleteStudentById/${id}`,
            method: 'delete'
        })
    },


    deteleStudentBrach(idList){
        return request({
            url: `${base_api}/deteleBrach`,
            method: 'delete',
            data: idList // 注意这里使用data而不是params来传递数组参数
        })
    },





}