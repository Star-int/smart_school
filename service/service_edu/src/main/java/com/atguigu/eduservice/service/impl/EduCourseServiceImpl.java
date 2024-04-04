package com.atguigu.eduservice.service.impl;

import com.atguigu.eduservice.client.UcenterClient;
import com.atguigu.eduservice.entity.EduCourse;
import com.atguigu.eduservice.entity.EduCourseDescription;
import com.atguigu.eduservice.entity.EduTeacher;
import com.atguigu.eduservice.entity.Query.CourseQuery;
import com.atguigu.eduservice.entity.vo.CourseInfoVo;
import com.atguigu.eduservice.entity.vo.CoursePublishVo;
import com.atguigu.eduservice.entity.vo.CourseQueryVo;
import com.atguigu.eduservice.entity.vo.CourseWebVo;
import com.atguigu.eduservice.mapper.EduCourseMapper;
import com.atguigu.eduservice.service.EduChapterService;
import com.atguigu.eduservice.service.EduCourseDescriptionService;
import com.atguigu.eduservice.service.EduCourseService;
import com.atguigu.eduservice.service.EduVideoService;
import com.atguigu.serviceBase.GuiguException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 课程 服务实现类
 * </p>
 *
 * @author testjava
 * @since 2024-03-03
 */
@Service
public class EduCourseServiceImpl extends ServiceImpl<EduCourseMapper, EduCourse> implements EduCourseService {
     //课程描述的注入
     @Autowired
    EduCourseDescriptionService eduCourseDescriptionService;


     @Autowired
     EduVideoService eduVideoService;

    @Autowired
     EduChapterService eduChapterService;



    /**
     * 添加课程基本信息的方法
     * @param courseInfoVo
     */
    @Override
    public String saveCourseInfo(CourseInfoVo courseInfoVo) {
        //1、向课程表添加课程表基本信息
          //courseInfoVo转换成eduCourse
        EduCourse eduCourse = new EduCourse();
        BeanUtils.copyProperties(courseInfoVo,eduCourse);
         Boolean success=this.save(eduCourse);//成功添加的条数
         if(!success){
             throw new GuiguException(20001,"课程信息保存失败");
         }

        //2、向课程简介表添加课程课程简介
         EduCourseDescription eduCourseDescription =new EduCourseDescription();
         eduCourseDescription.setDescription(courseInfoVo.getDescription());
         String courseId =eduCourse.getId();
         eduCourseDescription.setId(courseId);
        Boolean success1=eduCourseDescriptionService.save(eduCourseDescription);
        if(!success1){
            throw new GuiguException(20001,"课程描述信息保存失败");
        }

        return courseId;
    }

    @Override
    public CourseInfoVo getCourseInfo(String courseId) {
       //查询课程表
        EduCourse eduCourse =baseMapper.selectById(courseId);
        CourseInfoVo courseInfoVo = new CourseInfoVo();
        BeanUtils.copyProperties(eduCourse,courseInfoVo);

        //查询课程表描述
        EduCourseDescription eduCourseDescription =eduCourseDescriptionService.getById(courseId);
        courseInfoVo.setDescription(eduCourseDescription.getDescription());

        return courseInfoVo;
    }

    @Override
    public void updateCourseInfo(CourseInfoVo courseInfoVo) {
           //修改课程表
          EduCourse eduCourse =new EduCourse();
          BeanUtils.copyProperties(courseInfoVo,eduCourse);
          int update =baseMapper.updateById(eduCourse);
          if (update==0){
              throw new GuiguException(20001,"修改课程信息失败");
          }

          //修改课程表描述信息
          EduCourseDescription eduCourseDescription =new EduCourseDescription();
          eduCourseDescription.setId(courseInfoVo.getId());
          eduCourseDescription.setDescription(courseInfoVo.getDescription());
          eduCourseDescriptionService.updateById(eduCourseDescription);

    }

    @Override
    public CoursePublishVo getCoursePublishVoById(String id) {

        CoursePublishVo coursePublishVo =baseMapper.getPulishCourseInfo(id);
        return coursePublishVo;
    }



    @Override
    public void pageQuery(Page<EduCourse> pageParam, CourseQuery courseQuery) {
        QueryWrapper<EduCourse> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByAsc("gmt_create");

        if (courseQuery == null){
            baseMapper.selectPage(pageParam, queryWrapper);
            return;
        }

        String title = courseQuery.getTitle();
        String teacherId = courseQuery.getTeacherId();
        String subjectParentId = courseQuery.getSubjectParentId();
        String subjectId = courseQuery.getSubjectId();

        if (!StringUtils.isEmpty(title)) {
            queryWrapper.like("title", title);
        }

        if (!StringUtils.isEmpty(teacherId) ) {
            queryWrapper.eq("teacher_id", teacherId);
        }

        if (!StringUtils.isEmpty(subjectParentId)) {
            queryWrapper.eq("subject_parent_id", subjectParentId);
        }

        if (!StringUtils.isEmpty(subjectId)) {
            queryWrapper.eq("subject_id", subjectId);
        }

        baseMapper.selectPage(pageParam, queryWrapper);
    }

    @Override
    public void publishCourseById(String id) {
        EduCourse eduCourse =new EduCourse();
        eduCourse.setId(id);
        eduCourse.setStatus("Normal");
        Integer update = baseMapper.updateById(eduCourse);
        if(update<=0){
            throw new GuiguException(20001,"发布课程失败");
        }

    }

    @Override
    public boolean removeCourseById(String id) {

         //根据id删除所有视频
        eduVideoService.removeByCourseId(id);

        //根据id删除所有章节
        eduChapterService.removeByCourseId(id);

        //根据id删除课程描述
        eduCourseDescriptionService.removeById(id);

        Integer result = baseMapper.deleteById(id);
        return null != result && result > 0;
    }


     //获取前八门课程的信息
    @Override
    public List<EduCourse> getEgihtCourseInfo() {
        QueryWrapper<EduCourse> queryWrapper = new QueryWrapper<>();
//        queryWrapper.orderByAsc("id");

        queryWrapper.last("order by --id asc limit 8");
        List<EduCourse> eduCourses = baseMapper.selectList(queryWrapper);

        return  eduCourses;
    }


    /**
     * 根据讲师id查询当前讲师的课程列表
     * @param
     * @return
     */
    @Override
    public List<EduCourse> selectByTeacherId(String id) {

        QueryWrapper<EduCourse> queryWrapper = new QueryWrapper<EduCourse>();

        queryWrapper.eq("teacher_id", id);
        //按照最后更新时间倒序排列
        queryWrapper.orderByDesc("gmt_modified");

        List<EduCourse> courses = baseMapper.selectList(queryWrapper);

        return courses;

    }

    @Override
    public Map<String, Object> pageListWeb(Page<EduCourse> pageParam, CourseQueryVo courseQuery) {

        QueryWrapper<EduCourse> queryWrapper = new QueryWrapper<>();
        if (!StringUtils.isEmpty(courseQuery.getSubjectParentId())) {
            queryWrapper.eq("subject_parent_id", courseQuery.getSubjectParentId());
        }

        if (!StringUtils.isEmpty(courseQuery.getSubjectId())) {
            queryWrapper.eq("subject_id", courseQuery.getSubjectId());
        }

        if (!StringUtils.isEmpty(courseQuery.getBuyCountSort())) {
            queryWrapper.orderByDesc("buy_count");
        }

        if (!StringUtils.isEmpty(courseQuery.getGmtCreateSort())) {
            queryWrapper.orderByDesc("gmt_create");
        }

        if (!StringUtils.isEmpty(courseQuery.getPriceSort())) {
            queryWrapper.orderByDesc("price");
        }

        baseMapper.selectPage(pageParam, queryWrapper);

        List<EduCourse> records = pageParam.getRecords();
        long current = pageParam.getCurrent();
        long pages = pageParam.getPages();
        long size = pageParam.getSize();
        long total = pageParam.getTotal();
        boolean hasNext = pageParam.hasNext();
        boolean hasPrevious = pageParam.hasPrevious();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("items", records);
        map.put("current", current);
        map.put("pages", pages);
        map.put("size", size);
        map.put("total", total);
        map.put("hasNext", hasNext);
        map.put("hasPrevious", hasPrevious);

        return map;
    }

    @Override
    public CourseWebVo selectInfoWebById(String id) {
        this.updatePageViewCount(id);
        return baseMapper.selectInfoWebById(id);
    }

    @Override
    public void updatePageViewCount(String id) {
        EduCourse course = baseMapper.selectById(id);
        course.setViewCount(course.getViewCount() + 1);
        baseMapper.updateById(course);
    }

}
