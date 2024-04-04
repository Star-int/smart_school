import request from '@/utils/request';


const base_api='/application/selection';

export default {

    getAllSelection() {
        return request({
            url: `${base_api}/getAllSelection`,
            method: 'get'
        })

    },


    getSelectionPage(page,limit,studentId){

        return request({
            url: `${base_api}/getSelectionPage/${page}/${limit}`,
            method: 'get', // 请求方法，默认为GET，也可以根据实际情况设置为POST等方法
            params: {studentId:studentId}

        })

    },


 

    addSelection(selection){
        return request({
            url: `${base_api}/addSelection`,
            method: 'post',
            data: selection
        })
    },


    updateSelection(selection){
        return request({
            url: `${base_api}/updateStudent`,
            method: 'put',
            data:selection
        })
    },

    deteleSelection(id){
        return request({
            url: `${base_api}/deleteSelectionById/${id}`,
            method: 'delete'
        })
    },


    deteleSelectionsByStudentId(studentId){
        return request({
            url: `${base_api}/deleteSelectionsByStudentId/${studentId}`,
            method: 'delete',
        })
    },

    deleteBrachByStudentId(idList){
        return request({
            url: `${base_api}/deleteSelectionsByStudentId`,
            method: 'delete',
            data:idList
        })
    },


    deleteBrach(idList){
        return request({
            url: `${base_api}/deteleBrach`,
            method: 'delete',
            data:idList
        })
    }



    


}