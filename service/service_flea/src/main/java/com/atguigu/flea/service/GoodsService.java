package com.atguigu.flea.service;

import com.atguigu.flea.entity.Goods;
import com.atguigu.flea.entity.Query.GoodsQuery;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
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
public interface GoodsService extends IService<Goods> {

    void pageQuery(Page<Goods> goodsPage, GoodsQuery query);

    List<Goods> getByCategory(String category);

    void pageFrontQuery(Page<Goods> goodsPage, GoodsQuery query);
}
