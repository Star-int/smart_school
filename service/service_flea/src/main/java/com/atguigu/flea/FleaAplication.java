package com.atguigu.flea;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

/**
 * @author krilo
 * @date 2024-03-12 14:54
 */
@ComponentScan(basePackages = {"com.atguigu"})
@SpringBootApplication
@MapperScan("com.atguigu.flea.mapper")
@EnableDiscoveryClient
@EnableFeignClients
@EnableHystrix

public class FleaAplication {
    public static void main(String[] args) {
        SpringApplication.run(FleaAplication.class, args);
    }
}
