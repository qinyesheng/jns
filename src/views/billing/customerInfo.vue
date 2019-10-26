<!--
 * @Description: 用户信息
 * @Author: wjx
 * @Date: 2019-08-23 16:38:13
 -->

<template>
    <div class="page customerInfo">
        <background />
        <headerOne
            :title="$route.meta.title"
            :isFixed="true"
            :backgroundStatus="true"
            :onClickLeftStatus="true"
            @onClickLeft="back"
        />
        <div class="main-container">
            <div class="info">{{baseInfo.carModelFullName}}</div>
            <div class="from">
                <van-field
                    label="推荐人手机号"
                    label-align="right"
                    placeholder="请输入推荐人手机号"
                    type="number"
                    v-model="baseInfo.referee.refereePhone"
                    clearable
                    maxlength="11"
                    :border="false"
                    @focus="refereeFocus()"
                    @input="refereeInput()"
                    @blur="refereeBlur()"
                    :error-message="errorMessage.referee"
                />
                <!-- 推荐人数据 -->
                <div class="refereePage" v-show="refereeArrData.length>0">
                    <div class="refereeMain">
                        <div class="refereeTitle" v-show="refereeArrShow">最近推荐人</div>
                        <div class="refereeTitle" v-show="refereeArrHide">匹配结果</div>
                        <div
                            class="refereeLi"
                            v-for="(item,index) in refereeArrData"
                            :key="index"
                            @click="refereeClick(item)"
                        >
                            <div class="refereePhone">{{item.refereePhone}}</div>
                            <div class="refereeName">{{item.refereeName}}</div>
                        </div>
                    </div>
                </div>
                <van-field
                    label="客户姓名"
                    label-align="right"
                    placeholder="请输入客户姓名"
                    v-model="baseInfo.userName"
                    :error-message="errorMessage.userName"
                    clearable
                    :border="false"
                    @input="inputValue('userName')"
                />
                <van-field
                    label="手机号"
                    label-align="right"
                    placeholder="请输入手机号"
                    v-model="baseInfo.phone"
                    type="number"
                    maxlength="11"
                    clearable
                    :border="false"
                    @input="inputValue('phone')"
                    :error-message="errorMessage.phone"
                />
                <div class="carNum">
                    <div class="title">车牌号码</div>
                    <van-field
                        readonly
                        clickable
                        :value="baseInfo.plateNumberP"
                        @click="openPop('plateNumberP')"
                    />
                    <van-field
                        readonly
                        clickable
                        :value="baseInfo.plateNumberC"
                        @click="openPop('plateNumberC')"
                    />
                    <van-field
                        v-model="baseInfo.plateNumber"
                        maxlength="6"
                        clearable
                        placeholder="请输入车牌号码"
                        :border="false"
                        @input="inputValue('plateNumber')"
                        :error-message="errorMessage.plateNumber"
                    />
                </div>
                <van-field
                    label="公里数(km)"
                    label-align="right"
                    placeholder="请输入公里数"
                    v-model="baseInfo.tripDistance"
                    type="number"
                    maxlength="11"
                    clearable
                    :border="false"
                    @input="inputValue('tripDistance')"
                    :error-message="errorMessage.tripDistance"
                />

                <van-field
                    label="燃油表(%)"
                    label-align="right"
                    placeholder="请输入燃油表"
                    v-model="baseInfo.fuelMeter"
                    type="number"
                    clearable
                    @input="inputValue('fuelMeter')"
                    @blur="inputValue('fuelMeter')"
                    @keydown.native="keyDownHandle"
                    :border="false"
                    :error-message="errorMessage.fuelMeter"
                />
            </div>
            <rollListSelect :listInfo="listInfo" :show="show" @confirm="confirm" @cancel="cancel" />
            <pubButton title="下一步" :isFixed="true" @buttonConfirm="nextClick()" />
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import rollListSelect from "@/components/rollList/rollListSelect";
import { Field } from "vant";
import pubButton from "@/components/public/pubButton";
import background from "@/components/background/background";
import billApi from "@/api/bill/createNew";
import jnsApi from "@/utils/jnsApi";
export default {
    components: {
        headerOne,
        pubButton,
        background,
        [Field.name]: Field,
        rollListSelect
    },
    data() {
        return {
            checkState: false, // 验证状态
            // 此处对应要校验的值
            errorMessage: {
                referee: "",
                userName: "",
                phone: "",
                plateNumber: "",
                tripDistance: "",
                fuelMeter: ""
            },
            baseInfo: {
                referee: {
                    refereePhone: "",
                    refereeName: ""
                },
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
                gearboxType: "",
                icoName: "",
                nianKuan: "",
                produceYear: "",
                saleName: "",
                dwUnit: "L",
                carKm: "",
                carStyle: "",
                carType: 1, //默认值1, 0估车网 1系统和车主填写信息
                carYear: "",

                isBlockPolicy: 0,
                isWxOpenId: 0,

                userName: "",
                phone: "",
                plateNumber: "",
                plateNumberC: "A",
                plateNumberP: "粤",
                produceYear: "",
                tripDistance: "",
                fuelMeter: ""
            },
            refereePhone: "", //推荐人电话
            refereeName: "", //推荐人名称
            refereeArr: [], //推荐人
            refereeArrData: [], //渲染页面数据
            refereeArrShow: false,
            refereeArrHide: false,
            refereeVal: false,
            show: false,
            listInfo: [], //用于选择控件的数组
            rollListInfo: {
                selectType: "",
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
            }
        };
    },
    created() {
        let getbaseInfo = this.$local.get("baseInfo")
            ? this.$local.get("baseInfo")
            : "";
        //有缓存的基本数据
        if (getbaseInfo) {
            this.getData(getbaseInfo);
        }

        //判断是否存在推荐人缓存数据
        if (this.$local.get("refereeArr")) {
            let refereeArr = this.$local.get("refereeArr");
            if (refereeArr.length > 0) {
                this.refereeArr = refereeArr;
            }
        }
    },
    mounted() {
        window["andClick"] = () => {
            this.back();
        };
    },
    methods: {
        //数据赋值处理
        getData(baseInfo) {
            for (let i in baseInfo) {
                this.baseInfo[i] = baseInfo[i];
            }
            //this.baseInfo.plateNumber = this.baseInfo.plateNumber?this.baseInfo.plateNumber:'';

            if (this.baseInfo.carModelFullName == "") {
                this.baseInfo.carModelFullName =
                    this.baseInfo.carBrandName +
                    " " +
                    this.baseInfo.carLineName +
                    " " +
                    this.baseInfo.produceYear +
                    "款 " +
                    parseFloat(this.baseInfo.carCc).toFixed(1) +
                    this.baseInfo.dwUnit +
                    " " +
                    this.baseInfo.gearboxType;
            }
        },
        /**
         * @Description: 后退事件
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-26 15:15:49
         */
        back() {
            //校验填写的推荐人
            if (this.baseInfo.referee.refereePhone != this.refereePhone) {
                this.baseInfo.referee.refereeName = "";
            }
            this.$session.set("backShow", 2);
            //缓存baseInfo
            this.$local.set("baseInfo", this.baseInfo);
            if (this.leftText != "") {
                this.$router.back();
            } else {
                jnsApi.back();
            }
        },
        //跳转到派单页面
        nextClick() {
            this.getMessageFun();
            if (this.checkState) {
                //校验填写的推荐人
                if (this.baseInfo.referee.refereePhone != this.refereePhone) {
                    this.baseInfo.referee.refereeName = "";
                }
                //缓存baseInfo carBodyCheckMenuIndex
                this.$local.set("baseInfo", this.baseInfo);
                // this.$local.set("vin", this.baseInfo.vin);
                this.$router.push({
                    path: "carBodyCheckMenuIndex"
                });
            }
        },
        //选择推荐人
        refereeClick(item) {
            this.refereePhone = item.refereePhone;
            this.refereeName = item.refereeName;
            this.baseInfo.referee.refereePhone = item.refereePhone;
            this.baseInfo.referee.refereeName = item.refereeName;
            // console.log(this.baseInfo.referee.refereePhone);
            this.refereeArrData = [];
            this.refereeArrShow = false;
            this.refereeArrHide = false;
        },
        //获取输入推荐人
        refereeInput() {
            //正在输入时不需要提示
            this.errorMessage.referee = "";

            if (
                this.refereeArr.length > 0 &&
                this.baseInfo.referee.refereePhone == ""
            ) {
                this.refereeArrData = this.refereeArr;
                this.refereeArrShow = true;
                this.refereeArrHide = false;
            } else if (this.baseInfo.referee.refereePhone.length > 0) {
                this.refereeArrData = [];
                this.refereeArrShow = false;
                this.refereeArrHide = false;
                if (this.baseInfo.referee.refereePhone.length > 6) {
                    billApi
                        .getReferee({
                            mobile: this.baseInfo.referee.refereePhone
                        })
                        .then(res => {
                            if (
                                res.code == 20000 &&
                                res.data &&
                                res.data.list &&
                                res.data.list.length > 0
                            ) {
                                let phoneArr = [];
                                res.data.list.forEach(item => {
                                    let dataObj = {
                                        refereePhone: item.user_mobile,
                                        refereeName: item.user_name
                                    };
                                    phoneArr.push(dataObj);
                                });
                                this.refereeArrHide = true;
                                this.refereeArrData = phoneArr;
                            }
                        });
                }
            }
            this.refereeVal = false;
        },
        //移出
        refereeBlur() {
            if (this.baseInfo.referee.refereePhone == "") {
                setTimeout(function() {
                    this.errorMessage.referee = "";
                    this.refereeArrData = [];
                    this.refereeArrShow = false;
                    this.refereeArrHide = false;
                }, 100);
            }
            if (this.baseInfo.referee.refereePhone.length == 11) {
                this.refereeArrData = [];
            }
            if (this.refereeArrData.length == 0) {
                this.refereeVal = true;
            } else if (
                this.refereeArrData.length > 0 &&
                this.baseInfo.referee.refereePhone.length != ""
            ) {
                let _this = this;
                setTimeout(function() {
                    _this.refereeVal = true;
                }, 100);
            }
        },
        //移入推荐人缓存数据显示
        refereeFocus() {
            if (
                this.refereeArr.length > 0 &&
                this.baseInfo.referee.refereePhone == ""
            ) {
                this.refereeArrData = this.refereeArr;
                this.refereeArrShow = true;
                this.refereeArrHide = false;
            } else if (
                this.baseInfo.referee.refereePhone != "" &&
                this.baseInfo.referee.refereePhone.length != 11
            ) {
                this.refereeArrShow = true;
                this.refereeArrHide = false;
            } else {
                this.refereeArrData = [];
                this.refereeArrShow = false;
                this.refereeArrHide = false;
            }
        },
        //字段校验
        getMessageFun() {
            this.checkState = true;
            for (var i in this.errorMessage) {
                if (i == "referee") {
                    if (
                        this.baseInfo[i].refereePhone != "" &&
                        this.baseInfo[i].refereePhone.length != 11
                    ) {
                        this.checkState = false;
                        if (this.refereeVal) {
                            this.errorMessage[i] = "推荐人手机号格式不正确";
                            return false;
                        } else {
                            this.errorMessage[i] = "";
                        }
                    } else {
                        this.errorMessage[i] = "";
                    }
                } else if (i == "userName") {
                    if (this.baseInfo[i] == "") {
                        this.errorMessage[i] = "客户姓名不能为空";
                        this.checkState = false;
                        return false;
                    } else {
                        this.errorMessage[i] = "";
                    }
                } else if (i == "phone") {
                    if (this.baseInfo[i] == "") {
                        this.errorMessage[i] = "手机号不能为空";
                        this.checkState = false;
                        return false;
                    } else if (this.baseInfo[i].length != 11) {
                        this.errorMessage[i] = "手机格式不正确";
                        this.checkState = false;
                        return false;
                    } else {
                        this.errorMessage[i] = "";
                    }
                } else if (i == "plateNumber") {
                    if (this.baseInfo[i] == "") {
                        this.errorMessage[i] = "车牌号码不能为空";
                        this.checkState = false;
                        return false;
                    } else if (this.baseInfo[i].length < 5) {
                        this.errorMessage[i] = "车牌号码格式不正确";
                        this.checkState = false;
                        return false;
                    } else {
                        this.errorMessage[i] = "";
                    }
                } else if (i == "tripDistance") {
                    if (this.baseInfo[i] == "") {
                        this.errorMessage[i] = "公里数不能为空";
                        this.checkState = false;
                        return false;
                    } else {
                        this.errorMessage[i] = "";
                    }
                } else if (i == "fuelMeter") {
                    if (this.baseInfo[i] == "") {
                        this.errorMessage[i] = "燃油表不能为空";
                        this.checkState = false;
                        return false;
                    } else {
                        this.errorMessage[i] = "";
                    }
                }
            }
        },
        //输入校验
        inputValue(target) {
            for (var i in this.errorMessage) {
                this.errorMessage[i] = "";
            }

            if (target == "tripDistance") {
                return false;
                if (this.baseInfo[target] == "") {
                    this.errorMessage[target] = name + "不能为空";
                } else {
                    this.errorMessage[target] = "";
                }
            }

            if (target == "fuelMeter") {
                if (
                    this.baseInfo[target] != "" &&
                    this.baseInfo[target] > 100
                ) {
                    this.baseInfo[target] = 100;
                }
            }
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
        openPop(type) {
            // 滚动选择控件的调用处理
            switch (type) {
                case "plateNumberP":
                    this.assignmentProcess("plateNumberP");
                    break;
                case "plateNumberC":
                    this.assignmentProcess("plateNumberC");
                    break;
                default:
                    break;
            }
            this.show = true;
        },
        /**
         * @Description: 键盘输入监听
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-10 11:32:17
         */
        keyDownHandle(e) {
            // console.log(e);
            let key = e.key;
            // 不允许输入'.'
            if (key === ".") {
                e.returnValue = false;
                return false;
            }
            return true;
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
        assignmentProcess(type) {
            // console.log(type);
            this.rollListInfo["selectType"] = type;
            this.listInfo = this.rollListInfo[type];
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
                case "plateNumberP":
                    this.baseInfo["plateNumberP"] = val;
                    break;
                case "plateNumberC":
                    this.baseInfo["plateNumberC"] = val;
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
<style lang="less" scoped>
.customerInfo {
    .info {
        border-radius: 5px;
        background-color: #fff;
        padding: 6px 15px;
        margin-bottom: 15px;
        color: #969799;
        line-height: 28px;
    }
    .from {
        border-radius: 5px;
        padding: 10px;
        background-color: #fff;
        /deep/ .van-field__label--right {
            padding-right: 20px;
        }
        /deep/.van-field__body {
            border-bottom: 1px solid;
            padding-bottom: 5px;
        }
        .carNum {
            display: flex;
            align-items: baseline;
            text-align: right;
            padding: 0.26667rem 0.4rem;
            .title {
                font-size: 14px;
                width: 29%;
                padding-right: 7%;
            }
            /deep/ .van-cell {
                width: 12%;
                padding: 0;
                /deep/.van-field__body {
                    input {
                        text-align: center;
                    }
                }
            }
            /deep/ .van-cell__value--alone {
                color: #969799;
            }
            /deep/ .van-cell:nth-child(4) {
                width: 40%;
                /deep/.van-field__body {
                    input {
                        text-align: left;
                        padding-left: 10px;
                    }
                }
            }
            /deep/ .van-cell:not(:last-child)::after {
                border: 0px;
            }
        }
        .refereePage {
            .refereeMain {
                width: 62%;
                float: right;
                padding: 0px;
                .refereeTitle {
                    font-size: 12px;
                    color: #ccc;
                    padding-bottom: 10px;
                }
                .refereeLi {
                    border-top: 1px solid #ccc;
                    line-height: 38px;
                    font-size: 14px;
                    height: 38px;
                    .refereePhone {
                        float: left;
                    }
                    .refereeName {
                        float: right;
                    }
                }
                .refereeLi:nth-child(2) {
                    border-top: 0px;
                }
            }
        }
    }
    .hui {
        background-color: #f2f2f2;
        border: 1px solid #f2f2f2;
        color: #fff;
    }
}
</style>