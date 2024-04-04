package com.atguigu.ucenter.controller;


import com.atguigu.commonutils.CollectLinkDTO;
import com.atguigu.commonutils.R;
import com.atguigu.ucenter.entity.Collect;
import com.atguigu.ucenter.service.CollectService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sun.org.apache.bcel.internal.generic.NEW;
import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author testjava
 * @since 2024-03-28
 */
@RestController
@RequestMapping("/ucenterservice/collect")
public class CollectController {
    @Autowired
    CollectService collectService;

    @GetMapping("getCollectByUserId/{userId}")
    public R getCollect(@PathVariable String userId){

        List<Collect> collects =collectService.getCollects(userId);

        return R.ok().data("items",collects);

    }

    @PostMapping("addCollect")
    public R addCollect(@RequestBody  Collect collect) {


        collectService.saveCollect(collect);

        return R.ok();


    }

    @DeleteMapping("deleteCollect")
    public R  deleteCollect(@RequestBody Collect collect){

        collectService.deleteCollect(collect);
        return R.ok();
    }


    @DeleteMapping("deleteCollectLink")
    public R deleteCollectLink(@RequestBody CollectLinkDTO collectLinkDTO){

        
        collectService.deleteCollectLink(collectLinkDTO);
        return R.ok();
    }



    @GetMapping("getCollectGoodsId")
    public List<Integer> getCollectGoodsId(@RequestParam String userId){
        QueryWrapper<Collect> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId); // 根据userId查询
        List<Collect> collects = collectService.list(queryWrapper); // 执行查询
        List<Integer> goodsIds = new ArrayList<>();
        for (Collect collect : collects) {
            goodsIds.add(collect.getGoodsId()); // 将查询到的goodsId添加到列表中
        }
        return goodsIds;



    }

    @GetMapping("getCollectrRecruitId")
    public List<String> getCollectrRecruitId(@RequestParam String userId){
        QueryWrapper<Collect> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId); // 根据userId查询
        List<Collect> collects = collectService.list(queryWrapper); // 执行查询
        List<String> recruitIds = new ArrayList<>();
        for (Collect collect : collects) {
            recruitIds.add(collect.getRecruitmentId()); // 将查询到的goodsId添加到列表中
        }
        return recruitIds;



    }




}

