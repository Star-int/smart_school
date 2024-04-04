package com.atguigu.eduservice.entity.chapter;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * @author krilo
 * @date 2024-03-05 14:45
 */

@Data
public class ChapterVo {

    private String id;
    private String title;


    //表示小节
    private List<VideoVo> children =new ArrayList<>();
}
