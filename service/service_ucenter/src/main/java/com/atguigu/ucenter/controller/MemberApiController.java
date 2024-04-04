package com.atguigu.ucenter.controller;


import com.atguigu.commonutils.JwtUtils;
import com.atguigu.commonutils.MD5;
import com.atguigu.commonutils.R;
import com.atguigu.serviceBase.GuiguException;
import com.atguigu.ucenter.entity.Member;
import com.atguigu.ucenter.entity.Vo.LoginVo;
import com.atguigu.ucenter.entity.Vo.RegisterVo;
import com.atguigu.ucenter.service.MemberService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.List;

/**
 * <p>
 * 会员表 前端控制器
 * </p>
 *
 * @author testjava
 * @since 2024-03-11
 */
@RestController
@RequestMapping("/ucenterservice/apimember")
//@CrossOrigin
public class MemberApiController {
    @Autowired
    private MemberService memberService;
    private LoginVo loginVo;

    @ApiOperation(value = "会员登录")
    @PostMapping("login")
    public R login(@RequestBody LoginVo loginVo) {
        this.loginVo = loginVo;
        String token = memberService.login(loginVo);
        return R.ok().data("token", token);
    }

    @ApiOperation(value = "会员注册")
    @PostMapping("register")
    public R register(@RequestBody RegisterVo registerVo){
        memberService.register(registerVo);
        return R.ok();
    }

    @GetMapping("test")
    public R test(){
        return  R.ok().message("测试");
    }




    @ApiOperation(value = "根据token获取登录信息")
    @GetMapping("auth/getLoginInfo")
    public R getLoginInfo(HttpServletRequest request){
        try {
            String memberId = JwtUtils.getMemberIdByJwtToken(request);
//            System.out.println("13700000001"+memberId);
//             输出所有请求参数
            System.out.println("Request Parameters++++++++++++:"+memberId);
            Enumeration<String> parameterNames = request.getParameterNames();
            while (parameterNames.hasMoreElements()) {
                String paramName = parameterNames.nextElement();
                String paramValue = request.getParameter(paramName);
                System.out.println(paramName + ": " + paramValue);
            }
            Member loginInfo = memberService.getById(memberId);
            return R.ok().data("loginInfo", loginInfo);
        }catch (Exception e){
            e.printStackTrace();
            throw new GuiguException(20001,"获取信息失败");
        }
    }


    //根据token字符串获取用户信息
    @PostMapping("getInfoUc/{id}")
    public Member getInfo(@PathVariable String id) {
        //根据用户id获取用户信息
        Member ucenterMember = memberService.getById(id);

        return ucenterMember;
    }


   //根据token字符更改用户信息
    @PutMapping("updateUserInfo")
    public R update(@RequestBody Member member){

        memberService.updateById(member);

        return  R.ok();
    }

    //根据token字符更改密码信息
    @PutMapping("updatePassword")
    public R updatePassword(@RequestBody Member member){
        member.setPassword(MD5.encrypt(member.getPassword()));
        memberService.updateById(member);
        return  R.ok();
    }


    @PostMapping("getSellerInfo/{sellerId}")
    public R getSellerInfo(@PathVariable String sellerId){
       Member member= memberService.getById(sellerId);

       return R.ok().data("items",member);

    }



    @GetMapping("getAllucenter")
    public R getAll(){
       List<Member> members= memberService.list(null);

       return R.ok().data("items",members);

    }





}

