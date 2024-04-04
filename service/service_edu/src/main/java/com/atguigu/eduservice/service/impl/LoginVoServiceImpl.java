package com.atguigu.eduservice.service.impl;

import com.atguigu.commonutils.JwtUtils;
import com.atguigu.eduservice.entity.vo.LoginVo;
import com.atguigu.eduservice.mapper.LoginVoMapper;
import com.atguigu.eduservice.service.LoginVoService;
import com.atguigu.serviceBase.GuiguException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

/**
 * @author krilo
 * @date 2024-03-12 2:36
 */
@Service
public class LoginVoServiceImpl extends ServiceImpl<LoginVoMapper, LoginVo>  implements LoginVoService {
    @Override
    public String login(LoginVo loginVo) {

        if (StringUtils.isEmpty(loginVo.getUsername())||StringUtils.isEmpty(loginVo.getPassword())){
            throw new GuiguException(20001,"不能为空");
        }

        QueryWrapper<LoginVo> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("username",loginVo.getUsername());
        queryWrapper.eq("password",loginVo.getPassword());
        LoginVo loginVo1 =baseMapper.selectOne(queryWrapper);
        String token = JwtUtils.getJwtToken("6","哈哈哈");

        return token;
    }
}


