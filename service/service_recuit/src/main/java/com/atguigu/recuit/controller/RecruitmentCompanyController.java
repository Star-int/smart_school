package com.atguigu.recuit.controller;


import com.atguigu.commonutils.CollectLinkDTO;
import com.atguigu.commonutils.R;
import com.atguigu.recuit.entity.Query.RecruitmentCompanyQuery;
import com.atguigu.recuit.entity.Recruitment;
import com.atguigu.recuit.entity.RecruitmentCompany;
import com.atguigu.recuit.entity.Vo.CompanyListVo;
import com.atguigu.recuit.service.RecruitmentCompanyService;
import com.atguigu.recuit.service.RecruitmentService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author testjava
 * @since 2024-03-19
 */
@RestController
@RequestMapping("/recuit/recruitmentCompany")
public class RecruitmentCompanyController {

    @Autowired
    RecruitmentCompanyService recruitmentCompanyService;



    @Autowired
    RecruitmentService recruitmentService;

    /**
     * 获取所有公司信息
     * @return
     */
    @GetMapping("getAllInfo")
    public R getAllInfo() {
        List<RecruitmentCompany> RecruitmentCompany=recruitmentCompanyService.list(null);

        return R.ok().data("items",RecruitmentCompany);
    }

    /**
     * 获取公司信息的分页
     * @param page
     * @param limit
     * @param query
     * @return
     */
    @GetMapping("getRecruitmentCompanyPage/{page}/{limit}")
    public R getRecruitmentCompanyPagePage(@PathVariable Long page, @PathVariable Long limit, RecruitmentCompanyQuery query){
        Page<RecruitmentCompany> recruitmentCompanyPage = new Page<>(page,limit);
        System.out.println(query);
        recruitmentCompanyService.pageQuery(recruitmentCompanyPage,query);
        return R.ok().data("items",recruitmentCompanyPage);

    }

    /**
     * 添加公司信息
     */
    @PostMapping("addCompanyInfo")
    public R add(@RequestBody RecruitmentCompany recruitmentCompany){
        recruitmentCompanyService.save(recruitmentCompany);
        return R.ok().message("添加成功");

    }

    /**
     * 根据id删掉信息
     */
    @DeleteMapping("deleteById/{id}")
    public R delete(@PathVariable Integer id){

        recruitmentService.remove(new QueryWrapper<Recruitment>().eq("company_id",id));
        recruitmentCompanyService.removeById(id);

        return R.ok().message("删除成功");
    }

    @DeleteMapping("deleteBrach")
    public R deleteBrach(@RequestBody List<Integer> idList){

        recruitmentService.removeBrachByCompanyId(idList);
        recruitmentCompanyService.removeByIds(idList);
        return R.ok().message("删除成功");

    }




    /**根据id修改信息
     *
     */
    @PutMapping("updateCompanyInfo")
    public R update(@RequestBody RecruitmentCompany recruitmentCompany){
        recruitmentCompanyService.updateById(recruitmentCompany);

        return R.ok().message("更新成功");
    }

    /**
     * 根据id获取公司信息
     */
    @GetMapping("getCompanyInfoById/{id}")
    public R getRecruitInfoById(@PathVariable Integer id){
        RecruitmentCompany recruitmentCompany = recruitmentCompanyService.getById(id);
        return R.ok().data("items",recruitmentCompany);
    }


    /**
     * 获取公司队列
     */
    @GetMapping("getCompanyList")
    public R getCompanyList(){
        List<CompanyListVo> listVos =recruitmentCompanyService.getCompanyList();

        return R.ok().data("items",listVos);
    }

    /**
     * 获取公司正在招聘的岗位
     */
    @GetMapping("getRecruitmentsById/{companyId}")
    public R getRecuitments(@PathVariable Integer companyId){

        List<Recruitment> recruitments = recruitmentService.getRecruitmentsByComyId(companyId);

        return R.ok().data("items",recruitments);

    }





}

