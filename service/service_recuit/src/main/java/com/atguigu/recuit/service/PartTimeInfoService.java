package com.atguigu.recuit.service;

import com.atguigu.recuit.entity.PartTimeInfo;
import com.atguigu.recuit.entity.Query.ParttimeQuery;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author testjava
 * @since 2024-03-12
 */
public interface PartTimeInfoService extends IService<PartTimeInfo> {

    void pageQuery(Page<PartTimeInfo> partTimeInfoPage, ParttimeQuery parttimeQuery);
}
