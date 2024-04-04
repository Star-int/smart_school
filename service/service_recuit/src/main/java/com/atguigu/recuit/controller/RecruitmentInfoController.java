package com.atguigu.recuit.controller;


import com.atguigu.commonutils.CollectLinkDTO;
import com.atguigu.commonutils.R;
import com.atguigu.recuit.client.UcenterClient;
import com.atguigu.recuit.entity.Query.RecruitmentQuery;
import com.atguigu.recuit.entity.Recruitment;
import com.atguigu.recuit.entity.Vo.RecruitWebListVo;
import com.atguigu.recuit.service.RecruitmentCompanyService;
import com.atguigu.recuit.service.RecruitmentService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author testjava
 * @since 2024-03-13
 */
@RestController
@RequestMapping("/recuit/recruitment")
//@CrossOrigin
public class RecruitmentInfoController {

    @Autowired
    RecruitmentService recruitmentService;

    @Autowired
    RecruitmentCompanyService recruitmentCompanyService;

    @Autowired
    UcenterClient ucenterClient;



    /**
     * 获取所有兼职信息
     * @return
     */
    @GetMapping("getAllInfo")
    public R getAllInfo() {
        List<Recruitment> recruitments=recruitmentService.list(null);

        return R.ok().data("items",recruitments);
    }

    /**
     * 获取招聘信息的分页
     * @param page
     * @param limit
     * @param query
     * @return
     */
    @GetMapping("getRecruitmentPage/{page}/{limit}")
    public R getRecruitmentPage(@PathVariable Long page, @PathVariable Long limit, RecruitmentQuery query){
        Page<Recruitment>  recruitmentPage = new Page<>(page,limit);
        System.out.println(query);
        recruitmentService.pageQuery(recruitmentPage,query);


        return R.ok().data("items",recruitmentPage);

    }



    /**
     * 添加招聘信息
     */
    @PostMapping("addRecruitInfo")
    public R add(@RequestBody Recruitment recruitment){
        recruitmentService.save(recruitment);

        return R.ok().message("添加成功");

    }

    /**
     * 根据id删掉信息
     */
    @DeleteMapping("deleteById/{id}")
    public R delete(@PathVariable Integer id){
        recruitmentService.removeById(id);

        CollectLinkDTO collectLinkDTO =new CollectLinkDTO();

        collectLinkDTO.setRecruitmentId(id);

        ucenterClient.deleteCollectLink(collectLinkDTO);


        return R.ok().message("删除成功");
    }

    @DeleteMapping("deleteBrach")
    public R deleteBrach(@RequestBody List<Integer> idList){
        recruitmentService.removeBrach(idList);


        return R.ok().message("删除成功");

    }




    /**根据id修改信息
     *
     */
    @PutMapping("updateParttimeInfo")
    public R update(@RequestBody Recruitment recruitment){
        recruitmentService.updateById(recruitment);
        return R.ok().message("更新成功");
    }

    /**
     * 根据id获取招聘信息
     */
    @GetMapping("getRecruitInfoById/{id}")
    public R getRecruitInfoById(@PathVariable Integer id){
        Recruitment recruitment = recruitmentService.getById(id);


        return R.ok().data("items",recruitment);
    }




    /**
     * 根据公司id来获取相应招聘信息
     */
    @GetMapping("getRecruitsById/{companyId}")
    public R getRecruits(@PathVariable Integer companyId){
        QueryWrapper<Recruitment> queryWrapper =new QueryWrapper<>();
        queryWrapper.eq("company_id",companyId);
        queryWrapper.last("order by --id limit 4");

        List<Recruitment> recruitments = recruitmentService.list(queryWrapper);

        return R.ok().data("items",recruitments);

    }

    @GetMapping("getCollectRecruit/{page}/{limit}")
    public R getCollectRecruit(@PathVariable Long page ,@PathVariable Long limit,@RequestParam String userId){
        List<String> recruitIds = ucenterClient.getCollectrRecruitId(userId);
        IPage<Recruitment> RecruitmentPage = new Page<>(page, limit);
        if (recruitIds.size()!=0) {

            RecruitmentPage = recruitmentService.page(RecruitmentPage, new QueryWrapper<Recruitment>().in("id", recruitIds));
        }
        return R.ok().data("items", RecruitmentPage);

    }


    /**
     * 随机获取web前台的list
     */

    @GetMapping("getWebList")
    public R getWebList(){

        List<RecruitWebListVo> listVos = recruitmentService.getWebList();

        return R.ok().data("items",listVos);

    }






}

