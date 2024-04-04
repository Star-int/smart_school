package com.atguigu.application.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @author krilo
 * @date 2024-04-02 21:48
 */
@Component
@FeignClient(name="service-acl",fallback = AclClientImpl.class)
public interface AclClient {

    @GetMapping("/admin/acl/index/getUserId")
    public String getId(@RequestParam String username);

}
