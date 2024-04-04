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
 * @since 2024-03-31
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("application_leave")
@ApiModel(value="Leave对象", description="")
public class Leave implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    private String studentId;

    private String studentName;

    private String approverId;

    private Date startDate;

    private Date endDate;

    private String leaveType;

    private String reason;

    private String status="0";//默认为0未审批

    private String comment;

    @TableField(fill= FieldFill.INSERT)
    private Date gmtCreate;

    @TableField(fill= FieldFill.INSERT_UPDATE)
    private Date gmtModified;


}
