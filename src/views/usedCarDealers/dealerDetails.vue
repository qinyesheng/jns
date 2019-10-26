<!--
 * @Description: 车商详情
 * @Author: xwq
 * @LastEditors: Please set LastEditors
 * @Date: 2019-02-26 16:58:15
 * @LastEditTime: 2019-09-18 14:53:14
 -->

<template>
    <div class="page">
        <headerOne :isFixed="true"></headerOne>
        <div class="main-container">
            <h3 class="detailsTitle">车商详情</h3>
            <div class="contactWay">
                <h2>车商名称</h2>
                <van-cell>
                    <span class="custom-text">{{DealerDetail.name}}</span>
                </van-cell>
            </div>
            <div class="contactWay">
                <h2>联系方式</h2>
                <div class="contactWayInfo">
                    <van-cell value @click="callTelPhone" :center="true" size="large">
                        <span class="custom-text">{{DealerDetail.contact_name}}</span>
                        <span>&nbsp;&nbsp;{{DealerDetail.contact_tel}}&nbsp;&nbsp;</span>
                        <van-icon :name="cellphoneUCD" />
                    </van-cell>
                </div>
            </div>
            <div class="contactWay">
                <h2>地址</h2>
                <van-cell :title="DealerDetail.address"></van-cell>
            </div>
            <div id="containerAMap"></div>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import usedCarDealerApi from "@/api/usedCarDealers/UsedCarDealer";
import jnsApi from "@/utils/jnsApi";
import Vue from "vue";
import VueAMap from "vue-amap";
import { lazyAMapApiLoaderInstance } from "vue-amap";
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: "f65184f029e86e47b9fdbcbbe41c24c5",
    plugin: [
        "AMap.Autocomplete",
        "AMap.PlaceSearch",
        "AMap.Scale",
        "AMap.OverView",
        "AMap.ToolBar",
        "AMap.MapType",
        "AMap.PolyEditor",
        "AMap.CircleEditor"
    ],
    // 默认高德 sdk 版本为 1.4.4
    v: "1.4.4"
});
export default {
    components: {
        headerOne
    },
    data: function() {
        return {
            title: "车商详情",
            DealerDetail: {
                // 商户详情信息
                name: "",
                contact_name: "",
                contact_tel: "",
                address: "",
                lng: "", // 经度坐标
                lat: "" // 纬度坐标
            },
            cellphoneUCD: require("../../assets/image/cellphoneUCD.png")
        };
    },

    created() {
        this.getDealerDetail();
    },
    mounted() {},
    methods: {
        //创建覆盖物
        addMarker(map) {
            let self = this;
            let lng = self.DealerDetail.lng;
            let lat = self.DealerDetail.lat;
            let icon = new AMap.Icon({
                size: new AMap.Size(31, 36), // 图标尺寸
                image: require("../../assets/image/locationUCD.png"), // Icon的图像
                // imageOffset: new AMap.Pixel(0, -2),  // 图像相对展示区域的偏移量，适于雪碧图等
                imageSize: new AMap.Size(31, 36) // 根据所设置的大小拉伸或压缩图片
            });
            let marker = new AMap.Marker({
                position: [lng, lat], //经纬度
                offset: new AMap.Pixel(-13, -30),
                icon: icon
            });
            map.add(marker); //将创建好的覆盖物添加到地图上
        },
        //获取车商详情数据
        getDealerDetail() {
            let _this = this;
            // console.log("车商详情ID>>" + this.$route.params.dealer_id);
            usedCarDealerApi
                .getDealerDetail({
                    dealer_id: this.$route.params.dealer_id
                })
                .then(function(res) {
                    if (res.code == 20000) {
                        _this.DealerDetail = res.data.info;
                        lazyAMapApiLoaderInstance.load().then(() => {
                            // your code ...
                            let map = new AMap.Map("containerAMap", {
                                resizeEnable: true,
                                center: [
                                    _this.DealerDetail.lng,
                                    _this.DealerDetail.lat
                                ],
                                zoom: 14
                            });
                            _this.addMarker(map); //实例化完地图后执行添加覆盖物函数
                            // 隐藏高德标志
                            document
                                .getElementsByClassName("amap-logo")[0]
                                .setAttribute(
                                    "style",
                                    "display:none !important;"
                                );
                            document
                                .getElementsByClassName("amap-copyright")[0]
                                .setAttribute(
                                    "style",
                                    "display:none !important;"
                                );
                        });
                        // this.initMap();
                    }
                });
        },
        //打电话
        callTelPhone() {
            let tel = this.DealerDetail.contact_tel;
            console.log("app call phone...");
            jnsApi.callphone(tel);
        }
    }
};
</script>
<style lang='less' scoped>
/*车商详情*/
.detailsTitle {
    margin-bottom: 15px;
    font-size: 27px;
}
/* 联系方式 */
.contactWay > h2 {
    font-size: 16px;
    color: #4f4f4f;
}

/* map地图 */
#containerAMap {
    height: 280px;
}

.amap-logo {
    display: none !important;
}
</style>