package com.atguigu.eduservice.service.impl;

import com.atguigu.eduservice.entity.EduTeacher;
import com.atguigu.eduservice.entity.subject.TeacherQuery;
import com.atguigu.eduservice.mapper.EduTeacherMapper;
import com.atguigu.eduservice.service.EduTeacherService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 讲师 服务实现类
 * </p>
 *
 * @author testjava
 * @since 2024-02-16
 */
@Service
public class EduTeacherServiceImpl extends ServiceImpl<EduTeacherMapper, EduTeacher> implements EduTeacherService {


    @Override
    public void pageQuery(Page<EduTeacher> pageParam, TeacherQuery teacherQuery) {
        QueryWrapper<EduTeacher> queryWrapper =new QueryWrapper<>();
        queryWrapper.orderByAsc("id");//升序

        if(teacherQuery==null){
            baseMapper.selectPage(pageParam,queryWrapper);
            return;

        }

        String name = teacherQuery.getName();
        Integer level = teacherQuery.getLevel();
        String begin = teacherQuery.getBegin();
        String end = teacherQuery.getEnd();

        if(!StringUtils.isEmpty(name)){
            queryWrapper.like("name",name);
        }

        if (!StringUtils.isEmpty(level)){
            queryWrapper.eq("level",level);
        }

        if (!StringUtils.isEmpty(begin)){
            queryWrapper.ge("gmt_create",begin);
        }

        if (!StringUtils.isEmpty(end)) {
            queryWrapper.le("gmt_modified",end);
        }

        baseMapper.selectPage(pageParam,queryWrapper);


    }

    @Override
    public List<EduTeacher> getFourTeacherInfo() {
        QueryWrapper<EduTeacher> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByAsc("id");
        queryWrapper.last("limit 4");
        List<EduTeacher> eduTeachers = baseMapper.selectList(queryWrapper);

        return  eduTeachers;

    }

    @Override
    public IPage<Map<String,Object>> pageListWeb(Page<EduTeacher> pageParam) {
         QueryWrapper<EduTeacher> queryWrapper =new QueryWrapper<>();
         queryWrapper.orderByAsc("id");
         IPage<Map<String,Object>> page = baseMapper.selectMapsPage(pageParam,queryWrapper);


        return page;
    }

}
