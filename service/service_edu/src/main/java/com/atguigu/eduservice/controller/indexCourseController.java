package com.atguigu.eduservice.controller;

import com.atguigu.commonutils.R;
import com.atguigu.eduservice.entity.EduChapter;
import com.atguigu.eduservice.entity.EduCourse;
import com.atguigu.eduservice.entity.EduTeacher;
import com.atguigu.eduservice.service.EduCourseService;
import com.atguigu.eduservice.service.EduTeacherService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author krilo
 * @date 2024-03-10 16:15
 */
@RestController
@RequestMapping("/eduservice/index")
//@CrossOrigin
public class indexCourseController {

    @Autowired
    EduCourseService eduCourseService;

    @Autowired
    EduTeacherService eduTeacherService;


//    @Cacheable(value = "frontInfo", key = "'selectIndexList'")
    @ApiOperation("前台获取部分老师和课程的信息")
    @GetMapping("getIndexInfo")
    public R getIndexInfo(){
        //获取前四位老师的信息
        List<EduTeacher> teachers = eduTeacherService.getFourTeacherInfo();


        //获取前四门课程信息
        List<EduCourse> courses =eduCourseService.getEgihtCourseInfo();

        return R.ok().data("teachers",teachers).data("courses",courses);

    }
}
