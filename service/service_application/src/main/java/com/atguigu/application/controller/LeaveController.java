package com.atguigu.application.controller;


import com.atguigu.application.client.AclClient;
import com.atguigu.application.entity.Leave;
import com.atguigu.application.entity.Query.LeaveQuery;
import com.atguigu.application.service.LeaveService;
import com.atguigu.commonutils.R;
import com.atguigu.commonutils.adminJwtUtils;
import com.atguigu.serviceBase.GuiguException;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author testjava
 * @since 2024-03-31
 */
@RestController
@RequestMapping("/application/leave")
public class LeaveController {

    @Autowired
    LeaveService leaveService;

    @Autowired
    AclClient aclClient;

    /**
     * 获取所有请假信息
     */
    @GetMapping("getAllLeave")
    public R getAllLeave(){
       List<Leave> leaves = leaveService.list(null);

       return  R.ok().data("items",leaves);

    }


    /**
     * 获取所有请假信息的列表
     */
    @GetMapping("getAllLeavePage/{page}/{limit}")
    public R getAllLeavePage(@PathVariable Long page, @PathVariable Long limit, LeaveQuery leaveQuery){
        Page<Leave> leavePage =new Page<>(page,limit);

        leaveService.pageQuery(leavePage,leaveQuery);

        return R.ok().data("items",leavePage);

    }

    /**
     * 根据学生id来获取请假记录列表
     */

    @GetMapping("getAllLeaveByIdPage/{page}/{limit}")
    public R getAllLeaveByIdPage(@PathVariable Long page, @PathVariable Long limit,  LeaveQuery leaveQuery){
        Page<Leave> leavePage =new Page<>(page,limit);

        leaveService.pageQueryHasId(leavePage,leaveQuery);

        return R.ok().data("items",leavePage);

    }

    /**
     * 根据管理员id来获取请假记录列表
     */
    @GetMapping("getAllLeaveAdminPage/{page}/{limit}")
    public R getAllLeaveAdminPage(@PathVariable Long page, @PathVariable Long limit, LeaveQuery leaveQuery, HttpServletRequest request){
        Page<Leave> leavePage =new Page<>(page,limit);


        String username = adminJwtUtils.getMemberIdByJwtToken(request);
        String id =aclClient.getId(username);
        leaveQuery.setTeacherId(id);

        leaveService.pageQueryHasId(leavePage,leaveQuery);

        return R.ok().data("items",leavePage);

    }



    @GetMapping("getLeaveInfoById/{id}")
    public  R getLeaveInfo(@PathVariable Integer id){
        Leave leave =leaveService.getById(id);

        return R.ok().data("items",leave);

    }

    @DeleteMapping("deleteLeaveById/{id}")
    public R deleteLeaveById(@PathVariable Integer id){
        leaveService.removeById(id);
        return R.ok();

    }

    @DeleteMapping("deleteBrach")
    public R deleteBrach(@RequestBody List<Integer> idList){
        leaveService.removeByIds(idList);

        return R.ok();
    }

    @PutMapping("updateLeave")
    public R updateLeave(@RequestBody Leave leave){
        leaveService.updateById(leave);

        return R.ok();
    }


    @PostMapping("addLeave")
    public R addLeave(@RequestBody Leave leave){
        if (leave.getStudentId().equals("")){
            throw new GuiguException(20001,"你还未进行学生认证，请先进行学生认证");
        }
        leaveService.save(leave);
        return R.ok();
    }





}

