package com.atguigu.eduservice.client;

import com.atguigu.commonutils.CollectLinkDTO;
import com.atguigu.commonutils.R;
import com.atguigu.ucenter.entity.Collect;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.atguigu.ucenter.entity.Member;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

/**
 * @author krilo
 * @date 2024-03-13 15:43
 */
@Component
@FeignClient(name="service-ucenter",fallback = UcenterClientImpl.class)
public interface UcenterClient {

    //根据用户id获取用户信息
    @GetMapping("/ucenterservice/member/getUcenterPay/{memberId}")
    public Member getUcenter(@PathVariable("memberId") String memberId);


    @DeleteMapping("/ucenterservice/collect/deleteCollectLink")
    public R deleteCollectLink(@RequestBody CollectLinkDTO collectLinkDTO) ;


}

