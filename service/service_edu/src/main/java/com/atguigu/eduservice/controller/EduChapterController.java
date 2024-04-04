package com.atguigu.eduservice.controller;


import com.atguigu.commonutils.R;
import com.atguigu.eduservice.entity.EduChapter;
import com.atguigu.eduservice.entity.chapter.ChapterVo;
import com.atguigu.eduservice.service.EduChapterService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 * 课程 前端控制器
 * </p>
 *
 * @author testjava
 * @since 2024-03-03
 */
@RestController
@RequestMapping("/eduservice/chapter")
//@CrossOrigin
public class EduChapterController {

    @Autowired
    EduChapterService eduChapterService;

    @ApiOperation(value = "获取章节列表")
    @GetMapping("/getChapterById/{courseId}")
    public R getChapterVideo(@PathVariable String courseId){

        List<ChapterVo> chapterVos =eduChapterService.getChapterVideoByCourseId(courseId);
        return  R.ok().data("allChapterVideo",chapterVos);

    }

    @ApiOperation(value = "新增章节")
    @PostMapping("/save")
    public R save(
            @ApiParam(name = "chapterVo", value = "章节对象", required = true)
            @RequestBody EduChapter chapter){

        eduChapterService.save(chapter);
        return R.ok();
    }

    @ApiOperation(value = "根据id查章节")
    @GetMapping("/getById/{id}")
    public R getById(@PathVariable String id)
    {
       EduChapter eduChapter= eduChapterService.getById(id);
       return R.ok().data("chapter",eduChapter);
    }


    @ApiOperation(value = "根据id更新章节数据")
    @PostMapping("/update")
    public R updateChapter(@RequestBody EduChapter eduChapter){

       Boolean success= eduChapterService.updateById(eduChapter);
       if (success){
           return R.ok().message("保存成功");
       }else {
           return R.error().message("保存失败");

       }

    }


    @ApiOperation(value = "根据id删除章节数据")
    @DeleteMapping("/deleteById/{id}")
    public  R deleteById(@PathVariable String id){
       Boolean success=eduChapterService.removeChapterById(id);
       if(success){
          return R.ok().message("删除成功");
       }else {
           return  R.error().message("删除失败");
       }



    }

}

