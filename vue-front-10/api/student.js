import request from '@/utils/request'

const base_api=`/application/student`

export default{

    getStudentInfoByUserId(userId){
        return request({
            url:`${base_api}/getStudentInfoByUserId/${userId}`,
            method:'get'
        })
    },

    addStudent(student){
        return request({
            url: `${base_api}/addStudent`,
            method: 'post',
            data: student
        })
    },

    getUndefineStudent(){
        return request({
            url: `${base_api}/getUndefineStuedentInfo`,
            method: 'get'
        })

    },

    updateStudent(student){
        return request({
            url: `${base_api}/updateStudent`,
            method: 'put',
            data: student
        })
    }





}