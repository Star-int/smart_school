package com.atguigu.application.service;

import com.atguigu.application.entity.Selection;
import com.atguigu.application.entity.Student;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author testjava
 * @since 2024-04-01
 */
public interface SelectionService extends IService<Selection> {

    void pageQuery(Page<Selection> selectionPage, String studentId);


}
