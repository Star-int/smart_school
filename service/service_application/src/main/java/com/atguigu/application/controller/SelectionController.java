package com.atguigu.application.controller;


import com.atguigu.application.entity.Query.StudentQuery;
import com.atguigu.application.entity.Selection;
import com.atguigu.application.entity.Student;
import com.atguigu.application.service.SelectionService;
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
 * @since 2024-04-01
 */
@RestController
@RequestMapping("/application/selection")
public class SelectionController {

    @Autowired
    SelectionService selectionService;



    /**
     * 获取所有学生信息
     */
    @GetMapping("getAllselection")
    public R getAllstudent(){
        List<Selection>  selections = selectionService.list(null);

        return  R.ok().data("items",selections);

    }

    /**
     * 获取所有学生的选课列表
     */
    @GetMapping("getSelectionPage/{page}/{limit}")
    public R getAllstudentPage(@PathVariable Long page, @PathVariable Long limit, @RequestParam String studentId){
        Page<Selection> selectionPage =new Page<>(page,limit);

        selectionService.pageQuery(selectionPage,studentId);

        return R.ok().data("items",selectionPage);

    }




    @PostMapping("addSelection")
    public R addSelection(@RequestBody  Selection selection){
        System.out.println(selection);
        if (selection.getStudentId().equals("")){
            throw new GuiguException(20001,"你还未进行学生认证，请先进行学生认证");
        }
        QueryWrapper<Selection> queryWrapper = new QueryWrapper<Selection>();
        queryWrapper.eq("course_id", selection.getCourseId());
        queryWrapper.eq("student_id",selection.getStudentId());
        Selection eixst = selectionService.getOne(queryWrapper);
        if (eixst!=null){
            throw new GuiguException(20001,"你已选择此课，请勿重复选择");
        }


        selectionService.save(selection);

        return R.ok();

    }

    @PutMapping("updateSelection")
    public R updateSelection(@RequestBody Selection selection){
        selectionService.updateById(selection);

        return R.ok();

    }

    @DeleteMapping("deleteSelectionById/{id}")
    public R deleteSelection(@PathVariable Integer id){
        selectionService.removeById(id);


        return  R.ok();
    }

    @DeleteMapping("deleteSelectionsByStudentId/{studentId}")
    public R deleteSelectionByStudentId(@PathVariable String studentId){

        selectionService.remove(new QueryWrapper<Selection>().eq("student_id",studentId));

        return R.ok();

    }

    //批量删除学生所有选课信息
    @DeleteMapping("deleteSelectionsByStudentId")
    public R deleteBrachByStudentId(@RequestBody List<String> idList){

        selectionService.remove(new QueryWrapper<Selection>().in("student_id",idList));

        return R.ok();

    }



    @DeleteMapping("deteleBrach")
    public  R deteleBranch(@RequestBody List<Integer> idList){
        selectionService.removeByIds(idList);

        return R.ok();

    }





}

