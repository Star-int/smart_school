package com.atguigu.flea.service.impl;

import com.atguigu.flea.entity.Goods;
import com.atguigu.flea.entity.Query.GoodsQuery;
import com.atguigu.flea.mapper.GoodsMapper;
import com.atguigu.flea.service.GoodsService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author testjava
 * @since 2024-03-24
 */
@Service
public class GoodsServiceImpl extends ServiceImpl<GoodsMapper, Goods> implements GoodsService {

    @Override
    public void pageQuery(Page<Goods> goodsPage, GoodsQuery query) {
        QueryWrapper<Goods> queryWrapper =new QueryWrapper<>();

        queryWrapper.orderByAsc("id");

        if(!StringUtils.isEmpty(query.getProductName())){
            queryWrapper.like("product_name",query.getProductName());
        }
        if(!StringUtils.isEmpty(query.getPrice())){
            queryWrapper.le("price",query.getPrice());
        }

        if (!StringUtils.isEmpty(query.getCategory())){
            queryWrapper.like("category",query.getCategory());
        }



        baseMapper.selectPage(goodsPage,queryWrapper);
    }


    @Override
    public void pageFrontQuery(Page<Goods> goodsPage, GoodsQuery query) {
        QueryWrapper<Goods> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("status",1);
        queryWrapper.orderByAsc("id");

        if(!StringUtils.isEmpty(query.getProductName())){
            queryWrapper.like("product_name",query.getProductName());
        }
        if(!StringUtils.isEmpty(query.getPrice())){
            queryWrapper.le("price",query.getPrice());
        }

        if (!StringUtils.isEmpty(query.getCategory())){
            queryWrapper.like("category",query.getCategory());
        }



        baseMapper.selectPage(goodsPage,queryWrapper);
    }


    @Override
    public List<Goods> getByCategory(String category) {
        QueryWrapper queryWrapper =new QueryWrapper();
        queryWrapper.eq("category",category);
        queryWrapper.eq("status",1);
        queryWrapper.orderBy(true, true, "RAND()").last("limit 3");//随机找三个
        List<Goods> goods = baseMapper.selectList(queryWrapper);


        return goods;

    }
}
