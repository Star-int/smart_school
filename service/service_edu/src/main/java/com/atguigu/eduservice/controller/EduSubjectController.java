package com.atguigu.eduservice.controller;


import com.atguigu.commonutils.R;
import com.atguigu.eduservice.entity.EduSubject;
import com.atguigu.eduservice.entity.subject.SubjectNestedVo;
import com.atguigu.eduservice.service.EduSubjectService;
import com.atguigu.serviceBase.GuiguException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * <p>
 * 课程科目 前端控制器
 * </p>
 *
 * @author testjava
 * @since 2024-02-29
 */
@RestController
@RequestMapping("/eduservice/subject")
//@CrossOrigin
public class EduSubjectController {

    @Autowired
    private EduSubjectService eduSubjectService;

    @PostMapping("/addSubject")
     public R addSubject(MultipartFile file)
    {
         eduSubjectService.saveSubject(file,eduSubjectService);
         return R.ok();
    }

    @ApiOperation(value = "嵌套数据列表")
    @GetMapping("/list")
    public R nestedList(){

        //一级分类
        List<SubjectNestedVo> subjectNestedVoList = eduSubjectService.nestedList();

        return R.ok().data("items", subjectNestedVoList);
    }



    @ApiOperation(value = "分页嵌套数据列表")
    @GetMapping("/list1/{page}/{limit}")
    public R nestedListPage(@PathVariable int page,@PathVariable int limit){

        //一级分类
        List<SubjectNestedVo> subjectNestedVoList = eduSubjectService.nestedList();

        int startIndex = (page - 1) * limit;
        int endIndex = Math.min(startIndex + limit, subjectNestedVoList.size());

        List<SubjectNestedVo> paginatedList = subjectNestedVoList.subList(startIndex, endIndex);

        IPage<SubjectNestedVo> page1=new Page<>(page,limit);
        page1.setRecords(paginatedList);
        page1.setTotal(subjectNestedVoList.size());
        page1.setCurrent(page);
        page1.setSize(limit);


        return R.ok().data("page",page1);
    }

    /**
     * 添加一级分类
     */
    @PostMapping("addOneSuject")
    public R addOneSuject(@RequestBody  EduSubject eduSubject){
        eduSubject.setParentId("0");
        QueryWrapper<EduSubject> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("title",eduSubject.getTitle());
        EduSubject subject1 = eduSubjectService.getOne(queryWrapper);
        if (subject1!=null){

            throw new GuiguException(20001,"该一级分类已存在");
        }
        eduSubjectService.save(eduSubject);
        return R.ok().message("添加成功");
    }


    /**
     * 根据id添加二级分类
     */
    @PostMapping("addTwoSubject")
    public R addtTwoSuject(@RequestBody  EduSubject eduSubject){
        eduSubjectService.save(eduSubject);
        return R.ok().message("添加成功");
    }

    /**
     * 根据id删除节点
     */
    @DeleteMapping("deleteSubject/{id}")
    public R deleteSubjuct(@PathVariable String id){
        QueryWrapper<EduSubject> queryWrapper =new QueryWrapper<>();
        EduSubject eduSubject =eduSubjectService.getById(id);
        if (eduSubject.getParentId().equals("0"))
        {queryWrapper.eq("parent_id",id);
        eduSubjectService.remove(queryWrapper);}

        eduSubjectService.removeById(id);

        return R.ok().message("删除成功");
    }

    /**
     * 根据id更新节点
     */
    @PutMapping("updateSubject")
    public R updateById(@RequestBody  EduSubject eduSubject){
        eduSubjectService.updateById(eduSubject);

        return R.ok().message("编辑成功");

    }

}

