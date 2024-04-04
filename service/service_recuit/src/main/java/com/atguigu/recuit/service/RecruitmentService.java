package com.atguigu.recuit.service;

import com.atguigu.recuit.entity.Query.RecruitmentQuery;
import com.atguigu.recuit.entity.Recruitment;
import com.atguigu.recuit.entity.Vo.RecruitWebListVo;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author testjava
 * @since 2024-03-13
 */
public interface RecruitmentService extends IService<Recruitment> {

    void pageQuery(Page<Recruitment> recruitmentPage, RecruitmentQuery query);

    List<Recruitment> getRecruitmentsByComyId(Integer companyId);

    List<RecruitWebListVo> getWebList();

    void removeBrach(List<Integer> idList);

    void removeBrachByCompanyId(List<Integer> idList);


}
