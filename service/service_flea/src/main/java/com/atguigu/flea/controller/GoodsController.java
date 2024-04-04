package com.atguigu.flea.controller;


import com.atguigu.commonutils.CollectLinkDTO;
import com.atguigu.commonutils.R;
import com.atguigu.flea.client.UcenterClient;
import com.atguigu.flea.entity.Goods;
import com.atguigu.flea.entity.Query.GoodsQuery;
import com.atguigu.flea.service.GoodsService;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
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
 * @since 2024-03-24
 */
@RestController
@RequestMapping("/flea/goods")
public class GoodsController {
    @Autowired
    GoodsService goodsService;



    @Autowired
    UcenterClient ucenterClient;



    @GetMapping("getAllGoods")
    public R getAll(){
       List<Goods> goods= goodsService.list(new QueryWrapper<Goods>().eq("status",1));

       return R.ok().data("items",goods);

    }


    @GetMapping("getGoodsPage/{page}/{limit}")
    public R getPage(@PathVariable Long page, @PathVariable Long limit, GoodsQuery query){
        Page<Goods> goodsPage = new Page<>(page,limit);
        System.out.println(query);
        goodsService.pageQuery(goodsPage,query);
        return  R.ok().data("items",goodsPage);

    }

    @GetMapping("getGoodsFrontPage/{page}/{limit}")
    public R getFrontPage(@PathVariable Long page, @PathVariable Long limit, GoodsQuery query){
        Page<Goods> goodsPage = new Page<>(page,limit);
        System.out.println(query);
        goodsService.pageFrontQuery(goodsPage,query);
        return  R.ok().data("items",goodsPage);

    }

    @GetMapping("getGoodsUserPage/{page}/{limit}")
    public R getUserPage(@PathVariable Long page, @PathVariable Long limit,@RequestParam String sellerId){
        Page<Goods> goodsPage = new Page<>(page,limit);
        QueryWrapper<Goods> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("seller_id",sellerId);
        goodsService.page(goodsPage,queryWrapper);
        return  R.ok().data("items",goodsPage);

    }

    @GetMapping("getGoodsById/{id}")
    public R getById(@PathVariable Integer id) {
        Goods goods =goodsService.getById(id);


        return R.ok().data("items",goods);

    }

    @PostMapping("addGoods")
    public R addGoods(@RequestBody Goods goods){
        goodsService.save(goods);

        return R.ok();

    }

    @PutMapping("updateGoods")
    public R updateGoods(@RequestBody Goods goods){
        goodsService.updateById(goods);

        return R.ok();

    }

    @DeleteMapping("deleteGoodsById/{id}")
    public R deleteGoods(@PathVariable Integer id){
        CollectLinkDTO collectLinkDTO = new CollectLinkDTO();
        collectLinkDTO.setGoodsId(id);
        System.out.println(1);

        goodsService.removeById(id);
        ucenterClient.deleteCollectLink(collectLinkDTO);

        return  R.ok();
    }

    @DeleteMapping("deleteGoodsbatch")
    public R deleteGoodsbatch(@RequestBody List<Integer> idList){
        goodsService.removeByIds(idList);
        Integer id;
        for (int i=0; i<idList.size(); i++ ){
            CollectLinkDTO collectLinkDTO = new CollectLinkDTO();
            collectLinkDTO.setGoodsId(idList.get(i));
            ucenterClient.deleteCollectLink(collectLinkDTO);

        }


        return  R.ok();
    }



    @GetMapping("getGoodsByCategory")
    public R getGoodsByCategory(@RequestParam("category") String category ){
        List<Goods> goods=goodsService.getByCategory(category);

        return R.ok().data("items",goods);
    }


    @GetMapping("getSellerInfoBySellerId/{sellerId}")
    public R getSellerInfoBySellerId(@PathVariable String sellerId){
          R result =ucenterClient.getSellerInfo(sellerId);

          return result;

    }

    @GetMapping("getGoodsCollect/{page}/{limit}")
     public R  getGoodsCollect(@PathVariable Long page, @PathVariable Long limit,@RequestParam String userId) {

        List<Integer> goodsIds = ucenterClient.getCollectGoodsId(userId);

        IPage<Goods> goodsIPage =new Page<>(page,limit);
        if(goodsIds.size()!=0) {
            goodsIPage = goodsService.page(goodsIPage, new QueryWrapper<Goods>().in("id", goodsIds));
        }
        return R.ok().data("items",goodsIPage);
    }

    /**
     * 上下架商品
     */

    @PutMapping("upOrDownGoods")
    public R upOrDowm(@RequestParam Integer goodsId,@RequestParam Boolean status){
        Goods goods=goodsService.getById(goodsId);
        goods.setStatus(status);
        goodsService.updateById(goods);

        return  R.ok();
    }





}

