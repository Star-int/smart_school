package com.atguigu.ucenter.service.impl;

import com.atguigu.commonutils.CollectLinkDTO;
import com.atguigu.serviceBase.GuiguException;
import com.atguigu.ucenter.entity.Collect;
import com.atguigu.ucenter.mapper.CollectMapper;
import com.atguigu.ucenter.service.CollectService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author testjava
 * @since 2024-03-28
 */
@Service
public class CollectServiceImpl extends ServiceImpl<CollectMapper, Collect> implements CollectService {

    @Override
    public void saveCollect(Collect collect) {
        QueryWrapper<Collect> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", collect.getUserId());
        if (!StringUtils.isEmpty(collect.getCourseId())){
            queryWrapper.eq("course_id", collect.getCourseId());
        }
        if (!StringUtils.isEmpty(collect.getGoodsId())){
            queryWrapper.eq("goods_id", collect.getGoodsId());
        }
        if (!StringUtils.isEmpty(collect.getRecruitmentId())){
            queryWrapper.eq("recruitment_id", collect.getRecruitmentId());
        }
        Collect exist =baseMapper.selectOne(queryWrapper);
        if (exist!=null){
            throw new GuiguException(20001,"你已收藏，请勿重复操作");

        }

        baseMapper.insert(collect);

    }

    @Override
    public void deleteCollect(Collect collect) {
        QueryWrapper<Collect> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", collect.getUserId());
        if (!StringUtils.isEmpty(collect.getCourseId())){
            queryWrapper.eq("course_id", collect.getCourseId());
        }
        if (!StringUtils.isEmpty(collect.getGoodsId())){
            queryWrapper.eq("goods_id", collect.getGoodsId());
        }
        if (!StringUtils.isEmpty(collect.getRecruitmentId())){
            queryWrapper.eq("recruitment_id", collect.getRecruitmentId());
        }

        baseMapper.delete(queryWrapper);



    }



    @Override
    public List<Collect> getCollects(String userId) {
        QueryWrapper<Collect> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("user_id",userId);
        List<Collect> collects =this.list(queryWrapper);

        return collects;


    }

    @Override
    public void deleteCollectLink(CollectLinkDTO collectLinkDTO) {

        QueryWrapper<Collect> queryWrapper = new QueryWrapper<>();
        System.out.println(collectLinkDTO);
        if (!StringUtils.isEmpty(collectLinkDTO.getCourseId())){
            queryWrapper.eq("course_id", collectLinkDTO.getCourseId());
        }
        if (!StringUtils.isEmpty(collectLinkDTO.getGoodsId())){
            queryWrapper.eq("goods_id", collectLinkDTO.getGoodsId());
        }
        if (!StringUtils.isEmpty(collectLinkDTO.getRecruitmentId())){
            queryWrapper.eq("recruitment_id", collectLinkDTO.getRecruitmentId());
        }
        System.out.println(queryWrapper);
        baseMapper.delete(queryWrapper);



    }


}
