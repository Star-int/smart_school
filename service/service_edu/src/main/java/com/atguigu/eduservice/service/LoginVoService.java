package com.atguigu.eduservice.service;

import com.atguigu.eduservice.entity.vo.LoginVo;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * @author krilo
 * @date 2024-03-12 2:35
 */


public interface LoginVoService extends IService<LoginVo> {
    String login(LoginVo loginVo);
}
