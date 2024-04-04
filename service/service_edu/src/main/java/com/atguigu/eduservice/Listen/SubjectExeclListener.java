package com.atguigu.eduservice.Listen;

import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.event.AnalysisEventListener;
import com.atguigu.eduservice.entity.EduSubject;
import com.atguigu.eduservice.entity.excel.SubjectData;
import com.atguigu.eduservice.service.EduSubjectService;
import com.atguigu.serviceBase.GuiguException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

/**
 * @author krilo
 * @date 2024-02-29 21:01
 */
public class SubjectExeclListener extends AnalysisEventListener<SubjectData> {


    //为什么没有交给springboot管理，不能自动注入，只能手动注入
    public EduSubjectService subjectService;
    public SubjectExeclListener(){}
    public SubjectExeclListener(EduSubjectService eduSubjectService){
        this.subjectService=eduSubjectService;
    }


    @Override
    public void invoke(SubjectData subjectData, AnalysisContext analysisContext) {
             if(subjectData == null){
                 throw new GuiguException(20001,"文件数据为空");
             }

             EduSubject existOneSubject= this.existOneSubject(subjectService,subjectData.getOneSubjectName());
             if (existOneSubject==null){
                 existOneSubject =new EduSubject();
                 existOneSubject.setParentId("0");
                 existOneSubject.setTitle(subjectData.getOneSubjectName());
                 subjectService.save(existOneSubject);
             }

             //获取一级分类id值
             String pid =existOneSubject.getId();
             EduSubject existTwoSubject =this.existTwoSubject(subjectService,subjectData.getTwoSubjectName(),pid);
             if (existTwoSubject==null){
                 existTwoSubject =new EduSubject();
                 existTwoSubject.setParentId("1");
                 existTwoSubject.setTitle(subjectData.getTwoSubjectName());
                 subjectService.save(existTwoSubject);
             }
    }


    //一级分类
    private EduSubject existOneSubject(EduSubjectService eduSubjectService,String name){
        QueryWrapper<EduSubject> wrapper = new QueryWrapper<>();
        wrapper.eq("title",name);
        wrapper.eq("parent_id","0");
        EduSubject oneSubject=subjectService.getOne(wrapper);
        return  oneSubject;
    }

    //二级分类
    private EduSubject existTwoSubject(EduSubjectService eduSubjectService,String name,String pid){
        QueryWrapper<EduSubject> wrapper = new QueryWrapper<>();
        wrapper.eq("title",name);
        wrapper.eq("parent_id",pid);
        EduSubject twoSubject=subjectService.getOne(wrapper);
        return  twoSubject;
    }

    @Override
    public void doAfterAllAnalysed(AnalysisContext analysisContext) {

    }
}
