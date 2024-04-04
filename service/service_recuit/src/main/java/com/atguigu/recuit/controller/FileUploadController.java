package com.atguigu.recuit.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * @author krilo
 * @date 2024-03-16 0:49
 */

@RestController
@RequestMapping("/recuit/upload")
public class FileUploadController {

    /*使用SpringBoot实现简单文件上传(上传至本地)  上传兼职图片*/
    @RequestMapping("/parttime")
    public String uploadParttimeImg(@RequestBody MultipartFile file) throws IOException {//MultipartFile 接收前端传过来的文件
        // 注意 前端传参的name要和MultipartFile的对象名保持一直 比如此处对象名为file 则前端传参的name也要为file

        String oldName=file.getOriginalFilename();//获取上传文件的文件名
        String path="D:\\VScode\\vue-admin-template-master\\vue-admin-10\\src\\static\\img\\recruit\\parttime\\";//指定上传路径
        String filePath=path+oldName;//拼接成为新文件的路径
        File newFile=new File(filePath);//创建新文件对象 指定文件路径为拼接好的路径
        file.transferTo(newFile);//将前端传递过来的文件输送给新文件 这里需要抛出IO异常 throws IOException
        return filePath;//上传完成后将文件路径返回给前端用作图片回显或增加时的文件路径值等
    }

    /*使用SpringBoot实现简单文件上传(上传至本地)  上传招聘图片*/
    @RequestMapping("/recruitment")
    public String uploadRecruitmentImg(@RequestBody MultipartFile file) throws IOException {//MultipartFile 接收前端传过来的文件
        // 注意 前端传参的name要和MultipartFile的对象名保持一直 比如此处对象名为file 则前端传参的name也要为file

        String oldName=file.getOriginalFilename();//获取上传文件的文件名
        String path="D:\\VScode\\vue-admin-template-master\\vue-admin-10\\src\\static\\img\\recruit\\recruitment\\";//指定上传路径
        String filePath=path+oldName;//拼接成为新文件的路径
        File newFile=new File(filePath);//创建新文件对象 指定文件路径为拼接好的路径
        file.transferTo(newFile);//将前端传递过来的文件输送给新文件 这里需要抛出IO异常 throws IOException
        return filePath;//上传完成后将文件路径返回给前端用作图片回显或增加时的文件路径值等
    }

    /*使用SpringBoot实现简单文件上传(上传至本地)  上传公司logo*/
    @RequestMapping("/company")
    public String uploadCompanyImg(@RequestBody MultipartFile file) throws IOException {//MultipartFile 接收前端传过来的文件
        // 注意 前端传参的name要和MultipartFile的对象名保持一直 比如此处对象名为file 则前端传参的name也要为file

        String oldName=file.getOriginalFilename();//获取上传文件的文件名
        String path="D:\\VScode\\vue-admin-template-master\\vue-admin-10\\src\\static\\img\\recruit\\company\\";//指定上传路径
        String filePath=path+oldName;//拼接成为新文件的路径
        File newFile=new File(filePath);//创建新文件对象 指定文件路径为拼接好的路径
        file.transferTo(newFile);//将前端传递过来的文件输送给新文件 这里需要抛出IO异常 throws IOException
        return filePath;//上传完成后将文件路径返回给前端用作图片回显或增加时的文件路径值等
    }


    /*使用SpringBoot实现简单文件上传(上传至本地)  上传简历*/
    @RequestMapping("/resume")
    public String uploadResumeImg(@RequestBody MultipartFile file) throws IOException {//MultipartFile 接收前端传过来的文件
        // 注意 前端传参的name要和MultipartFile的对象名保持一直 比如此处对象名为file 则前端传参的name也要为file

        String oldName=file.getOriginalFilename();//获取上传文件的文件名
        String path="D:\\VScode\\vue-admin-template-master\\vue-admin-10\\src\\static\\img\\recruit\\resume\\";//指定上传路径
        String filePath=path+oldName;//拼接成为新文件的路径
        File newFile=new File(filePath);//创建新文件对象 指定文件路径为拼接好的路径
        file.transferTo(newFile);//将前端传递过来的文件输送给新文件 这里需要抛出IO异常 throws IOException
        return filePath;//上传完成后将文件路径返回给前端用作图片回显或增加时的文件路径值等
    }

}
