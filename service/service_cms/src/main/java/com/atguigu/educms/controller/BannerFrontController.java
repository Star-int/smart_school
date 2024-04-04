package com.atguigu.educms.controller;

import com.atguigu.commonutils.R;
import com.atguigu.educms.entity.CrmBanner;
import com.atguigu.educms.service.CrmBannerService;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 *
 * 轮播器banner前台控制台
 * @author krilo
 * @date 2024-03-10 15:33
 */

@RestController
@RequestMapping("/educms/bannerfront")
//@CrossOrigin

public class BannerFrontController {

    @Autowired
    CrmBannerService crmBannerService;

//    @Cacheable(value = "banner", key = "'selectIndexList'")
    @ApiOperation(value ="获取所有banner" )
    @GetMapping("getAllBanner")
    public R getAllBanner(){

        List<CrmBanner> allBanner =  crmBannerService.getAllBanner();

        return R.ok().data("items",allBanner);
    }




}
