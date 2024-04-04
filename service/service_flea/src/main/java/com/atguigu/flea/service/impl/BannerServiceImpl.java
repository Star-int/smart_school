package com.atguigu.flea.service.impl;

import com.atguigu.flea.entity.Banner;
import com.atguigu.flea.entity.Goods;
import com.atguigu.flea.entity.Vo.Carousel;
import com.atguigu.flea.mapper.BannerMapper;
import com.atguigu.flea.service.BannerService;
import com.atguigu.flea.service.GoodsService;
import com.atguigu.serviceBase.GuiguException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author testjava
 * @since 2024-03-24
 */
@Service
public class BannerServiceImpl extends ServiceImpl<BannerMapper, Banner> implements BannerService {

    @Autowired
    GoodsService goodsService;


    @Override
    public List<Carousel> getCarousels() {
        List<Banner> banners = baseMapper.selectList(null);
        List<Carousel> carousels =new ArrayList<>();

        for (Banner banner:banners){
            Goods goods =goodsService.getById(banner.getGoodsId());
            Carousel carousel =new Carousel();
            BeanUtils.copyProperties(goods,carousel);
            carousels.add(carousel);
        }

        System.out.println(carousels);

        return carousels;

    }

    @Override
    public void changeBannerByGoodsId(Integer goodsId,Integer changId) {
        QueryWrapper<Banner> queryWrapper=new QueryWrapper();
        queryWrapper.eq("goods_id",changId);
        Banner exist =baseMapper.selectOne(queryWrapper);;
        if(exist!=null)
        {
            throw new GuiguException(20001,"轮播图中已有该商品");
        }
        QueryWrapper<Banner> queryWrapper1=new QueryWrapper();
        queryWrapper1.eq("goods_id",goodsId);
        Banner banner =baseMapper.selectOne(queryWrapper1);
        banner.setGoodsId(changId);
        baseMapper.updateById(banner);

    }
}
