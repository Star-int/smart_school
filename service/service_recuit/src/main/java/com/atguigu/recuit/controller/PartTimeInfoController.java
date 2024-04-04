package com.atguigu.recuit.controller;


import com.atguigu.commonutils.R;
import com.atguigu.recuit.entity.PartTimeInfo;
import com.atguigu.recuit.entity.Query.ParttimeQuery;
import com.atguigu.recuit.service.PartTimeInfoService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author testjava
 * @since 2024-03-12
 */
@RestController
@RequestMapping("/recuit/partTime")
//@CrossOrigin
public class PartTimeInfoController {
    @Autowired
    PartTimeInfoService partTimeInfoService;

    /**
     * 获取所有兼职信息
     * @return
     */
    @GetMapping("getAllInfo")
     public R getAllInfo() {
        List<PartTimeInfo> partTimeInfos =partTimeInfoService.list(null);

        return R.ok().data("items",partTimeInfos);
    }

    /**
     * 根据id获取相关兼职信息
     */
    @GetMapping("getInfoById/{id}")
    public R getInfoById(@PathVariable String id){
        PartTimeInfo partTimeInfo= partTimeInfoService.getById(id);

         return  R.ok().data("items",partTimeInfo);
    }

    /**
     * 获取兼职
     */
    @GetMapping("getPartimePage/{page}/{limit}")
    public R getPagePartime(@PathVariable Long page,@PathVariable Long limit,ParttimeQuery parttimeQuery){
        Page<PartTimeInfo> partTimeInfoPage =new Page<>(page,limit);
        System.out.println(parttimeQuery);

        partTimeInfoService.pageQuery(partTimeInfoPage,parttimeQuery);
        return  R.ok().data("items",partTimeInfoPage);
    }

    /**
     *     添加兼职信息
     */
    @PostMapping("addParttimeInfo")
    public R addParttimeInfo(@RequestBody PartTimeInfo partTimeInfo){
        partTimeInfoService.save(partTimeInfo);

        return R.ok();

    }

    /**
     * 通过id删除兼职信息
     * @param id
     * @return
     */
    @DeleteMapping("deleteById/{id}")
    public R deleteById(@PathVariable Integer id){
        partTimeInfoService.removeById(id);
        return R.ok();

    }


    /**
     * 批量删除兼职信息
     * @param idList
     * @return
     */
    @DeleteMapping("deleteBrach")
    public R deleteBrach(@RequestBody List<Integer> idList){
        partTimeInfoService.removeByIds(idList);
        return R.ok();

    }




    /**
     * 根究id修改兼职信息
     */
    @PutMapping("edit")
    public R updateByParttimeId(@RequestBody PartTimeInfo partTimeInfo){
        partTimeInfoService.updateById(partTimeInfo);
        return R.ok();

    }





}

