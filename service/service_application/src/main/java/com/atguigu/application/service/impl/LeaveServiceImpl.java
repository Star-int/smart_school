package com.atguigu.application.service.impl;

import com.atguigu.application.entity.Leave;
import com.atguigu.application.entity.Query.LeaveQuery;
import com.atguigu.application.mapper.LeaveMapper;
import com.atguigu.application.service.LeaveService;
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
 * @since 2024-03-31
 */
@Service
public class LeaveServiceImpl extends ServiceImpl<LeaveMapper, Leave> implements LeaveService {

    @Override
    public void pageQuery(Page<Leave> leavePage, LeaveQuery leaveQuery) {
        QueryWrapper<Leave> queryWrapper =new QueryWrapper<>();
        queryWrapper.orderByDesc("gmt_modified");
        if (!StringUtils.isEmpty(leaveQuery.getStudentName())){
        queryWrapper.like("student_name",leaveQuery.getStudentName());}
        baseMapper.selectPage(leavePage,queryWrapper);

    }

    @Override
    public void pageQueryHasId(Page<Leave> leavePage, LeaveQuery leaveQuery) {
        QueryWrapper<Leave> queryWrapper =new QueryWrapper<>();
        queryWrapper.orderByDesc("gmt_modified");
        if (!StringUtils.isEmpty(leaveQuery.getStudentName())){
            queryWrapper.like("student_name",leaveQuery.getStudentName());}

        if (!StringUtils.isEmpty(leaveQuery.getTeacherId())){
            queryWrapper.eq("approver_id",leaveQuery.getTeacherId());}

        if (!StringUtils.isEmpty(leaveQuery.getStudentId())){
            queryWrapper.eq("student_id",leaveQuery.getStudentId());}

        baseMapper.selectPage(leavePage,queryWrapper);


    }
}
