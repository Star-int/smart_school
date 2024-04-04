package com.atguigu.ucenter.service;

import com.atguigu.commonutils.CollectLinkDTO;
import com.atguigu.ucenter.entity.Collect;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author testjava
 * @since 2024-03-28
 */
public interface CollectService extends IService<Collect> {

    void saveCollect(Collect collect);


    void deleteCollect(Collect collect);


    List<Collect> getCollects(String userId);

    void deleteCollectLink(CollectLinkDTO collectLinkDTO);
}
