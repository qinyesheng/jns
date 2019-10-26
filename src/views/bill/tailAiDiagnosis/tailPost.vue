<!--
 * @Description: AI尾气诊断-提交合格证
 * @Author: lp
 * @Date: 2019-06-05 13:38:57
 * @LastEditTime: 2019-09-18 14:49:09
 * @LastEditors: Please set LastEditors
 -->

<template>
    <div class="carKmInput">
        <headerOne :isFixed="true" />
        <div class="main-container">
            <div class="carKm-input-block">
                <h3>提交合格证</h3>
                <div class="steerMileage">
                    <h4>托修方</h4>
                    <div class="inputKm">
                        <van-cell-group>
                            <van-field
                                v-model="postInfo.car_name"
                                placeholder="请输入托修方"
                                @focus="focus"
                                @blur="blur"
                                :style="inputBorderColor"
                            />
                        </van-cell-group>
                    </div>
                </div>
                <div class="steerMileage">
                    <h4>车牌</h4>
                    <div class="inputKm">
                        <van-cell-group>
                            <van-field
                                v-model="postInfo.plate_number_all"
                                placeholder="请输入车牌"
                                @focus="focus"
                                @blur="blur"
                                :style="inputBorderColor"
                            />
                        </van-cell-group>
                    </div>
                </div>
                <div class="steerMileage">
                    <h4>车型</h4>
                    <div class="inputKm">
                        <van-cell-group>
                            <van-field
                                v-model="postInfo.car_fullname"
                                placeholder="请输入车型"
                                @focus="focus"
                                @blur="blur"
                                :style="inputBorderColor"
                            />
                        </van-cell-group>
                    </div>
                </div>
                <div class="steerMileage">
                    <h4>发动机型号</h4>
                    <div class="inputKm">
                        <van-cell-group>
                            <van-field
                                v-model="postInfo.engine_model"
                                placeholder="请输入发动机型号"
                                @focus="focus"
                                @blur="blur"
                                :style="inputBorderColor"
                            />
                        </van-cell-group>
                    </div>
                </div>
                <div class="steerMileage">
                    <h4>车架号</h4>
                    <div class="inputKm">
                        <van-cell-group>
                            <van-field
                                maxlength="17"
                                v-model="postInfo.vin"
                                placeholder="请输入车架号"
                                @focus="focus"
                                @input="vinInput"
                                @blur="blur"
                                :style="inputBorderColor"
                            />
                        </van-cell-group>
                    </div>
                </div>
                <div class="steerMileage">
                    <h4>维修类型</h4>
                    <div class="inputKm">
                        <van-cell-group>
                            <van-field
                                v-model="postInfo.repair_type"
                                placeholder="请输入维修类型"
                                @focus="focus"
                                @blur="blur"
                                :style="inputBorderColor"
                            />
                        </van-cell-group>
                    </div>
                </div>
                <div class="steerMileage">
                    <h4>合同编号</h4>
                    <div class="inputKm">
                        <van-cell-group>
                            <van-field
                                v-model="postInfo.contract_no"
                                placeholder="请输入合同编号"
                                @focus="focus"
                                @blur="blur"
                                :style="inputBorderColor"
                            />
                        </van-cell-group>
                    </div>
                </div>
                <div class="steerMileage">
                    <h4>出厂里程</h4>
                    <div class="inputKm">
                        <van-cell-group>
                            <van-field
                                v-model="postInfo.factory_mileage"
                                placeholder="请输入出厂里程"
                                @focus="focus"
                                @blur="blur"
                                :style="inputBorderColor"
                            />
                        </van-cell-group>
                    </div>
                </div>
                <ul class="change-car-input-block">
                    <li>
                        <div class="change-car-key">
                            <b>进厂日期</b>
                        </div>
                        <van-cell-group @click="openDatePicker('1')">
                            <van-cell
                                :title="postInfo.entering_factory_time?postInfo.entering_factory_time:'请选择进厂日期'"
                                is-link
                            />
                        </van-cell-group>
                    </li>
                    <li>
                        <div class="change-car-key">
                            <b>出厂日期</b>
                        </div>
                        <van-cell-group @click="openDatePicker('2')">
                            <van-cell
                                :title="postInfo.leaving_factory_time?postInfo.leaving_factory_time:'请选择出厂日期'"
                                is-link
                            />
                        </van-cell-group>
                    </li>
                    <li>
                        <div class="change-car-key">
                            <b>接车日期</b>
                        </div>
                        <van-cell-group @click="openDatePicker('3')">
                            <van-cell
                                :title="postInfo.arrival_time?postInfo.arrival_time:'请选择接车日期'"
                                is-link
                            />
                        </van-cell-group>
                    </li>
                </ul>
                <div class="car-km-submit">
                    <pubButton @buttonConfirm="askConfirm" title="提交" :isFixed="false"></pubButton>
                </div>
            </div>
        </div>
        <van-popup v-model="isDatePickerShow" position="bottom">
            <van-datetime-picker
                v-if="datePickerType == '1'"
                v-model="enteringDate"
                type="date"
                :max-date="maxDate"
                confirm-button-text="确定"
                :formatter="dateFormatter"
                @cancel="closeDatePicker"
                @confirm="confirmDate(enteringDate, 'entering_factory_time')"
            />
            <van-datetime-picker
                v-if="datePickerType == '2'"
                v-model="leavingDate"
                type="date"
                :max-date="maxDate"
                confirm-button-text="确定"
                :formatter="dateFormatter"
                @cancel="closeDatePicker"
                @confirm="confirmDate(leavingDate, 'leaving_factory_time')"
            />
            <van-datetime-picker
                v-if="datePickerType == '3'"
                v-model="arrivalDate"
                type="date"
                :max-date="maxDate"
                confirm-button-text="确定"
                :formatter="dateFormatter"
                @cancel="closeDatePicker"
                @confirm="confirmDate(arrivalDate, 'arrival_time')"
            />
        </van-popup>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import pubButton from "@/components/public/pubButton";
import undisposedApi from "@/api/bill/undisposed";
import jnsApi from "@/utils/jnsApi";
import { dateFormat } from "@/utils/common";
import { Field, DatetimePicker, Dialog } from "vant";
export default {
    components: {
        headerOne,
        pubButton,
        [Field.name]: Field,
        [DatetimePicker.name]: DatetimePicker
    },
    data() {
        return {
            billId: "",
            postInfo: {
                car_name: "",
                plate_number_all: "",
                car_fullname: "",
                engine_model: "",
                vin: "",
                repair_type: "",
                contract_no: "",
                factory_mileage: "",
                entering_factory_time: "",
                leaving_factory_time: "",
                arrival_time: ""
            },
            inputFocus: false,
            inputBorderColor: "",
            canNext: true,
            isPopShow: false,
            isDatePickerShow: false,
            enteringDate: new Date(),
            leavingDate: new Date(),
            arrivalDate: new Date(),
            maxDate: new Date(),
            datePickerType: ""
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        // 获取合格证信息
        init() {
            this.billId = this.$route.query.bill_id;
            if (!this.billId) return;
            let params = {
                bill_id: this.billId
            };
            undisposedApi.getBIllCertificate(params).then(res => {
                if (res.code == 20000) {
                    this.postInfo = res.data.certificate;
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        // 确定是否提交合格证弹框
        askConfirm() {
            let toastText = {
                car_name: "请输入托修方",
                plate_number_all: "请输入车牌",
                car_fullname: "请输入车型",
                engine_model: "请输入发动机型号",
                vin: "请输入车架号",
                repair_type: "请输入维修类型",
                contract_no: "请输入合同编号",
                factory_mileage: "请输入出厂里程",
                entering_factory_time: "请选择进厂日期",
                leaving_factory_time: "请选择出厂日期",
                arrival_time: "请选择接车日期"
            };
            for (let item in toastText) {
                if (!this.postInfo[item]) {
                    this.$toast(toastText[item], { position: top });
                    return false;
                }
                if (item == "vin" && this.postInfo[item].length !== 17) {
                    this.$toast("请输入17位车架号", { position: top });
                    return false;
                }
            }
            if (!this.canNext) {
                return;
            }
            this.canNext = false;
            Dialog.confirm({
                title: "注意",
                message: "提交后不可再对合格证内容进行编辑",
                confirmButtonText: "确认提交",
                cancelButtonText: "继续完善"
            })
                .then(() => {
                    this.carKmSubmit();
                })
                .catch(() => {
                    this.canNext = true;
                });
        },
        // 保存合格证信息接口
        carKmSubmit() {
            let params = this.postInfo;
            undisposedApi.saveBillCertificate(params).then(res => {
                this.$toast.loading("信息提交中……");
                this.canNext = true;
                if (res.code == 20000) {
                    this.$toast.success("提交成功");
                    setTimeout(() => {
                        this.$toast.clear();
                        this.$router.replace({
                            path: "tailAiDiagnosisReport",
                            query: {
                                billId: this.billId
                            }
                        });
                    }, 2000);
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        focus() {
            this.inputFocus = true;
            this.inputBorderColor = "border:1px solid #ccc";
        },
        blur() {
            this.inputFocus = true;
            this.inputBorderColor = "";
        },
        // 车架号禁止中文
        vinInput() {
            this.postInfo.vin = this.postInfo.vin.replace(/[\W]/g, "");
        },
        // 后退自定义
        back() {
            console.log("this.isPopShow", this.isPopShow);
            if (this.isPopShow) {
                this.isPopShow = false;
            } else {
                jnsApi.h5Click().back();
            }
        },
        // 打开时间选择框
        openDatePicker(type) {
            this.datePickerType = type;
            this.isDatePickerShow = true;
        },
        // 关闭时间选择框
        closeDatePicker() {
            this.isDatePickerShow = false;
        },
        // 确认时间选择
        confirmDate(currentDate, key) {
            this.postInfo[key] = dateFormat(currentDate, "yyyy-MM-dd");
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
        height: 38px;
        line-height: 18px;
        border-radius: 5px;
        border: 1px solid #e6e6e6;
        box-sizing: border-box;
    }
    /deep/ .van-hairline--top-bottom::after {
        border-width: 0;
    }
    // /deep/ .van-field__control {
    //     height: 16px;
    // }
    /deep/ .van-cell__right-icon {
        line-height: 18px;
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

