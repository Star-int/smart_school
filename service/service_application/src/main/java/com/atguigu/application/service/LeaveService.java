package com.atguigu.application.service;

import com.atguigu.application.entity.Leave;
import com.atguigu.application.entity.Query.LeaveQuery;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author testjava
 * @since 2024-03-31
 */
public interface LeaveService extends IService<Leave> {

    void pageQuery(Page<Leave> leavePage, LeaveQuery leaveQuery);

    void pageQueryHasId(Page<Leave> leavePage, LeaveQuery leaveQuery);
}
