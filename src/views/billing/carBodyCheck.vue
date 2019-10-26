<!--
 * @Description: 开单_车体检查
 * @Author: xwq
 * @Date: 2019-08-31 15:34:46
 * @LastEditTime: 2019-09-18 14:25:04
 -->
 
<template>
    <div class="page" v-if="isShow">
        <div class="main-container">
            <div class="car-body-check-top">
                <div class="car-body-check-info">
                    <van-cell
                        title="外观检查"
                        title-class="title-style-block"
                        value-class="value-style-block"
                    >
                        <template slot="default">
                            <van-button @click="btnHandle">全部正常</van-button>
                        </template>
                    </van-cell>
                </div>
                <div class="abnormal-pic-list" v-if="uploadStatus">
                    <van-cell
                        :title="uploadStatus?selectCircle['projectName']:''"
                        :value="checkProjectList[selectCircle.code]['projectVal']==0?'异常':'正常'"
                        :class="checkProjectList[selectCircle.code]['projectVal']==0?'abnormal-value-style':'normal-value-style'"
                    />
                    <div class="pic-upload">
                        <van-uploader
                            :after-read="afterRead"
                            :preview-image="false"
                            :before-read="beforeRead"
                            v-show="uploaderShow"
                        >
                            <div class="upload-btn">
                                <img src="@image/billing/upload.png" class="upload-pic" />
                            </div>
                        </van-uploader>

                        <ul class="pic-list">
                            <li class="pic-list-item" v-for="(item,key) in fileList" :key="key">
                                <img
                                    class="head-img"
                                    v-lazy="item"
                                    @click="imgPreview(fileList,key)"
                                />
                                <van-icon name="cross" size="16px" @click="crossPic(key)" />
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 车体图标 -->
                <div class="car-pic-check">
                    <img :src="picUrl" class="car-pic" @click.prevent />
                    <i
                        v-for="(item,k) in carIconList"
                        :key="k"
                        :class="[item.code,checkProjectList[item.code]['projectVal']==0?'circle-abnormal':checkProjectList[item.code]['projectVal']==1?'circle-normal':'circle-default']"
                        @click="circleHandle(item)"
                    ></i>
                </div>
            </div>
            <div class="car-body-check-bottom">
                <!-- 然机油信息 -->
                <van-cell :title="faultProjectInfo.fuleiolInfo['projectName']">
                    <template slot="default">
                        <van-switch
                            v-model="faultProjectInfo.machineChecked"
                            size="24px"
                            @change="machineChange"
                        />
                    </template>
                </van-cell>
                <van-cell-group v-show="faultProjectInfo.machineChecked">
                    <!-- 机油型号 -->
                    <van-cell :title="faultProjectInfo.fuleiolInfoItem['443']['projectName']">
                        <template slot="default">
                            <span
                                @click="oilTypeSelect"
                            >{{allFaultInfo['443']['projectVal']?allFaultInfo['443']['projectVal']:'请选择'}}</span>
                        </template>
                    </van-cell>
                    <!-- 机油损耗量 -->
                    <van-cell :title="faultProjectInfo.fuleiolInfoItem['444']['projectName']">
                        <template slot="default">
                            <div class="engineLose">
                                <input
                                    class="engine-lose-input"
                                    type="number"
                                    v-model="allFaultInfo['444']['projectVal']"
                                    placeholder="请输入"
                                />
                                <span :style="{color:'color: #323233'}">Km/L</span>
                            </div>
                        </template>
                    </van-cell>
                    <!-- 换油场地 -->
                    <van-cell :title="faultProjectInfo['fuleiolInfoItem']['57']['projectName']">
                        <template slot="default">
                            <span
                                @click="selectPlace"
                            >{{allFaultInfo['57']['projectVal']?allFaultInfo['57']['projectVal']:'请选择'}}</span>
                        </template>
                    </van-cell>
                    <!-- 驾驶路况 -->
                    <van-cell :title="faultProjectInfo.fuleiolInfoItem['67']['projectName']">
                        <template slot="default">
                            <div class="driving-info">
                                <van-radio-group v-model="allFaultInfo['67']['projectVal']">
                                    <van-radio
                                        v-for="(item,k) in faultProjectInfo.roadInfoList"
                                        :name="item.name"
                                        :key="k"
                                    >{{item.name}}</van-radio>
                                </van-radio-group>
                            </div>
                        </template>
                    </van-cell>
                </van-cell-group>
                <!-- 动力故障 -->
                <van-cell :title="faultProjectInfo['powerFaultInfo']['projectName']">
                    <template slot="default">
                        <van-switch
                            v-model="faultProjectInfo['powerFaultchecked']"
                            size="24px"
                            @change="powerFaultChange"
                        />
                    </template>
                </van-cell>
                <van-cell-group v-show="faultProjectInfo['powerFaultchecked']">
                    <van-cell
                        v-for="(item,k2) in faultProjectInfo['powerFaultInfoItem']"
                        :title="item.projectName"
                        :key="k2"
                    >
                        <template slot="default">
                            <div class="power-info">
                                <van-radio-group v-model="allFaultInfo[item.id]['projectVal']">
                                    <van-radio
                                        v-for="(item,k3) in faultProjectInfo['powerInfoList']"
                                        :name="item"
                                        :key="k3"
                                    >{{item}}</van-radio>
                                </van-radio-group>
                            </div>
                        </template>
                    </van-cell>
                </van-cell-group>
                <div class="postscript">
                    <van-cell title="备注信息"></van-cell>
                    <van-field
                        v-model="faultProjectInfo['remarkInfo']"
                        type="textarea"
                        placeholder="请输入备注信息"
                    />
                </div>
            </div>
        </div>
        <!-- 选机油型号 -->
        <rollListSelect
            :listInfo="faultProjectInfo['oilTypeListInfo']"
            :show="faultProjectInfo['oilTypeSelectStatus']"
            @confirm="oilTypeConfirm"
            @cancel="oilTypeCancel"
        />
        <!-- 选换油场地 -->
        <rollListSelect
            :listInfo="faultProjectInfo['selectPlaceInfo']"
            :show="faultProjectInfo['selectPlaceStatus']"
            @confirm="selectPlaceConfirm"
            @cancel="selectPlaceCancel"
        />
    </div>
</template>
<script>
import rollListSelect from "@/components/rollList/rollListSelect";
import {
    NoticeBar,
    Checkbox,
    CheckboxGroup,
    Uploader,
    ImagePreview,
    Switch,
    Field,
    RadioGroup,
    Radio
} from "vant";
import billApi from "@/api/bill/createNew";
import uploadImg from "@/utils/uploadImg";
import { getUrlParams } from "@/utils/common";
export default {
    components: {
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup,
        [Uploader.name]: Uploader,
        [NoticeBar.name]: NoticeBar,
        [Switch.name]: Switch,
        [Field.name]: Field,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        rollListSelect
    },
    data() {
        return {
            vin: "",
            isShow: false,
            picUrl: require("@image/billing/newCarLabel.png"),
            /* 车体Icon点 */
            carIconList: [],
            /* 车体部位检查 */
            checkProjectList: {
                bodywk_surfa_roof: {
                    projectVal: 3
                }, //车顶
                bodywk_surfa_windscreen_f: {
                    projectVal: 3
                }, //前挡风玻璃
                bodywk_surfa_windscreen_b: {
                    projectVal: 3
                }, //后挡风玻璃
                bodywk_surfa_mirror_l: {
                    projectVal: 3
                }, //左后视镜
                bodywk_surfa_mirror_r: {
                    projectVal: 3
                }, //右后视镜
                bodywk_surfa_leboy: {
                    projectVal: 3
                }, //左前翼子板
                bodywk_surfa_letoy: {
                    projectVal: 3
                }, //左后翼子板
                bodywk_surfa_riboy: {
                    projectVal: 3
                }, //右前翼子板
                bodywk_surfa_ritoy: {
                    projectVal: 3
                }, //右后翼子板
                bodywk_surfa_ber: {
                    projectVal: 3
                }, //前保险杠
                bodywk_surfa_ter: {
                    projectVal: 3
                }, //后保险杠
                bodywk_surfa_leber: {
                    projectVal: 3
                }, //左前门
                bodywk_surfa_riber: {
                    projectVal: 3
                }, //右前门
                bodywk_surfa_leter: {
                    projectVal: 3
                }, //左后门
                bodywk_surfa_riter: {
                    projectVal: 3
                }, //右后门
                bodywk_surfa_enge: {
                    projectVal: 3
                }, //发动机舱盖
                bodywk_surfa_box: {
                    projectVal: 3
                } //后尾箱盖
            },
            fileList: [], //图片文件
            uploadStatus: false,
            selectCircle: "", //当前选择的点
            selectCircleList: [], //已选过的点
            faultProjectInfo: {
                machineChecked: false,
                powerFaultchecked: false,
                remarkInfo: "", //备注信息
                fuleiolInfo: "", //然机油信息
                fuleiolInfoItem: {}, //然机油信息列表
                powerFaultInfo: "", //动力故障
                powerFaultInfoItem: {}, //动力故障列表
                roadInfoList: [], //路况数据
                powerInfoList: ["有", "无"], //动力故障选项
                oilTypeListInfo: [], //机油型号数据
                oilTypeSelectStatus: false, //机油型号选择框显示/隐藏
                selectPlaceInfo: [], //换油场地数据
                selectPlaceStatus: false //换油场地选择框显示/隐藏
            },
            allFaultInfo: {
                /* 燃机油信息 */
                "443": {
                    projectId: "443", //机油型号
                    projectVal: ""
                },
                "444": {
                    projectId: "444", //机油耗损量
                    projectVal: ""
                },
                "57": {
                    projectId: "57", //换油场地
                    projectVal: ""
                },
                "67": {
                    projectId: "67", //驾驶路况
                    projectVal: ""
                },
                /* 动力故障信息 */
                "69": {
                    projectId: "69",
                    projectVal: ""
                },
                "70": {
                    projectId: "70",
                    projectVal: ""
                },
                "72": {
                    projectId: "72",
                    projectVal: ""
                },
                "73": {
                    projectId: "73",
                    projectVal: ""
                }
            },
            copyBaseUrl: [],
            uploaderShow: true
        };
    },
    created() {
        this.init();
    },
    mounted() {
        this.listenerObjectChange();
    },
    methods: {
        /**
         * @Description:初始化列表数据
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-26 14:20:50
         */
        init() {
            let queryInfo = getUrlParams();
            let localVin = this.$local.get("vin");

            let carCheckCircleList = this.$local.get("carCheckCircleList");
            let checkProjectList = this.$local.get("checkProjectList");
            let selectCircleList = this.$local.get("selectCircleList");
            let oilTypeListInfo = this.$local.get("oilTypeListInfo");
            let selectPlaceInfo = this.$local.get("selectPlaceInfo");
            let allFaultInfo = this.$local.get("allFaultInfo");
            let faultProjectInfo = this.$local.get("faultProjectInfo");

            if (localVin && localVin == queryInfo.vin) {
                this.$local.set("vinStatusChange", false);
                this.getCreateNewInfo();
                if (checkProjectList) {
                    this.checkProjectList = checkProjectList;
                }
                if (allFaultInfo) {
                    this.allFaultInfo = allFaultInfo;
                } else {
                    this.getNowOilList();
                }
                if (selectCircleList) {
                    this.selectCircleList = selectCircleList;
                }
                if (carCheckCircleList && carCheckCircleList.length > 0) {
                    this.carIconList = carCheckCircleList;
                }
                if (faultProjectInfo) {
                    if (faultProjectInfo) {
                        this.faultProjectInfo = faultProjectInfo;
                    }
                    if (!this.faultProjectInfo.oilTypeListInfo) {
                        this.getNowOilList();
                    }
                }
                this.isShow = true; //显示页面
            } else {
                this.$local.set("vinStatusChange", true);
                let localBaseInfo = this.$local.get("baseInfo");
                let localreportType = this.$local.get("reportType");
                let refereeArr = this.$local.get("refereeArr");
                let billId = this.$local.get("billId");
                let workBoardId = this.$local.get("workBoardId");
                this.$local.clear();
                this.$local.set("baseInfo", localBaseInfo);
                this.$local.set("reportType", localreportType);
                this.$local.set("refereeArr", refereeArr);
                this.$local.set("billId", billId);
                this.$local.set("workBoardId", workBoardId);
                this.getCreateNewInfo();
            }
        },

        /**
         * @Description: 获取新建工单数据
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-16 10:05:15
         */
        getCreateNewInfo() {
            billApi.getCreateNew().then(res => {
                if (res.code == 20000) {
                    this.carIconList = res.data.checkCar.checkProject;
                    this.$local.set("carCheckCircleList", this.carIconList);
                    this.$local.set("getCreateNewInfo", res.data);
                    this.faultListInfo = res.data.consultingCheckProject.map(
                        item => {
                            if (item.id == 56) {
                                this.faultProjectInfo["fuleiolInfo"] = item;
                            } else if (item.id == 68) {
                                this.faultProjectInfo["powerFaultInfo"] = item;
                            } else if (
                                item.id == 57 ||
                                item.id == 67 ||
                                item.id == 443 ||
                                item.id == 444
                            ) {
                                this.faultProjectInfo["fuleiolInfoItem"][
                                    item.id
                                ] = item;
                            } else if (
                                item.id == 69 ||
                                item.id == 70 ||
                                item.id == 72 ||
                                item.id == 73
                            ) {
                                this.faultProjectInfo["powerFaultInfoItem"][
                                    item.id
                                ] = item;
                            }
                        }
                    );
                    //提取路况信息
                    this.faultProjectInfo[
                        "roadInfoList"
                    ] = this.faultProjectInfo["fuleiolInfoItem"]["67"][
                        "intervalRange"
                    ]["list"];
                    this.$local.set(
                        "roadInfoList",
                        this.faultProjectInfo["roadInfoList"]
                    );
                    //显示页面
                    this.isShow = true;
                }
            });
        },
        /**
         * @Description: 获取机油型号数据
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-04 14:18:30
         */
        getNowOilList() {
            billApi.getNowOilList().then(res => {
                if (res.code == 20000) {
                    res.data.map(item => {
                        this.faultProjectInfo["oilTypeListInfo"].push(
                            item.name
                        );
                    });
                    this.$local.set(
                        "oilTypeListInfo",
                        this.faultProjectInfo["oilTypeListInfo"]
                    );
                }
            });
        },
        /**
         * @Description: 机油类型选择
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-04 14:23:43
         */
        oilTypeSelect() {
            let oilTypeListInfo = this.$local.get("oilTypeListInfo");
            if (
                this.faultProjectInfo["oilTypeListInfo"].length == 0 &&
                !oilTypeListInfo
            ) {
                this.getNowOilList();
            } else {
                this.faultProjectInfo["oilTypeListInfo"] = oilTypeListInfo;
            }
            this.faultProjectInfo["oilTypeSelectStatus"] = true;
        },

        //确定
        oilTypeConfirm(val) {
            this.allFaultInfo["443"]["projectVal"] = val;
            this.faultProjectInfo["oilTypeSelectStatus"] = false;
            // this.$local.set("faultProjectInfo", this.faultProjectInfo);
        },
        //取消
        oilTypeCancel() {
            this.faultProjectInfo["oilTypeSelectStatus"] = false;
            // this.$local.set("faultProjectInfo", this.faultProjectInfo);
        },
        /**
         * @Description: 换油场地选择
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-04 14:50:55
         */
        selectPlace() {
            let selectPlaceInfo = this.$local.get("selectPlaceInfo");
            if (selectPlaceInfo) {
                this.faultProjectInfo["selectPlaceInfo"] = selectPlaceInfo;
            } else {
                this.faultProjectInfo["fuleiolInfoItem"]["57"]["intervalRange"][
                    "list"
                ].map(item => {
                    this.faultProjectInfo["selectPlaceInfo"].push(item.name);
                });
                this.$local.set(
                    "selectPlaceInfo",
                    this.faultProjectInfo["selectPlaceInfo"]
                );
            }
            this.faultProjectInfo["selectPlaceStatus"] = true;
        },
        //确定
        selectPlaceConfirm(val) {
            this.allFaultInfo["57"]["projectVal"] = val;
            this.faultProjectInfo["selectPlaceStatus"] = false;
            // this.$local.set("faultProjectInfo", this.faultProjectInfo);
        },
        //取消
        selectPlaceCancel() {
            this.faultProjectInfo["selectPlaceStatus"] = false;
            // this.$local.set("faultProjectInfo", this.faultProjectInfo);
        },

        /**
         * @Description: 上传前
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-10 18:18:29
         */
        beforeRead(file) {
            if (
                this.checkProjectList[this.selectCircle["code"]]["fileList"]
                    .length == 5
            ) {
                this.$toast("最多上传五张图片");
                return false;
            }
            return true;
        },
        /**
         * @Description: 图片上传
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-03 15:34:05
         */
        async afterRead(file) {
            let _this = this;
            let uploadFile = file["file"];
            let result = await uploadImg(uploadFile);
            let baseUrl = window[window.webkitURL ? "webkitURL" : "URL"][
                "createObjectURL"
            ](uploadFile);
            if (result && result.file) {
                _this.checkProjectList[_this.selectCircle["code"]][
                    "projectImg"
                ].push(result["file"]["url"]);
                _this.checkProjectList[_this.selectCircle["code"]][
                    "fileList"
                ].push(baseUrl);
                _this.fileList =
                    _this.checkProjectList[_this.selectCircle["code"]][
                        "fileList"
                    ];
                this.$local.set("checkProjectList", this.checkProjectList);
            }
        },
        /**
         * @Description: 删除已上传的图片
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-24 11:11:18
         */
        crossPic(index) {
            // console.log(index, "****");
            let codeName = this.selectCircle["code"];
            this.checkProjectList[codeName]["fileList"].splice(index, 1);
            this.checkProjectList[codeName]["projectImg"].splice(index, 1);
            this.$local.set("checkProjectList", this.checkProjectList);
        },
        /**
         * @Description: 图片预览
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-02 15:57:44
         */

        imgPreview(imgArray, index) {
            ImagePreview({
                images: imgArray,
                loop: false,
                startPosition: index,
                lazyLoad: true,
                showIndicators: false
            });
        },
        /**
         * @Description: 全部正常
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-02 14:51:06
         */
        btnHandle() {
            for (let item in this.checkProjectList) {
                if (this.checkProjectList.hasOwnProperty(item)) {
                    this.checkProjectList[item]["projectVal"] = 1;

                    this.checkProjectList[item]["code"] = item;
                    this.checkProjectList[item]["projectImg"] = [];
                    if (
                        this.checkProjectList[item]["fileList"] &&
                        this.checkProjectList[item]["fileList"].length > 0
                    ) {
                        this.checkProjectList[item]["fileList"] = [
                            ...this.checkProjectList[item]["fileList"]
                        ];
                    } else {
                        this.checkProjectList[item]["fileList"] = [];
                    }
                }
            }
            this.selectCircleList = Object.keys(this.checkProjectList);
            this.$local.set("checkProjectList", this.checkProjectList);
            this.$local.set("selectCircleList", this.selectCircleList);
            this.uploadStatus = false;
        },
        /**
         * @Description: 外观检查，异常项标注
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-02 14:31:27
         */
        circleHandle(item) {
            // console.log(item);

            this.selectCircle = item;

            if (
                !this.selectCircleList.includes(item.code) &&
                Object.keys(this.checkProjectList[item["code"]]).length == 1
            ) {
                this.selectCircleList = Object.keys(this.checkProjectList);
                this.checkProjectList[item.code]["projectVal"] =
                    this.checkProjectList[item.code]["projectVal"] == 3
                        ? 0
                        : this.checkProjectList[item.code]["projectVal"] == 1
                        ? 0
                        : 1;
                for (let i in this.checkProjectList) {
                    if (this.checkProjectList[i]["projectVal"] == 0) {
                        this.checkProjectList[i]["code"] = i;
                        this.checkProjectList[i]["projectImg"] = [];
                        this.checkProjectList[i]["fileList"] = [];
                    } else {
                        this.checkProjectList[i]["projectVal"] = 1;
                        this.checkProjectList[i]["code"] = i;
                        this.checkProjectList[i]["projectImg"] = [];
                        this.checkProjectList[i]["fileList"] = [];
                    }
                }
                this.$local.set("selectCircleList", this.selectCircleList);
            } else {
                if (!this.selectCircleList.includes(item.code)) {
                    this.selectCircleList.push(item.code);
                }
                if (
                    this.checkProjectList[item.code]["fileList"] &&
                    this.checkProjectList[item.code]["fileList"].length > 0
                ) {
                    this.fileList = this.checkProjectList[item.code][
                        "fileList"
                    ];
                } else {
                    let checkProjectList = this.$local.get("checkProjectList");
                    this.fileList = checkProjectList[item.code]["fileList"];
                }

                this.checkProjectList[item["code"]]["projectVal"] =
                    this.checkProjectList[item["code"]]["projectVal"] == 1
                        ? 0
                        : 1;
            }
            this.uploadStatus = true;
            this.$local.set("checkProjectList", this.checkProjectList);
        },

        /**
         * @Description: 燃油机信息
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-03 18:31:37
         */
        machineChange(check) {
            // this.setLocalCacheInfo();
        },

        /**
         * @Description: 动力故障信息
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-03 18:34:04
         */
        powerFaultChange(check) {
            // console.log("powerFaultChange", check);
        },

        /**
         * @Description: 监听对象数据变化,实时缓存
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-16 09:46:08
         */

        listenerObjectChange() {
            this.$watch(
                "allFaultInfo",
                () => {
                    this.$local.set("allFaultInfo", this.allFaultInfo);
                },
                { deep: true }
            );
            this.$watch(
                "faultProjectInfo",
                () => {
                    this.$local.set("faultProjectInfo", this.faultProjectInfo);
                },
                { deep: true }
            );
            this.$watch("fileList", () => {
                if (this.fileList.length === 5) {
                    this.uploaderShow = false;
                } else {
                    this.uploaderShow = true;
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .file {
        display: block;
        width: 100px;
        height: 100px;
    }
    /deep/ .page .buttonFixed[data-v-cc74d80e] {
        padding: 0;
        z-index: 9999;
    }
    .bodywk_surfa_style_public {
        display: block;
        width: 20px;
        height: 20px;
        font-style: normal;
        position: absolute;
        background: url("../../assets/image/billing/default_icon.png") no-repeat;
        background-size: 20px 20px;
    }
    .main-container {
        padding: 0;
        .car-body-check-top {
            padding: 15px 0px;
            border-radius: 10px;
            background-color: #fff;
            .car-body-check-info {
                border-bottom: 1px solid #f2f2f2;
                /deep/ .van-button--normal {
                    border-radius: 10px;
                }
                .title-style-block {
                    & > :first-child {
                        display: block;
                        width: 100%;
                        height: 100%;
                        line-height: 48px;
                        font-weight: bold;
                        font-size: 16px;
                    }
                }

                .value-style-block {
                    line-height: 48px;
                    box-sizing: border-box;
                }
            }
            .abnormal-pic-list {
                padding: 0 10px 10px 10px;
                border: 1px solid #f2f2f2;
                border-radius: 10px;
                margin: 10px;
                /deep/ .van-cell:not(:last-child)::after {
                    border-bottom: 0;
                }
                /deep/ .van-cell {
                    padding: 11px 0;
                }
                .abnormal-value-style {
                    /deep/ .van-cell__value {
                        color: #f00;
                    }
                }
                .normal-value-style {
                    /deep/ .van-cell__value {
                        color: #2fb27a;
                    }
                }
                .pic-upload {
                    display: flex;
                    .upload-btn {
                        width: 50px;
                        height: 50px;
                        & > .upload-pic {
                            display: block;
                            width: 100%;
                        }
                    }
                    .pic-list {
                        flex: 1;
                        padding: 0 0 0 10px;
                        overflow-y: auto;
                        clear: both;
                        .pic-list-item {
                            float: left;
                            width: 45px;
                            height: 45px;
                            margin-right: 15px;
                            margin-bottom: 10px;
                            position: relative;
                            img {
                                // display: block;
                                width: 45px;
                                height: 45px;
                                border-radius: 10px;
                            }
                            /deep/ .van-icon {
                                background-color: #f00;
                                color: #fff;
                                border-radius: 50%;
                                border-color: #f00;
                                position: absolute;
                                right: -12px;
                                top: 0;
                            }
                        }
                    }
                }
            }
            .car-pic-check {
                padding: 20px 10px 10px 10px;
                position: relative;
                .car-pic {
                    display: block;
                    width: 50%;
                    height: auto;
                    margin: 0 auto;
                }
                .bodywk_surfa_roof {
                    top: 210px;
                    left: 166px;
                    .bodywk_surfa_style_public;
                } //车顶
                .bodywk_surfa_windscreen_f {
                    top: 130px;
                    left: 166px;
                    .bodywk_surfa_style_public;
                } //前挡风玻璃
                .bodywk_surfa_windscreen_b {
                    top: 270px;
                    left: 166px;
                    .bodywk_surfa_style_public;
                } //后挡风玻璃
                .bodywk_surfa_mirror_l {
                    top: 130px;
                    left: 98px;
                    .bodywk_surfa_style_public;
                } //左后视镜
                .bodywk_surfa_mirror_r {
                    top: 130px;
                    left: 236px;
                    .bodywk_surfa_style_public;
                } //右后视镜
                .bodywk_surfa_leboy {
                    top: 92px;
                    left: 103px;
                    .bodywk_surfa_style_public;
                } //左前翼子板
                .bodywk_surfa_letoy {
                    top: 294px;
                    left: 103px;
                    .bodywk_surfa_style_public;
                } //左后翼子板
                .bodywk_surfa_riboy {
                    top: 92px;
                    left: 232px;
                    .bodywk_surfa_style_public;
                } //右前翼子板
                .bodywk_surfa_ritoy {
                    top: 294px;
                    left: 232px;
                    .bodywk_surfa_style_public;
                } //右后翼子板
                .bodywk_surfa_ber {
                    top: 14px;
                    left: 166px;
                    .bodywk_surfa_style_public;
                } //前保险杠
                .bodywk_surfa_ter {
                    top: 344px;
                    left: 166px;
                    .bodywk_surfa_style_public;
                } //后保险杠
                .bodywk_surfa_leber {
                    top: 186px;
                    left: 103px;
                    .bodywk_surfa_style_public;
                } //左前门
                .bodywk_surfa_riber {
                    top: 186px;
                    left: 232px;
                    .bodywk_surfa_style_public;
                } //右前门
                .bodywk_surfa_leter {
                    top: 246px;
                    left: 103px;
                    .bodywk_surfa_style_public;
                } //左后门
                .bodywk_surfa_riter {
                    top: 246px;
                    left: 232px;
                    .bodywk_surfa_style_public;
                } //右后门
                .bodywk_surfa_enge {
                    top: 70px;
                    left: 166px;
                    .bodywk_surfa_style_public;
                } //发动机舱盖
                .bodywk_surfa_box {
                    top: 310px;
                    left: 166px;
                    .bodywk_surfa_style_public;
                } //后尾箱盖
                .circle-abnormal {
                    background: url("../../assets/image/billing/abnormal_icon.png")
                        no-repeat;
                    background-size: 20px 20px;
                }
                .circle-normal {
                    background: url("../../assets/image/billing/normal_icon.png")
                        no-repeat;
                    background-size: 20px 20px;
                }
                .circle-default {
                    background: url("../../assets/image/billing/default_icon.png")
                        no-repeat;
                    background-size: 20px 20px;
                }
            }
        }
        .car-body-check-bottom {
            padding: 15px 0px;
            border-radius: 10px;
            background-color: #fff;
            margin-top: 10px;
            /deep/ .van-switch {
                display: block;
                margin-left: 100px;
                z-index: 99;
            }
            /deep/ .van-cell__value--alone {
                border: 1px solid #f2f2f2;
                padding: 10px;
                background: #f2f2f2;
            }
            /deep/ .van-cell__value {
                color: #323233;
            }
            /*  /deep/ .van-radio__label {
                color: #969799;
            } */
            .engineLose {
                display: flex;
                padding-left: 40px;
                vertical-align: middle;
                .engine-lose-input::-webkit-outer-spin-button,
                .engine-lose-input::-webkit-inner-spin-button {
                    -webkit-appearance: none; //去除输入框顶部阴影
                }
                .engine-lose-input {
                    -moz-appearance: textfield; //去除输入框顶部阴影
                    outline: none;
                    border: 0 none;
                    text-align: center;
                    width: 80px;
                    padding: 0 10px 0 20px;
                    box-sizing: border-box;
                    vertical-align: middle;
                }
            }
            .driving-info {
                display: flex;
                padding-left: 15px;
                & > :first-child {
                    display: flex;
                    & > :first-child {
                        margin-right: 10px;
                    }
                }
            }
            .power-info {
                display: flex;
                & > :first-child {
                    display: flex;
                    & > :first-child {
                        margin-right: 55px;
                    }
                }
            }
            .postscript {
                margin-bottom: 30px;
                /deep/ .van-cell {
                    padding-bottom: 0;
                }
                /deep/ .van-cell:not(:last-child)::after {
                    border-bottom: 0;
                }
            }
        }
    }
}
</style>