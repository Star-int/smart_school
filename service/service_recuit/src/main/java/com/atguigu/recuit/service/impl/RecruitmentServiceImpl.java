package com.atguigu.recuit.service.impl;

import com.atguigu.commonutils.CollectLinkDTO;
import com.atguigu.recuit.client.UcenterClient;
import com.atguigu.recuit.entity.Query.RecruitmentQuery;
import com.atguigu.recuit.entity.Recruitment;
import com.atguigu.recuit.entity.RecruitmentResume;
import com.atguigu.recuit.entity.Vo.RecruitWebListVo;
import com.atguigu.recuit.mapper.RecruitmentMapper;
import com.atguigu.recuit.service.RecruitmentCompanyService;
import com.atguigu.recuit.service.RecruitmentService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
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
 * @since 2024-03-13
 */
@Service
public class RecruitmentServiceImpl extends ServiceImpl<RecruitmentMapper, Recruitment> implements RecruitmentService {

    @Autowired
    UcenterClient ucenterClient;

    @Override
    public void pageQuery(Page<Recruitment> recruitmentPage, RecruitmentQuery query) {
        QueryWrapper<Recruitment> queryWrapper =new QueryWrapper<>();
        queryWrapper.orderByAsc("id");

        if(!StringUtils.isEmpty(query.getCompanyName())){
            queryWrapper.like("company_name",query.getCompanyName());
        }

        if (!StringUtils.isEmpty(query.getEducation())){
            queryWrapper.like("education",query.getEducation());
        }

        if (!StringUtils.isEmpty(query.getLocation())){
            queryWrapper.like("location",query.getLocation());
        }

        if (!StringUtils.isEmpty(query.getPostitionName())){
            queryWrapper.like("position_name",query.getPostitionName());
        }

        baseMapper.selectPage(recruitmentPage,queryWrapper);

    }

    @Override
    public List<Recruitment> getRecruitmentsByComyId(Integer companyId) {
        QueryWrapper<Recruitment> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("company_id",companyId);
        queryWrapper.last("order by --gmt_create desc limit 4");

        List<Recruitment> recruitments =baseMapper.selectList(queryWrapper);

        return  recruitments;

    }

    @Override
    public List<RecruitWebListVo> getWebList() {
          List<RecruitWebListVo> recruitWebListVos =baseMapper.getWebList();
          return recruitWebListVos;

    }

    @Override
    public void removeBrach(List<Integer> idList) {
        for (int i=0;i<idList.size();i++){
            CollectLinkDTO collectLinkDTO =new CollectLinkDTO();

            collectLinkDTO.setRecruitmentId(idList.get(i));

            ucenterClient.deleteCollectLink(collectLinkDTO);

        }
    }

    @Override
    public void removeBrachByCompanyId(List<Integer> idList) {
        QueryWrapper<Recruitment> queryWrapper = new QueryWrapper<>();
        List<Recruitment> recruitments =baseMapper.selectList(queryWrapper.in("company_id",idList));
        List<Integer> recruitIds =new ArrayList<>();

        if (recruitments!=null) {
            for (Recruitment recruitment : recruitments) {

                CollectLinkDTO collectLinkDTO = new CollectLinkDTO();

                collectLinkDTO.setRecruitmentId(recruitment.getId());

                recruitIds.add(recruitment.getId());

                ucenterClient.deleteCollectLink(collectLinkDTO);

            }

            baseMapper.deleteBatchIds(recruitIds);
        }

    }
}
