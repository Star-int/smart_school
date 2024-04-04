package com.atguigu.ucenter.controller;


import com.atguigu.commonutils.R;
import com.atguigu.ucenter.entity.AclUser;
import com.atguigu.ucenter.service.AclUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.security.acl.Acl;
import java.util.List;

/**
 * <p>
 * 用户表 前端控制器
 * </p>
 *
 * @author testjava
 * @since 2024-04-02
 */
@RestController
@RequestMapping("/ucenterservice/Acluser")
public class AclUserController {

    @Autowired
    AclUserService aclUserService;

    @GetMapping("getAllAdminInfo")
    public R getAllAdmin(){
        List<AclUser> users = aclUserService.list(null);

        return R.ok().data("items",users);
    }

}

