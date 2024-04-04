package com.atguigu.eduservice.controller;


import com.atguigu.commonutils.CollectLinkDTO;
import com.atguigu.commonutils.R;
import com.atguigu.eduservice.client.UcenterClient;
import com.atguigu.eduservice.entity.EduCourse;
import com.atguigu.eduservice.entity.Query.CourseQuery;
import com.atguigu.eduservice.entity.chapter.ChapterVo;
import com.atguigu.eduservice.entity.subject.SubjectNestedVo;
import com.atguigu.eduservice.entity.vo.CourseInfoVo;
import com.atguigu.eduservice.entity.vo.CoursePublishVo;
import com.atguigu.eduservice.entity.vo.CourseQueryVo;
import com.atguigu.eduservice.entity.vo.CourseWebVo;
import com.atguigu.eduservice.service.EduChapterService;
import com.atguigu.eduservice.service.EduCourseService;
import com.atguigu.ucenter.entity.Collect;
import com.atguigu.ucenter.service.CollectService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 课程 前端控制器
 * </p>
 *
 * @author testjava
 * @since 2024-03-03
 */
@RestController
@RequestMapping("/eduservice/course")
//@CrossOrigin
public class EduCourseController {

    @Autowired
    EduCourseService eduCourseService;

    @Autowired
    EduChapterService eduChapterService;

    @Autowired
    CollectService collectService;

    @Autowired
    UcenterClient ucenterClient;



    @ApiOperation(value = "添加课程信息")
    @PostMapping("/addCourseInfo")
    public R addCourseInfo(@RequestBody CourseInfoVo courseInfoVo) {

        String id = eduCourseService.saveCourseInfo(courseInfoVo);
        return R.ok().data("courseId", id);

    }


    @ApiOperation(value = "所有课程列表")
    @GetMapping("/getAllCourse")
    public R getAllCourse() {
        List<EduCourse> eduCourses = eduCourseService.list(null);
        return R.ok().data("list", eduCourses);

    }


    //根据课程查询课程基本信息
    @ApiOperation(value = "根据id查询课程列表信息")
    @GetMapping("getCourseInfo/{courseId}")
    public R getCourseInfo(@PathVariable String courseId) {
        CourseInfoVo courseInfoVo = eduCourseService.getCourseInfo(courseId);

        return R.ok().data("courseInfo", courseInfoVo);
    }

    //修改课程信息
    @ApiOperation(value = "根据id修改课程信息")
    @PostMapping("/updateCourseInfo")
    public R updateCourseInfo(@RequestBody CourseInfoVo courseInfoVo) {

        eduCourseService.updateCourseInfo(courseInfoVo);

        return R.ok().message("修改成功");
    }

    //根据课程id查询课程确认信息
    @ApiOperation(value = "查询课程确认信息")
    @GetMapping("/getPublishCourseInfo/{id}")
    public R getPublishCourseInfo(@PathVariable String id) {

        CoursePublishVo coursePublishVo = eduCourseService.getCoursePublishVoById(id);

        return R.ok().data("items", coursePublishVo);

    }

    //发布课程
    @ApiOperation(value = "发布课程")
    @PutMapping("/publish/{id}")
    public R publishCourse(@PathVariable String id) {
        eduCourseService.publishCourseById(id);

        return R.ok();
    }

    //分页查询
    @ApiOperation(value = "分页查询")
    @GetMapping("/searchCourse/{page}/{limit}")
    public R searchCourse(@PathVariable Long page, @PathVariable Long limit,
                          CourseQuery courseQuery) {
        Page<EduCourse> eduCoursePage = new Page<>(page,limit);
        eduCourseService.pageQuery(eduCoursePage,courseQuery);
        List<EduCourse> records =eduCoursePage.getRecords();
        long total =eduCoursePage.getTotal();

        return  R.ok().data("total",total).data("rows",records);


    }


    //分页查询
    @ApiOperation(value = "分页查询收藏课程")
    @GetMapping("/searchCollectCourse/{page}/{limit}")
    public R searchCollectCourse(@PathVariable Long page, @PathVariable Long limit,
                          @RequestParam String userId ) {
        IPage<EduCourse> eduCoursePage = new Page<>(page, limit);

        List<Collect> collects = collectService.getCollects(userId);
        List<String> courseIds = new ArrayList<>();
        for (Collect collect : collects) {
            courseIds.add(collect.getCourseId());
        }

         if (collects.size()!=0) {
             eduCoursePage = eduCourseService.page(eduCoursePage, new QueryWrapper<EduCourse>().in("id", courseIds));
         }
        return R.ok().data("items", eduCoursePage);


    }




    @ApiOperation(value="删除课程")
    @DeleteMapping("/deleteById/{id}")
    public R deleteById(@PathVariable String id){
        CollectLinkDTO collectLinkDTO =new CollectLinkDTO();
        collectLinkDTO.setCourseId(id);
        ucenterClient.deleteCollectLink(collectLinkDTO);

        boolean result = eduCourseService.removeCourseById(id);

        if(result){
            return R.ok();
        }else{
            return R.error().message("删除失败");
        }

    }






    /**
     * 前台课程分页
     * @param page
     * @param limit
     * @param courseQuery
     * @return
     */
    @ApiOperation(value = "前台分页课程列表")
    @PostMapping(value = "/getfrontCourseList/{page}/{limit}")
    public R pageList(
            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable Long page,

            @ApiParam(name = "limit", value = "每页记录数", required = true)
            @PathVariable Long limit,

            @ApiParam(name = "courseQuery", value = "查询对象", required = false)
            @RequestBody(required = false) CourseQueryVo courseQuery){
        Page<EduCourse> pageParam = new Page<EduCourse>(page, limit);
        Map<String, Object> map = eduCourseService.pageListWeb(pageParam, courseQuery);
        return  R.ok().data(map);
    }

    @ApiOperation(value = "根据ID查询课程")
    @GetMapping(value = "/getfrontCourseByCourseId/{courseId}")
    public R getById(
            @ApiParam(name = "courseId", value = "课程ID", required = true)
            @PathVariable String courseId){

        //查询课程信息和讲师信息
        CourseWebVo courseWebVo = eduCourseService.selectInfoWebById(courseId);

        //查询当前课程的章节信息
        List<ChapterVo> chapterVoList = eduChapterService.getChapterVideoByCourseId(courseId);

        return R.ok().data("course", courseWebVo).data("chapterVoList", chapterVoList);
    }

}

