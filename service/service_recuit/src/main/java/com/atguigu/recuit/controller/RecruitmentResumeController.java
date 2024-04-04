package com.atguigu.recuit.controller;


import com.atguigu.commonutils.R;
import com.atguigu.recuit.entity.Query.ResumeQuery;
import com.atguigu.recuit.entity.RecruitmentResume;
import com.atguigu.recuit.service.RecruitmentResumeService;
import com.atguigu.serviceBase.GuiguException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author testjava
 * @since 2024-03-27
 */
@RestController
@RequestMapping("/recuit/recruitmentResume")
public class RecruitmentResumeController {

    @Autowired
    RecruitmentResumeService recruitmentResumeService;

    /**
     * 用户获取个人已投简历
     * @param page
     * @param limit
     * @param userId
     * @return
     */

    @GetMapping("getResumePageByUserId/{page}/{limit}/{userId}")
    public R getUserResume(@PathVariable Long page, @PathVariable Long limit,@PathVariable String userId){
        Page<RecruitmentResume>  ResumePage =new Page<>(page,limit);
        recruitmentResumeService.getResumePage(ResumePage,userId);

        return R.ok().data("items",ResumePage);

    }

    @GetMapping("getAllResumePage/{page}/{limit}")
    public R getAllResumePage(@PathVariable Long page, @PathVariable Long limit, ResumeQuery resumeQuery){
        Page<RecruitmentResume> page1 = new Page<>(page,limit);
        recruitmentResumeService.pageQuery(page1,resumeQuery);

        return R.ok().data("items",page1);

    }

    @DeleteMapping("deteleById/{id}")
    public R deteleById(@PathVariable Integer id){
        recruitmentResumeService.removeById(id);

        return R.ok();

    }

    @DeleteMapping("deteleBrach")
    public R deteleBrach(@RequestBody List<Integer> idList){
        recruitmentResumeService.removeByIds(idList);

        return R.ok();

    }

    @PutMapping("updateResume")
    public R updateResume(@RequestBody RecruitmentResume recruitmentResume){
        recruitmentResumeService.updateById(recruitmentResume);

        return R.ok();
    }



    @PostMapping("addResume")
    public  R addResume(@RequestBody RecruitmentResume recruitmentResume){
         RecruitmentResume exist = recruitmentResumeService.getOne(new QueryWrapper<RecruitmentResume>().eq("user_Id",recruitmentResume.getUserId()).eq("recruitment_id",recruitmentResume.getRecruitmentId()));
         if(exist !=null){
             throw new GuiguException(20001,"你已投过该岗位，请勿重复投递简历");
         }
        recruitmentResumeService.save(recruitmentResume);

        return R.ok();

    }

}

