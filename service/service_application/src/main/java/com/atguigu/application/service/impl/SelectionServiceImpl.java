package com.atguigu.application.service.impl;

import com.atguigu.application.entity.Selection;
import com.atguigu.application.entity.Student;
import com.atguigu.application.mapper.SelectionMapper;
import com.atguigu.application.service.SelectionService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author testjava
 * @since 2024-04-01
 */
@Service
public class SelectionServiceImpl extends ServiceImpl<SelectionMapper, Selection> implements SelectionService {

    @Override
    public void pageQuery(Page<Selection> selectionPage, String studentId) {
        QueryWrapper<Selection> queryWrapper =new QueryWrapper<>();
        queryWrapper.orderByAsc("id");
        queryWrapper.eq("student_id",studentId);
        baseMapper.selectPage(selectionPage,queryWrapper);


    }


}
