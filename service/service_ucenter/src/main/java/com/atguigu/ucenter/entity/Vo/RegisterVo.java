package com.atguigu.ucenter.entity.Vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * @author krilo
 * @date 2024-03-11 14:53
 */
@Data
@ApiModel(value="注册对象", description="注册对象")
public class RegisterVo {

    @ApiModelProperty(value = "昵称")
    private String nickname;

//    @NotNull(message = "手机号不能为空")
//    @Pattern(regexp = "\\d{11}",message = "需要符合手机格式")
    @ApiModelProperty(value = "手机号")
    private String mobile;

//    @NotNull(message = "密码不能为空")
//    @Size(min=8, message = "密码最少要八位数")
    @ApiModelProperty(value = "密码")
    private String password;

//    @ApiModelProperty(value = "验证码")
//    private String code;


}