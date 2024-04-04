package com.atguigu.ucenter.service.impl;

import com.atguigu.commonutils.JwtUtils;
import com.atguigu.commonutils.MD5;
import com.atguigu.serviceBase.GuiguException;
import com.atguigu.ucenter.entity.Member;
import com.atguigu.ucenter.entity.Vo.LoginVo;
import com.atguigu.ucenter.entity.Vo.RegisterVo;
import com.atguigu.ucenter.mapper.MemberMapper;
import com.atguigu.ucenter.service.MemberService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 会员表 服务实现类
 * </p>
 *
 * @author testjava
 * @since 2024-03-11
 */
@Service
public class MemberServiceImpl extends ServiceImpl<MemberMapper, Member> implements MemberService {

    @Autowired
    MemberService memberService;


    /**
     * 会员登录
     * @param loginVo
     * @return
     */
    @Override
    public String login(LoginVo loginVo) {
         //获取手机号码和登录密码
        String mobile = loginVo.getMobile();
        String password =loginVo.getPassword();



        //非空判断
        if(StringUtils.isEmpty(mobile)){
            throw new GuiguException(20001,"手机号码不能为空");

        }
        if (StringUtils.isEmpty(password)){
            throw new GuiguException(20001,"登录密码不能为空");
        }


        //判断手机号码是否正确
        QueryWrapper<Member> memberQueryWrapper =new QueryWrapper<>();
        memberQueryWrapper.eq("mobile",mobile);
        Member member =baseMapper.selectOne(memberQueryWrapper);
        if (member==null){
            throw new GuiguException(20001,"没有查询到该手机号");
        }

        //判断密码是否正确

        if (!MD5.encrypt(password).equals(member.getPassword())){
            throw  new GuiguException(20001,"密码错误");
        }

        //校验是否被禁用
        if(member.getIsDisabled()){
            throw  new GuiguException(20001,"账号被禁用了");
        }


        //使用jwt生成token字符串
        String token = JwtUtils.getJwtToken(member.getId(), member.getNickname());
        return token;
    }


    /**
     * 会员注册
     * @param registerVo
     */
    @Override
    public void register(RegisterVo registerVo) {

        //获取注册信息，进行校验
        String nickname = registerVo.getNickname();
        String mobile = registerVo.getMobile();
        String password = registerVo.getPassword();
//        String code = registerVo.getCode();

        //校验参数
        if(StringUtils.isEmpty(mobile) ||
                StringUtils.isEmpty(mobile) ||
                StringUtils.isEmpty(password)
                ) {
            throw new GuiguException(20001,"error");
        }

        //查询数据库中是否存在相同的手机号码
        Integer count = baseMapper.selectCount(new QueryWrapper<Member>().eq("mobile", mobile));
        if(count.intValue() > 0) {
            throw new GuiguException(20001,"手机号码已注册");
        }

        //添加注册信息到数据库
        Member member = new Member();
        member.setNickname(nickname);
        member.setMobile(registerVo.getMobile());
        member.setPassword(MD5.encrypt(password));
        member.setIsDisabled(false);
        member.setAvatar("https://guili-wenjian.oss-cn-guangzhou.aliyuncs.com/avatar/keli.jpeg");
        System.out.println(member);
        Boolean success=this.save(member);

        if (!success){
            throw new GuiguException(20001,"注册失败");
        }


    }




}
