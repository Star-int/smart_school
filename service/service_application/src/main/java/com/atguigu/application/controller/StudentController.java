package com.atguigu.application.controller;


import com.atguigu.application.entity.Leave;
import com.atguigu.application.entity.Query.LeaveQuery;
import com.atguigu.application.entity.Query.StudentQuery;
import com.atguigu.application.entity.Student;
import com.atguigu.application.service.StudentService;
import com.atguigu.commonutils.R;
import com.atguigu.serviceBase.GuiguException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author testjava
 * @since 2024-03-31
 */
@RestController
@RequestMapping("/application/student")
public class StudentController {
    @Autowired
    StudentService studentService;

    /**
     * 获取所有学生信息
     */
    @GetMapping("getAllstudent")
    public R getAllstudent(){
        List<Student> student = studentService.list(null);

        return  R.ok().data("items",student);

    }

    /**
     * 获取所有学生的列表
     */
    @GetMapping("getAllstudentPage/{page}/{limit}")
    public R getAllstudentPage(@PathVariable Long page, @PathVariable Long limit, StudentQuery studentQuery){
        Page<Student> studentPage =new Page<>(page,limit);

        studentService.pageQuery(studentPage,studentQuery);

        return R.ok().data("items",studentPage);

    }


    @GetMapping("getstudentById/{id}")
    public R getById(@PathVariable Integer id) {
        Student students =studentService.getById(id);


        return R.ok().data("items",students);

    }

    @PostMapping("addStudent")
    public R addStudent(@RequestBody  Student student){
        Student eixst = studentService.getOne(new QueryWrapper<Student>().eq("student_id",student.getStudentId()));
       if (eixst!=null){
           throw new GuiguException(20001,"该学号已经存在,请使用选择认证");

       }

        studentService.save(student);

        return R.ok();

    }

    @PutMapping("updateStudent")
    public R updateStudent(@RequestBody Student student){
        studentService.updateById(student);

        return R.ok();

    }

    @DeleteMapping("deleteStudentById/{id}")
    public R deleteStudent(@PathVariable Integer id){
        studentService.removeById(id);

        return  R.ok();
    }


    @GetMapping("getStudentInfoByUserId/{userId}")
    public R getStudentInfoByUserId(@PathVariable String userId){
        Student student =studentService.getOne(new QueryWrapper<Student>().eq("user_id",userId));

        return  R.ok().data("items",student);

    }

    @DeleteMapping("deteleBrach")
    public  R deteleBranch(@RequestBody List<Integer> idList){
        studentService.removeByIds(idList);

        return R.ok();

    }

    @GetMapping("getUndefineStuedentInfo")
    public R getUndefineStudent(){
        QueryWrapper<Student> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("user_id","");
        List<Student> students = studentService.list(queryWrapper);

        return R.ok().data("items",students);


    }


}

