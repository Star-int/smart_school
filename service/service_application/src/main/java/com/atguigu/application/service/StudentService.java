package com.atguigu.application.service;

import com.atguigu.application.entity.Query.StudentQuery;
import com.atguigu.application.entity.Student;
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
public interface StudentService extends IService<Student> {

    void pageQuery(Page<Student> studentPage, StudentQuery studentQuery);
}
