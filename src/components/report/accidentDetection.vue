<!--
 * @Description: 事故车项目检测模块
 * @Author: xwq
 * @Date: 2019-06-25 09:39:02
 -->
<template>
    <div class="page margin-bottom" v-if="accidentListStatus">
        <div class="main-container color-border">
            <!-- <h1 class="container-title">事故车项目检测</h1> -->
            <div class="great-accident accident" v-if="greatAccident.emptyStatus">
                <h3>{{greatAccident.name}}</h3>
                <p class="noAbnorma" v-if="greatAccident.noDectionStatus">未发现异常项目</p>
                <van-cell-group>
                    <div v-for="(item,key) in greatAccident.greatAccidentInfo" :key="key">
                        <van-cell
                            :title="item.name"
                            :value="item.detection_result"
                            :value-class="[(item.level==0 || item.level==2 || item.level==3)?'abnormal-active':item.level==1?'normal-active':'']"
                        />
                        <div class="image-info">
                            <img
                                v-for="(image, index) in item.img_list"
                                :key="index"
                                v-lazy="image"
                                width="100%"
                                @click="enlargeImage(item.img_list, index)"
                            />
                        </div>
                    </div>
                </van-cell-group>
                <p class="aroow-bottom" @click="arrowClick('greatAccident')">
                    <span
                        :class="[greatAccident.greatArrowStatus?'arrow-up':'arrow-down']"
                    >{{greatAccident.arrowTitle}}</span>
                </p>
            </div>
            <div class="bubble-accident accident" v-if="bubbleAccident.emptyStatus">
                <h3>{{bubbleAccident.name}}</h3>
                <p class="noAbnorma" v-if="bubbleAccident.noDectionStatus">未发现异常项目</p>
                <van-cell-group>
                    <div v-for="(item,key) in bubbleAccident.bubbleAccidentInfo" :key="key">
                        <van-cell
                            :title="item.name"
                            :value="item.detection_result"
                            :value-class="[(item.level==0 || item.level==2 || item.level==3)?'abnormal-active':item.level==1?'normal-active':'']"
                        />
                        <div class="image-info">
                            <img
                                v-for="(image, index) in item.img_list"
                                :key="index"
                                v-lazy="image"
                                width="100%"
                                @click="enlargeImage(item.img_list, index)"
                            />
                        </div>
                    </div>
                </van-cell-group>
                <p class="aroow-bottom" @click="arrowClick('bubbleAccident')">
                    <span
                        :class="[bubbleAccident.bubbleArrowStatus?'arrow-up':'arrow-down']"
                    >{{bubbleAccident.arrowTitle}}</span>
                </p>
            </div>
            <div class="burn-accident accident" v-if="burnAccident.emptyStatus">
                <h3>{{burnAccident.name}}</h3>
                <p class="noAbnorma" v-if="burnAccident.noDectionStatus">未发现异常项目</p>
                <van-cell-group>
                    <div v-for="(item,key) in burnAccident.burnAccidentInfo" :key="key">
                        <van-cell
                            :title="item.name"
                            :value="item.detection_result"
                            :value-class="[(item.level==0 || item.level==2 || item.level==3)?'abnormal-active':item.level==1?'normal-active':'']"
                        />
                        <div class="image-info">
                            <img
                                v-for="(image, index) in item.img_list"
                                :key="index"
                                v-lazy="image"
                                width="100%"
                                @click="enlargeImage(item.img_list, index)"
                            />
                        </div>
                    </div>
                </van-cell-group>
                <p class="aroow-bottom" @click="arrowClick('burnAccident')">
                    <span
                        :class="[burnAccident.burnArrowStatus?'arrow-up':'arrow-down']"
                    >{{burnAccident.arrowTitle}}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import { ImagePreview } from "vant";
import { copyObject } from "@/utils/common";
export default {
    props: {
        accidentDetectionInfo: {
            type: Object,
            default: {}
        }
    },
    components: {},
    data() {
        return {
            greatAccident: {
                greatAccidentInfo: [], //渲染内容
                normalInfo: [], //正常内容
                noDection: [], //未检测内容
                // greatImpactInfo: {}, //存放重大事故的数据
                greatArrowStatus: false,
                noDectionStatus: false,
                copyInfo: [], //备份故障信息
                arrowTitle: "点击查看完整项目",
                name: "",
                emptyStatus: false
            },
            bubbleAccident: {
                bubbleAccidentInfo: [], //渲染内容
                normalInfo: [], //正常内容
                noDection: [], //未检测内容
                // bubbleCarInfo: {}, //存放水泡车的数据
                bubbleArrowStatus: false,
                noDectionStatus: false,
                copyInfo: [], //备份故障信息
                arrowTitle: "点击查看完整项目",
                name: "",
                emptyStatus: false
            },
            burnAccident: {
                burnAccidentInfo: [], //渲染内容
                normalInfo: [], //正常内容
                noDection: [], //未检测内容
                // burnCarInfo: {}, //存放火烧车的数据
                burnArrowStatus: false,
                noDectionStatus: false,
                copyInfo: [], //备份故障信息
                arrowTitle: "点击查看完整项目",
                name: "",
                emptyStatus: false
            },
            accidentList: ["greatAccident", "bubbleAccident", "burnAccident"],
            listName: ["greatImpact", "bubbleCar", "burnCar"],
            accidentListStatus: true
        };
    },
    created() {
        this.accidentFormateInfo(this.accidentDetectionInfo);
        this.init(this.accidentList, this.accidentDetectionInfo);
        window.console.log(this.accidentDetectionInfo);
    },
    mounted() {},
    methods: {
        //初始化
        init(list, reportInfo) {
            let num = 0;
            for (let k in list) {
                this[list[k]][list[k] + "Info"].length > 0
                    ? (this[list[k]].noDectionStatus = false)
                    : (this[list[k]].noDectionStatus = true);
            }

            let dataList = reportInfo.system_list;
            let result = dataList.filter((item, ley) => {
                return (
                    item.code == "greatImpact" ||
                    item.code == "bubbleCar" ||
                    item.code == "burnCar"
                );
            });

            num = result.length == "0" ? 3 : 0;
            this.accidentListStatus = num == 3 ? false : true;
            if (num == 3) {
                return;
            }

            for (let k in reportInfo.system_list) {
                if (
                    (reportInfo.system_list[k].code == "greatImpact" &&
                        !reportInfo.system_list[k].status) ||
                    (reportInfo.system_list[k].code == "bubbleCar" &&
                        !reportInfo.system_list[k].status) ||
                    (reportInfo.system_list[k].code == "burnCar" &&
                        !reportInfo.system_list[k].status)
                ) {
                    num++;
                }
            }
            this.accidentListStatus = num == 3 ? false : true;
        },
        /**
         * @Description: 数据处理初始化
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-05 09:39:23
         */
        accidentFormateInfo(reportInfo) {
            let systemList = reportInfo.system_list; //大系统内容
            let subsystemList = reportInfo.subsystem_list; //子系统内容

            for (let item in systemList) {
                switch (systemList[item].code) {
                    case "greatImpact":
                        this.greatAccident.emptyStatus = !systemList[item]
                            .status
                            ? false
                            : true;
                        this.greatAccident.name = systemList[item].name;
                        this.accidenetNoNormalFormate(
                            this.filtration(subsystemList, "greatImpact"),
                            "greatAccident"
                        );
                        //备份故障信息
                        this.greatAccident.copyInfo = copyObject(
                            this.greatAccident.greatAccidentInfo
                        );
                        break;
                    case "bubbleCar":
                        this.bubbleAccident.emptyStatus = !systemList[item]
                            .status
                            ? false
                            : true;
                        this.bubbleAccident.name = systemList[item].name;
                        this.accidenetNoNormalFormate(
                            this.filtration(subsystemList, "bubbleCar"),
                            "bubbleAccident"
                        );
                        //备份故障信息
                        this.bubbleAccident.copyInfo = copyObject(
                            this.bubbleAccident.bubbleAccidentInfo
                        );
                        break;
                    case "burnCar":
                        this.burnAccident.emptyStatus = !systemList[item].status
                            ? false
                            : true;
                        this.burnAccident.name = systemList[item].name;
                        this.accidenetNoNormalFormate(
                            this.filtration(subsystemList, "burnCar"),
                            "burnAccident"
                        );
                        //备份故障信息
                        this.burnAccident.copyInfo = copyObject(
                            this.burnAccident.burnAccidentInfo
                        );
                        break;
                    default:
                        break;
                }
            }
        },

        //过滤出重大事故的子系统数据
        filtration(list, systemListName) {
            // console.log(list, systemListName);
            let result = [];
            for (let k in list) {
                if (list[k].system_code == systemListName) {
                    result.push(list[k]);
                }
            }
            return result;
        },

        /**
         * @Description: 重大事故项——分类处理
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-04 10:17:03
         */
        accidenetNoNormalFormate(subsystemList, accidentName) {
            if (subsystemList.length <= 0) {
                return false;
            }
            for (let k in subsystemList) {
                let level = subsystemList[k].level;
                switch (level) {
                    case "0":
                    case "2":
                    case "3":
                        this[accidentName][accidentName + "Info"].push(
                            subsystemList[k]
                        );
                        break;
                    case "1":
                        subsystemList[k].detection_result = "正常";
                        this[accidentName].normalInfo.push(subsystemList[k]);
                        break;
                    case "e":
                        subsystemList[k].detection_result = "未检测";
                        this[accidentName].noDection.push(subsystemList[k]);
                        break;
                }
            }
        },

        /**
         * @Description: 正常项和未检测项 查看完整内容
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-25 14:16:34
         */
        arrowClick(accidentName) {
            switch (accidentName) {
                case "greatAccident":
                    this.accidentInfoFormate(accidentName, "greatArrowStatus");
                    break;
                case "bubbleAccident":
                    this.accidentInfoFormate(accidentName, "bubbleArrowStatus");
                    break;
                case "burnAccident":
                    this.accidentInfoFormate(accidentName, "burnArrowStatus");
                    break;
                default:
                    return;
                    break;
            }
        },
        /**
         * @Description: 正常项和未检测项 查看完整内容
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-25 14:09:31
         */
        accidentInfoFormate(accidentName, ArrowStatus) {
            this[accidentName][ArrowStatus] = !this[accidentName][ArrowStatus];
            if (this[accidentName][ArrowStatus]) {
                this[accidentName].arrowTitle = "收起非异常项目";
                this[accidentName][accidentName + "Info"] = [
                    ...this[accidentName][accidentName + "Info"],
                    ...this[accidentName].normalInfo,
                    ...this[accidentName].noDection
                ];
            } else {
                this[accidentName].arrowTitle = "点击查看完整项目";
                this[accidentName][accidentName + "Info"] = this[
                    accidentName
                ].copyInfo;
            }
        },
        /**
         * @Description: 点击图片查看预览
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-25 15:00:32
         */
        enlargeImage(imgArray, index) {
            ImagePreview({
                images: imgArray,
                loop: false,
                startPosition: index,
                lazyLoad: true,
                showIndicators: true //开启指示器
            });
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        .container-title {
            font-size: 20px;
            font-weight: bold;
            padding: 10px 0 15px 8px;
        }
        .accident {
            & h3 {
                font-size: 18px;
                font-weight: bold;
                padding: 5px 0 15px 8px;
            }
            & h5 {
                font-size: 16px;
                font-weight: bold;
                padding: 5px 0 15px 8px;
            }
            .aroow-bottom {
                padding: 10px;
                text-align: center;
                color: #c9c8c8;
                border-bottom: 1px solid #ccc;
                margin-bottom: 10px;
                .arrow-up::after {
                    display: inline-block;
                    content: " ";
                    border-left: 6px solid transparent;
                    border-top: 10px solid transparent;
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
            .image-info {
                padding: 5px 0 0 10px;
                & img {
                    display: inline-block;
                    width: 40px;
                    // padding: 2px;
                    border: 1px solid #ccc;
                    margin-right: 5px;
                    border-radius: 5px;
                }
            }
            .noAbnorma {
                padding: 10px;
                color: #b1aeae;
            }
            /deep/ [class*="van-hairline"]::after {
                border: 0 none;
            }
            /deep/ .van-cell__title {
                flex: 0.6;
                & span {
                    font-weight: bold;
                }
            }
        }
        .abnormal-active {
            color: #f09964;
        }
        .normal-active {
            color: #8ed5b4;
        }
    }
}
</style>
