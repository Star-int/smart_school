package com.atguigu.flea.client;

import com.atguigu.commonutils.CollectLinkDTO;
import com.atguigu.commonutils.R;

import com.atguigu.flea.entity.Member;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author krilo
 * @date 2024-03-13 15:43
 */
@Component
@FeignClient(name="service-ucenter",fallback = UcenterClientImpl.class)
public interface UcenterClient {

    //根据用户id获取用户信息
    @GetMapping("/ucenterservice/collect/getCollectGoodsId")
    public List<Integer> getCollectGoodsId(@RequestParam String userId);

    @PostMapping("/ucenterservice/apimember/getSellerInfo/{sellerId}")
    public R getSellerInfo(@PathVariable String sellerId);


    //获取评论的用户信息
    @PostMapping("/ucenterservice/apimember/getInfoUc/{id}")
    public Member getInfo(@PathVariable String id);

    @DeleteMapping("/ucenterservice/collect/deleteCollectLink")
    public R deleteCollectLink(@RequestBody CollectLinkDTO collectLinkDTO) ;

}

