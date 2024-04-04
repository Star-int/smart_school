package com.atguigu.recuit.service;

import com.atguigu.recuit.entity.Query.ResumeQuery;
import com.atguigu.recuit.entity.RecruitmentResume;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author testjava
 * @since 2024-03-27
 */
public interface RecruitmentResumeService extends IService<RecruitmentResume> {

    void getResumePage(Page<RecruitmentResume> resumePage, String userId);

    void pageQuery(Page<RecruitmentResume> page1, ResumeQuery resumeQuery);
}
