<!--
 * @Description: 地图
 * @Author: xwq
 * @Date: 2019-07-05 22:04:22
 -->
<template>
    <div class="page">
        <!-- 关键字搜索 -->
        <transition name="van-fade">
            <van-row v-if="showPage==2" class="search-shop-info">
                <van-search
                    v-model="searchKeyword"
                    placeholder="请输入店名或区域"
                    @input="searchFocusOrg"
                    :autofocus="showPage==2?true:''"
                    showAction
                    @cancel="onCancel"
                ></van-search>
                <van-cell-group v-show="searchOrgList.length">
                    <van-cell
                        :title="item.depart_name"
                        is-link
                        v-for="(item,key) in searchOrgList"
                        :key="key"
                        @click="locationOrg(item)"
                    />
                </van-cell-group>
                <van-cell-group
                    v-show="!searchOrgList.length&&searchKeyword.length"
                    class="no-search-rusult"
                >
                    <van-cell title="没有找到匹配的门店或区域" title-class="title-style" />
                </van-cell-group>
                <van-row class="search-history" v-if="searchHistory.length&&!searchOrgList.length">
                    <van-col span="24">
                        <van-cell title="历史记录" size="large" value-class="value-style">
                            <template slot="default">
                                <van-icon
                                    :name="require('@image/delete.png')"
                                    @click="clearHistory"
                                />
                                <span @click="clearHistory">清空记录</span>
                            </template>
                        </van-cell>
                    </van-col>
                    <van-col span="24">
                        <van-row tag="ul" class="search-history-list" type="flex">
                            <van-col
                                tag="li"
                                class="history-list-item"
                                v-for="(item,k) in searchHistory"
                                :key="k"
                                @click.native="selectSearchHistory(item)"
                            >{{item.depart_name}}</van-col>
                        </van-row>
                    </van-col>
                </van-row>
            </van-row>
        </transition>
        <div class="main-container" v-show="showPage==1">
            <div id="containerAMap">
                <van-search class="search-org" placeholder="请输入店名或区域" readonly @focus="searchFocus">
                    <!-- <div slot="action" @click="onSearch">搜索</div> -->
                </van-search>
                <!-- 地图工具条 -->
                <van-icon
                    tag="div"
                    :name="require('@image/orgMap_locat.png')"
                    class="orgMap-locat"
                    @click="scaleOrgMap('orgMap_locat')"
                >
                    <van-loading
                        v-show="orgMapLocatLoading"
                        color="#868686"
                        class="orgMap-locat-loading"
                    />
                </van-icon>
                <van-icon
                    tag="div"
                    :name="require('@image/orgMap_add.png')"
                    class="orgMap-add"
                    @click="scaleOrgMap('orgMap_add')"
                ></van-icon>
                <van-icon
                    tag="div"
                    :name="require('@image/orgMap_subtract.png')"
                    class="orgMap-subtract"
                    @click="scaleOrgMap('orgMap_subtract')"
                ></van-icon>
            </div>
        </div>
        <!-- 门店列表 -->
        <van-popup
            v-model="popShow"
            position="bottom"
            :duration="0.6"
            :overlay="false"
            :style="{ height: '100%',backgroundColor:'#f2f2f2' }"
        >
            <van-collapse v-model="shopListInfo['activeName']" accordion :border="false">
                <van-collapse-item
                    :title="shopListInfo['currentCityInfo']['name']"
                    name="1"
                    :border="false"
                >
                    <template slot="default">
                        <van-cell-group class="panel-value-info">
                            <van-cell
                                v-for="(item1,k1) in shopListInfo['cityList']"
                                :key="k1"
                                @click="selectHandle(item1,'city')"
                            >{{item1.name}}</van-cell>
                        </van-cell-group>
                    </template>
                </van-collapse-item>
                <van-collapse-item
                    :title="shopListInfo['currentAreaInfo']['name']"
                    name="2"
                    :border="false"
                >
                    <template slot="default">
                        <van-cell-group class="panel-value-info">
                            <van-cell
                                v-for="(item2,k2) in shopListInfo['areaList']"
                                :key="k2"
                                @click="selectHandle(item2,'area')"
                            >{{item2.name}}</van-cell>
                        </van-cell-group>
                    </template>
                </van-collapse-item>
                <van-collapse-item
                    :title="shopListInfo['currentTypeInfo']['name']"
                    name="3"
                    :border="false"
                >
                    <template slot="default">
                        <van-cell-group class="panel-value-info">
                            <van-cell
                                v-for="(item3,k3) in shopListInfo['type']"
                                :key="k3"
                                @click="selectHandle(item3,'type')"
                            >{{item3.name}}</van-cell>
                        </van-cell-group>
                    </template>
                </van-collapse-item>
                <van-collapse-item
                    :border="false"
                    :is-link="false"
                    disabled
                    :icon="require('@image/back_map.png')"
                    @click.native="IconBackMapHandle"
                ></van-collapse-item>
            </van-collapse>
            <van-row class="fixed-top"></van-row>
            <!-- 列表页数据 -->
            <div class="pop-main-container">
                <van-pull-refresh v-model="refresh" @refresh="onRefresh" class="pull-refresh">
                    <van-list
                        v-model="shopListLoading"
                        :immediate-check="immediateCheck"
                        :finished="finished"
                        :finished-text="!shopInfoShow?'暂无数据,下拉即可刷新':'没有更多了'"
                        @load="shopListPublic(true)"
                    >
                        <van-row class="shop-list-container" v-show="shopInfoShow">
                            <van-row
                                class="shop-info-list"
                                v-for="(item5,k5) in shopListInfo['shopList']"
                                :key="k5"
                                @click.native="listClickHandle(item5)"
                            >
                                <van-col>
                                    <img
                                        v-lazy="item5.front_pic?item5.front_pic:require('@image/1.png')"
                                        class="map-shop-img"
                                    />
                                </van-col>
                                <van-col>
                                    <van-col class="shop-info-list-item">
                                        <h3 class="shop-info-item-title">{{item5.depart_name}}</h3>
                                    </van-col>
                                    <van-col class="shop-info-list-item">
                                        <van-rate
                                            v-model="item5.star"
                                            allow-half
                                            void-icon="star"
                                            void-color="#eee"
                                            :readonly="true"
                                        />
                                    </van-col>
                                    <van-col class="shop-info-list-item">
                                        <van-col class="shop-adress">{{item5.address}}</van-col>
                                        <van-col
                                            class="shop-distance"
                                            v-show="item5.distanceDescStatus"
                                        >{{item5.distance}}</van-col>
                                    </van-col>
                                </van-col>
                            </van-row>
                        </van-row>
                    </van-list>
                </van-pull-refresh>
            </div>
        </van-popup>
        <!-- 展示门店列表 -->
        <van-row class="map-shop-btn-info" v-if="active==0?true:false">
            <van-button type="default" size="large" @click="shopListsHandle">
                地图上的门店
                <van-icon :name="btnIconName" />
            </van-button>
            <!-- 地图页站点信息弹窗 -->
            <transition name="van-slide-up">
                <van-row class="map-shop-info" v-if="visible" @click.native="toOrginfo(orgInfo)">
                    <van-col>
                        <img src="@image/1.png" class="map-shop-img" />
                    </van-col>
                    <van-col>
                        <van-col class="shop-info-left-item">
                            <h3>{{orgInfo.depart_name}}</h3>
                        </van-col>
                        <van-col class="shop-info-left-item">
                            <van-rate
                                v-model="orgInfo.star"
                                allow-half
                                void-icon="star"
                                void-color="#eee"
                                :readonly="true"
                            />
                        </van-col>
                        <van-col class="shop-info-left-item">
                            <van-col class="shop-adress">{{orgInfo.address}}</van-col>
                            <van-col
                                class="shop-distance"
                            >{{orgInfo.distanceDesc?orgInfo.distanceDesc:''}}</van-col>
                        </van-col>
                    </van-col>
                </van-row>
            </transition>
        </van-row>
        <van-row class="fixed-bottom"></van-row>
    </div>
</template>
<script>
import Vue from "vue";
import orgApi from "@/api/xhjcOwner/org";
import regionApi from "@/api/common/region";
import VueAMap from "vue-amap";
import {
    Panel,
    Search,
    Tag,
    Collapse,
    CollapseItem,
    Rate,
    PullRefresh,
    List,
    Loading
} from "vant";
import { lazyAMapApiLoaderInstance } from "vue-amap";
import { getLineDistance, copyObject } from "@/utils/common";
// import Qs from "qs";
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: process.env.VUE_APP_AMAP_KEY,
    plugin: [
        "Autocomplete",
        "PlaceSearch",
        "Scale",
        "OverView",
        "ToolBar",
        "MapType",
        "PolyEditor",
        "CircleEditor",
        "Driving"
    ],
    // 默认高德 sdk 版本为 1.4.4
    v: "1.4.4"
});
export default {
    components: {
        [Panel.name]: Panel,
        [Search.name]: Search,
        [Tag.name]: Tag,
        [Collapse.name]: Collapse,
        [Rate.name]: Rate,
        [CollapseItem.name]: CollapseItem,
        [PullRefresh.name]: PullRefresh,
        [List.name]: List,
        [Loading.name]: Loading
    },
    name: "orgMap",
    data() {
        return {
            showPage: 1,
            searchKeyword: "",
            jnsMap: {},
            jnsGeolocation: {},
            searchOrgList: [],
            orgList: [],
            orgInfo: {
                shopOpenId: false,
                shopTagMain: [],
                shopServices: []
            },
            userPositonInfo: {},
            loading: true,
            markers: [],
            active: 0,
            visible: false, //展示门店列表
            btnIconName: "arrow-down",
            popShow: false,
            initialPosition: "", //定位的初始位置
            searchHistory: [],
            shopListInfo: {
                activeName: "",
                cityList: [],
                areaList: [],
                shopList: [],
                type: [],
                currentCityInfo: {
                    name: "请选择市"
                },
                currentAreaInfo: {
                    name: "请选择区"
                },
                currentTypeInfo: {
                    name: "排序"
                }
            },
            requestInfo: {
                page: 1,
                pagesize: 15,
                type: 2
            },
            refresh: false,
            shopListLoading: false,
            finished: false,
            shopInfoShow: false,
            orgMapLocatLoading: false,
            immediateCheck: false
        };
    },
    //组件激活时调用
    activated() {
        // console.log("activated");
        //  let popShowStatus = this.$session.get("popShowstatus");
        // if (popShowStatus) {
        //     this.popShow = popShowStatus;
        // }
    },
    //组件停用时调用
    deactivated() {
        // console.log("deactivated");
    },
    //路由进入的做处理
    /*  beforeRouteEnter(to, from, next) {
        console.log("orgMap", to, from);
        next();
    }, */
    //路由离开时的处理
    /* beforeRouteLeave(to, from, next) {
        // console.log(to, from, next);
        if (this.popShow && (to.path == undefined || to.path == "")) {
            this.popShow = false;
            next(false);
        } else {
            next();
        }
    }, */
    created() {
        this.init();
    },
    mounted() {
        this.watchHandle();
    },
    methods: {
        /**
         * @Description: 初始化
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-25 09:48:46
         */
        init(positionCenter = []) {
            this.loading = this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: "spinner"
            });
            this.handleOrgList();
        },

        /**
         * @Description: 获取门店数据
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-26 16:07:12
         */

        async getOrgList(data) {
            let params = { scene_id: "xh" };
            params = { ...params, ...data };

            let resultList = await orgApi.getOrgList(params).then(res => {
                if (res.code == 20000) {
                    return res.data;
                } else {
                    this.$toast.fail(res.msg);
                    this.finished = true;
                }
            });

            return resultList;
        },

        /**
         * @Description: 创建覆盖物
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-25 09:45:25
         */
        addMarker(map, list) {
            let _this = this;
            let icon = new AMap.Icon({
                size: new AMap.Size(35, 46), // 图标尺寸
                image: require(`@/pages/xhDetection/assets/image/${list.scene_icon}.png`), // Icon的图像  测试
                // image: require("@/pages/xhDetection/assets/image/mapIcon.png"), // Icon的图像
                // imageOffset: new AMap.Pixel(0, -2),  // 图像相对展示区域的偏移量，适于雪碧图等
                imageSize: new AMap.Size(35, 46) // 根据所设置的大小拉伸或压缩图片
            });
            let marker = new AMap.Marker({
                position: [list.lng, list.lat], //经纬度
                // offset: new AMap.Pixel(-13, -30),
                icon: icon
            });
            marker.orgInfo = list;
            marker.on("click", function(e) {
                // console.log(e.target.orgInfo, "e.target");
                e.target.orgInfo.star = +e.target.orgInfo.star;
                _this.orgInfo = e.target.orgInfo;
                _this.visible = true;
                map.setCenter([e.target.orgInfo.lng, e.target.orgInfo.lat]);
                map.setZoom(14);
            });
            map.add(marker); //将创建好的覆盖物添加到地图上
            this.markers.push(marker);

            this.loading.clear();
        },
        /**
         * @Description: 创建地图容器实例
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-25 09:45:08
         */
        handleOrgList() {
            let _this = this;
            lazyAMapApiLoaderInstance.load().then(() => {
                _this.jnsMap = new AMap.Map("containerAMap", {
                    resizeEnable: true,
                    center: [113.3245, 23.12888],
                    zoom: 12
                });

                _this.geolocation();
                _this.jnsMap.on("click", e => {
                    if (e.overlay) {
                        // alert("你点击的是覆盖物：" + e.overlay.toString());
                    } else {
                        _this.visible = false;
                    }
                });

                /* 地图拖动事件监听 */
                _this.jnsMap.on("dragstart", _this.dragstartHandle);
                _this.jnsMap.on("dragging", _this.draggingHandle);
                _this.jnsMap.on("dragend", _this.dragendHandle);
            });
        },
        /* 拖动开始事件监听 */
        dragstartHandle() {
            console.log("拖动开始");
        },
        /* 拖动中事件监听 */
        draggingHandle() {
            console.log("拖动中");
        },

        /**
         * @Description:拖动结束事件监听
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-27 14:01:28
         */
        dragendHandle() {
            let _this = this;
            setTimeout(() => {
                let afterCenter = this.jnsMap.getCenter(); /* 获取中心点 */
                let p1 = this.initialPosition; //初始定位的中心
                let p2 = [afterCenter.lng, afterCenter.lat]; //地图拖动后的中心

                /* 计算距离 */
                let betweenDistance = Math.round(
                    afterCenter.distance(p1, p2) / 1000
                );
                if (betweenDistance >= 1) {
                    // console.log("拖动的距离", betweenDistance + "km");
                    this.getCurrentAdcode(p2);

                    // this.jnsMap.clearMap();/* 移除全部覆盖物 */
                    // this.clearMarker();/* 移除指定个数的覆盖物,可以是单个对象或数组 */
                }
            }, 1000);
        },

        /**
         * @Description: 根据中心点返回地址信息(adcode),针对地图拖动效果。
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-27 17:26:31
         */

        getCurrentAdcode(center) {
            /* 获取城市区域adcode */
            let geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            geocoder.getAddress(center, (status, result) => {
                if (status === "complete" && result.info === "OK") {
                    let adcode = result.regeocode.addressComponent.adcode; //返回地址描述
                    // console.log("当前adcode== " + adcode);
                    /* 请求地图列表数据 */
                    this.getOrgList({
                        ...this.requestInfo,
                        region_code: adcode,
                        lng: center[0],
                        lat: center[1],
                        type: 1
                    }).then(res => {
                        this.orgList = res.list;
                        this.clearMarker();
                        this.jnsMap.setCenter(center);

                        this.traversList(res.list);
                    });
                }
            });
        },

        //添加缩放控制
        /*   addMapControl() {
            this.jnsMap.addControl(
                new AMap.ToolBar({
                    position: "RT",
                    liteStyle: true //启用精简模式
                })
            );
        }, */

        /**
         * @Description: 定位完成的回调
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-25 09:22:09
         */
        geolocationComplete(result) {
            console.log(result);
            if (result && result.type === "complete" && result.position) {
                /** 
                # 定位信息
                result.position
                {
                    position: {
                        P: 23.11797,
                        O: 113.32688000000002,
                        lng: 113.32688,
                        lat: 23.11797
                    }
                };
                **/
                this.orgMapLocatLoading = false;
                this.userPositonInfo = result;
                this.clearMarker();
                let position = result["position"];
                let positionAdressInfo = this.$session.get(
                    "positionAdressInfo"
                );

                let { adcode, city, district, province } = result[
                    "addressComponent"
                ];
                if (!this.initialPosition) {
                    /* 当前地址信息 
                    result.addressComponent
                    {
                        adcode: "440106"
                        city: "广州市"
                        district: "天河区"
                        province: "广东省"
                    }
                    */
                    this.$session.set("positionAdressInfo", {
                        adcode,
                        city,
                        district,
                        province
                    });
                    this.initialPosition = [position.lng, position.lat];
                }

                /* 请求地图列表数据 */
                this.getOrgList({
                    ...this.requestInfo,
                    region_code: adcode,
                    lng: position.lng,
                    lat: position.lat,
                    type: 1
                }).then(res => {
                    this.orgList = res.list;
                    this.traversList(res.list);
                    /* 列表初始化 */
                    this.shopListsInitHandle(
                        (positionAdressInfo = {
                            adcode,
                            city,
                            district,
                            province
                        })
                    );
                });
            }
        },

        /**
         * @Description: 定位失败的回调
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-25 09:22:29
         */
        geolocationError(result) {
            // this.jnsGeolocation.getCurrentPosition();
            /*  console.log(this.jnsGeolocation);
            setTimeout(() => {
                this.jnsGeolocation.getCurrentPosition();
            }, 1500); */
            // console.log("定位失败", result);
            this.clearMarker();
            this.orgMapLocatLoading = false;
            // if (!this.initialPosition) {
            this.$session.set("positionAdressInfo", {
                adcode: "440106",
                city: "广州市",
                district: "天河区",
                province: "广东省"
            });
            this.initialPosition = [113.3245, 23.12888];
            // }

            let positionAdressInfo = this.$session.get("positionAdressInfo");
            let { adcode, city, district, province } = positionAdressInfo;
            // return;
            /* 请求地图列表数据 */
            this.getOrgList({
                ...this.requestInfo,
                region_code: "440106",
                lng: this.initialPosition[0],
                lat: this.initialPosition[1],
                type: 1
            }).then(res => {
                this.orgList = res.list;
                this.traversList(res.list);
                /* 列表初始化 */
                this.shopListsInitHandle(
                    (positionAdressInfo = {
                        adcode,
                        city,
                        district,
                        province
                    })
                );
            });
        },

        /**
         * @Description: 遍历数据生成地图锚点
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-27 11:47:09
         */

        traversList(list) {
            let zoomLevel = {
                2: 14,
                3: 13,
                4: 12,
                6: 12,
                7: 11,
                8: 11,
                10: 11,
                15: 11,
                30: 10,
                31: 9
            };
            let distance = [];
            for (let i = 0; i < list.length; i++) {
                let endP = [list[i].lng, list[i].lat];
                let lineDistance = getLineDistance(this.initialPosition, endP);

                list[i].distanceDesc = lineDistance.desc;
                distance.push(parseFloat(lineDistance.num));
                this.addMarker(this.jnsMap, list[i]);
            }

            distance.sort(function(a, b) {
                return a - b;
            });
            if (distance[0] > 31) {
                this.jnsMap.setZoom(4);
            } else {
                for (let key in zoomLevel) {
                    if (distance[0] <= key) {
                        this.jnsMap.setZoom(zoomLevel[key]);
                        break;
                    }
                }
            }
        },
        /**
         * @Description: 地图定位
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-25 09:20:59
         */
        geolocation() {
            let _this = this;
            _this.jnsMap.plugin("AMap.Geolocation", function() {
                _this.jnsGeolocation = new AMap.Geolocation({
                    enableHighAccuracy: true, //是否使用高精度定位，默认:true
                    timeout: 10000, //超过10秒后停止定位，默认：无穷大
                    maximumAge: 0, //定位结果缓存0毫秒，默认：0
                    convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: false, //显示定位按钮，默认：true
                    buttonPosition: "RT", //定位按钮停靠位置，默认：'LB'，左下角
                    buttonOffset: new AMap.Pixel(14, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy: false //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                });
                _this.jnsMap.addControl(_this.jnsGeolocation);
                _this.jnsGeolocation.getCurrentPosition();
                AMap.event.addListener(
                    _this.jnsGeolocation,
                    "complete",
                    _this.geolocationComplete
                ); //返回定位信息
                AMap.event.addListener(
                    _this.jnsGeolocation,
                    "error",
                    _this.geolocationError
                ); //返回定位出错信息
            });
        },

        /**
         * @Description: 搜索框获得焦点
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-25 09:15:54
         */
        searchFocus() {
            let searchHistory = this.$local.get("searchHistory");
            if (searchHistory) {
                this.searchHistory = searchHistory;
            }
            this.showPage = 2;
            this.visible = false;
        },

        /**
         * @Description: 门店关键字搜索实时输入监听
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-25 09:15:12
         */
        searchFocusOrg() {
            let orgList = [];
            if (!this.searchKeyword) {
                this.searchOrgList = [];
                return false;
            }
            /* 通过关键字请求数据 */
            let params = {
                ...this.requestInfo,
                search: this.searchKeyword,
                type: 3,
                page: 1
            };
            this.getOrgList(params).then(res => {
                this.searchOrgList = res.list;
            });
        },

        /**
         * @Description: 门店关键字搜索结果选择
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-27 18:25:14
         */
        locationOrg(item) {
            item.star = +item.star;
            if (
                this.searchHistory.length > 0 &&
                this.searchHistory.length < 10
            ) {
                this.searchHistory.map((i, k) => {
                    if (i["depart_name"] == item["depart_name"]) {
                        this.searchHistory.splice(k, 1);
                    }
                });
                this.searchHistory.push(item);
            } else if (this.searchHistory.length == 10) {
                let status = false;
                this.searchHistory.map((i, k) => {
                    if (i["depart_name"] == item["depart_name"]) {
                        this.searchHistory.splice(k, 1);
                        status = true;
                    }
                });
                if (status) {
                    this.searchHistory.push(item);
                } else {
                    this.searchHistory.splice(0, 1);
                    this.searchHistory.push(item);
                }
            } else {
                this.searchHistory.push(item);
            }

            this.keywaordSearchPublic(item);
        },

        /**
         * @Description: 历史记录选择
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-27 18:30:31
         */
        selectSearchHistory(item) {
            this.keywaordSearchPublic(item);
        },

        /**
         * @Description: 关键字搜索，代码公共部分
         * @Param:  item [选中的对象信息]
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-28 10:06:36
         */
        keywaordSearchPublic(item) {
            // 根据选择的门店，获取地图上最近的15家数据并在地图展示。
            //调用获取城市区域adcode方法，传入当前中心点Array。

            this.getCurrentAdcode([item["lng"], item["lat"]]);
            //计算当前点的距离
            item.distanceDesc = getLineDistance(this.initialPosition, [
                item["lng"],
                item["lat"]
            ]).desc;

            this.orgInfo = item;
            this.jnsMap.setZoom(14);

            this.visible = true;
            this.showPage = 1;
            this.searchKeyword = "";
            this.searchOrgList = [];
        },
        //取消关键字搜索
        onCancel() {
            this.showPage = 1;
            this.searchKeyword = "";
        },

        /**
         * @Description: 清除地图覆盖物
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-28 10:13:09
         */
        clearMarker() {
            if (this.markers.length) {
                this.jnsMap.remove(this.markers);
            }
            this.markers = [];
        },
        /**
         * @Description:清除历史记录
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-24 18:16:53
         */

        clearHistory() {
            this.$dialog
                .confirm({
                    message: "清除历史记录"
                })
                .then(() => {
                    this.searchHistory = [];
                })
                .catch(() => {
                    return;
                });
        },

        /**
         * @Description:列表点击地图图标返回
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-25 15:13:18
         */

        IconBackMapHandle() {
            this.popShow = false;
            this.$session.remove("popShowstatus");
        },
        /**
         * @Description: 门店列表根据条件筛选
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-25 16:03:29
         */
        selectHandle(item, name) {
            switch (name) {
                case "city":
                    this.shopListInfo["currentCityInfo"] = item;
                    this.shopListInfo["activeName"] = "";
                    this.requestInfo.page = 1;
                    this.requestInfo.type = 2;
                    this.$session.remove("shopListInfo");
                    this.$session.remove("requestInfo");
                    // 获取列表数据
                    this.handsomeChooseInfo(item["id"]);
                    break;
                case "area":
                    this.shopListInfo["currentAreaInfo"] = item;
                    this.shopListInfo["activeName"] = "";
                    this.requestInfo.page = 1;
                    this.requestInfo.type = 2;
                    this.$session.remove("shopListInfo");
                    this.$session.remove("requestInfo");
                    // 获取列表数据
                    this.shopListPublic(false);
                    break;
                case "type":
                    this.shopListInfo["currentTypeInfo"] = item;
                    this.shopListInfo["activeName"] = "";
                    this.requestInfo.page = 1;
                    this.requestInfo.type = 2;
                    this.$session.remove("shopListInfo");
                    this.$session.remove("requestInfo");

                    // 获取列表数据
                    this.shopListPublic(false);
                    break;
                default:
                    break;
            }
        },

        /**
         * @Description:列表页改变城市获取内容
         * @Param: params [条件参数]
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-29 10:32:54
         */
        handsomeChooseInfo(id) {
            regionApi.getAreaList(id).then(res => {
                if (res.code == 20000) {
                    let { area } = res.data;
                    area.map(item => {
                        item.name = item.regionName;
                        delete item["regionName"];
                    });

                    this.shopListInfo["areaList"] = area; //区域数据
                    this.shopListInfo["currentAreaInfo"] = area[0]; //默认区域第一个

                    // 获取列表数据
                    this.shopListInfo["shopList"] = [];
                    this.$session.set("shopListInfo", this.shopListInfo);
                    this.shopListPublic(false);
                }
            });
        },

        /**
         * @Description: 门店列表筛选获取数据公共部分
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-29 17:12:25
         */
        shopListPublic(status) {
            let params;
            let popListStatus = this.$session.get("popShowstatus");
            let requestInfo = this.$session.get("requestInfo");
            let shopListInfo = this.$session.get("shopListInfo");

            if (popListStatus && requestInfo) {
                params = requestInfo;
            } else {
                // 获取列表数据
                params = {
                    city_id: this.shopListInfo["currentCityInfo"]["id"],
                    area_id: this.shopListInfo["currentAreaInfo"]["id"],
                    lng: this.initialPosition[0],
                    lat: this.initialPosition[1],
                    sort: this.shopListInfo["currentTypeInfo"]["value"],
                    ...this.requestInfo
                };
            }

            this.getOrgList(params).then(res => {
                let data = res.list;
                this.shopListLoading = false;

                for (let i = 0; i < data.length; i++) {
                    data[i].star = +data[i].star;

                    data[i]["distanceDescStatus"] =
                        data[i]["distance"] / 1000 >= 1 ? false : true;
                    data[i].distance = data[i].distance
                        ? data[i].distance + "km"
                        : "";
                }

                if (!status) {
                    this.shopListInfo["shopList"] = data;
                    this.shopInfoShow = true;
                } else {
                    this.shopListInfo["shopList"] = [
                        ...this.shopListInfo["shopList"],
                        ...data
                    ];
                    this.shopInfoShow = true;
                }
                if (
                    res.total == 0 ||
                    res.total == this.shopListInfo["shopList"].length ||
                    res["list"].length === 0 ||
                    res["list"].length < this.requestInfo.pagesize
                ) {
                    this.finished = true;
                } else {
                    this.requestInfo.page++;
                    this.finished = false;
                }
                if (this.shopListInfo["shopList"].length == 0) {
                    this.shopInfoShow = false;
                }

                if (popListStatus && shopListInfo) {
                    this.shopListInfo = shopListInfo;
                    this.popShow = popListStatus;
                }
            });
        },
        /**
         * @Description: 列表门店跳转详情
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-26 11:36:28
         */

        listClickHandle(item) {
            this.$session.set("popShowstatus", true);
            this.$session.set("requestInfo", this.requestInfo);
            this.$session.set("requestInfo", {
                ...this.requestInfo,
                scene_id: "xh",
                city_id: this.shopListInfo["currentCityInfo"]["id"],
                area_id: this.shopListInfo["currentAreaInfo"]["id"],
                lng: this.initialPosition[0],
                lat: this.initialPosition[1],
                sort: this.shopListInfo["currentTypeInfo"]["value"]
            });
            // this.$session.set("shopListInfo", this.shopListInfo);
            this.$router.push({
                path: "/orginfo",
                query: {
                    map_depart_id: item["map_depart_id"],
                    distanceDesc: item["distance"],
                    lng: this.initialPosition[0],
                    lat: this.initialPosition[1]
                }
            });
        },
        /**
         * @Description:弹出门店列表
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-26 17:29:56
         */
        shopListsHandle() {
            this.popShow = true;
        },

        /**
         * @Description: 门店列表页初始化
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-29 17:35:06
         */
        shopListsInitHandle(positionAdressInfo) {
            orgApi
                .getOrgCondition({ region_code: positionAdressInfo["adcode"] })
                .then(res => {
                    if (res.code == 20000) {
                        let { city_list, area_list, type } = res.data;
                        this.shopListInfo["cityList"] = city_list; //城市筛选数据
                        this.shopListInfo["areaList"] = area_list; //区域筛选数据
                        this.shopListInfo["type"] = type; //排序数据
                        this.shopListInfo["currentTypeInfo"] = type[0]; //默认距离优先

                        city_list.map(item => {
                            if (item["name"] == positionAdressInfo["city"]) {
                                this.shopListInfo["currentCityInfo"] = item;
                            }
                        });

                        area_list.map(item => {
                            if (
                                item["name"] == positionAdressInfo["district"]
                            ) {
                                this.shopListInfo["currentAreaInfo"] = item;
                            }
                        });

                        // 获取列表数据
                        this.shopListPublic();
                    }
                });
        },
        /**
         * @Description: 地图门店跳转详情
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-27 17:17:08
         */

        toOrginfo(item) {
            this.$router.push({
                path: "/orginfo",
                query: {
                    map_depart_id: item["map_depart_id"],
                    distanceDesc: item["distanceDesc"],
                    lng: this.initialPosition[0],
                    lat: this.initialPosition[1]
                }
            });
        },
        /**
         * @Description: 监听变化函数
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-28 15:17:15
         */

        watchHandle() {
            this.$watch("visible", () => {
                this.btnIconName = this.visible ? "arrow-up" : "arrow-down";
            });

            this.$watch("searchHistory", () => {
                this.$session.set("searchHistory", this.searchHistory);
            });

            this.$watch(
                "shopListInfo",
                () => {
                    this.$session.set("shopListInfo", this.shopListInfo);
                },
                { deep: true }
            );
            this.$watch("requestInfo", () => {
                this.$session.set("requestInfo", this.requestInfo);
            });
            this.$once("hook:beforeDestroy", () => {
                this.$off();
            });
        },
        /**
         * @Description: 下拉刷新
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-29 18:21:02
         */

        onRefresh() {
            setTimeout(() => {
                this.refresh = false;
                this.shopListInfo["shopList"] = [];
                this.requestInfo.page = 1;
                this.requestInfo.sort = this.shopListInfo["currentTypeInfo"][
                    "value"
                ];
                this.shopListPublic(false);
            }, 1000);
        },
        /**
         * @Description: 地图缩放工具条控制
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-30 14:36:24
         */
        scaleOrgMap(orgMapName) {
            switch (orgMapName) {
                case "orgMap_locat":
                    this.jnsGeolocation.getCurrentPosition();
                    this.orgMapLocatLoading = true;
                    break;
                case "orgMap_add":
                    this.jnsMap.zoomIn();
                    break;
                case "orgMap_subtract":
                    this.jnsMap.zoomOut();
                    break;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    /deep/ .van-collapse {
        display: flex;
        background-color: #fff;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 1;
        & > :last-child {
            position: absolute;
            right: 0px;
        }
        .van-collapse-item {
            .van-collapse-item__wrapper {
                max-height: calc(100vh - 45px);
                overflow-y: scroll;
                position: fixed;
                width: 100%;
                left: 0;
                right: 0;
                [class*="van-hairline"]::after {
                    border: 0 none;
                }
                .van-collapse-item__content {
                    padding: 0px;
                    height: calc(100vh - 45px);
                    background: transparent;
                    .van-cell-group {
                        background: transparent;
                    }
                }
            }
        }
    }

    .fixed-top {
        height: 44px;
    }
    .panel-value-info {
        height: 100%;
        overflow-y: scroll;
    }
    .pop-main-container {
        height: calc(100vh - 44px);
        overflow: auto;
        .shop-list-container {
            padding: 10px;
            .shop-info-list {
                width: 100%;
                box-sizing: border-box;
                padding: 20px 15px;
                background-color: #fff;
                border-radius: 10px;
                margin: 10px 0;
                height: 120px;
                display: flex;
                & > :first-child {
                    flex: 0.3;
                    margin-right: 10px;
                    .map-shop-img {
                        display: block;
                        width: 80px;
                        height: 80px;
                    }
                }
                & > :last-child {
                    flex: 1.7;
                    display: flex;
                    flex-direction: column;
                    /*  .shop-info-list-item {
                        padding: 5px 0;
                    } */
                    & > :first-child {
                        width: 250px;
                        padding: 0 20px 5px 0;
                        .shop-info-item-title {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    & > :nth-child(2) {
                        padding: 10px 0 0 0;
                    }
                    & > :last-child {
                        color: #999;
                        display: flex;
                        padding: 10px 0 0 0;
                        .shop-adress {
                            // flex: 1;
                            width: 160px;
                            padding: 5px 0;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .shop-distance {
                            // width: 80px;
                            margin-left: 10px;
                            text-align: center;
                            padding: 5px 0px 5px 20px;
                        }
                    }
                }
            }
            & > :first-child {
                margin-top: 0;
            }
        }
    }
    .search-shop-info {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
        background: #fff;
        /deep/ .van-search__content {
            border-radius: 10px;
        }
        .no-search-rusult {
            .title-style {
                padding: 10px;
                text-align: center;
                color: #999;
            }
        }
        .search-history {
            .value-style {
                vertical-align: middle;
                color: #e14732;
                & > :first-child {
                    vertical-align: middle;
                    padding: 0 5px;
                    display: inline-block;
                    position: relative;
                    bottom: 1px;
                }
            }
            .search-history-list {
                padding: 20px;
                flex-wrap: wrap;
                .history-list-item {
                    background-color: #f2f2f2;
                    padding: 10px 15px;
                    border-radius: 30px;
                    box-sizing: border-box;
                    margin: 0 5px 5px 0;
                }
            }
        }
    }
    .main-container {
        padding: 0;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        #containerAMap {
            width: 100%;
            height: 100%;
            position: relative;
        }
        .search-org {
            width: 90%;
            padding: 10px;
            border-radius: 10px;
            position: absolute;
            top: 5px;
            left: 50%;
            z-index: 2;
            transform: translate(-50%, 22px);
        }
        .orgMap-public-style {
            width: 40px;
            height: 40px;
            position: absolute;
            right: 15px;
            top: 100px;
            z-index: 1;
            & > img {
                display: flex;
                width: 100%;
            }
        }
        .orgMap-locat {
            .orgMap-public-style;
            top: 100px;
            .orgMap-locat-loading {
                width: 35px;
                height: 35px;
                z-index: 2;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                color: rgb(77, 75, 75);
            }
        }
        .orgMap-add {
            .orgMap-public-style;
            top: 150px;
        }
        .orgMap-subtract {
            .orgMap-public-style;
            top: 200px;
        }
        /deep/ .van-search__content {
            border-radius: 10px;
        }
    }
    .map-shop-btn-info {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 4;
        /deep/ .van-icon {
            vertical-align: middle;
        }
        /deep/ .van-button::before {
            border-color: none;
        }
        .map-shop-info {
            padding: 20px 15px;
            background-color: #fff;
            display: flex;
            & > :first-child {
                flex: 0.3;
                margin-right: 10px;
                .map-shop-img {
                    display: block;
                    width: 80px;
                    height: 80px;
                }
            }
            & > :last-child {
                flex: 1.7;
                display: flex;
                flex-direction: column;
                .shop-info-left-item {
                    padding: 5px 0;
                }
                & > :first-child {
                    padding: 0 0 5px 0;
                    & > :first-child {
                        // font-weight: 600;
                    }
                }
                & > :last-child {
                    color: #999;
                    display: flex;
                    // padding: 8px 0 5px 0;
                    .shop-adress {
                        // flex: 1;
                        width: 190px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .shop-distance {
                        width: 80px;
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>
