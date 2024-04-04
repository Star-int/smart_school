package com.atguigu.recuit.service.impl;

import com.atguigu.recuit.entity.Query.ResumeQuery;
import com.atguigu.recuit.entity.Recruitment;
import com.atguigu.recuit.entity.RecruitmentResume;
import com.atguigu.recuit.mapper.RecruitmentResumeMapper;
import com.atguigu.recuit.service.RecruitmentResumeService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author testjava
 * @since 2024-03-27
 */
@Service
public class RecruitmentResumeServiceImpl extends ServiceImpl<RecruitmentResumeMapper, RecruitmentResume> implements RecruitmentResumeService {

    @Override
    public void getResumePage(Page<RecruitmentResume> resumePage, String userId) {
        QueryWrapper<RecruitmentResume> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("user_id",userId);
        queryWrapper.orderByAsc("id");
        baseMapper.selectPage(resumePage,queryWrapper);


    }

    @Override
    public void pageQuery(Page<RecruitmentResume> page1, ResumeQuery resumeQuery) {
        QueryWrapper<RecruitmentResume> queryWrapper =new QueryWrapper<>();
        queryWrapper.orderByAsc("id");

        if(!StringUtils.isEmpty(resumeQuery.getCompanyName())){
            queryWrapper.eq("company_name",resumeQuery.getCompanyName());
        }


        if (!StringUtils.isEmpty(resumeQuery.getPositionName())){
            queryWrapper.like("position_name",resumeQuery.getPositionName());
        }

        baseMapper.selectPage(page1,queryWrapper);
    }
}
