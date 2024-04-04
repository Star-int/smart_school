package com.atguigu.serviceBase;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.ControllerAdvice;

/**
 * @author krilo
 * @date 2024-02-18 16:37
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GuiguException extends RuntimeException{

    @ApiModelProperty(value = "状态码")
    private  Integer code;
    private  String msg;

    @Override
    public String toString() {
        return "GuliException{" +
                "message=" + this.getMessage() +
                ", code=" + code +
                '}';
    }
}
