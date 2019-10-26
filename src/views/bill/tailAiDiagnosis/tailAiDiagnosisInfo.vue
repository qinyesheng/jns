<!--
 * @Description: AI尾气诊断-行驶里程
 * @Author: lp
 * @Date: 2019-06-05 13:38:57 
 * @LastEditTime: 2019-09-18 14:48:44
 * @LastEditors: Please set LastEditors
 -->

<template>
    <div class="carKmInput">
        <headerOne :isFixed="true" @onClickLeft="back" :onClickLeftStatus="onClickLeftStatus" />
        <div class="main-container">
            <div class="carKm-input-block">
                <div>
                    <p class="carInfo">
                        <span>车辆信息</span>
                        <span>
                            <router-link
                                v-if="routeFrom&&routeFrom=='vin'"
                                style="color:#46aef7"
                                to="tailChangeCar"
                            >车型变更</router-link>
                        </span>
                    </p>
                    <div class="carInfoDesc">{{carInfo.carModelFullName}}</div>
                </div>
                <div class="steerMileage">
                    <h4>行驶里程</h4>
                    <div class="inputKm">
                        <van-cell-group>
                            <van-field
                                name="carKm"
                                maxlength="6"
                                v-model="carKm"
                                placeholder="请输入行驶里程"
                                type="number"
                                @focus="focus"
                                @blur="blur"
                                @input="mileageInput"
                            />
                        </van-cell-group>
                        <span>km</span>
                    </div>
                </div>
                <div class="steerMileage">
                    <h4>车牌号码</h4>
                    <div class="inputKm carPhone">
                        <van-cell-group>
                            <van-field
                                readonly
                                clickable
                                :value="carInfo.plateNumberP"
                                @click="openPop('plateNumberP')"
                            />
                            <van-field
                                readonly
                                clickable
                                :value="carInfo.plateNumberC"
                                @click="openPop('plateNumberC')"
                            />
                            <van-field
                                name="plateNumber"
                                v-model="carInfo.plateNumber"
                                maxlength="6"
                                placeholder="请输入车牌号码"
                                @focus="focus"
                                @blur="blur"
                            />
                        </van-cell-group>
                    </div>
                </div>
                <div class="steerMileage">
                    <h4>用户名</h4>
                    <div class="inputKm">
                        <van-cell-group>
                            <van-field
                                name="userName"
                                v-model="carInfo.userName"
                                placeholder="请输入用户名"
                                @focus="focus"
                                @blur="blur"
                            />
                        </van-cell-group>
                    </div>
                </div>
                <div class="steerMileage">
                    <h4>联系方式</h4>
                    <div class="inputKm">
                        <van-cell-group>
                            <van-field
                                name="phone"
                                v-model="carInfo.phone"
                                maxlength="11"
                                placeholder="请输入联系方式"
                                type="number"
                                @focus="focus"
                                @blur="blur"
                                @input="phoneInput"
                            />
                        </van-cell-group>
                    </div>
                </div>
                <ul class="change-car-input-block">
                    <li>
                        <div class="change-car-key">
                            <b>燃油类型</b>
                        </div>
                        <van-cell-group @click="openPop('fuelType')">
                            <van-cell :title="carInfo.fuelType?carInfo.fuelType:'请选择燃油类型'" is-link />
                        </van-cell-group>
                    </li>
                    <li>
                        <div class="change-car-key">
                            <b>供油方式</b>
                        </div>
                        <van-cell-group @click="openPop('oilSupplyMode')">
                            <van-cell
                                :title="carInfo.oilSupplyMode?carInfo.oilSupplyMode:'请选择供油方式'"
                                is-link
                            />
                        </van-cell-group>
                    </li>
                    <li>
                        <div class="change-car-key">
                            <b>进气方式</b>
                        </div>
                        <van-cell-group @click="openPop('intakeMode')">
                            <van-cell
                                :title="carInfo.intakeMode?carInfo.intakeMode:'请选择进气方式'"
                                is-link
                            />
                        </van-cell-group>
                    </li>
                    <li>
                        <div class="change-car-key">
                            <b>发证日期</b>
                        </div>
                        <van-cell-group @click="openDatePicker">
                            <van-cell
                                :title="carInfo.issueDate?carInfo.issueDate:'请选择发证日期'"
                                is-link
                            />
                        </van-cell-group>
                    </li>
                </ul>
                <div class="steerMileage">
                    <h4>整备质量</h4>
                    <div class="inputKm">
                        <van-cell-group>
                            <van-field
                                maxlength="10"
                                v-model="carInfo.curbWeight"
                                placeholder="请输入整备质量"
                                type="number"
                                @focus="focus"
                                @blur="qualityBlur"
                            />
                        </van-cell-group>
                        <span>kg</span>
                    </div>
                </div>
                <div class="steerMileage">
                    <h4>座位数</h4>
                    <div class="inputKm">
                        <van-cell-group>
                            <van-field
                                maxlength="10"
                                v-model="carInfo.seat"
                                placeholder="请输入座位数"
                                type="number"
                                @focus="focus"
                                @blur="blur"
                                @input="seatInput"
                            />
                        </van-cell-group>
                        <span>座</span>
                    </div>
                </div>
                <div class="steerMileage">
                    <h4>发动机型号</h4>
                    <div class="inputKm">
                        <van-cell-group>
                            <van-field
                                maxlength="32"
                                v-model="carInfo.engineModel"
                                placeholder="请输入发动机型号"
                                @focus="focus"
                                @blur="blur"
                                @input="engineInput"
                            />
                        </van-cell-group>
                    </div>
                </div>
                <div class="steerMileage">
                    <h4>发动机厂商</h4>
                    <div class="inputKm">
                        <van-cell-group>
                            <van-field
                                v-model="carInfo.engineManufacturers"
                                placeholder="请输入发动机厂商"
                                @focus="focus"
                                @blur="blur"
                            />
                        </van-cell-group>
                    </div>
                </div>
                <div class="car-km-submit">
                    <pubButton @buttonConfirm="carKmSubmit" title="继续" :isFixed="false"></pubButton>
                </div>
            </div>
        </div>
        <rollListSelect :listInfo="listInfo" :show="show" @confirm="confirm" @cancel="cancel" />
        <van-popup v-model="isDatePickerShow" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                :max-date="maxDate"
                confirm-button-text="确定"
                :formatter="dateFormatter"
                @cancel="closeDatePicker"
                @confirm="confirmDate(currentDate)"
            />
        </van-popup>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import rollListSelect from "@/components/rollList/rollListSelect";
import pubButton from "@/components/public/pubButton";
import createNewApi from "@/api/bill/createNew";
import jnsApi from "@/utils/jnsApi";
import radioSelect from "@/components/carInfo/radioSelect";
import { dateFormat } from "@/utils/common";
import { Field, DatetimePicker, Picker } from "vant";
export default {
    components: {
        headerOne,
        pubButton,
        [Field.name]: Field,
        [Picker.name]: Picker,
        [DatetimePicker.name]: DatetimePicker,
        radioSelect,
        rollListSelect
    },
    data() {
        return {
            listInfo: ["汽油", "柴油"],
            show: false,
            carInfo: {
                fuelType: "汽油",
                oilSupplyMode: "",
                intakeMode: "",
                issueDate: "",
                curbWeight: "",
                seat: "",
                engineModel: "",
                engineManufacturers: "",
                plateNumber: "",
                userName: "",
                phone: "",
                plateNumberP: "粤",
                plateNumberC: "A"
            },
            carKm: "",
            message: "",
            inputFocus: false,
            routeFrom: false,
            canNext: true,
            onClickLeftStatus: true,
            rollListInfo: {
                selectType: "",
                fuelType: ["汽油", "柴油"],
                oilSupplyMode: [
                    ["汽油电喷", "化油器（汽油）"],
                    ["柴油电喷", "柴油直喷（柴油）"]
                ],
                intakeMode: ["自然吸气", "涡轮增压"],
                plateNumberP: [
                    "粤",
                    "京",
                    "津",
                    "沪",
                    "渝",
                    "桂",
                    "宁",
                    "藏",
                    "新",
                    "浙",
                    "苏",
                    "赣",
                    "皖",
                    "闽",
                    "贵",
                    "云",
                    "鄂",
                    "湘",
                    "川",
                    "琼",
                    "鲁",
                    "晋",
                    "冀",
                    "豫",
                    "陕",
                    "甘",
                    "青",
                    "辽",
                    "吉",
                    "黑",
                    "蒙",
                    "其他"
                ],
                plateNumberC: [
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F",
                    "G",
                    "H",
                    "I",
                    "J",
                    "K",
                    "L",
                    "M",
                    "N",
                    "O",
                    "P",
                    "Q",
                    "R",
                    "S",
                    "T",
                    "U",
                    "V",
                    "W",
                    "X",
                    "Y",
                    "Z"
                ]
            },
            isDatePickerShow: false,
            currentDate: new Date(),
            maxDate: new Date()
        };
    },
    created: function() {
        let carInfo = this.$session.get("carInfo");
        // console.log("前一个页面的信息==", carInfo);
        if (carInfo) {
            this.carInfo = Object.assign(this.carInfo, carInfo);
            let fuelType = this.carInfo["fuelType"];
            if (fuelType.includes("汽油")) {
                this.carInfo.fuelType = "汽油";
            } else if (fuelType.includes("柴油")) {
                this.carInfo.fuelType = "柴油";
            }
            // 吸气方式字段转换
            let intakeMode = this.carInfo["airAdmission"];
            if (intakeMode.includes("自然吸气")) {
                this.carInfo.intakeMode = "自然吸气";
            } else if (intakeMode.includes("涡轮增压")) {
                this.carInfo.intakeMode = "涡轮增压";
            }
            delete this.carInfo["airAdmission"];
            // 发动机型号字段转换
            this.carInfo.engineModel = this.carInfo["fadongji"];
            delete this.carInfo["fadongji"];
        }
    },
    mounted() {
        let routeFrom = this.$router.history.current.query.routeFrom;
        if (routeFrom) {
            this.routeFrom = routeFrom;
        }
    },
    methods: {
        carKmSubmit() {
            if (!this.carKm) {
                this.$toast("请输入行驶里程", { position: top });
                return false;
            }
            let toastText = {
                plateNumber: "请输入车牌号码",
                userName: "请输入用户名",
                phone: "请输入联系方式",
                fuelType: "请选择燃油类型",
                oilSupplyMode: "请选择供油方式",
                intakeMode: "请选择进气方式",
                issueDate: "请选择发证日期",
                curbWeight: "请输入整备质量",
                seat: "请输入座位数",
                engineModel: "请输入发动机型号"
            };
            for (let item in toastText) {
                if (!this.carInfo[item]) {
                    this.$toast(toastText[item], { position: top });
                    return false;
                }
            }
            this.phoneChange();
            if (!this.canNext) {
                return;
            }
            this.canNext = false;
            let baseInfo = this.carInfo;
            baseInfo.carStyle = baseInfo["nianKuan"];
            // delete baseInfo["nianKuan"];
            baseInfo.carBrandLogo = baseInfo["icoName"];
            // delete baseInfo["icoName"];
            baseInfo.carCc =
                baseInfo.carCc.indexOf("L") > -1
                    ? baseInfo.carCc
                    : baseInfo.carCc + baseInfo.unit;
            baseInfo.tripDistance = this.carKm;
            // delete baseInfo["carKm"];
            if (baseInfo.carModelId) {
                baseInfo.carType = 0;
            } else {
                baseInfo.carType = 1;
            }
            let params = {
                baseInfo
            };
            // console.log("当前页面参数==", params);
            createNewApi.saveCreateBillJ007(params).then(res => {
                this.canNext = true;
                if (res.code == 20000) {
                    let h5Params = {
                        bill_id: res.data.billStatus.billId,
                        bill_type: "J007"
                    };
                    jnsApi.h5ToApp(
                        res.data.billStatus.nextStatusCode,
                        h5Params
                    );
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        focus() {
            this.inputFocus = true;
        },
        blur() {
            this.inputFocus = true;
        },
        // 行驶里程取整数
        mileageInput() {
            if (this.carKm) {
                this.carKm = parseInt(this.carKm);
            }
        },

        //电话号码处理
        phoneInput() {
            let userPhone = this.carInfo.phone;
            userPhone = userPhone.replace(/[^0-9]{11}/g, "");
        },
        //号码字段失去焦点处理
        phoneChange() {
            let userPhone = this.carInfo.phone;
            if (userPhone && userPhone.length < 11) {
                this.$toast("手机号码必须是11位");
                this.canNext = false;
            } else {
                this.canNext = true;
            }
        },
        // 整备质量取两位小数
        qualityBlur() {
            this.inputFocus = true;
            if (this.carInfo.curbWeight) {
                this.carInfo.curbWeight = parseFloat(
                    this.carInfo.curbWeight
                ).toFixed(2);
            }
        },
        // 座位数取整数
        seatInput() {
            if (this.carInfo.seat) {
                this.carInfo.seat = parseInt(this.carInfo.seat);
            }
        },
        // 发动机型号禁止中文
        engineInput() {
            this.carInfo.engineModel = this.carInfo.engineModel.replace(
                /[\W]/g,
                ""
            );
        },

        /**
         * @Description: 调用滚动选择控件弹窗
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-18 09:07:24
         */
        openPop(type = "") {
            // 滚动选择控件的调用处理
            switch (type) {
                case "plateNumberP":
                    this.assignmentProcess(type, "plateNumberP");
                    break;
                case "plateNumberC":
                    this.assignmentProcess(type, "plateNumberC");
                    break;
                case "fuelType":
                    this.assignmentProcess(type, "fuelType");
                    break;
                case "oilSupplyMode":
                    this.listInfo =
                        this.carInfo["fuelType"] &&
                        this.carInfo["fuelType"] != "汽油"
                            ? this.rollListInfo["oilSupplyMode"][1]
                            : this.rollListInfo["oilSupplyMode"][0];
                    this.rollListInfo["selectType"] = type;
                    break;
                case "intakeMode":
                    this.assignmentProcess(type, "intakeMode");
                    break;
                default:
                    break;
            }
            this.show = true;
        },

        /**
         * @Description: 赋值处理
         * @Param: type [String] 选择的类型
         * @Param: listName [Array] 对应的数组信息
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-18 14:46:19
         */
        assignmentProcess(type, listName) {
            this.rollListInfo["selectType"] = type;
            this.listInfo = this.rollListInfo[listName];
        },
        // 后退自定义
        back() {
            jnsApi.h5Click().back();
        },
        // 打开时间选择框
        openDatePicker() {
            this.isDatePickerShow = true;
        },
        // 关闭时间选择框
        closeDatePicker() {
            this.isDatePickerShow = false;
        },
        // 确认时间选择
        confirmDate(currentDate) {
            this.carInfo.issueDate = dateFormat(currentDate, "yyyy-MM-dd");
            this.isDatePickerShow = false;
        },
        // 日期组件
        dateFormatter(type, value) {
            if (type === "year") {
                return `${value}&nbsp;年`;
            } else if (type === "month") {
                return `${value}&nbsp;月`;
            } else if (type === "day") {
                return `${value}&nbsp;日`;
            }
            return value;
        },

        /**
         * @Description: 公共滚动选择控件,选中处理。
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-18 10:51:04
         */
        confirm(val) {
            switch (this.rollListInfo["selectType"]) {
                case "fuelType":
                    this.carInfo["fuelType"] = val;
                    break;
                case "oilSupplyMode":
                    this.carInfo["oilSupplyMode"] = val;
                    break;
                case "intakeMode":
                    this.carInfo["intakeMode"] = val;
                    break;
                case "plateNumberP":
                    this.carInfo["plateNumberP"] = val;
                    break;
                case "plateNumberC":
                    this.carInfo["plateNumberC"] = val;
                    break;
                default:
                    break;
            }

            this.show = false;
        },
        //公共滚动选择控件，取消处理。
        cancel() {
            this.show = false;
        }
    }
};
</script>
<style lang='less' scoped>
.main-container {
    .carKmInputHeader {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
    }
    /deep/ .van-cell {
        height: 44px;
        line-height: 24px;
        background: #f2f2f2;
        box-sizing: border-box;
    }
    /deep/ .van-hairline--top-bottom::after {
        border-width: 0;
    }

    /deep/ .van-cell__right-icon {
        line-height: 18px;
    }
    .carPhone {
        & /deep/ .van-cell-group {
            display: flex;

            & > div:first-child {
                border-right: 0 none;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                flex: 0.2;
                text-align: center;
            }
            & > div:nth-child(2) {
                border-right: 0 none;
                border-left: 0 none;
                border-radius: 0;
                flex: 0.2;
                text-align: center;
            }
            & > div:last-child {
                border-left: 0 none;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                flex: 1;
            }
        }
    }
    .carKm-input-block {
        h3 {
            font-size: 27px;
        }
        .carInfo {
            padding: 15px 0;
            display: flex;
            span {
                display: block;
                width: 100%;
                font-size: 14px;
                font-weight: bold;
            }
            span:last-child {
                text-align: right;
            }
        }
        .carInfoDesc {
            padding: 10px 0;
            font-size: 14px;
        }
        .steerMileage {
            margin-top: 5px;
            h4 {
                padding: 10px 0;
                font-size: 14px;
                font-weight: bold;
            }
            .inputKm {
                box-sizing: border-box;
                position: relative;
                > span:last-child {
                    line-height: 18px;
                    position: absolute;
                    top: 12px;
                    bottom: 12px;
                    right: 10px;
                    z-index: 999;
                    font-size: 14px;
                }
            }
        }
        .change-car-input-block {
            margin-top: 3px;
            font-size: 14px;
            /deep/ .van-cell {
                background: none;
            }
            li {
                padding: 5px 0px 0px 0px;
                margin-bottom: 5px;
            }
            .change-car-key {
                padding: 5px 0px 5px 0px;
                height: 17px;
                > b {
                    font-weight: bold;
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
        }
    }
    .car-km-submit {
        margin-top: 20px;
    }
}
</style>

