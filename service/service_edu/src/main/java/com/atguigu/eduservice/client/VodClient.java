package com.atguigu.eduservice.client;

import com.atguigu.commonutils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * @author krilo
 * @date 2024-03-09 13:41
 */
@FeignClient(name = "service-vod", fallback = VodFileDegradeFeignClient.class)
@Component
public interface VodClient {
    @DeleteMapping(value = "/vod/video/removeAlyVideo/{id}")
    public R removeVideo(@PathVariable("id") String id);

    //定义删除多个阿里云视频的方法
    @DeleteMapping(value = "/vod/video/delete-batch")
    public R deleteBatch(@RequestParam("videoIdList") List<String> videoIdList);


}