import request from '@/utils/request'

const  api_name='/recuit/recruitmentResume'

export default{
    
    // 获取所有简历分页数据
    getResumePage(page,limit,searchObj){
        return request({
            url:`${api_name}/getAllResumePage/${page}/${limit}`,
            method:'get',
            params:searchObj
        })  

    },



    //根据id删除奖励信息
    deleteResumeById(id){
        return request({
            url:`${api_name}/deteleById/${id}`,
            method:'delete'
        })
    },

    //新增简历信息
    addResume(resume){
        return request({
            url:`${api_name}/addResume`,
            method:'post',
            data:resume
        })
    },

    //修改简历信息
    updateResume(resume){
        return request({
            url:`${api_name}/updateResume`,
            method:'put',
            data:resume
        })
    },

    getUserResume(page,limit,userId){
        return request({
            url:`${api_name}/getResumePageByUserId/${page}/${limit}/${userId}`,
            method:'get',
           
            
        })

    },


    deteleBrach(idList){
        return request({
            url:`${api_name}/deteleBrach`,
            method:'delete',
            data:idList
        })
    }





    
}