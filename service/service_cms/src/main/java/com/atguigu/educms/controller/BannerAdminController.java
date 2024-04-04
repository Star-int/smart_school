package com.atguigu.educms.controller;


import com.atguigu.commonutils.R;
import com.atguigu.educms.entity.CrmBanner;
import com.atguigu.educms.service.CrmBannerService;
import com.atguigu.serviceBase.GuiguException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 首页banner表 后台接口
 * </p>
 *
 * @author testjava
 * @since 2024-03-10
 */
@RestController
@RequestMapping("/educms/banneradmin")
//@CrossOrigin

public class BannerAdminController {

    @Autowired
    private CrmBannerService bannerService;

    @ApiOperation(value = "获取Banner分页列表")
    @GetMapping("pageBanner/{page}/{limit}")
    public R index(
            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable Long page,

            @ApiParam(name = "limit", value = "每页记录数", required = true)
            @PathVariable Long limit) {

        Page<CrmBanner> pageParam = new Page<>(page,limit);
        System.out.println(limit);

        bannerService.page(pageParam,new QueryWrapper<CrmBanner>().orderByAsc("sort"));
        return R.ok().data("items", pageParam.getRecords()).data("total", pageParam.getTotal());

    }

    @ApiOperation(value = "获取Banner")
    @GetMapping("get/{id}")
    public R getBannerById(@PathVariable String id){

        CrmBanner crmBanner = bannerService.getById(id);

        return R.ok().data("item",crmBanner);
    }

    @ApiOperation(value = "新增Banner")
    @PostMapping("save")
    public R saveBanner(@RequestBody CrmBanner crmBanner){

        Boolean success =bannerService.save(crmBanner);
        if (!success){
            throw new GuiguException(20001,"新增Banner失败");
        }
        return R.ok().message("新增Bannner成功");
    }


    @ApiOperation(value = "修改Banner")
    @PutMapping("update")
    public R updateBanner(@RequestBody CrmBanner crmBanner){

        Boolean success = bannerService.updateById(crmBanner);
        if (!success){
            throw new GuiguException(20001,"修改banner失败");
        }

        return R.ok().message("修改banner成功");
    }

    @ApiOperation(value = "删除Banner")
    @DeleteMapping("remove/{id}")
    public  R  removeBanner(@PathVariable String id){

        Boolean success = bannerService.removeById(id);
        if (!success){
            throw new GuiguException(20001,"删除banner失败");
        }

        return  R.ok().message("删除banner成功");
    }

}

