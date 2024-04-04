import request from '@/utils/request'

const api_name = '/flea/goods'


export default {

    // 获取全部商品
    getAllGoods() {
        return request({
            url: `${api_name}/getAllGoods`, // 替换为实际的接口URL地址
            method: 'get' // 请求方法，默认为GET，也可以根据实际情况设置为POST等方法

        })

    },


    //获取商品信息
    getGoodsPage(page, limit, searchObj) {
        return request({
            url: `${api_name}/getGoodsPage/${page}/${limit}`, // 替换为实际的接口URL地址，并添加分页参数
            method: 'get', // 请求方法，默认为GET，也可以根据实际情况设置为POST等方法
            params: searchObj

        })
    },


    // 添加商品信息
    addGoods(goodsInfo) {
        return request({
            url: `${api_name}/addGoods`, // 替换为实际的接口URL地址
            method: 'post', // 请求方法，默认为GET，也可以根据实际情况设置为POST等方法
            data: goodsInfo
        })

    },


    // 更新商品信息
    updateGoods(goodsInfo) {

        return request({
            url: `${api_name}/updateGoods`, // 替换为实际的接口URL地址，并添加商品ID参数
            method: 'put', // 请求方法，默认为GET，也可以根据实际情况设置为POST等方法
            data: goodsInfo // 商品信息，包括ID和其他需要更新的字段
        })


    },

    // 获取商品信息（根据ID）
    getGoodsById(goodsId) { // 商品ID作为参数传入方法中，以便在请求URL中使用
        return request({
            url: `${api_name}/getGoodsById/${goodsId}`, // 替换为实际的接口URL地址，并添加商品ID参数
            method: 'get' // 请求方法，默认为GET，也可以根据实际情况设置为POST等方法


        })
    },


    // 删除商品信息（根据ID）
    deleteGoods(goodsId) { // 商品ID作为参数传入方法中，以便在请求URL中使用
        return request({
            url: `${api_name}/deleteGoodsById/${goodsId}`, // 替换为实际的接口URL地址，并添加商品ID参数
            method: 'delete' // 请求方法，默认为GET，也可以根据实际情况设置为POST等方法
        })
    },

    //批量删除
    deleteGoodsbrach(goodsIdList) { // 商品ID作为参数传入方法中，以便在请求URL中使用
        return request({
            url: `${api_name}/deleteGoodsbatch`, // 替换为实际的接口URL地址，并添加商品ID参数
            method: 'delete', // 请求方法，默认为GET，也可以根据实际情况设置为POST等方法
            data:goodsIdList
        })
    },

    //上下架商品
    upOrDownGoods(goodsId, status) { // 商品ID和状态作为参数传入方法中，以便在请求URL中使用，状态为1表示上架，状态为0表示下架
        return request({
            url: `${api_name}/upOrDownGoods`, // 替换为实际的接口URL地址，并添加商品ID和状态参数
            method: 'put',// 请求方法，默认为GET，也可以根据实际情况设置为POST等方法
            params:{goodsId:goodsId,status:status}
        })
    }








}