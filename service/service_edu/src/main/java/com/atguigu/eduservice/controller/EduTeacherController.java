package com.atguigu.eduservice.controller;

import com.atguigu.commonutils.R;
import com.atguigu.eduservice.entity.EduCourse;
import com.atguigu.eduservice.entity.EduTeacher;
import com.atguigu.eduservice.entity.subject.TeacherQuery;
import com.atguigu.eduservice.service.EduCourseService;
import com.atguigu.eduservice.service.EduTeacherService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 讲师 前端控制器
 * </p>
 *
 * @author testjava
 * @since 2024-02-16
 */

@Api(description = "讲师管理")
//@CrossOrigin(origins = "*") //跨域
@RestController
@RequestMapping("/eduservice/teacher")
public class EduTeacherController {

    @Autowired
    EduTeacherService eduTeacherService;

    @Autowired
    EduCourseService eduCourseService;

    @ApiOperation(value = "所有讲师列表")
    @GetMapping("findAll")
    public R findAllTeacher() {
        List<EduTeacher> eduTeachers = eduTeacherService.list(null);


        return R.ok().data("item", eduTeachers);

    }




    @ApiOperation(value = "根据id删除讲师")
    @DeleteMapping("delete/{id}")
    public R removeById(@ApiParam(name = "id", value = "讲师id", required = true) @PathVariable String id) {

        EduTeacher eduTeacher = eduTeacherService.getById(id);

        if (eduTeacher == null) {
            return R.error();
        } else {
            boolean flag = eduTeacherService.removeById(id);
            return R.ok();

        }
    }


    @ApiOperation(value = "批量删除讲师")
    @DeleteMapping("deleteBrach")
    public R removeBrach(@ApiParam(name = "id", value = "讲师id", required = true) @RequestBody  List<String> idList) {

         eduTeacherService.removeByIds(idList);

         return R.ok();


    }



    @ApiOperation(value = "分页讲师列表")
    @GetMapping("/pageTeacherCondition/{current}/{limit}")
    public R pageTeacher(@ApiParam(name = "current", value = "当前页码", required = true)
                         @PathVariable long current,

                         @ApiParam(name = "limit", value = "每页记录数", required = true)
                         @PathVariable long limit,

                         @ApiParam(name = "teacherQuery", value = "查询对象", required = false)
                           TeacherQuery teacherQuery) {
        Page<EduTeacher> pageTeacher = new Page<>(current, limit);

//      eduTeacherService.page(pageTeacher,null);
        System.out.println("查询条件的名字为"+teacherQuery);
        eduTeacherService.pageQuery(pageTeacher, teacherQuery);
        List<EduTeacher> records = pageTeacher.getRecords();
        long total = pageTeacher.getTotal();

        return R.ok().data("total", total).data("rows", records);
    }

    @ApiOperation(value="添加讲师")
    @PostMapping("/addTeacher")
    public R save(@ApiParam(name = "teacher", value = "讲师对象", required = true)
                  @RequestBody EduTeacher eduTeacher) {

        eduTeacherService.save(eduTeacher);
        return R.ok();

    }

    @ApiOperation(value = "根据ID查询讲师")
    @GetMapping("/getTeacher/{id}")
    public R getById(
            @ApiParam(name = "id", value = "讲师ID", required = true)
            @PathVariable String id){

        EduTeacher teacher = eduTeacherService.getById(id);

        //根据讲师id查询这个讲师的课程列表
        List<EduCourse> courseList = eduCourseService.selectByTeacherId(id);
        return R.ok().data("item", teacher).data("courseList",courseList);
    }



    @ApiOperation(value = "根据修改讲师")
    @PutMapping("/updateTeacher/{id}")
    public R updateById(
            @ApiParam(name = "id", value = "讲师ID", required = true)
            @PathVariable String id,

            @ApiParam(name = "teacher", value = "讲师对象", required = true)
            @RequestBody EduTeacher teacher){

        teacher.setId(id);
        eduTeacherService.updateById(teacher);
        return R.ok();
    }


    /**
     *   前端页面分页查询教师信息
     */

    @ApiOperation(value = "分页讲师列表")
    @GetMapping(value = "/getPageTeacherList/{page}/{limit}")
    public R pageList(
            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable Long page,

            @ApiParam(name = "limit", value = "每页记录数", required = true)
            @PathVariable Long limit){

        Page<EduTeacher> pageParam = new Page<EduTeacher>(page, limit);

        IPage<Map<String,Object>> pagelist = eduTeacherService.pageListWeb(pageParam);

        return  R.ok().data("items",pagelist);
    }



}

