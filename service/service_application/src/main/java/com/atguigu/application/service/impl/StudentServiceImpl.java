package com.atguigu.application.service.impl;

import com.atguigu.application.entity.Query.StudentQuery;
import com.atguigu.application.entity.Student;
import com.atguigu.application.mapper.StudentMapper;
import com.atguigu.application.service.StudentService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author testjava
 * @since 2024-03-31
 */
@Service
public class StudentServiceImpl extends ServiceImpl<StudentMapper, Student> implements StudentService {

    @Override
    public void pageQuery(Page<Student> studentPage, StudentQuery studentQuery) {
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.orderByDesc("gmt_create");

        if (!StringUtils.isEmpty(studentQuery.getStudentId())) {
            queryWrapper.eq("student_id", studentQuery.getStudentId());
        }

        if (!StringUtils.isEmpty(studentQuery.getStudentName())) {
            queryWrapper.like("student_name", studentQuery.getStudentName());
        }

        if (!StringUtils.isEmpty(studentQuery.getStudentId())) {
            queryWrapper.like("major", studentQuery.getMajor());
        }

        baseMapper.selectPage(studentPage,queryWrapper);


    }


}
