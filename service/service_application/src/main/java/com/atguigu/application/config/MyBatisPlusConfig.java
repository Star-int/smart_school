package com.atguigu.application.config;

import com.baomidou.mybatisplus.core.injector.ISqlInjector;
import com.baomidou.mybatisplus.extension.injector.LogicSqlInjector;
import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.baomidou.mybatisplus.extension.plugins.PerformanceInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @author krilo
 * @date 2024-02-16 22:50
 */

@Configuration
@EnableTransactionManagement
@MapperScan("com.atguigu.eduservice.mapper")
public class MyBatisPlusConfig {
    /**
     * SQL 执行性能分析插件
     * 开发环境使用，线上不推荐。 maxTime 指的是 sql 最大执行时长
     */
    @Bean
    @Profile({"dev","test"})// 设置 dev test 环境开启
    public PerformanceInterceptor performanceInterceptor() {
        PerformanceInterceptor performanceInterceptor = new PerformanceInterceptor();
        performanceInterceptor.setMaxTime(1000);//ms，超过此处设置的ms则sql不执行
        performanceInterceptor.setFormat(true);
        return performanceInterceptor;
    }

    /**
     * 逻辑删除插件
     * @return
     */
    @Bean
    public ISqlInjector sqlInjector(){

        return new LogicSqlInjector();

    }

    /**
     * 分页插件
     */
    @Bean
    public PaginationInterceptor paginationInterceptor(){

        return  new PaginationInterceptor();
    }
}
