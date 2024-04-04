package com.atguigu.recuit.service;

import com.atguigu.recuit.entity.Query.RecruitmentCompanyQuery;
import com.atguigu.recuit.entity.Recruitment;
import com.atguigu.recuit.entity.RecruitmentCompany;
import com.atguigu.recuit.entity.Vo.CompanyListVo;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author testjava
 * @since 2024-03-19
 */
public interface RecruitmentCompanyService extends IService<RecruitmentCompany> {

    void pageQuery(Page<RecruitmentCompany> recruitmentCompanyPage, RecruitmentCompanyQuery query);

    List<CompanyListVo> getCompanyList();


}
