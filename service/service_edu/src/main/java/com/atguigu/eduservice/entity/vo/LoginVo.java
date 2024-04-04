package com.atguigu.eduservice.entity.vo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author krilo
 * @date 2024-03-12 2:24
 */
@Data
@TableName("acl_user")
public class LoginVo {


    private  String username;
    private  String password;


}
