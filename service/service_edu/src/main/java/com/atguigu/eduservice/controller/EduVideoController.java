package com.atguigu.eduservice.controller;


import com.atguigu.commonutils.R;
import com.atguigu.eduservice.client.VodClient;
import com.atguigu.eduservice.entity.EduVideo;
import com.atguigu.eduservice.entity.Form.VideoInfoForm;
import com.atguigu.eduservice.service.EduVideoService;
import com.atguigu.serviceBase.GuiguException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 课程视频 前端控制器
 * </p>
 *
 * @author testjava
 * @since 2024-03-03
 */
@RestController
@RequestMapping("/eduservice/video")
//@CrossOrigin
public class EduVideoController {

    @Autowired
    EduVideoService eduVideoService;

    @Autowired
    VodClient vodClient;


    @ApiOperation(value = "新增课时")
    @PostMapping("/save")
    public R addVideo(@ApiParam(name = "videoForm", value = "课时对象", required = true)
            @RequestBody VideoInfoForm videoInfoForm) {

        eduVideoService.saveVideoInfo(videoInfoForm);

        return  R.ok();

    }

    @ApiOperation(value = "根据ID查询课时")
    @GetMapping("/getVideoById/{id}")
    public R getVideoById(@PathVariable String id){

        VideoInfoForm videoInfoForm=eduVideoService.getVideoInfoFormById(id);
        return R.ok().data("item",videoInfoForm);
    }


    @ApiOperation(value = "更新课时")
    @PutMapping("/updateVideoInfo/{id}")
    public R updateVideo(@PathVariable String id,@RequestBody VideoInfoForm videoInfoForm){

        Boolean result =eduVideoService.updateVideoInfo(videoInfoForm);

        return R.ok();

    }


    //需要同时把阿里云的视频删除
    @ApiOperation(value = "根据ID删除课时")
    @DeleteMapping("/deleteById/{id}")
    public R deleteById(@PathVariable String id){
        //根据小节id获取视频sourceId,调用方法实现删除
        EduVideo eduVideo =eduVideoService.getById(id);
        String videoSourceId =eduVideo.getVideoSourceId();

        //判断小节里面是否有视频id
        if(!StringUtils.isEmpty(videoSourceId)) {
           R result= vodClient.removeVideo(videoSourceId);
           if(result.getCode()==20001){
               throw new GuiguException(20001,"删除视频失败。熔断器启动....");
           }

        }

        //删除小节
        eduVideoService.removeById(id);
        return R.ok();

    }

    //用于course删除的时候先调用这个方法把相关的video删除了才能将course删除
    @ApiOperation(value = "根据courseId删除课时")
    @DeleteMapping("/deleteByCourseId/{courseId}")
    public R deleteByCourseId(@PathVariable String courseId){

        eduVideoService.removeByCourseId(courseId);
        return R.ok();

    }

    //在移除视频的时候需要把oss的内容设置为空
    @PutMapping("setOssNull/{id}")
    public R setOssVideoNUll(@PathVariable String id){

        EduVideo eduVideo= eduVideoService.getById(id);
        eduVideo.setVideoOriginalName("");
        eduVideo.setVideoSourceId("");
        eduVideoService.updateById(eduVideo);
        return R.ok();
    }




}

