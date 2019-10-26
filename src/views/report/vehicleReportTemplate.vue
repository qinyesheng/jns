<!--
 * @Description: 全车安检报告 渲染模板
 * @Author: wjx
 * @Date: 2019-07-26 15:01:05
 -->
<template>
    <div class="page">
        <div class="main-container">
            <!-- 广告，有链接的才可跳转 -->
            <div v-if="adList.C00002 && adList.C00002.length>0" class="bannerPic">
                <div>
                    <a
                        v-if="adList.C00002[setTimeoutVal[0]].ad_link"
                        :href="adList.C00002[setTimeoutVal[0]].ad_link"
                        target="_blank"
                        @click="addClickLog(adList.C00002[setTimeoutVal[0]],adList.C00002[0].loc_id)"
                    ></a>
                    <img class="bannerPicImg" :src="adList.C00002[setTimeoutVal[0]].pic" />
                </div>
            </div>
            <div class="articleTitle" v-if="report.shopName && report.reportTitle">
                <div>{{report.shopName}}</div>
                <div>{{report.reportTitle}}</div>
            </div>
            <div class="banner-base-info">
                <!-- 报告轮播图 -->
                <!-- <div v-if="baseInfo.pic && baseInfo.pic.length>0">
                    <reportBanner :baseInfoPic="baseInfo.pic" />
                </div>-->

                <!-- 报告基本信息 -->
                <reportBaseInfo :baseInfo="baseInfo" />
            </div>
            <div>
                <!-- 车况评分 -->
                <scoreCondition :scoreCondition="scoreCondition" />
            </div>
            <div>
                <!-- 报告诊断结果 -->
                <reportResultList :makeResult="makeResult" />
            </div>
            <div class="diagnosisItem">
                <h4>
                    <b>检测与诊断项目</b>
                </h4>
                <ul>
                    <li class="item" v-for="(item,index) in sysInfo" :key="index">
                        <div class="item-title">
                            <div class="left">
                                <div class="title-name">{{item.title}}</div>
                                <div class="title-state">
                                    <span
                                        v-if="(item.status=='0' || item.status=='2' || item.status=='3') &&item.faultNum > 0 "
                                        class="warning"
                                    >异常</span>
                                    <span v-else-if="item.status=='e'">未检测</span>
                                    <span v-else>正常</span>
                                </div>
                            </div>
                            <div
                                class="title-details"
                                :class="[item.more?'arrow-up':'arrow-down']"
                                @click="arrowClick(item,index)"
                            >
                                <span v-if="item.more">收起</span>
                                <span v-else>详情</span>
                            </div>
                        </div>
                        <div class="item-con" v-show="item.more">
                            <div class="entirety">
                                <van-row type="flex" gutter="10">
                                    <van-col span="6" class="name">整体情况</van-col>
                                    <van-col span="18" v-if="item.faultNum!==0">
                                        <tag
                                            color="#ff9047"
                                            class="in-block"
                                            plain
                                        >{{item.faultNum}}项故障</tag>
                                    </van-col>
                                </van-row>
                                <p v-if="item.status=='e'">未检测</p>
                                <p v-else>{{item.promptDesc}}</p>
                            </div>
                            <ul>
                                <!-- 等于未检测的不展示 -->
                                <li
                                    class="list"
                                    v-for="(items,indexs) in item.subSysInfo"
                                    :key="indexs"
                                    v-show="items.level!=='e'"
                                >
                                    <div>
                                        <div type="flex" class="row" gutter="10">
                                            <span span="7" class="list-name">{{items.itemName}}</span>
                                            <tag
                                                color="#F9BC2D"
                                                class="in-block"
                                                plain
                                                v-if="items.level=='0'"
                                            >轻微</tag>
                                            <tag
                                                color="#FF9F31"
                                                class="in-block"
                                                plain
                                                v-else-if="items.level=='2'"
                                            >中等</tag>
                                            <tag
                                                color="#fb3537"
                                                class="in-block"
                                                plain
                                                v-else-if="items.level=='3'"
                                            >严重</tag>
                                        </div>
                                        <van-row
                                            type="flex"
                                            class="row"
                                            gutter="10"
                                            v-if="items.level=='1'"
                                        >
                                            <van-col span="6">
                                                <tag color="#8ed5b4">检测结果</tag>
                                            </van-col>
                                            <van-col span="18">
                                                <span>正常</span>
                                            </van-col>
                                        </van-row>
                                        <van-row
                                            type="flex"
                                            class="row"
                                            gutter="10"
                                            v-else-if="items.detectionResult!==''"
                                        >
                                            <van-col span="7">
                                                <tag color="#8ed5b4">检测结果</tag>
                                            </van-col>
                                            <van-col span="17">
                                                <span class="detail">{{items.detectionResult}}</span>
                                            </van-col>
                                        </van-row>
                                        <!-- 如果为正常则不展示下面内容 -->
                                        <div class="detail" v-if="items.level!=='1'">
                                            <!-- 如果数据为空不展示 -->
                                            <van-row
                                                type="flex"
                                                class="row"
                                                gutter="10"
                                                v-if="items.riskForecast!==''"
                                            >
                                                <van-col span="7">
                                                    <tag color="#a1d6fa">AI诊断结果</tag>
                                                </van-col>
                                                <van-col span="17">{{items.riskForecast}}</van-col>
                                            </van-row>
                                            <!-- 如果数据为空不展示 -->
                                            <van-row
                                                type="flex"
                                                class="row"
                                                gutter="10"
                                                v-if="items.jnsExplanationList && items.jnsExplanationList.length>0"
                                            >
                                                <van-col span="7">
                                                    <tag color="#c7dcf5">JNS解读</tag>
                                                </van-col>
                                                <van-col span="17">
                                                    <span
                                                        v-for="(data,dindex) in items.jnsExplanationList"
                                                        :key="dindex"
                                                    >
                                                        <a :href="data.url">{{data.title}}</a>
                                                    </span>
                                                </van-col>
                                            </van-row>
                                        </div>
                                        <van-row v-if="items.imgList && items.imgList.length>0">
                                            <ul class="img-box">
                                                <li
                                                    v-for="(img,imgIndex) in items.imgList"
                                                    :key="imgIndex"
                                                    v-lazy="img"
                                                    @click="enlargeImage(items.imgList, imgIndex)"
                                                >
                                                    <img :src="img" />
                                                </li>
                                            </ul>
                                        </van-row>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="adList.C00005 && adList.C00005.length>0" class="bannerPic">
                <div>
                    <a
                        v-if="adList.C00005[setTimeoutVal[1]].ad_link"
                        :href="adList.C00005[setTimeoutVal[1]].ad_link"
                        target="_blank"
                        @click="addClickLog(adList.C00005[setTimeoutVal[1],adList.C00005[0].loc_id])"
                    ></a>
                    <img class="bannerPicImg" :src="adList.C00005[setTimeoutVal[1]].pic" />
                </div>
            </div>
            <div v-if="maintainSchemes">
                <!-- 维修方式 -->
                <reportMaintainScheme
                    :maintainScheme="maintainSchemes"
                    :selectBtnName="selectBtnName"
                    @selectMaintainScheme="selectMaintainScheme"
                    :showStates="false"
                    v-if="report.maintenance"
                />
            </div>
            <div class="explain" :class="report.maintenance.length>0?'move':''">
                <div>声明</div>
                <div>1、本报告内容最终解释权归：{{report.shopName}}所有</div>
                <div>2、报告展示效果由JNS提供</div>
            </div>
            <div
                v-if="adList.C00006 && adList.C00006.length>0 "
                class="bannerPic"
                style="padding-top:15px;margin-bottom:0px;"
            >
                <div>
                    <a
                        v-if="adList.C00006[setTimeoutVal[2]].ad_link"
                        :href="adList.C00006[setTimeoutVal[2]].ad_link"
                        target="_blank"
                        @click="addClickLog(adList.C00006[setTimeoutVal[2],adList.C00006[0].loc_id])"
                    ></a>
                    <img class="bannerPicImg" :src="adList.C00006[setTimeoutVal[2]].pic" />
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
import reportBanner from "@/components/report/reportBanner";
import reportBaseInfo from "@/components/report/underlineRule/reportBaseInfo";
import scoreCondition from "@/components/report/scoreCondition";
import reportResultList from "@/components/report/reportResultList";
import reportMaintainScheme from "@/components/report/underlineRule/reportMaintainScheme";
import reportApi from "@/api/common/report";
import { Tag } from "vant";
import { ImagePreview, Swipe, SwipeItem } from "vant";

export default {
    props: {
        report: {
            type: Object
        },
        // 报告基本信息
        baseInfo: {
            type: Object
        },
        // 车辆检查大系统数据
        sysInfo: {
            type: Array,
            default: function() {
                return [];
            }
        },
        // 车况评分
        scoreCondition: {
            type: Object
        },
        // 报告诊断结果
        makeResult: {
            type: String
        },
        // 维修方式
        maintainScheme: {
            type: Object
        },
        state: {
            type: Boolean
        },
        // 维修方案
        selectBtnName: {
            type: Array,
            default: function() {
                return [];
            }
        },
        // 广告列表
        adList: {
            type: Object
        },
        // 广告数据
        adData: {
            type: Object
        }
    },
    data() {
        return {
            // selectBtnName: [], // 维修方案
            //大系统名称
            codeList: {
                bodywk: "外观内饰",
                light: "灯光系统",
                elect: "车载电脑",
                supply: "供电系统", //该系统由前端拆分
                driver: "传动系统",
                cold: "空调系统",
                engine: "发动机系统",
                chas: "底盘系统",
                brake: "制动系统"
            },
            bannerPic: [
                require("@image/reportPic1.png"),
                require("@image/reportPic2.png"),
                require("@image/reportPic3.png")
            ],
            maintainSchemeLength: "",
            maintainSchemes: this.maintainScheme,
            setTimeoutVal: []
        };
    },
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        reportBanner,
        reportBaseInfo,
        scoreCondition,
        reportResultList,
        reportMaintainScheme,
        Tag
    },
    created() {
        console.log("adList:", this.adList);
        var arr = Object.keys(this.adList);
        for (var i = 0; i < arr.length; i++) {
            var num = 0;
            this.setTimeoutVal.push(num); // 根据广告位置的数量，初始化一个数，用来变化图片
        }
    },
    mounted() {
        var arr = Object.keys(this.adList);
        if (this.adList && arr.length > 0) {
            this.setTimeoutFun1();
            this.setTimeoutFun2();
            this.setTimeoutFun3();
        }
    },
    methods: {
        /**
         * @Description: 箭头点击函数
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-27 18:14:50
         */
        arrowClick(item, index) {
            item.more = !item.more;
            this.$set(this.sysInfo, index, item);
        },
        /**
         * @Description:  选择维修方案
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-30 20:35:45
         */
        selectMaintainScheme(index) {
            // this.activeIndex = index;
            let num = this.report.maintenance.length;
            this.maintainSchemeLength = num;
            if (num - 1 >= index) {
                this.maintainSchemes = this.report.maintenance[index];
            }
        },
        /**
         * @Description: 放大缩略图
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-31 16:02:14
         */
        enlargeImage(imgArray, index) {
            ImagePreview({
                images: imgArray,
                loop: false,
                startPosition: index,
                lazyLoad: true,
                showIndicators: true
            });
        },
        //切换图片
        setTimeoutFun1() {
            setTimeout(() => {
                if (this.setTimeoutVal[0] != this.adList.C00002.length - 1) {
                    this.$set(this.setTimeoutVal, 0, this.setTimeoutVal[0] + 1);
                } else {
                    this.$set(this.setTimeoutVal, 0, 0);
                }
                this.setTimeoutFun1();
            }, 2000);
        },
        setTimeoutFun2() {
            setTimeout(() => {
                if (this.setTimeoutVal[1] != this.adList.C00005.length - 1) {
                    this.$set(this.setTimeoutVal, 1, this.setTimeoutVal[1] + 1);
                } else {
                    this.$set(this.setTimeoutVal, 1, 0);
                }
                this.setTimeoutFun2();
            }, 2000);
        },
        setTimeoutFun3() {
            setTimeout(() => {
                if (this.setTimeoutVal[2] != this.adList.C00006.length - 1) {
                    this.$set(this.setTimeoutVal, 2, this.setTimeoutVal[2] + 1);
                } else {
                    this.$set(this.setTimeoutVal, 2, 0);
                }
                this.setTimeoutFun3();
            }, 2000);
        },
        /**
         * @Description: 记录广告点击事件
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-13 18:17:40
         */
        addClickLog(item, loc_id) {
            let params = {
                ad_id: item.loc_id,
                ad_position_id: loc_id,
                report_id: this.adData.code
            };
            reportApi.addClickLog(params).then(res => {
                if (res.code == 20000) {
                    console.log("添加广告点击成");
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        }
    },
    watch: {
        adList: {
            deep: true,
            handler: function(newV, oldV) {
                // this.adList = newV;
                console.log("watch中：", newV, "oldV：", oldV);
            }
        }
    }
};
</script>
<style lang="less" scoped>
.bannerPic {
    // margin-top: 10px;
    position: relative;
    margin-bottom: 10px;
    .bannerPicImg {
        width: 100%;
    }
    a {
        width: 100%;
        height: 100%;
        z-index: 1;
        position: absolute;
    }
}

.articleTitle {
    text-align: center;
    div {
        padding-bottom: 10px;
        // letter-spacing: 2px;
    }
    div:nth-child(2) {
        font-weight: bold;
        font-size: 24px;
        letter-spacing: 4px;
    }
}
.diagnosisItem {
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 15px;
    h4 {
        padding: 10px 0 0 0px;
        margin-bottom: 10px;
        b {
            font-weight: bold;
            font-size: 20px;
        }
    }
    .item {
        padding-top: 10px;
        border-top: 1px solid #efefef;
        .item-title {
            display: flex;
            justify-content: space-between;
            .left div {
                // padding: 5px 0;
                padding-bottom: 10px;
            }
            .title-name {
                font-weight: bold;
                font-size: 18px;
            }
            .title-state {
                color: #999999;
                .warning {
                    color: #edbf54;
                }
            }
            .title-details {
                display: flex;
                align-items: center;
                padding-right: 10px;
                color: #999999;
            }
            .arrow-up::after {
                display: inline-block;
                content: " ";
                border-left: 6px solid transparent;
                // border-top: 10px solid transparent;
                border-right: 6px solid transparent;
                border-bottom: 10px solid #000;
                position: relative;
                right: -10px;
            }
            .arrow-down::after {
                display: inline-block;
                content: " ";
                border-left: 6px solid transparent;
                border-top: 10px solid #000;
                border-right: 6px solid transparent;
                border-bottom: 10px solid transparent;
                position: relative;
                top: 10px;
                right: -10px;
            }
        }
        .item-con {
            color: #666;
            .in-block {
                display: inline-block;
            }
            .entirety {
                padding-top: 10px;
                border-bottom: 1px solid #efefef;
                padding-bottom: 10px;
                .name {
                    font-weight: bold;
                }
                p {
                    padding-top: 10px;
                }
            }
            .list {
                padding-top: 10px;
                .img-box {
                    display: flex;
                    flex-wrap: wrap;
                    li {
                        width: 60px;
                        height: 60px;
                        margin-right: 10px;
                        margin-bottom: 10px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .list-name {
                    font-weight: bold;
                    padding-right: 10px;
                }
                .detail {
                    line-height: 20px;
                    font-size: 14px;
                    a {
                        color: #54b4f7;
                        border-bottom: 1px solid #54b4f7;
                    }
                }
                .row {
                    padding-bottom: 10px;
                    .detec {
                        background-color: #8ed5b4;
                    }
                }
            }
        }
    }
}
.explain {
    background-color: #fff;
    padding: 10px 15px 10px 15px;
    color: #999999;
    border-radius: 5px;
    div {
        line-height: 20px;
        padding-bottom: 10px;
    }
    div:nth-child(1) {
        font-size: 18px;
        font-weight: bold;
        color: #595959;
    }
}
.move {
    margin-top: -20px;
    padding: 0px 15px 10px 15px;
}
// 重写样式
.van-tag {
    padding: 2px 0.5em;
    display: block;
    text-align: center;
    font-size: 14px;
}
</style>

