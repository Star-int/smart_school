package atguigu.excel;

import com.alibaba.excel.annotation.ExcelProperty;
import lombok.Data;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * @author krilo
 * @date 2024-02-29 20:13
 */
@Data
public class DemoData {

    @ExcelProperty(value = "学生编号",index = 0)
    private Integer sno;

    @ExcelProperty(value = "学生姓名",index = 1)
    private String sname;

}


