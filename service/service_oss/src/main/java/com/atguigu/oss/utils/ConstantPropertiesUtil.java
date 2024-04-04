package com.atguigu.oss.utils;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @author krilo
 * @date 2024-02-29 15:57
 */

@Component
public class ConstantPropertiesUtil implements InitializingBean {

    //读取配置文件的内容
    @Value("${aliyun.oss.file.endpoint}")
    private  String endpoint;

    @Value("${aliyun.oss.file.keyid}")
    private  String keyid;

    @Value("${aliyun.oss.file.keysecret}")
    private  String keysecret;

    @Value("${aliyun.oss.file.bucketname}")
    private  String bucketname;

    public static String END_POINT;
    public static String ACCESS_KEY_ID;
    public static String ACCESS_KEY_SECRET;
    public static String BUCKET_NAME;

    //定义公开静态常量
    @Override
    public void afterPropertiesSet() throws Exception {
        END_POINT = endpoint;
        ACCESS_KEY_ID = keyid;
        ACCESS_KEY_SECRET = keysecret;
        BUCKET_NAME = bucketname;


    }





}
