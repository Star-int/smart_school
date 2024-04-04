package com.atguigu.eduservice.controller;

import com.atguigu.commonutils.R;
import com.atguigu.eduservice.entity.vo.LoginVo;
import com.atguigu.eduservice.service.LoginVoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author krilo
 * @date 2024-02-27 14:53
 */

@RestController
@RequestMapping("/eduservice/user")
//@CrossOrigin
public class EduLoginController {

    @Autowired
    LoginVoService loginVoService;

    @PostMapping("test")
    public R test(@RequestBody LoginVo loginVo){

        List<LoginVo> loginVos =loginVoService.list(null);
        String token = loginVoService.login(loginVo);
        return  R.ok().data("items",token);

    }

    /**
     * login
     */

    @RequestMapping("/login")
    public R Login()
    {
        return R.ok().data("token","admin");
    }

    /**
     * info
     */
    @GetMapping("/info")
    public R Info(){
        return  R.ok().data("roles","admin").data("name","admin").data("avatar","https://guili-wenjian.oss-cn-guangzhou.aliyuncs.com/avatar/keli.jpeg");
    }



}
