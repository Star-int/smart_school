package com.atguigu.flea.entity.Query;

import lombok.Data;

import java.math.BigDecimal;

/**
 * @author krilo
 * @date 2024-03-24 16:49
 */
@Data
public class GoodsQuery {

    private String productName;

    private BigDecimal price;

    private String category;//商品分类
}
