package com.atguigu.eduservice.service.impl;

import com.atguigu.eduservice.client.VodClient;
import com.atguigu.eduservice.entity.EduVideo;
import com.atguigu.eduservice.entity.Form.VideoInfoForm;
import com.atguigu.eduservice.mapper.EduVideoMapper;
import com.atguigu.eduservice.service.EduVideoService;
import com.atguigu.serviceBase.GuiguException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 课程视频 服务实现类
 * </p>
 *
 * @author testjava
 * @since 2024-03-03
 */
@Service
public class EduVideoServiceImpl extends ServiceImpl<EduVideoMapper, EduVideo> implements EduVideoService {

    @Autowired
    VodClient vodClient;


    @Override
    public Boolean getCountByChapterId(String chapterId) {
        QueryWrapper<EduVideo> eduVideoQueryWrapper =new QueryWrapper<>();
        eduVideoQueryWrapper.eq("chapter_id",chapterId);
        Integer count=baseMapper.selectCount(eduVideoQueryWrapper);
        if (count!=null&& count>0){
            return true;
        }else {
            return false;
        }

    }

    @Override
    public void saveVideoInfo(VideoInfoForm videoInfoForm) {
        EduVideo eduVideo =new EduVideo();
        BeanUtils.copyProperties(videoInfoForm,eduVideo);
        Boolean success = this.save(eduVideo);
        if(!success){
            throw new GuiguException(20001,"添加小节失败");
        }

    }

    @Override
    public VideoInfoForm getVideoInfoFormById(String id) {
        EduVideo eduVideo =this.getById(id);
        if(eduVideo == null){
            throw new GuiguException(20001, "数据不存在");
        }
        VideoInfoForm videoInfoForm =new VideoInfoForm();
        BeanUtils.copyProperties(eduVideo,videoInfoForm);
        return videoInfoForm;
    }

    @Override
    public Boolean updateVideoInfo(VideoInfoForm videoInfoForm) {
        EduVideo eduVideo = new EduVideo();
        BeanUtils.copyProperties(videoInfoForm,eduVideo);
        Boolean result = this.updateById(eduVideo);
        if (!result){
            throw new GuiguException(20001,"更新小节信息失败");
        }
        return result;


    }

    @Override
    public Boolean removeByCourseId(String id) {
        QueryWrapper<EduVideo> wrapperVideo =new QueryWrapper<>();
        wrapperVideo.eq("course_id",id);
        wrapperVideo.select("video_source_id");
        //1、根据课程id查询课程所有的视频id
        List<EduVideo> eduVideos = baseMapper.selectList(wrapperVideo);

        List<String> videoIds =new ArrayList<>();
        for (int i=0;i<eduVideos.size();i++)
        {     EduVideo eduVideo =eduVideos.get(i);
             String videoSourceId =eduVideo.getVideoSourceId();
            if(!StringUtils.isEmpty(videoSourceId))
            videoIds.add(videoSourceId);
        }

        if (videoIds.size()>0) {
            vodClient.deleteBatch(videoIds);
        }

        QueryWrapper<EduVideo> eduVideoQueryWrapper =new QueryWrapper<>();
        eduVideoQueryWrapper.eq("course_id",id);
        Integer count = baseMapper.delete(eduVideoQueryWrapper);
        return null!=count && count>0;

    }
}
