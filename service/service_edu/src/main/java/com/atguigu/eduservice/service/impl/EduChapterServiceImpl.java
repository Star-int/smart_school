package com.atguigu.eduservice.service.impl;

import com.atguigu.eduservice.entity.EduChapter;
import com.atguigu.eduservice.entity.EduVideo;
import com.atguigu.eduservice.entity.chapter.ChapterVo;
import com.atguigu.eduservice.entity.chapter.VideoVo;
import com.atguigu.eduservice.mapper.EduChapterMapper;
import com.atguigu.eduservice.service.EduChapterService;
import com.atguigu.eduservice.service.EduVideoService;
import com.atguigu.serviceBase.GuiguException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 课程 服务实现类
 * </p>
 *
 * @author testjava
 * @since 2024-03-03
 */
@Service
public class EduChapterServiceImpl extends ServiceImpl<EduChapterMapper, EduChapter> implements EduChapterService {

    @Autowired
    EduVideoService eduVideoService;


    @Override
    public List<ChapterVo> getChapterVideoByCourseId(String courseId) {
        //查询章节chapter所有内容
        QueryWrapper<EduChapter> eduChapterQueryWrapper =new QueryWrapper<>();
        eduChapterQueryWrapper.eq("course_id",courseId);
        eduChapterQueryWrapper.orderByAsc("sort", "id");
        List<EduChapter> eduChapters = baseMapper.selectList(eduChapterQueryWrapper);
        //查询小节video所有内容
        QueryWrapper<EduVideo>  eduVideoQueryWrapper =new QueryWrapper<>();
        eduVideoQueryWrapper.eq("course_id",courseId);
        eduVideoQueryWrapper.orderByAsc("sort", "id");
        List<EduVideo> eduVideos =eduVideoService.list(eduVideoQueryWrapper);
        //遍历查询章节list集合进行封装
        List<ChapterVo> chapterVoArrayList =new ArrayList<>();
        for(int i=0;i<eduChapters.size();i++){
            EduChapter eduChapter=eduChapters.get(i);
            ChapterVo chapterVo =new ChapterVo();
            BeanUtils.copyProperties(eduChapter,chapterVo);
            chapterVoArrayList.add(chapterVo);
            List<VideoVo> videoVoArrayList =new ArrayList<>();
            for(int j=0;j<eduVideos.size();j++){
                EduVideo eduVideo =eduVideos.get(j);
                if (eduVideo.getChapterId().equals(eduChapter.getId())){
                    VideoVo videoVo=new VideoVo();
                    BeanUtils.copyProperties(eduVideo,videoVo);
                    videoVoArrayList.add(videoVo);

                }
            }
            chapterVo.setChildren(videoVoArrayList);
        }

        System.out.println(eduChapters);
        return chapterVoArrayList;


//    @Autowired
//    private EduVideoService videoService;
//
//    @Override
//    public List<ChapterVo> getChapterVideoByCourseId(String courseId) {
//
//        //最终要的到的数据列表
//        ArrayList<ChapterVo> chapterVoArrayList = new ArrayList<>();
//
//        //获取章节信息
//        QueryWrapper<EduChapter> queryWrapper1 = new QueryWrapper<>();
//        queryWrapper1.eq("course_id", courseId);
//        queryWrapper1.orderByAsc("sort", "id");
//        List<EduChapter> chapters = baseMapper.selectList(queryWrapper1);
//
//        //获取课时信息
//        QueryWrapper<EduVideo> queryWrapper2 = new QueryWrapper<>();
//        queryWrapper2.eq("course_id", courseId);
//        queryWrapper2.orderByAsc("sort", "id");
//        List<EduVideo> videos = videoService.list(queryWrapper2);
//
//        //填充章节vo数据
//        int count1 = chapters.size();
//        for (int i = 0; i < count1; i++) {
//            EduChapter chapter = chapters.get(i);
//
//            //创建章节vo对象
//            ChapterVo chapterVo = new ChapterVo();
//            BeanUtils.copyProperties(chapter, chapterVo);
//            chapterVoArrayList.add(chapterVo);
//
//            //填充课时vo数据
//            ArrayList<VideoVo> videoVoArrayList = new ArrayList<>();
//            int count2 = videos.size();
//            for (int j = 0; j < count2; j++) {
//
//                EduVideo video = videos.get(j);
//                if(chapter.getId().equals(video.getChapterId())){
//
//                    //创建课时vo对象
//                    VideoVo videoVo = new VideoVo();
//                    BeanUtils.copyProperties(video, videoVo);
//                    videoVoArrayList.add(videoVo);
//                }
//            }
//            chapterVo.setChildren(videoVoArrayList);
//        }
//        System.out.println(chapters);
//        return chapterVoArrayList;

    }

    @Override
    public Boolean removeChapterById(String id) {
            Boolean result = true;
        if (eduVideoService.getCountByChapterId(id)){
            result=false;
            throw new GuiguException(20001,"该章节还有视频没有删除，无法进行删除");
        }else{
            baseMapper.deleteById(id);
        }
        return result;

    }

    /**
     * 删除课表的时候把章节页删除掉
     * @param id
     * @return
     */
    @Override
    public Boolean removeByCourseId(String id) {
        QueryWrapper<EduChapter> eduChapterQueryWrapper =new QueryWrapper<>();
        eduChapterQueryWrapper.eq("course_id",id);
        Integer count = baseMapper.delete(eduChapterQueryWrapper);
        return null!=count&&count>=0;
    }
}
