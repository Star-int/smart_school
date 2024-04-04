package com.atguigu.application;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

/**
 * @author krilo
 * @date 2024-02-16 22:48
 */

@SpringBootApplication
@ComponentScan(basePackages = {"com.atguigu"})
@EnableDiscoveryClient//注册Nacos中心
@EnableFeignClients
@EnableHystrix
@MapperScan("com.atguigu.application.mapper")

public class appApplication {
    public static void main(String[] args) {
        SpringApplication.run(appApplication.class, args);
    }

}
