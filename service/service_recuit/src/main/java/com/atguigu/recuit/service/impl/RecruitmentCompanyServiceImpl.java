package com.atguigu.recuit.service.impl;

import com.atguigu.recuit.entity.Query.RecruitmentCompanyQuery;
import com.atguigu.recuit.entity.Recruitment;
import com.atguigu.recuit.entity.RecruitmentCompany;
import com.atguigu.recuit.entity.Vo.CompanyListVo;
import com.atguigu.recuit.mapper.RecruitmentCompanyMapper;
import com.atguigu.recuit.service.RecruitmentCompanyService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author testjava
 * @since 2024-03-19
 */
@Service
public class RecruitmentCompanyServiceImpl extends ServiceImpl<RecruitmentCompanyMapper, RecruitmentCompany> implements RecruitmentCompanyService {

    @Override
    public void pageQuery(Page<RecruitmentCompany> recruitmentCompanyPage, RecruitmentCompanyQuery query) {
        QueryWrapper<RecruitmentCompany> queryWrapper =new QueryWrapper<>();
        queryWrapper.orderByAsc("id");

        if(!StringUtils.isEmpty(query.getName())){
            queryWrapper.like("name",query.getName());
        }

        if (!StringUtils.isEmpty(query.getAddress())){
            queryWrapper.like("address",query.getAddress());
        }



        baseMapper.selectPage(recruitmentCompanyPage,queryWrapper);

    }

    @Override
    public List<CompanyListVo> getCompanyList() {
        List<CompanyListVo> listVos =new ArrayList<>();
        List<RecruitmentCompany> recruitmentCompanies=this.list(null);
        for (int i =0;i<recruitmentCompanies.size();i++){
            CompanyListVo companyListVo = new CompanyListVo();
            RecruitmentCompany recruitmentCompany =recruitmentCompanies.get(i);
            BeanUtils.copyProperties(recruitmentCompany,companyListVo);
            listVos.add(companyListVo);

        }
        return listVos;
    }


}
