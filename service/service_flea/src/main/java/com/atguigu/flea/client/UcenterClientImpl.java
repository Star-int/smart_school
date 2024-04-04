package com.atguigu.flea.client;

import com.atguigu.commonutils.CollectLinkDTO;
import com.atguigu.commonutils.R;
import com.atguigu.flea.entity.Member;
import com.atguigu.serviceBase.GuiguException;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

/**
 * @author krilo
 * @date 2024-03-13 16:04
 */
@Component
public class UcenterClientImpl implements UcenterClient {
 @Override
 public List<Integer> getCollectGoodsId(String userId) {
           throw new GuiguException(20001,"获取商品收藏列表出错");
 }

    @Override
    public R getSellerInfo(String sellerId) {
        throw new GuiguException(20001,"获取卖家信息出错");
    }

    @Override
    public Member getInfo(String id) { throw new GuiguException(20001,"获取评论信息出错"); }

    @Override
    public R deleteCollectLink(@RequestBody CollectLinkDTO collectLinkDTO)  {
        throw new GuiguException(20001,"删除相关收藏信息出错");
    }
}