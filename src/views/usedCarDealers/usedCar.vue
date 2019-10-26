<!--
 * @Description: 二手车商首页
 * @Author: linpeng
 * @LastEditors: Please set LastEditors
 * @Date: 2019-02-25 16:46:50
 * @LastEditTime: 2019-09-18 14:53:28
 -->

<template>
    <div class="usedCarPage">
        <headerOne :title="title" :isFixed="true"></headerOne>
        <introduce @showFlow="showFlow" :isFixed="true"></introduce>
        <div class="main-container">
            <!-- 品牌 -->
            <div class="hotBrand">
                <div class="hotBrand-head">
                    <div class="leftside">品牌</div>
                    <!-- <div class="rightside"> -->
                    <router-link to="/usedCar/selectCar" class="rightside">更多品牌</router-link>
                    <!-- </div> -->
                </div>
                <ul class="hotBrand-list">
                    <li
                        v-for="(item, index) in hotBrandList"
                        @click="selectBrand(item)"
                        :key="index"
                    >
                        <img v-lazy="'https://www.wanguoqiche.com/files/logo/'+item.icoName+'.jpg'" />
                        <span class="text">{{item.brandName}}</span>
                    </li>
                </ul>
            </div>
            <div class="select-brand">
                <span v-show="selectBrandName">已选品牌：</span>
                <div class="select-brand-current" v-show="selectBrandName">
                    {{selectBrandName}}
                    <span class="delete" @click="clearSelect()">
                        <van-icon name="cross" />
                    </span>
                </div>
            </div>
            <!-- 车商列表 -->
            <div class="shopList" v-show="contentShow">
                <div class="shopList-head">
                    <div class="leftside">车商列表</div>
                </div>
                <div class="shopList-noData" v-if="!shopList.length && !loading">
                    <img src="../../assets/image/notFoundUCD.png" />
                    <span class="noDataText">暂未找到该品牌二手车商</span>
                </div>
                <ul class="shopList-list" v-if="shopList.length">
                    <li
                        v-for="(item, index) in shopList"
                        @click="openShopDetail(item.id)"
                        :key="index"
                    >
                        <div class="shop-brand">
                            <div class="brand-img">
                                <div
                                    class="icon"
                                    :class="setIconClass(item.ico_list)"
                                    v-for="(iconItem, index) in item.ico_list.slice(0, 9)"
                                    :key="index"
                                >
                                    <img
                                        v-lazy="'https://www.wanguoqiche.com/files/logo/'+iconItem+'.jpg'"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="shop-describe">
                            <div class="name">{{item.name}}</div>
                            <div class="shop-address">
                                <i class="address-icon">
                                    <van-icon name="location-o" />
                                </i>
                                <span class="address-text">{{item.address}}</span>
                            </div>
                        </div>
                    </li>
                    <div class="loadmore">{{loadText}}</div>
                </ul>
            </div>
        </div>
        <div id="mapContainer" style="display: none"></div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import introduce from "@/components/introduce/introduce";
import usedCarApi from "@/api/usedCarDealers/usedCar";
import jnsApi from "@/utils/jnsApi";
import { getUrlParamsCache } from "@/utils/auth";

export default {
    components: {
        headerOne,
        introduce
    },
    data() {
        return {
            lng: "113.264385", // 经度
            lat: "23.129112", // 纬度
            BrandId: "",
            hotBrandList: [],
            shopList: [],
            page: 1, // 车商列表当前页码
            pagesize: 10, // 单页显示条数
            loadText: "加载更多",
            canLoad: true,
            contentShow: false, // 数据加载后显示
            selectBrandName: "", // 当前选择品牌
            loading: false,
            title: "主机厂授权"
        };
    },

    watch: {
        $route(to, from) {
            if (to.query.carBrandId) {
                this.headWatch();
                this.getShopList(to.query.carBrandId);
            }
        }
    },
    created() {
        if (getUrlParamsCache()) {
            let menuName = getUrlParamsCache().menuName;
            if (menuName) {
                this.title = menuName;
            }
        }
    },
    mounted() {
        var self = this;
        jnsApi.getLocationInformation(function(state, lng, lat) {
            if (state == "success") {
                self.lng = lng;
                self.lat = lat;
            } else {
                self.$toast.fail("定位失败");
            }
            self.$nextTick(function() {
                self.headWatch();
                self.getShopList();
                self.getHostBrand();
            });
        });
        self.headWatch();
        self.getShopList();
        self.getHostBrand();
    },
    activated() {
        this.headWatch();
    },
    methods: {
        // 根据滚动条判断是否拉取新数据
        headWatch() {
            window.onscroll = () => {
                let a =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop; //滚动条y轴上的距离
                let b =
                    document.documentElement.clientHeight ||
                    document.body.clientHeight; //可视区域的高度
                let c =
                    document.documentElement.scrollHeight ||
                    document.body.scrollHeight; //可视化的高度与溢出的距离（总高度）
                if (a + b == c) {
                    // alert('已滚动到底部!')
                    this.page++;
                    this.getShopList();
                }
            };
        },
        // 获取热门车标
        getHostBrand() {
            usedCarApi.getHotBrand().then(res => {
                if (res.code == 20000) {
                    this.hotBrandList = res.data.used_brand_list;
                }
            });
        },
        // 计算车商列表brand样式
        setIconClass(array) {
            let len = array.length;
            if (len > 0) {
                if (len > 9) {
                    return `icon9`;
                } else {
                    return `icon${len}`;
                }
            }
        },

        // 跳转车商详情页
        openShopDetail(id) {
            this.$router.push({
                name: "dealerDetails",
                params: {
                    dealer_id: id
                }
            });
        },

        // 选择查询
        selectBrand(item) {
            this.selectBrandName = item.brandName;
            this.getShopList(item.brandId);
        },

        // 清空所选
        clearSelect() {
            this.loading = true;
            this.shopList = [];
            this.page = 1;
            this.canLoad = true;
            this.BrandId = "";
            this.selectBrandName = "";
            this.getShopList();
        },

        // 获取车商列表
        getShopList(id) {
            let self = this;
            let usedCarDealersCarInfo = this.$session.get(
                "usedCarDealersCarInfo"
            ); // 先查询缓存车商id
            if (usedCarDealersCarInfo) {
                this.BrandId = usedCarDealersCarInfo.carBrandId;
                this.selectBrandName = usedCarDealersCarInfo.carBrandName;
                this.$session.remove("usedCarDealersCarInfo");
            }

            if (id) {
                // 每次带id查询，清空旧数据
                this.BrandId = id;
                this.loading = true;
                this.shopList = [];
                this.page = 1;
                this.canLoad = true;
            }

            if (this.lng && this.lat) {
                if (!this.canLoad) {
                    return false;
                }
                let params = {
                    lng: this.lng,
                    lat: this.lat,
                    page: this.page,
                    pagesize: this.pagesize,
                    brand_id: this.BrandId
                };
                this.loadText = "加载中...";
                usedCarApi.getShopList(params).then(res => {
                    if (res.code == 20000) {
                        this.shopList = this.shopList.concat(res.data.list);
                        this.loadText = "加载更多";
                        if (res.data.list.length < this.pagesize) {
                            this.loadText = "没有更多了";
                            this.canLoad = false;
                        }
                    }
                    this.loading = false;
                    this.contentShow = true;
                });
            }
        },
        showFlow: function() {
            jnsApi.showImg("usedCarDealer");
        }
    }
};
</script>
<style lang='less' scoped>
.usedCarPage .content {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
}

.usedCarPage .title {
    font-size: 27px;
    margin-bottom: 10px;
}

/* 热门品牌 */
.hotBrand-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
}

.hotBrand-head .leftside {
    font-size: 18px;
    color: #313131;
    margin-left: 15px;
}

.hotBrand-head .rightside {
    font-size: 15px;
    color: #0e81d2;
    margin-right: 10px;
}

.hotBrand-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-left: 1px solid #f5f5f5;
    /*no*/
    border-bottom: 1px solid #f5f5f5;
    /*no*/
}

.hotBrand-list li {
    width: 25%;
    height: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    box-sizing: border-box;
    border-top: 1px solid #f5f5f5;
    /*no*/
    border-right: 1px solid #f5f5f5;
    /*no*/
}

.hotBrand-list li img {
    width: 56px;
    height: auto;
    border: 0;
}

.hotBrand-list li .text {
    margin-top: 3px;
    font-size: 14px;
    color: #8b8b8b;
}

.select-brand {
    margin-top: 15px;
    margin-bottom: 5px;
    padding-left: 15px;
    height: 24px;
    box-sizing: border-box;
    font-size: 14px;
    color: #b1b1b2;
    display: flex;
    align-items: center;
}
.select-brand .select-brand-current {
    padding: 5px;
    padding-right: 0;
    border: 1px solid #ececec;
    border-radius: 4px;
    display: flex;
    align-items: center;
}
.select-brand-current .delete {
    padding-left: 5px;
    padding-right: 5px;
    font-size: 12px;
    color: #bababb;
}

/* 车商列表 */
.shopList-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
}

.shopList-head .leftside {
    font-size: 18px;
    color: #313131;
    margin-left: 15px;
}

.shopList-noData {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.shopList-noData img {
    width: 105px;
    height: auto;
    margin-top: 10px;
    margin-bottom: 16px;
}

.shopList-noData .noDataText {
    font-size: 16px;
    color: #cecece;
}

.shopList-list li {
    height: 90px;
    box-sizing: border-box;
    border: 1px solid #f0f0f0;
    box-shadow: 0 1px #f3f3f3;
    border-radius: 10px;
    margin-bottom: 11px;
    padding-top: 11px;
    padding-bottom: 15px;
    display: flex;
}

.shopList-list .shop-brand {
    width: 95px;
    height: 70px;
    box-sizing: border-box;
    padding-left: 16px;
    padding-right: 8px;
    border-right: 1px solid #f0f0f0;
    /*no*/
}

.shopList-list .loadmore {
    text-align: center;
    font-size: 14px;
    color: #cecece;
    padding-bottom: 15px;
}

/* icon图片样式 根据后端返回icon数量变化 */
.shop-brand .brand-img {
    width: 70px;
    height: 70px;
    background-color: #efefef;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap-reverse;
}

.shop-brand .brand-img .icon {
    margin-right: 2%;
    display: flex;
    align-items: center;
    background-color: #fff;
}

.shop-brand .brand-img .icon img {
    width: 100%;
    height: auto;
}

.shop-brand .brand-img .icon:nth-child(3n) {
    margin-right: 0;
}

.shop-brand .brand-img .icon1 {
    width: 100%;
    height: 100%;
    margin-right: 0;
}

.shop-brand .brand-img .icon2 {
    width: 48%;
    height: 48%;
}

.shop-brand .brand-img .icon3 {
    width: 48%;
    height: 48%;
}

.shop-brand .brand-img .icon3:nth-child(1),
.icon3:nth-child(2) {
    margin-top: 2%;
}

.shop-brand .brand-img .icon4 {
    width: 48%;
    height: 48%;
}

.shop-brand .brand-img .icon4:nth-of-type(odd) {
    margin-right: 2%;
}

.shop-brand .brand-img .icon4:nth-child(1),
.icon4:nth-child(2) {
    margin-top: 2%;
}

.shop-brand .brand-img .icon5 {
    width: 32%;
    height: 32%;
}

.shop-brand .brand-img .icon5:nth-child(1),
.icon5:nth-child(2),
.icon5:nth-child(3) {
    margin-top: 2%;
}

.shop-brand .brand-img .icon6 {
    width: 32%;
    height: 32%;
}

.shop-brand .brand-img .icon6:nth-child(-n + 3) {
    margin-top: 2%;
}

.shop-brand .brand-img .icon7 {
    width: 32%;
    height: 32%;
}

.shop-brand .brand-img .icon7:nth-child(-n + 6) {
    margin-top: 2%;
}

.shop-brand .brand-img .icon8 {
    width: 32%;
    height: 32%;
}

.shop-brand .brand-img .icon8:nth-child(-n + 6) {
    margin-top: 2%;
}

.shop-brand .brand-img .icon9 {
    width: 32%;
    height: 32%;
}

.shop-brand .brand-img .icon9:nth-child(-n + 6) {
    margin-top: 2%;
}

/* end */

.shopList-list .shop-describe {
    flex: auto;
}

.shop-describe {
    margin-left: 10px;
}

.shop-describe > .name {
    color: #3a3a3a;
    font-size: 17px;
    margin-top: 8px;
    margin-bottom: 10px;
}

.shop-address {
    position: relative;
    .address-icon {
        position: absolute;
        bottom: -1px;
        color: #8accfa;
        font-size: 15px;
    }
    .address-text {
        margin-left: 17px;
        color: #cdcdcd;
        font-size: 13px;
    }
}
.function-explain {
    position: fixed;
    right: 20px;
    bottom: 20px;
}

.function-explain img {
    width: 80px;
}
</style>