package com.atguigu.recuit.mapper;

import com.atguigu.recuit.entity.Recruitment;
import com.atguigu.recuit.entity.Vo.RecruitWebListVo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author testjava
 * @since 2024-03-13
 */
public interface RecruitmentMapper extends BaseMapper<Recruitment> {

    List<RecruitWebListVo> getWebList();

}
