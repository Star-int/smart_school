package com.atguigu.flea.controller;


import com.atguigu.commonutils.R;
import com.atguigu.flea.entity.Banner;
import com.atguigu.flea.entity.Goods;
import com.atguigu.flea.entity.Vo.Carousel;
import com.atguigu.flea.service.BannerService;
import com.atguigu.flea.service.GoodsService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author testjava
 * @since 2024-03-24
 */
@RestController
@RequestMapping("/flea/banner")
public class BannerController {
    @Autowired
    BannerService bannerService;



    @GetMapping("getCarousel")
    public R getCarousel(){
        List<Carousel> carousels =bannerService.getCarousels();

        return  R.ok().data("items",carousels);

    }


    @PutMapping("changBanner/{goodsId}/{changId}")
    public R changBanner(@PathVariable Integer goodsId,@PathVariable Integer changId){

          bannerService.changeBannerByGoodsId(goodsId,changId);

         return R.ok();
    }





}

