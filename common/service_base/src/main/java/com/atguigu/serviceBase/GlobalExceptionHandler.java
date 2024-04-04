package com.atguigu.serviceBase;




import com.atguigu.commonutils.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author krilo
 * @date 2024-02-18 16:21
 */

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public R Error(Exception e){
        e.printStackTrace();
        return R.error().message("执行了全局异常");

    }

    @ExceptionHandler(ArithmeticException.class)
    @ResponseBody
    public R Error(ArithmeticException e){
        e.printStackTrace();
        return R.error().message("执行了ArithmeticException异常");

    }


    @ExceptionHandler(GuiguException.class)
    @ResponseBody
    public R Error(GuiguException e){
        e.printStackTrace();
        return R.error().message(e.getMsg()).code(e.getCode());//链式调用

    }

}
