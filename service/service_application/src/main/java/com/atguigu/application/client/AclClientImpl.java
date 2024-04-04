package com.atguigu.application.client;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @author krilo
 * @date 2024-04-02 21:49
 */

@Component
public class AclClientImpl implements AclClient {


    @Override
    public String getId(@RequestParam String username) {
        return null;
    }
}
