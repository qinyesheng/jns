<!--
 * @Description: 站点详情
 * @Author: wjx
 * @Date: 2019-09-09 18:54:31
 -->

<template>
    <div class="page orgInfo">
        <background />

        <div v-if="orgBanner && orgBanner.length>0">
            <van-swipe :autoplay="3000" class="org-banner">
                <van-swipe-item
                    v-for="(image, index) in orgBanner"
                    :key="index"
                    class="org-banner-item"
                    @click="enlargeImage(orgBanner,index)"
                >
                    <img v-lazy="image" :height="imgHeight" style="width:100%;" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div v-else class="defaultImg">
            <img :src="defaultImg" />
        </div>
        <div class="box site">
            <div class="phone" v-if="data.depart_tel">
                <a :href="'tel:'+data.depart_tel">
                    <!-- <van-icon name="phone" dot /> -->
                    <img :src="phoneIcon" />
                </a>
            </div>
            <van-row class="title row">
                <van-col :span="20">{{data.depart_name}}</van-col>
            </van-row>
            <van-row class="row score">
                <van-col>
                    <van-rate v-model="data.star" allow-half readonly void-icon="star" />
                </van-col>
                <span class="certification" v-if="data.is_certification==1">JNS技术认证</span>
            </van-row>
            <a
                target="_blank"
                :href="'https://m.amap.com/navi/?start='+start+'&destName='+data.address+'&dest='+dest+'&key='+mapKey"
            >
                <van-row class="row location">
                    <van-col :span="12">{{data.address}}</van-col>
                    <van-col class="text_right" :span="12">
                        <img :src="location" />
                        {{km}}
                    </van-col>
                </van-row>
            </a>
        </div>
        <div class="box jns" v-if="data.major && data.major.length>0">
            <van-row class="title row">
                <van-col>JNS技术认证</van-col>
            </van-row>
            <van-row class="row" style="padding-bottom:0">
                <van-col>
                    <van-tag
                        color="#F2F2F2"
                        size="large"
                        text-color="#000"
                        class="tag-style"
                        round
                        v-for="(item,key) in data.major"
                        :key="key"
                    >{{item}}</van-tag>
                </van-col>
            </van-row>
        </div>
        <div class="manage-info" v-if="isShowManageInfo">
            <van-cell title="主营信息" title-class="title" />
            <div class="manage-info-container">
                <van-row
                    class="feature-prohect"
                    v-if="data.org_services&&data.org_services.length>0"
                >
                    <van-cell class="subtitle" title="特色项目" />
                    <van-tag
                        color="#F2F2F2"
                        size="large"
                        text-color="#000"
                        class="tag-style"
                        round
                        v-for="(item,key) in data.org_services"
                        :key="key"
                    >{{item}}</van-tag>
                </van-row>
                <van-row
                    class="manage-prohect"
                    v-if="data.org_tag_main&&data.org_tag_main.length>0"
                >
                    <van-cell class="subtitle" title="主营项目" />
                    <van-tag
                        color="#F2F2F2"
                        size="large"
                        text-color="#000"
                        class="tag-style"
                        round
                        v-for="(item,key) in data.org_tag_main"
                        :key="key"
                    >{{item}}</van-tag>
                </van-row>
                <van-row class="series" v-if="data.main_car_brand&&data.main_car_brand.length>0">
                    <van-row class="row subtitle" style="margin-bottom:0;">
                        <van-col>主营车系</van-col>
                    </van-row>
                    <van-row class="text-center">
                        <van-col
                            :span="6"
                            v-for="(item,index) in data.main_car_brand"
                            :key="index"
                            class="row"
                        >
                            <div class="img_box">
                                <img v-lazy="item.icon" />
                            </div>
                            <div>{{item.name}}</div>
                        </van-col>
                    </van-row>
                </van-row>
            </div>
        </div>
        <pubButton
            title="预约服务"
            :isFixed="true"
            @buttonConfirm="apply()"
            :background="'#e14732'"
            v-if="isOnline"
        ></pubButton>
    </div>
</template>
<script>
import { Swipe, SwipeItem, Tag, Rate, Icon, ImagePreview } from "vant";
import orgApi from "@/api/xhjcOwner/org";
import pubButton from "@/components/public/pubButton";
import { bannerHeightHandle, getCarBrandIconSrc } from "@/utils/common";
import background from "@/components/background/background";
export default {
    data() {
        return {
            phoneIcon: require("@image/phone_icon.png"),
            imgHeight: bannerHeightHandle(),
            data: {},
            orgBanner: [],
            defaultImg: require("@/pages/xhDetection/assets/image/jnsDeafultBanner.jpg"),
            // chexi: [
            //     {
            //         name: "奥迪",
            //         img: require("@image/person.png")
            //     },
            //    ]
            location: require("@image/location.png"),
            mapDepartId: this.$route.query.map_depart_id,
            km: this.$route.query.distanceDesc,
            isShowManageInfo: false,
            isOnline: false, //是否支持在线预约,
            start: this.$route.query.lng + "," + this.$route.query.lat, // 当前坐标经纬度
            dest: "", // 目标终点的经纬度
            mapKey: process.env.VUE_APP_AMAP_KEY // 地图key
        };
    },
    components: {
        pubButton,
        background,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Tag.name]: Tag,
        [Rate.name]: Rate,
        [Icon.name]: Icon
    },
    created() {},
    mounted() {
        this.getOrgDetail();
        // console.log(getCarBrandIconSrc("ruf_ico"));
    },
    methods: {
        /**
         * @Description: 预约服务
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-26 09:15:13
         */
        apply() {
            this.$router.push({
                name: "bookingFinished"
            });
        },
        /**
         * @Description: 获取站点详情
         * @Param: map_depart_id
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-30 15:09:36
         */
        getOrgDetail() {
            // let this_ = this;
            orgApi
                .getOrgDetail({ map_depart_id: this.mapDepartId })
                .then(res => {
                    if (res.code == 20000) {
                        res.data["star"] = +res.data["star"];
                        this.data = res.data;
                        this.data.map_org_id = this.mapDepartId;
                        this.$session.set("orgInfo", this.data);
                        this.orgBanner = this.data.front_pic_list;
                        this.isOnline =
                            res.data["is_online"] && res.data["is_online"] == 1
                                ? true
                                : false;
                        this.dest = res.data.map_lng + "," + res.data.map_lat;
                        // if (!this.data || this.orgBanner.length === 0) {
                        //     let advImg = require("@/pages/xhDetection/assets/image/jnsDeafultBanner.jpg");
                        //     this.orgBanner = [advImg];
                        // }
                        if (
                            res.data["main_car_brand"] &&
                            res.data["main_car_brand"].length > 0
                        ) {
                            res.data["main_car_brand"].map(item => {
                                item["icon"] = getCarBrandIconSrc(item["icon"]);
                            });
                        }
                        if (
                            (res.data.org_services &&
                                res.data.org_services.length > 0) ||
                            (res.data.org_tag_main &&
                                res.data.org_tag_main.length > 0) ||
                            (res.data.main_car_brand &&
                                res.data.main_car_brand.length > 0)
                        ) {
                            this.isShowManageInfo = true;
                        }
                    } else {
                        this.$toast(res.msg);
                    }
                });
        },
        /**
         * @Description: 导航
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-08 14:14:36
         */
        navigation() {
            debugger;
            let map = new AMap.Map("mapContainer", {
                zoom: 18,
                center: [116.473188, 39.993253]
            });
            let marker = new AMap.Marker({
                map: map,
                position: [116.473188, 39.993253]
            });
        },
        /**
         * @Description: 放大图片
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-08 15:13:17
         */
        enlargeImage(imgArray, index) {
            ImagePreview({
                images: imgArray,
                loop: false,
                startPosition: index,
                lazyLoad: true,
                showIndicators: true
            });
        }
    }
};
</script>
<style lang="less" scoped>
.orgInfo {
    .box {
        background-color: #fff;
        margin-bottom: 15px;
        color: #666;
        padding: 10px 15px 0px 15px;
        .title {
            font-size: 18px;
            color: #595959;
            .van-col {
                font-weight: bold;
            }
        }
        .row {
            padding-bottom: 10px;
        }
    }
    .manage-info {
        .manage-info-container {
            padding: 0 15px 15px 15px;
            background-color: #fff;
            .publc-style {
                margin-bottom: 15px;
                border-bottom: 1px solid #f2f2f2;
                /deep/ .van-cell {
                    padding: 0;
                }
            }
            .manage-prohect {
                .publc-style;
            }
            .feature-prohect {
                .publc-style;
            }
        }
        .title {
            & > :first-child {
                font-weight: bold;
                font-size: 18px;
            }
        }
        /deep/ .van-cell:not(:last-child)::after {
            border: 0;
        }
    }
    .defaultImg {
        img {
            width: 100%;
        }
    }
    .site {
        position: relative;
        .phone {
            color: #fff;
            // background: #46aef7;
            position: absolute;
            right: 10px;
            // font-size: 30px;
            // padding: 12px 13px;
            top: -29px;
            // border-radius: 50%;
            a {
                color: #fff;
            }
            img {
                width: 55px;
            }
        }

        .score {
            display: flex;
            align-items: center;
        }
        .certification {
            background: #46aef7;
            color: #ffffff;
            font-size: 0.32rem;
            padding: 3px 10px;
            padding-bottom: 4px;
            border-radius: 10px;
            margin-left: 25px;
        }

        .location {
            display: flex;
            align-items: center;
            .text_right {
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
            img {
                width: 16px;
                padding-right: 5px;
            }
        }
    }
    .series {
        .img_box {
            width: 40px;
            height: 40px;
            margin-bottom: 10px;
            margin: 10px auto;
            img {
                width: 100%;
            }
        }
    }
    .jns {
        .certification {
            background: #eee;
            color: #666;
            font-size: 0.32rem;
            padding: 1px 10px;
            padding-bottom: 2px;
            border-radius: 10px;
        }
    }
    .text_right {
        text-align: right;
    }
    .text-center {
        text-align: center;
    }
    /deep/ .van-swipe__indicator {
        width: 10px;
        height: 10px;
    }
    /deep/ .van-swipe__indicator--active {
        background-color: #e14732;
    }
    a {
        color: #666;
    }
    .subtitle {
        font-size: 16px;
        margin-bottom: 10px;
    }
    .tag-style {
        margin: 0 10px 10px 0;
    }
}
</style>
