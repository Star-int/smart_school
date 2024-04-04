package com.atguigu.oss.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * @author krilo
 * @date 2024-02-29 16:07
 */
public interface OssService {


    String uploadFileAvator(MultipartFile file);
}
