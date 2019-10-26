<!--
 * @Description: 车型信息
 * @Author: wjx
 * @Date: 2019-08-22 17:00:20 11111111111111111 45456456454564545
 * url: index.html?token=1fb04e5c42a308f5093cc20b627aae97&vin=WP0AA2978BL012976&#/billing/carModelInfo
 -->

<template>
    <div class="page carModelInfo" v-show="pageShow">
        <background />
        <headerOne
            :title="title"
            :isFixed="true"
            :backgroundStatus="true"
            :onClickLeftStatus="true"
            @onClickLeft="back"
        />
        <div v-show="isShow==1" class="main-container">
            <div class="from">
                <van-field
                    label="车架号"
                    label-align="right"
                    :placeholder="baseInfo.vin?baseInfo.vin:'请输入车架号'"
                    v-model="baseInfo.vin"
                    readonly
                    :border="false"
                    :error-message="errorMessage.vin"
                />

                <van-field
                    label="车系车型"
                    label-align="right"
                    :placeholder="baseInfo.carBrandName?baseInfo.carBrandName+' '+baseInfo.carLineName:'请选择车系车型'"
                    :value="baseInfo.carBrandName+baseInfo.carLineName"
                    readonly
                    is-link
                    :border="false"
                    @click="carBrandShow"
                    :error-message="errorMessage.carLineName"
                />

                <van-field
                    type="number"
                    label="排量"
                    label-align="right"
                    :placeholder="baseInfo.carCc?baseInfo.carCc:'请输入排量'"
                    v-model="baseInfo.carCc"
                    class="cc"
                    :border="false"
                    clearable
                    @input="notNull('carCc','排量')"
                    @blur="notNull('carCc','排量')"
                    :error-message="errorMessage.carCc"
                >
                    <van-button
                        class="left"
                        slot="button"
                        size="small"
                        :class="ccState==0?'blue':''"
                        @click="ccUpType('L')"
                    >L</van-button>
                    <van-button
                        class="right"
                        slot="button"
                        size="small"
                        :class="ccState==1?'blue':''"
                        @click="ccUpType('T')"
                    >T</van-button>
                </van-field>

                <van-field
                    label="年款"
                    label-align="right"
                    :placeholder="baseInfo.nianKuan?baseInfo.nianKuan:'请选择年款'"
                    readonly
                    is-link
                    :border="false"
                    v-model="baseInfo.nianKuan"
                    @click="selectDateTime"
                    :error-message="errorMessage.nianKuan"
                />

                <van-field
                    label="变速箱"
                    label-align="right"
                    :placeholder="baseInfo.gearboxType?baseInfo.gearboxType:'请选择变速箱'"
                    :border="false"
                    @click="showGearboxTypeHandle"
                    v-model="baseInfo.gearboxType"
                    :error-message="errorMessage.gearboxType"
                />
            </div>
            <pubButton title="下一步" @buttonConfirm="errorMessageData()" :isFixed="true" />
        </div>
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
                :carLineId="baseInfo.carLineId"
            />
        </div>
        <!-- 选择变速箱 -->
        <div class="gearboxType" v-show="isShow == 5">
            <gearboxType
                :title="'请选择变速箱'"
                :checked="baseInfo.gearboxType"
                @gearboxTypeConfirm="gearboxTypeConfirm"
            />
        </div>
        <!-- 请选择年款 :default-index="yearIndex" -->
        <van-popup v-model="carStyleShow" position="bottom">
            <van-picker
                show-toolbar
                title="选择年款"
                :default-index="yearIndex"
                :columns="currentDate"
                @cancel="onCancel"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import pubButton from "@/components/public/pubButton";
import billApi from "@/api/bill/createNew";
import jnsApi from "@/utils/jnsApi";
import background from "@/components/background/background";
const gearboxType = () => import("@/components/carInfo/gearboxType");
const selectCar = () => import("@/components/selectCar/selectCar");
const selectCarLine = () => import("@/components/selectCar/selectCarLine");
import { Field, DatetimePicker, Picker } from "vant";

import { getUrlParams } from "@/utils/common";

export default {
    components: {
        headerOne,
        [Field.name]: Field,
        pubButton,
        background,
        gearboxType,
        selectCar,
        selectCarLine,
        [DatetimePicker.name]: DatetimePicker,
        [Picker.name]: Picker
    },
    data() {
        return {
            pageShow: false, //默认不显示
            backShow: true, //默认不是后退
            checkState: false, // 验证状态
            title: this.$route.meta.title,
            ccType: "", //排量单位
            ccState: 0, // 排量状态
            isShow: 1, //显示那个模块,1:基础信息，2:选择车辆版本，3:选择车辆品牌，4:选择车系,5:选择变速箱,
            currentDate: [], //年款数组
            carStyleShow: false,
            selectYear: "",
            yearIndex: 0, //年款指定的下标
            yearValue: 2019, //年款指定的下标
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
            // 需要验证的字段
            errorMessage: {
                vin: "",
                carLineName: "",
                carCc: "",
                nianKuan: "",
                gearboxType: ""
            },
            carTitle: {
                "1": this.$route.meta.title, // 车辆信息
                "2": "选择车系",
                "3": "选择车型",
                "5": "选择变速箱"
            },
            // 品牌车系
            tmpCarBrand: {
                carBrandId: "",
                carBrandName: "",
                iconName: ""
            },
            // 储存链接上的参数
            getUrlArr: {
                status: "", //APP来源 ios androad
                vin: "", //车架号
                plate: "", //车牌号码
                billId: "", //工单ID
                workBoardId: "", //接车工单ID
                dedicatedType: "" //专项检测工单
            },
            billType_list: [], //工单列表
            billId: "", //缓存的预约单ID
            workBoardId: "", //缓存的接车单ID
            reportType: "", //前面缓存过来的工单类型
            createNewVal: 1 //有缓存
        };
    },
    created() {
        // billId=21354  workBoardId=873  车牌号码 plate=%E7%B2%A4Y67896
        //
        // 1、没有预约单ID，也没有接车单ID，没有缓存数据，只有车架号
        // 2、没有预约单ID，也没有接车单ID,有缓存数据，有车架号
        // index.html?token=1fb04e5c42a308f5093cc20b627aae97&vin=WP0AA2978BL012976&plate=&status=ios&#/billing/carModelInfo
        // 3、没有预约单ID，有接车单ID，没有缓存数据(有缓存)，没有车架号
        // index.html?token=1fb04e5c42a308f5093cc20b627aae97&workBoardId=873&vin=&plate=&status=ios&#/billing/carModelInfo
        // 4、没有预约单ID，有接车单ID，没有缓存数据(有缓存)，有车架号
        //index.html?token=1fb04e5c42a308f5093cc20b627aae97&workBoardId=873&vin=WP0AA2978BL012976&plate=&status=ios&#/billing/carModelInfo
        // 5、有预约单ID，没有接车单ID,没有缓存数据(有缓存)，没有车架号
        // index.html?token=1fb04e5c42a308f5093cc20b627aae97&billId=12345&vin=&plate=&status=ios&#/billing/carModelInfo
        // 6、有预约单ID，没有接车单ID，没有缓存数据(有缓存)，有车架号
        // index.html?token=1fb04e5c42a308f5093cc20b627aae97&billId=12345&vin=WP0AA2978BL012976&plate=&status=ios&#/billing/carModelInfo
        // 7、没有预约单ID，没有接车单ID,没有缓存数据(有缓存)，没有车架号,dedicatedType=J003专项检测
        // index.html?token=1fb04e5c42a308f5093cc20b627aae97&billId=12345&vin=&plate=&status=ios&#/billing/carModelInfo
        // 8、没有预约单ID，没有接车单ID，没有缓存数据(有缓存)，有车架号,dedicatedType=J003专项检测
        // index.html?token=1fb04e5c42a308f5093cc20b627aae97&billId=12345&vin=WP0AA2978BL012976&plate=&status=ios&#/billing/carModelInfo

        //年款数组
        this.currentArr();
        // 是否是车主信息页面后退的
        let backShow = this.$session.get("backShow")
            ? this.$session.get("backShow")
            : 1;
        if (backShow == 2) {
            this.backShow = false;
        }
        this.$session.set("billCode", "");
        // 开单页面选择工单 缓存过来的工单类型
        this.reportType = this.$local.get("reportType");

        let getUrlArr = getUrlParams();
        this.getUrlArr = getUrlArr;

        if (getUrlArr.reportType) {
            this.reportType = getUrlArr.reportType;
            this.$local.set("reportType", getUrlArr.reportType);
        }

        //预约单
        if (getUrlArr.billId) {
            //如果能获取到billId
            this.billId = getUrlArr.billId;
            this.$local.set("billId", getUrlArr.billId); //永久缓存
            this.$local.set("reportType", "");
        } else if (getUrlArr.workBoardId) {
            //接车单
            this.workBoardId = getUrlArr.workBoardId;
            this.$local.set("workBoardId", getUrlArr.workBoardId); //永久缓存
            this.$local.set("reportType", "");
        } else {
            //缓存数据
            let getBillId = this.$local.get("billId")
                ? this.$local.get("billId")
                : "";
            let getWorkBoardId = this.$local.get("workBoardId")
                ? this.$local.get("workBoardId")
                : "";
            if (getBillId) {
                this.billId = getBillId;
            } else if (getWorkBoardId) {
                this.workBoardId = getWorkBoardId;
            }
        }

        //专项检测工单类型
        if (getUrlArr.dedicatedType && getUrlArr.dedicatedType == "J003") {
            this.reportType = "J003";
            this.$local.set("reportType", "J003");
        }
        // console.log(this.baseInfo);
        if (getUrlArr.vin) {
            //缓存URL数据
            let getbaseInfo = this.$local.get("baseInfo")
                ? this.$local.get("baseInfo")
                : "";
            //console.log(getbaseInfo)
            //有缓存的基本数据
            if (getbaseInfo) {
                getbaseInfo = getbaseInfo;
                //判断 车架号是否一致
                if (getbaseInfo.vin && getbaseInfo.vin == getUrlArr.vin) {
                    //修改了车牌号
                    if (getUrlArr.plate) {
                        let plate = decodeURI(getUrlArr.plate);
                        getbaseInfo.plateNumberP = plate.substring(0, 1);
                        getbaseInfo.plateNumberC = plate.substring(1, 2);
                        getbaseInfo.plateNumber = plate.substring(2);
                    }
                    this.createNewVal = 2;
                    this.getData(getbaseInfo);
                }
            } else {
                if (getUrlArr.plate) {
                    let plate = decodeURI(getUrlArr.plate);
                    this.baseInfo.plateNumberP = plate.substring(0, 1);
                    this.baseInfo.plateNumberC = plate.substring(1, 2);
                    this.baseInfo.plateNumber = plate.substring(2);
                }
            }
        } else if (!getUrlArr.vin) {
            //判断没有车架号则调起原生控件
            this.frameNum();
            return false;
        }
        //获取全部工单类型
        this.createNew();
    },
    mounted() {
        window["andClick"] = () => {
            this.back();
        };
    },
    methods: {
        //
        //请求数据处理
        paramsData() {
            //校验是否有参数
            if (this.billId) {
                this.getBillDetail();
            } else if (this.workBoardId && this.createNewVal == 1) {
                let params = {
                    workBoardId: this.workBoardId
                };
                this.getCreateNew(params);
            } else if (this.getUrlArr.vin) {
                this.baseInfo.vin = this.getUrlArr.vin;
                this.checkRestrict();
            }
        },
        //数据赋值处理
        getData(baseInfo) {
            for (let i in this.baseInfo) {
                // console.log(i);
                // console.log(baseInfo[i]);
                if (baseInfo[i]) {
                    this.baseInfo[i] = baseInfo[i];
                    if (i == "carCc" && baseInfo[i]) {
                        var carCcVal = parseFloat(baseInfo[i]);
                        this.baseInfo.carCc = carCcVal; //不带单位的排量赋值
                        if (!this.baseInfo.dwUnit) {
                            let dwUnitVal = "L";
                            if (baseInfo[i].toString().indexOf("T") > -1) {
                                dwUnitVal = "T";
                            }
                            this.baseInfo.dwUnit = dwUnitVal;
                            this.ccUpType(this.baseInfo.dwUnit);
                        }
                    }
                    //排量单位
                    if (i == "dwUnit" && baseInfo[i]) {
                        this.baseInfo.dwUnit = baseInfo[i];
                        this.ccUpType(this.baseInfo.dwUnit);
                    }
                }
            }
            this.baseInfo.carStyle = this.baseInfo.carStyle
                ? this.baseInfo.carStyle
                : this.baseInfo.produceYear;
            this.baseInfo.carStyle = this.baseInfo.carStyle
                ? this.baseInfo.carStyle
                : this.baseInfo.carYear;
            this.baseInfo.produceYear = this.baseInfo.produceYear
                ? this.baseInfo.produceYear
                : this.baseInfo.carStyle;
            this.baseInfo.carYear = this.baseInfo.carYear
                ? this.baseInfo.carYear
                : this.baseInfo.carStyle;
            this.baseInfo.nianKuan = this.baseInfo.nianKuan
                ? this.baseInfo.nianKuan
                : this.baseInfo.carYear;

            if (this.baseInfo.carBrandName && this.baseInfo.carLineName) {
                this.carModel =
                    this.baseInfo.carBrandName +
                    " " +
                    this.baseInfo.carLineName;
            } else {
                this.carModel = "";
            }
            this.baseInfo.plateNumber = this.baseInfo.plateNumber
                ? this.baseInfo.plateNumber
                : "";

            if (this.plate) {
                let plate = decodeURI(this.plate);
                this.baseInfo.plateNumberP = plate.substring(0, 1);
                this.baseInfo.plateNumberC = plate.substring(1, 2);
                this.baseInfo.plateNumber = plate.substring(2);
            }
            this.yearValue = this.baseInfo.nianKuan;
            this.checkStateFun();
            //判断有车辆基本信息 则跳转车主信息页面
            if (
                this.backShow &&
                this.baseInfo &&
                this.baseInfo.carBrandId &&
                this.baseInfo.carBrandName &&
                this.baseInfo.nianKuan &&
                this.baseInfo.carCc &&
                this.baseInfo.carLineId &&
                this.baseInfo.carLineName &&
                this.baseInfo.gearboxType
            ) {
                this.goPage();
            } else {
                this.pageShow = true;
            }
        },
        //点击修改车架号 66666666666666666 WP0AA2978BL012976
        frameNum() {
            //this.setBaseInfo();
            let vinVal = this.baseInfo.vin && this.baseInfo.vin != ""? this.baseInfo.vin: "";
            if (this.getUrlArr.status && this.getUrlArr.status == "ios") {
                window.location = "objc://" + "doFunc" + "/" + "giveVin" + "/" + vinVal;
            } else {
                android.orderlist("giveVin", vinVal);
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
            if (this.isShow == 3) {
                this.showModel(2);
                return false;
            } else if (this.isShow == 2) {
                this.showModel(1);
                return false;
            } else if (this.isShow == 5) {
                this.showModel(1);
                return false;
            }

            //缓存baseInfo
            this.$local.set("baseInfo", this.baseInfo);
            jnsApi.back();
            // if (this.leftText != "") {
            //     this.$router.back();
            // } else {
            // }
        },
        //获取开单需要的数据
        createNew() {
            billApi.getCreateNew().then(res => {
                if (res.code == 20000 && res.data) {
                    //console.log(res);
                    if (
                        res.data.billType_list &&
                        res.data.billType_list.length > 0
                    ) {
                        this.billType_list = res.data.billType_list;
                        //临时缓存工单类型
                        this.$session.set(
                            "billType_list",
                            res.data.billType_list
                        );
                    }

                    if (res.data.tech_list && res.data.tech_list.length > 0) {
                        //缓存技师列表 tech_list
                        this.$session.set("tech_list", res.data.tech_list);
                    }
                    //请求数据处理
                    this.paramsData();
                }
            });
        },
        //获取开单需要的数据1
        checkRestrict() {
            billApi.checkRestrict({ vin: this.getUrlArr.vin }).then(res => {
                if (
                    res.code == 20000 &&
                    res.data &&
                    JSON.stringify(res.data) != "{}"
                ) {
                    if (
                        res.data.billType_list &&
                        res.data.billType_list.length > 0
                    ) {
                        //临时缓存工单类型
                        this.$session.set(
                            "billType_list",
                            res.data.billType_list
                        );
                    }
                    //如果只存在一种工单类型
                    if (res.data.allowBillType) {
                        this.$local.set("reportType", res.data.allowBillType);
                    }
                    //存在缓存数据不需要渲染基本信息
                    if (this.createNewVal == 1) {
                        this.getData(res.data.baseInfo);
                        let customerBaseInfo = res.data.baseInfo?res.data.baseInfo:'';
                        if(res.data.allowBillType=='A'){
                            this.checkCustomer(customerBaseInfo);
                        }
                    }
                } else {
                    //存在缓存数据不需要请求
                    if (this.createNewVal == 1) {
                        this.checkCustomer();
                    }
                }
            });
        },
        //获取开单需要的数据2 66666666666666666 99999999999999999 WP0AA2978BL012976
        checkCustomer(customerBaseInfo) {
            //获取该车架号是否有开单历史
            billApi.checkCustomer({ vin: this.getUrlArr.vin }).then(res => {
                if (
                    res.code == 20000 &&
                    res.data &&
                    JSON.stringify(res.data) != "{}"
                ) {
                    if( customerBaseInfo && customerBaseInfo.phone){
                        res.data.phone = customerBaseInfo.phone;
                    }
                    if( customerBaseInfo && customerBaseInfo.name){
                        res.data.name = customerBaseInfo.name;
                    }
                    this.getData(res.data);
                } else {
                    this.getCarInfoByVin();
                }
            });
        },
        //获取开单需要的数据3
        getCarInfoByVin() {
            billApi.getCarInfoByVin({ vin: this.getUrlArr.vin }).then(res => {
                if (
                    res.code == 20000 &&
                    res.data &&
                    JSON.stringify(res.data) != "{}"
                ) {
                    this.baseInfo.carType = 0;
                    this.getData(res.data[0]);
                } else {
                    this.pageShow = true;
                }
            });
        },
        //有预约单号 获取数据
        getBillDetail() {
            billApi.getBillDetail({ billId: this.billId }).then(res => {
                if (res.code == 20000 && res.data && res.data.baseInfo) {
                    let baseInfo = res.data.baseInfo;
                    if (this.getUrlArr.vin) {
                        baseInfo.vin = this.getUrlArr.vin;
                    }
                    if (
                        res.data.billType_list &&
                        res.data.billType_list.length > 0
                    ) {
                        //临时缓存工单类型
                        this.$session.set(
                            "billType_list",
                            res.data.billType_list
                        );
                    }
                    //如果只存在一种工单类型
                    if (
                        baseInfo.allowBillType &&
                        baseInfo.allowBillType.length == 1 &&
                        baseInfo.allowBillType[0].billType
                    ) {
                        this.$local.set(
                            "reportType",
                            baseInfo.allowBillType[0].billType
                        );
                    } else if (
                        baseInfo.allowBillType &&
                        baseInfo.allowBillType.length > 1
                    ) {
                        let billTypeList = [];
                        this.billType_list.forEach(item => {
                            baseInfo.allowBillType.forEach(items => {
                                if (item.billTypeKey == items.billType) {
                                    billTypeList.push(item);
                                }
                            });
                        });
                        this.$session.set("billType_list", billTypeList);
                        this.$session.set("billCode", "YHJC10000");
                    }
                    //存在缓存数据不需要渲染基本信息
                    if (this.createNewVal == 1) {
                        this.getData(baseInfo);
                    }

                    if (
                        res.data.channelCode &&
                        res.data.channelCode == "YHJC10000"
                    ) {
                        this.$session.set("billCode", "YHJC10000");
                    }
                    this.checkRestrict();
                }
            });
        },
        //获取接车单信息
        getCreateNew(params) {
            billApi.getCreateNew(params).then(res => {
                if (res.code == 20000 && res.data && res.data.workBoardData) {
                    if (this.getUrlArr.vin) {
                        res.data.workBoardData.vin = this.getUrlArr.vin;
                    }
                    this.getData(res.data.workBoardData);
                    this.checkRestrict();
                }
            });
        },
        //
        showModel(status) {
            this.isShow = status;
            this.title = this.carTitle[status];
        },
        // 显示车系
        carBrandShow() {
            this.showModel(2);
        },
        //篡改车辆全称
        getCarFullName() {
            this.baseInfo.carModelFullName = "";
            this.checkStateFun();
        },
        /**
         * @Description: 选择品牌
         * @Param: item 选中的品牌
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-23 15:08:28
         */
        carBrandConfirm(item) {
            //先缓存选中的车辆品牌
            this.tmpCarBrand.carBrandId = item.id;
            this.tmpCarBrand.carBrandName = item.brandName;
            this.tmpCarBrand.icoName = item.icoName;
            this.$nextTick(() => {
                this.showModel(3);
            });
        },
        /**
         * @Description: 选择车系
         * @Param: item 选中的车系
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-23 15:09:03
         */
        carLineConfirm(item) {
            this.baseInfo.carBrandId = this.tmpCarBrand.carBrandId;
            this.baseInfo.carBrandName = this.tmpCarBrand.carBrandName;
            this.baseInfo.icoName = this.tmpCarBrand.icoName;
            this.baseInfo.carLineId = item.id;
            this.baseInfo.carLineName = item.lineName;
            this.errorMessage.carLineName = "";
            this.getCarFullName();
            this.showModel(1);
        },
        /**
         * @Description: 显示年款控制组件
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-23 15:13:41
         */
        selectDateTime() {
            this.carStyleShow = true;
        },
        //取消年款选择
        onCancel() {
            this.carStyleShow = false;
        },
        //选中年款
        onConfirm(value, index) {
            this.yearIndex = index;
            this.baseInfo.carStyle = value;
            this.baseInfo.produceYear = value;
            this.baseInfo.carYear = value;
            this.baseInfo.nianKuan = value;
            this.carStyleShow = false;
            this.errorMessage.nianKuan = "";
            this.getCarFullName();
        },
        //年款数组
        currentArr() {
            this.currentDate = [];
            for (let i = new Date().getFullYear(); i > 1999; i--) {
                this.currentDate.push(i);
            }
        },
        //
        getColumnValue(date) {
            let res = date.getFullYear();
            this.selectYear = res;
        },
        // 切换排量类型
        ccUpType(type) {
            this.dwUnit = type;
            this.ccType = type;
            this.baseInfo.dwUnit = type;
            if (type == "L") {
                this.ccState = 0;
            } else {
                this.ccState = 1;
            }
            this.getCarFullName();
        },
        // 显示变速箱
        showGearboxTypeHandle() {
            this.showModel(5);
        },
        // 确定变速箱类型
        gearboxTypeConfirm(value) {
            // console.log(value);
            this.showModel(1);
            this.baseInfo.gearboxType = value;
            this.errorMessage.gearboxType = ""; //提示语置空
            this.getCarFullName();
        },
        //校验提示
        errorMessageData() {
            //提示语 this.errorMessage.nianKuan
            let errorMessageTips = {
                vin: "请输入车架号",
                carLineName: "请选择车系车型",
                carCc: "请输入排量",
                nianKuan: "请选择年款",
                gearboxType: "请选择变速箱"
            };
            //判断校验
            for (var i in this.errorMessage) {
                if (this.baseInfo[i] == "") {
                    this.errorMessage[i] = errorMessageTips[i];
                    return false;
                } else {
                    this.errorMessage[i] = "";
                }
            }
            if (this.checkState) {
                this.goPage();
            }
        },
        //跳转页面
        goPage() {
            //缓存baseInfo
            this.$local.set("baseInfo", this.baseInfo);
            this.$router.push({
                path: "customerInfo"
            });
        },
        //校验是否填写全部数据
        checkStateFun() {
            for (var i in this.errorMessage) {
                if (this.baseInfo[i] == "") {
                    this.checkState = false;
                    return false;
                }
            }
            this.checkState = true;
        },
        // 非空验证
        notNull(target, name) {
            if (target == "carCc") {
                console.log(this.baseInfo[target]);
                let num = this.baseInfo[target];
                num = num.substring(0, 3);
                num = num.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
                num = num.replace(/^\./g, ""); //验证第一个字符是数字
                num = num.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
                num = num
                    .replace(".", "$#$")
                    .replace(/\./g, "")
                    .replace("$#$", ".");
                num = num.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数

                this.baseInfo[target] = num;
                // //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                // if(num.indexOf(".")< 0 && num !=""){
                //     num = parseFloat(num);
                // }else if(num==''){
                //    num = parseFloat(num).toFixed(1);
                // }
                // this.baseInfo.[target] = num;
            }
            this.getCarFullName();
            if (this.baseInfo[target]) {
                this.errorMessage[target] = "";
            }
        }
    }
};
</script>

<style lang="less" scoped>
.carModelInfo {
    .from {
        /deep/.van-field__body {
            border-bottom: 1px solid;
            padding-bottom: 5px;
        }
        /deep/ .van-field__label--right {
            padding-right: 20px;
        }
        /deep/ .van-cell__right-icon {
            position: absolute;
            right: 10px;
        }

        .van-button--small {
            min-width: 1.2rem;
        }
        border-radius: 5px;
        padding: 10px;
        background-color: #fff;
        .cc {
            .left {
                border-radius: 5px 0px 0px 5px;
            }
            .right {
                border-radius: 0px 5px 5px 0px;
            }
            .blue {
                background-color: #46aef7;
                color: #fff;
                border: 1px solid #46aef7;
            }
        }
    }
}
</style>