package com.atguigu.eduservice.client;

import com.atguigu.commonutils.CollectLinkDTO;
import com.atguigu.commonutils.R;
import com.atguigu.serviceBase.GuiguException;
import com.atguigu.ucenter.entity.Collect;
import com.atguigu.ucenter.entity.Member;
import com.atguigu.ucenter.service.CollectService;
import com.atguigu.ucenter.service.MemberService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author krilo
 * @date 2024-03-13 16:04
 */
@Component
public class UcenterClientImpl implements UcenterClient {
    @Autowired
    MemberService memberService;



    @Override
    public Member getUcenter(String memberId) {
        Member member = memberService.getById(memberId);

        return  member;
    }

    @Override
    public R deleteCollectLink(CollectLinkDTO collectLinkDTO) {
        return null;
    }


}