<template>
    <div class="page">
        <headerOne
            :isFixed="true"
            @onClickLeft="back"
            :onClickLeftStatus="onClickLeftStatus"
            :title="title"
        />
        <div v-show="isShow == 1">
            <div class="main-container">
                <h4 class="changeCar-title">车辆信息</h4>
                <div class="change-car">
                    <ul class="change-car-input-block">
                        <li>
                            <div class="change-car-key">
                                <b>车架号</b>
                            </div>
                            <van-cell-group @click="vinHandle">
                                <van-cell :value="carInfo.vin?carInfo.vin:'请输入车架号'" is-link />
                            </van-cell-group>
                        </li>
                        <li>
                            <div class="change-car-key">
                                <b>品牌车系</b>
                            </div>
                            <van-cell-group @click="carBrandShow">
                                <van-cell
                                    :title="carInfo.carBrandName?carInfo.carBrandName+' '+carInfo.carLineName:'请选择品牌车系'"
                                    is-link
                                />
                            </van-cell-group>
                        </li>
                        <li>
                            <div class="change-car-key">
                                <b>排量</b>
                            </div>
                            <div class="change-car-value carCcBack">
                                <van-cell-group>
                                    <van-field
                                        type="number"
                                        v-model="carInfo.carCc"
                                        placeholder="请输入排量"
                                    />
                                </van-cell-group>
                                <div class="change-car-cc-unit">
                                    <van-button
                                        :class="carCc.classNameL"
                                        native-type="button"
                                        v-on:click="carCcUnit('L')"
                                    >&nbsp;L&nbsp;</van-button>
                                    <van-button
                                        :class="carCc.classNameT"
                                        native-type="button"
                                        v-on:click="carCcUnit('T')"
                                    >&nbsp;T&nbsp;</van-button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="change-car-key">
                                <b>年款</b>
                            </div>
                            <van-cell-group @click="selectDateTime">
                                <van-cell
                                    :title="carInfo.nianKuan?carInfo.nianKuan:'请选择年款'"
                                    value
                                    is-link
                                />
                            </van-cell-group>
                        </li>
                        <li>
                            <div class="change-car-key">
                                <b>变速箱</b>
                            </div>
                            <van-cell-group @click="showGearboxTypeHandle">
                                <van-cell
                                    :title="carInfo.gearboxType?carInfo.gearboxType:'请选择变速箱'"
                                    value
                                    is-link
                                />
                            </van-cell-group>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <pubButton @buttonConfirm="ensurePostHandle" title="确定" v-show="isShow==1"></pubButton>
        <!-- 请选择年款 -->
        <van-popup v-model="carStyleShow" position="bottom">
            <div class="dateTime">
                <van-datetime-picker
                    v-model="currentDate"
                    type="year-month"
                    confirm-button-text="确定"
                    :max-date="maxDate"
                    :min-date="minDate"
                    :formatter="yearFormatter"
                    @confirm="yearConfirm"
                    @cancel="yearCancel"
                    @change="getColumnValue(currentDate)"
                />
                <div class="dateGrid"></div>
            </div>
        </van-popup>
        <!-- 请选择变速箱 -->
        <!-- <transition name="van-slide-right"> -->
        <div class="gearboxType" v-show="isShow == 5">
            <gearboxType
                :title="'请选择变速箱'"
                :checked="carInfo.gearboxType"
                @gearboxTypeConfirm="gearboxTypeConfirm"
            />
        </div>
        <!-- </transition> -->
        <!-- 请选择车品牌 -->
        <div class="carBrand" v-show="isShow == 2">
            <selectCar @carBrandConfirm="carBrandConfirm" :carBrandId="tmpCarBrand.carBrandId" />
        </div>
        <!-- 请选择车系 -->
        <div class="carLine" v-show="isShow == 3">
            <selectCarLine
                @carLineConfirm="carLineConfirm"
                :carBrandId="tmpCarBrand.carBrandId"
                :carBrandName="tmpCarBrand.carBrandName"
                :carLineId="carInfo.carLineId"
            />
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import { Field, DatetimePicker } from "vant";
import pubButton from "@/components/public/pubButton";
import gearboxType from "@/components/carInfo/gearboxType";
import selectCar from "@/components/selectCar/selectCar";
import selectCarLine from "@/components/selectCar/selectCarLine";
import carOwnerApi from "@/api/carOwner/guest";
import { getCarBrandIconSrc, getUrlParams } from "@/utils/common";
import jnsApi from "@/utils/jnsApi";
import back from "@/utils/back";
export default {
    components: {
        headerOne,
        pubButton,
        [Field.name]: Field,
        gearboxType,
        selectCar,
        selectCarLine,
        [DatetimePicker.name]: DatetimePicker
    },
    data() {
        return {
            changeCarConfirmStatus: true,
            onClickLeftStatus: true,
            currentDate: new Date(),
            maxDate: new Date(),
            minDate: new Date(1990, 0, 1),
            carStyleShow: false,
            selectYear: "",
            title: "",
            carTitle: {
                "1": " ", // 车辆信息
                "2": "选择车品牌",
                "3": "选择车系",
                "5": "选择变速箱"
            },
            carInfo: {
                vin: "",
                airAdmission: "",
                brandModel: "",
                brandModelId: "",
                carBrandId: "",
                carBrandName: "",
                carCc: "",
                carLineId: "",
                carLineName: "",
                carModelFullName: "",
                carModelId: "",
                carModelName: "",
                cheXing: "",
                gearboxType: "",
                icoName: "",
                nianKuan: "",
                paiFang: "",
                produceYear: "",
                saleName: "",
                unit: "L",
                fadongji: "",
                carKm: ""
            },
            carCc: {
                classNameL: "activeBtn",
                classNameT: ""
            },
            isShow: 1, //显示那个模块,1:基础信息，2:选择车辆版本，3:选择车辆品牌，4:选择车系,5:选择变速箱,
            tmpCarBrand: {
                carBrandId: "",
                carBrandName: "",
                iconName: ""
            }
        };
    },
    created() {
        this.handleCarInfo();
    },
    mounted() {
        let _this = this;
        jnsApi.androidCallback().cover(function() {
            _this.back();
        });
    },
    methods: {
        //日期组件
        yearFormatter(type, value) {
            if (type === "year") {
                return `${value}&nbsp;&nbsp;年`;
            } else if (type === "month") {
                return `${value}月`;
            }
            return value;
        },
        yearConfirm(date) {
            this.carStyleShow = false;
            this.carInfo.nianKuan = date.getFullYear();
        },
        yearCancel() {
            this.carStyleShow = false;
        },
        getColumnValue(date) {
            let res = date.getFullYear();
            this.selectYear = res;
        },
        selectDateTime() {
            this.carStyleShow = true;
        },
        showModel(status) {
            this.isShow = status;
            this.title = this.carTitle[status];
        },
        // 选择车辆品牌
        carBrandShow() {
            this.showModel(2);
        },
        /**
         * @Description: 选择车品牌
         * @Param: item  选中的车品牌
         * @Author: xwq
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-03-04 13:54:03
         */
        carBrandConfirm(item) {
            this.tmpCarBrand.carBrandId = item.id;
            this.tmpCarBrand.carBrandName = item.brandName;
            this.tmpCarBrand.icoName = item.icoName;
            this.$nextTick(() => {
                this.showModel(3);
            });
        },
        /**
         * @Description:选择车系
         * @Param:item 选中的车系
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-03-18 13:58:59
         */
        carLineConfirm(item) {
            // console.log(item);
            for (let key in this.tmpCarBrand) {
                if (this.tmpCarBrand[key]) {
                    this.carInfo[key] = this.tmpCarBrand[key];
                }
            }
            this.carInfo.carLineId = item.id;
            this.carInfo.carLineName = item.lineName;
            this.showModel(1);
        },

        // 显示变速箱
        showGearboxTypeHandle() {
            this.showModel(5);
        },
        // 确定变速箱类型
        gearboxTypeConfirm(value) {
            // console.log(value);
            this.showModel(1);
            this.carInfo.gearboxType = value;
        },
        // 确定提交
        ensurePostHandle() {
            let tips = "";
            let validCarInfo = {
                carBrandName: "请选择品牌车系",
                carLineName: "请选择品牌车系",
                carCc: "请输入排量",
                nianKuan: "请选择年款",
                gearboxType: "请选择变速箱"
            };
            let carInfo = this.carInfo;
            for (let key in validCarInfo) {
                if (!this.carInfo[key] && validCarInfo[key]) {
                    this.$toast.fail(validCarInfo[key]);
                    return false;
                }
            }
            // 车型全称
            this.carInfo.carModelFullName =
                this.carInfo.carBrandName +
                " " +
                this.carInfo.carLineName +
                " " +
                this.carInfo.nianKuan +
                "款 " +
                this.carInfo.carCc +
                this.carInfo.unit +
                " " +
                this.carInfo.gearboxType;
            // 排量保留一位小数
            this.carInfo.carCc = Number(this.carInfo.carCc).toFixed(1);
            // console.log(this.carInfo);
            this.setCarInfo();
            this.setTmpCarInfo();
            this.$router.push({
                name: this.$route.meta.routerToName,
                query: {
                    routeFrom: this.$route.meta.routerToName
                }
            });
        },
        carCcUnit(unit) {
            if (unit == "L") {
                this.carCc.classNameL = "activeBtn";
                this.carCc.classNameT = "";
            } else {
                this.carCc.classNameT = "activeBtn";
                this.carCc.classNameL = "";
            }
            this.carInfo.unit = unit;
        },
        //重新输入Vin码
        vinHandle() {
            let _this = this;
            this.setTmpCarInfo();
            this.removeCarInfo();
            let query = this.$router.history.current.query;
            // query对象数据存在
            // menuCode
            // menuTitle
            // isShow
            if (Object.keys(query).length) {
                if (query.sourceType == "jnsApp") {
                    jnsApi.scanVin(
                        query.menuCode,
                        query.menuTitle,
                        query.isShow,
                        function(vin) {
                            // this.carInfo.vin = vin;
                            // this.carInfo = this.initCarInfo;
                            _this.getCarInfoByVin(vin);
                        }
                    );
                }
            } else {
                this.$router.push({
                    name: "vin"
                });
            }
        },
        handleCarInfo() {
            // 测试
            // sessionStorage.setItem("jnsAppcarVin", "WP0AA2978BL012976");
            this.initCarInfo = this.carInfo;
            let vin = sessionStorage.getItem("jnsAppcarVin");

            if (!vin) {
                let urlParams = getUrlParams();
                vin = urlParams.vin;
                sessionStorage.setItem("jnsAppcarVin", vin);
            }
            // let vin = this.$session.get("carVin");
            //let vin = sessionStorage.getItem("jnsAppcarVin");
            if (vin) {
                this.getCarInfoByVin(vin);
                this.$session.remove("carVin");
            } else {
                this.getCarInfoHandle();
            }
        },
        getCarInfoHandle() {
            let carInfo = this.getCarInfo();
            if (carInfo) {
                let tmpCarInfo = this.getTmpCarInfo();
                // 如果不是请求后端返回的数据则判断车架号是否一致，一致的话，把上次的车辆信息记录带出来
                if (carInfo.vin == tmpCarInfo.vin) {
                    if (tmpCarInfo) {
                        this.carInfo = tmpCarInfo;
                    }
                    // 赋值给品牌对象
                    for (let key in this.tmpCarBrand) {
                        if (this.carInfo[key]) {
                            this.tmpCarBrand[key] = this.carInfo[key];
                        }
                    }
                }
                // console.log(this.carInfo);
            } else {
                for (let key in this.carInfo) {
                    if (key != "vin" || key != "unit") {
                        continue;
                    }
                    this.carInfo[key] = "";
                }
            }
            this.carCcUnit(this.carInfo.unit);
        },
        getCarInfo() {
            return this.$session.get("carInfo");
        },
        setCarInfo() {
            this.$session.set("carInfo", this.carInfo);
        },
        removeCarInfo() {
            this.$session.remove("carInfo");
        },
        setTmpCarInfo() {
            this.$local.set("tmpCarInfo", this.carInfo);
        },
        getTmpCarInfo() {
            return this.$local.get("tmpCarInfo");
        },
        /**
         * @Description: 根据VIN码获取数据
         * @Param: vin [tring] 车辆vin码
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-03-04 14:27:24
         */
        getCarInfoByVin(vin) {
            this.carInfo.vin = vin;
            carOwnerApi
                .getCarInfoByVin({
                    vin: vin
                })
                .then(res => {
                    // 20400 旧code 兼容处理
                    if (res.code == 20400) {
                        // this.getCarInfoHandle();
                    } else if (res.code == 20000) {
                        if (res.data && res.data.length) {
                            let data = res.data[0];
                            for (var key in data) {
                                this.carInfo[key] = data[key] || "";
                            }
                            let carCc = this.carInfo.carCc;
                            if (carCc) {
                                // 字符串类型
                                if (isNaN(carCc)) {
                                    if (carCc.indexOf("T") > -1) {
                                        this.carInfo.unit = "T";
                                    } else if (carCc.indexOf("L") > -1) {
                                        this.carInfo.unit = "L";
                                    }
                                    carCc = carCc.slice(0, -1);
                                } else {
                                    // 单纯数字
                                    this.carInfo.unit = "L";
                                }
                                this.carInfo.carCc = carCc;
                            }
                            this.carCcUnit(this.carInfo.unit);
                        } else {
                            // this.getCarInfoHandle();
                        }
                    } else {
                        this.$toast(res.msg);
                    }
                });
        },
        back() {
            this.$session.set("carVinForVinComponents", this.carInfo.vin);
            // 可以访问组件实例 `this`
            if (this.isShow != 1) {
                if (this.isShow == 3) {
                    this.showModel(2);
                } else {
                    this.showModel(1);
                }
            } else {
                jnsApi.h5Click().back();
            }
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .changeCar-title {
        font-size: 27px;
    }
    .carCc-popup {
        height: 216px;
    }
    /deep/ .carCc-popup-background {
        background-color: rgba(0, 0, 0, 0);
    }
    .carCcBack {
        .van-cell {
            background-color: #f5f5f5;
            padding-left: 10px;
        }
    }
    .change-car {
        h3 {
            font-size: 27px;
        }
    }
    .change-car-input-block {
        padding: 10px 0px 0px 0px;
        font-size: 14px;
    }
    .change-car-input-block li {
        padding: 5px 0px 0px 0px;
    }
    .change-car-key {
        padding: 5px 0px 5px 0px;
        height: 19px;
        > b {
            font-weight: 600;
        }
    }
    .change-car-value {
        position: relative;
    }
    .change-car-cc-unit {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        > button {
            line-height: 0;
        }
        button:first-child {
            // border-right: 0 none;
        }
        button:last-child {
            // border-left: 0 none;
        }
    }
    .change-car-input-right-icon {
        width: 20px;
        height: 20px;
        line-height: 20px;
        position: absolute;
        right: 0px;
        top: 0px;
        bottom: 0px;
        margin: auto;
        color: #ccc;
        font-weight: bold;
    }
    .van-hairline--top-bottom::after {
        border-width: 0;
    }
    .change-car-confirm {
        position: fixed;
        left: 10px;
        right: 10px;
        bottom: 10px;
        > button {
            background-color: #46aef7;
            border: 1px solid #46aef7;
        }
    }
    .activeBtn {
        background-color: #46aef7;
        color: #fff;
    }
    .dateTime {
        /deep/ .van-picker__columns {
            div:nth-child(2) {
                display: none;
            }
        }
        /deep/ .van-picker-column__item--selected {
            font-size: 18px;
        }
    }
}
</style>
