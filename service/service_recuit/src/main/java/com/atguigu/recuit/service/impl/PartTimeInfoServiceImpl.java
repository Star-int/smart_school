package com.atguigu.recuit.service.impl;

import com.atguigu.recuit.entity.PartTimeInfo;
import com.atguigu.recuit.entity.Query.ParttimeQuery;
import com.atguigu.recuit.mapper.PartTimeInfoMapper;
import com.atguigu.recuit.service.PartTimeInfoService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.NumberUtils;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author testjava
 * @since 2024-03-12
 */
@Service
public class PartTimeInfoServiceImpl extends ServiceImpl<PartTimeInfoMapper, PartTimeInfo> implements PartTimeInfoService {

    @Override
    public void pageQuery(Page<PartTimeInfo> partTimeInfoPage, ParttimeQuery parttimeQuery) {
        QueryWrapper<PartTimeInfo> queryWrapper =new QueryWrapper<>();
        queryWrapper.orderByAsc("gmt_create");
        if (parttimeQuery==null){

            baseMapper.selectPage(partTimeInfoPage,queryWrapper);
        }



        String salary= parttimeQuery.getSalary();
        String workplace = parttimeQuery.getWorkplace();
        String type = parttimeQuery.getType();

        if(!StringUtils.isEmpty(salary)) {
            queryWrapper.ge("salary", salary);
        }

        if(!StringUtils.isEmpty(workplace)) {
            queryWrapper.like("workplace",workplace);
        }

        if(!StringUtils.isEmpty(type)) {
            queryWrapper.like("type",type);
        }

        baseMapper.selectPage(partTimeInfoPage,queryWrapper);




        }
}
