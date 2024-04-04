package com.atguigu.oss.controller;

import com.atguigu.oss.service.OssService;
import com.atguigu.commonutils.R;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author krilo
 * @date 2024-02-29 16:06
 */

@RestController
@RequestMapping("/eduoss/fileoss")
//@CrossOrigin
public class OssController {

    @Autowired
    private OssService ossService;


    //上传头像
    /**
     * 文件上传
     *
     * @param file
     */
    @ApiOperation(value = "文件上传")
    @PostMapping("/upload")
    public R uploadOssFile(MultipartFile file){
        //获取上传文件 MultipartFile
        //返回到oss路径

        String url = ossService.uploadFileAvator(file);
        return  R.ok().data("url",url);
    }


    @GetMapping("/test")
    public String test(){

        return "测试";
    }

}
