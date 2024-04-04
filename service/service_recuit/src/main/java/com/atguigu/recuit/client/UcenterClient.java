package com.atguigu.recuit.client;

import com.atguigu.commonutils.CollectLinkDTO;
import com.atguigu.commonutils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author krilo
 * @date 2024-03-28 22:26
 */

@FeignClient(name="service-ucenter",fallback = UcenterClientImpl.class)
public interface UcenterClient {

    @GetMapping("/ucenterservice/collect/getCollectrRecruitId")
    public List<String> getCollectrRecruitId(@RequestParam String userId);

    @DeleteMapping("/ucenterservice/collect/deleteCollectLink")
    public R deleteCollectLink(@RequestBody CollectLinkDTO collectLinkDTO) ;




}
