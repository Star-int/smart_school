package com.atguigu.flea.service;

import com.atguigu.flea.entity.Banner;
import com.atguigu.flea.entity.Vo.Carousel;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author testjava
 * @since 2024-03-24
 */
public interface BannerService extends IService<Banner> {

    List<Carousel> getCarousels();

    void changeBannerByGoodsId(Integer goodsId,Integer changId);
}
