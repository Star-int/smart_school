package com.atguigu.eduservice.mapper;

import com.atguigu.eduservice.entity.EduCourse;
import com.atguigu.eduservice.entity.vo.CoursePublishVo;
import com.atguigu.eduservice.entity.vo.CourseWebVo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 * <p>
 * 课程 Mapper 接口
 * </p>
 *
 * @author testjava
 * @since 2024-03-03
 */
public interface EduCourseMapper extends BaseMapper<EduCourse> {

      public CoursePublishVo getPulishCourseInfo(String courseId);
      CourseWebVo selectInfoWebById(String courseId);
}
