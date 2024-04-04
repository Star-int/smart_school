package com.atguigu.eduservice.service.impl;

import com.alibaba.excel.EasyExcel;
import com.atguigu.eduservice.Listen.SubjectExeclListener;
import com.atguigu.eduservice.entity.EduSubject;
import com.atguigu.eduservice.entity.excel.SubjectData;
import com.atguigu.eduservice.entity.subject.SubjectNestedVo;
import com.atguigu.eduservice.entity.subject.SubjectVo;
import com.atguigu.eduservice.mapper.EduSubjectMapper;
import com.atguigu.eduservice.service.EduSubjectService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 课程科目 服务实现类
 * </p>
 *
 * @author testjava
 * @since 2024-02-29
 */
@Service
public class EduSubjectServiceImpl extends ServiceImpl<EduSubjectMapper, EduSubject> implements EduSubjectService {

    //添加课程分类
    @Override
    public void saveSubject(MultipartFile file,EduSubjectService subjectService) {

        if (file != null) {
            try{
                //文件输入流
                InputStream in=file.getInputStream();
                //调用方法进行读取
                EasyExcel.read(in, SubjectData.class,new SubjectExeclListener(subjectService)).sheet().doRead();

            }catch(Exception e)
            {
                System.out.println("出错啦啊啊啊啊啊");
                e.printStackTrace();

            }
        } else {
            System.out.println("文件对象为空");
        }




    }

    @Override
    public List<SubjectNestedVo> nestedList() {

        //查询所有一级分类  parentid=0
        QueryWrapper<EduSubject> oneWrapper = new QueryWrapper<>();
        oneWrapper.eq("parent_id","0");
        oneWrapper.orderByAsc("sort","id");
        List<EduSubject> oneSubjects =baseMapper.selectList(oneWrapper);

        //查询所有二级分类  parentid！=0
        QueryWrapper<EduSubject> twoWrapper =new QueryWrapper<>();
        twoWrapper.ne("parent_id","0");
        twoWrapper.orderByAsc("sort","id");
        List<EduSubject> twoSubjects = baseMapper.selectList(twoWrapper);

        //创建list集合进行最终数据封装
        List<SubjectNestedVo> subjectNestedVos = new ArrayList<>();

        //封装一级分类
        for(int i=0; i<oneSubjects.size();i++)
        {
            EduSubject eduSubject=oneSubjects.get(i);
//            SubjectNestedVo subjectNestedVo = new SubjectNestedVo();
//            subjectNestedVo.setId(eduSubject.getId());
//            subjectNestedVo.setTitle(eduSubject.getTitle());
            SubjectNestedVo subjectNestedVo = new SubjectNestedVo();
            BeanUtils.copyProperties(eduSubject,subjectNestedVo);
            subjectNestedVos.add(subjectNestedVo);
            List<SubjectVo> subjectVos =new ArrayList<>();
            for(int j=0;j<twoSubjects.size();j++)
            {
                EduSubject eduSubject1=twoSubjects.get(j);
                if(eduSubject1.getParentId().equals(eduSubject.getId()))
                {SubjectVo subjectVo = new SubjectVo();
                BeanUtils.copyProperties(eduSubject1,subjectVo);
                subjectVos.add(subjectVo);
                }
            }
            subjectNestedVo.setChildren(subjectVos);
        }

        //封装二级分类


      return subjectNestedVos;
    }




//    @Override
//    public List<SubjectNestedVo> nestedList() {
//        //最终要的到的数据列表
//        ArrayList<SubjectNestedVo> subjectNestedVoArrayList = new ArrayList<>();
//
//        //获取一级分类数据记录
//        QueryWrapper<EduSubject> queryWrapper = new QueryWrapper<>();
//        queryWrapper.eq("parent_id", 0);
//        queryWrapper.orderByAsc("sort", "id");
//        List<EduSubject> subjects = baseMapper.selectList(queryWrapper);
//
//        //获取二级分类数据记录
//        QueryWrapper<EduSubject> queryWrapper2 = new QueryWrapper<>();
//        queryWrapper2.ne("parent_id", 0);
//        queryWrapper2.orderByAsc("sort", "id");
//        List<EduSubject> subSubjects = baseMapper.selectList(queryWrapper2);
//
//        //填充一级分类vo数据
//        int count = subjects.size();
//        for (int i = 0; i < count; i++) {
//            EduSubject subject = subjects.get(i);
//
//            //创建一级类别vo对象
//            SubjectNestedVo subjectNestedVo = new SubjectNestedVo();
//            BeanUtils.copyProperties(subject, subjectNestedVo);
//            subjectNestedVoArrayList.add(subjectNestedVo);
//
//            //填充二级分类vo数据
//            ArrayList<SubjectVo> subjectVoArrayList = new ArrayList<>();
//            int count2 = subSubjects.size();
//            for (int j = 0; j < count2; j++) {
//
//                EduSubject subSubject = subSubjects.get(j);
//                if(subject.getId().equals(subSubject.getParentId())){
//
//                    //创建二级类别vo对象
//                    SubjectVo subjectVo = new SubjectVo();
//                    BeanUtils.copyProperties(subSubject, subjectVo);
//                    subjectVoArrayList.add(subjectVo);
//                }
//            }
//            subjectNestedVo.setChildren(subjectVoArrayList);
//        }
//
//
//        return subjectNestedVoArrayList;
//    }
}
