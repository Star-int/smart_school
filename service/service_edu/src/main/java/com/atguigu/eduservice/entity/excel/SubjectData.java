package com.atguigu.eduservice.entity.excel;

import com.alibaba.excel.annotation.ExcelProperty;
import lombok.Data;

/**
 * @author krilo
 * @date 2024-02-29 20:56
 */
@Data
public class SubjectData {
    @ExcelProperty(index =0)
    private String oneSubjectName;

    @ExcelProperty(index =1)
    private String twoSubjectName;

}
