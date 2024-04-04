package com.atguigu.oss.service.serviceImpl;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.atguigu.oss.service.OssService;
import com.atguigu.oss.utils.ConstantPropertiesUtil;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Date;
import java.util.UUID;

/**
 * @author krilo
 * @date 2024-02-29 16:07
 */

@Service
public class OssServiceImpl implements OssService {

    @Override
    public String uploadFileAvator(MultipartFile file) {
        //工具类获取阿里云存储相关常量
        String endPoint = ConstantPropertiesUtil.END_POINT;
        String accessKeyId = ConstantPropertiesUtil.ACCESS_KEY_ID;
        String accessKeySecret = ConstantPropertiesUtil.ACCESS_KEY_SECRET;
        String bucketName = ConstantPropertiesUtil.BUCKET_NAME;

     try{
         //创建OSS实例
         OSS ossClient = new OSSClientBuilder().build(endPoint, accessKeyId, accessKeySecret);

         //上传文件流
         InputStream inputStream=file.getInputStream();

         //获取文件名称
         String fileName=file.getOriginalFilename();

         //添加文件随机唯一的值
         String uuid = UUID.randomUUID().toString().replaceAll("-","");
         fileName=uuid+fileName;

         String datePath = new DateTime().toString("yyyy/MM/dd");
         fileName=datePath+"/"+fileName;


         //调用oss方法实现上传
         //第一个参数是Bucket名称
         //第二个参数是上传到文件路径和文件名称
         ossClient.putObject(bucketName,"avatar/"+fileName,inputStream);

         ossClient.shutdown();//关闭ossx

         //返回上传之后的文件路径，手动拼接处理
         //https://guili-wenjian.oss-cn-guangzhou.aliyuncs.com/avatar/keli.jpeg
         String url ="https://"+bucketName+"."+endPoint+"/avatar/"+fileName;
         System.out.println(fileName);
         return  url;


     }catch(Exception e){
         e.printStackTrace();
         return null;

        }



     }


}
