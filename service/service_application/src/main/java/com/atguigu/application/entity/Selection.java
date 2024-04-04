package com.atguigu.application.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.util.Date;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author testjava
 * @since 2024-04-01
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("application_selection")
@ApiModel(value="Selection对象", description="")
public class Selection implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    private String studentId;

    private String courseId;

    private String courseName;

    @TableField(fill= FieldFill.INSERT)
    private Date gmtCreate;

    @TableField(fill= FieldFill.INSERT_UPDATE)
    private Date gmtModified;




}
