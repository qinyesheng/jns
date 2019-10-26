<!--
 * @Description: 设置工单任务
 * @Author: qys
 * @Date: 2019-08-22
 -->
<template>
    <div class="page">
        <headerOne
            :title="$route.meta.title"
            :isFixed="true"
            :backgroundStatus="true"
            :onClickLeftStatus="true"
            @onClickLeft="back"
        />
        <background />
        <div class="main-container">
            <van-cell
                v-for="(item,key) in billTypeList"
                :key="key"
                :title="item.billTypeName"
                title-class="title-style"
                label-class="label-main"
            >
                <template v-if="item.price" slot="label">
                    <span>{{'报告费用 '+item.price}}</span>
                </template>
                <template slot="default">
                    <span class="default-style">{{item.techName}}</span>
                    <van-switch
                        :value="item.checked"
                        @input="onInputFun(item.billType,key)"
                        size="18px"
                        inactive-color="#ededed"
                        class="switch-icon"
                    />
                    <van-icon
                        v-if="item.type=='user'"
                        @click="deleteBillType(item,key)"
                        class="cross-type"
                        name="cross"
                    />
                </template>
            </van-cell>
            <!-- 新建工单类型 -->
            <van-cell title="新建工单类型" title-class="title-style" v-show="addBillShow">
                <van-icon slot="right-icon" name="add-o" class="add-bill" @click="addBillFun()" />
            </van-cell>
            <slotDialog
                title="新建工单类型"
                :show="dialogShow"
                @confirm="addBillConfirm"
                @cancel="addBillCancel"
            >
                <template #dialogValue>
                    <input
                        v-model="addBillValue"
                        name="example"
                        autocomplete="off"
                        class="dialog-input"
                        v-focus="focusStatus"
                        @input="addBillInput"
                    />
                </template>
            </slotDialog>
            <van-popup v-model="popupShow" position="bottom" :style="{ height: '36%', }">
                <van-picker
                    show-toolbar
                    title="选择技师"
                    :columns="choosableTechList"
                    @cancel="onCancel"
                    @confirm="onConfirm"
                />
            </van-popup>
            <pubButton title="下一步" :isFixed="true" @buttonConfirm="nextClick()" />
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import pubButton from "@/components/public/pubButton";
import background from "@/components/background/background";
import slotDialog from "@/components/dialog/slotDialog";
import billApi from "@/api/bill/createNew";
import { getUrlParams } from "@/utils/common";
import jnsApi from "@/utils/jnsApi";
import { Switch, Picker } from "vant";

export default {
    components: {
        headerOne,
        pubButton,
        background,
        [Switch.name]: Switch,
        [Picker.name]: Picker,
        slotDialog
    },
    data() {
        return {
            checked: false,
            labelVal: false,
            popupShow: false,
            refereeArr: [], //推荐人数组数据
            billTypeIndex: 0, //储存选中的下标
            billTypeList: [], //工单类型列表
            choosableTechList: [], //可选技师列表
            techListArr: [], //临时存放技师列表
            techList: [],
            assignArr: [], //需要提交的技师列表
            reportType: "", //缓存的开单类型
            baseInfo: "", //车辆信息个和车主信息
            billId: "", //预约单id
            workBoardId: "", //接车单ID
            checkState: false,
            faultPhenomenon: [],
            consultingVal: [], //仪表+其他
            checkCarVal: [], //车辆图片
            addBillShow: false, //是否显示添加工单
            dialogShow: false, //是否显示添加框
            addBillValue: "",
            focusStatus: false,
            billType_list: [],
            faultPhenomenonDescs: "" //备注
        };
    },
    //指令定义
    directives: {
        focus: {
            //每当指令绑定到元素上时，会立即执行这个bind函数，只执行一次
            bind: function() {},
            //inserted表示元素插入到DOM中时，会执行inserted函数，只触发一次，el表示被绑定的那个原生js对象
            inserted: function(el) {
                el.focus();
            },
            //当VNode更新时会执行updated，可触发多次
            update(el, { value }) {
                if (value) {
                    el.focus();
                } else {
                    el.blur();
                }
            }
        }
    },
    created() {
        //获取本地缓存推荐人
        if (this.$local.get("refereeArr")) {
            let refereeData = this.$local.get("refereeArr");
            if (refereeData.length > 0) {
                this.refereeArr = refereeData;
            }
        }
        //获取缓存数据
        // 烧机油信息+动力故障
        if (this.$local.get("allFaultInfo")) {
            let allFaultInfo = this.$local.get("allFaultInfo");
            for (let i in allFaultInfo) {
                if (allFaultInfo[i].projectVal) {
                    this.consultingVal.push(allFaultInfo[i]);
                }
            }
        }
        //仪表
        if (this.$local.get("paneMessageInfo")) {
            let paneMessageInfo = this.$local.get("paneMessageInfo");
            let defaultNameArr = [];
            if (paneMessageInfo.selectResult.length > 0) {
                paneMessageInfo.faultMsgList.forEach(item => {
                    // paneMessageInfo.selectResult.forEach((items)=>{})
                    if (paneMessageInfo["selectResult"].includes(item.value)) {
                        return defaultNameArr.push(item.name);
                    }
                });
            }
            //systemPicFile
            if (
                defaultNameArr.length > 0 ||
                paneMessageInfo.systemPicFile.length > 0
            ) {
                let projectValObj = {
                    projectId: 55,
                    projectVal: {
                        default: defaultNameArr,
                        img: paneMessageInfo.systemPicFile
                    }
                };
                this.consultingVal.push(projectValObj);
            }
        }
        //车体图标
        if (this.$local.get("checkProjectList")) {
            let checkProjectList = this.$local.get("checkProjectList");
            for (let i in checkProjectList) {
                let checkCarObj = {
                    code: checkProjectList[i].code,
                    projectVal: checkProjectList[i].projectVal
                };
                if (checkProjectList[i].projectImg.length > 0) {
                    checkCarObj.projectImg = checkProjectList[
                        i
                    ].projectImg.join(",");
                } else {
                    checkCarObj.projectImg = "";
                }
                this.checkCarVal.push(checkCarObj);
            }
        }
        //备注

        if (
            this.$local.get("faultProjectInfo") &&
            this.$local.get("faultProjectInfo").remarkInfo
        ) {
            this.faultPhenomenonDescs = this.$local.get(
                "faultProjectInfo"
            ).remarkInfo;
        }
        //故障描述
        if (
            this.$local.get("faultDescriptionInfo") &&
            this.$local.get("faultDescriptionInfo").result.length > 0
        ) {
            let resultArr = this.$local.get("faultDescriptionInfo").result;
            resultArr.forEach(item => {
                this.faultPhenomenon.push({ id: item });
            });
        }
        //基本信息
        if (this.$local.get("baseInfo")) {
            this.baseInfo = this.$local.get("baseInfo");
        }
        //
        this.billId = this.$local.get("billId")
            ? this.$local.get("billId")
            : "";
        this.workBoardId = this.$local.get("workBoardId")
            ? this.$local.get("workBoardId")
            : "";
        this.reportType = this.$local.get("reportType")
            ? this.$local.get("reportType")
            : "";

        //获取技师列表
        let tech_list = [];
        if (this.$session.get("tech_list")) {
            tech_list = this.$session.get("tech_list");
            if (tech_list.length > 0) {
                this.techList = tech_list;
            }
        }
        //获取工单类型列表
        let billType_list = [];
        let get_billType_list = [];
        this.billTypeList = [];
        if (this.$session.get("billType_list")) {
            billType_list = this.$session.get("billType_list");
            let billCode = this.$session.get("billCode");
            if (billType_list.length > 0) {
                //缓存需要的数据
                this.billType_list = billType_list;
                //来源小虎检测预约
                if (billCode && billCode == "YHJC10000") {
                    billType_list.forEach(item => {
                        if (item) {
                            item.price = "";
                            item.checked = false;
                            get_billType_list.push(item);
                        }
                    });
                } else if (this.reportType) {
                    billType_list.forEach(item => {
                        if (item.billTypeKey == this.reportType) {
                            item.price = "";
                            item.checked = false;
                            get_billType_list.push(item);
                        }
                    });
                } else {
                    billType_list.forEach(item => {
                        //没有缓存工单类型 表示直接开单
                        if (
                            item.billTypeKey != "J009" &&
                            item.billTypeKey != "J008" &&
                            item.billTypeKey != "J007" &&
                            item.billTypeKey != "E003" &&
                            item.billTypeKey != "J005" &&
                            item.billTypeKey != "J006" &&
                            item.billTypeKey != "E002" &&
                            item.billTypeKey != "W001" &&
                            item.billTypeKey != "J001" &&
                            item.billTypeKey != "J002" &&
                            item.billTypeKey != "J003" &&
                            item.billTypeKey != "E001" &&
                            item.billTypeKey != "Y001" &&
                            item.billTypeKey != "Y002" &&
                            item.billTypeKey != "Y" &&
                            item.billTypeKey != "X" &&
                            item.billTypeKey != "A"
                        ) {
                            item.price = "";
                            item.checked = false;
                            this.billTypeList.push(item);
                        }
                    });
                    this.addBillShow = true;
                }
            }
        }
        //获取工单类型价格
        if (get_billType_list.length > 0 && !this.addBillShow) {
            get_billType_list.forEach((item, index) => {
                this.getReportPriceByBillType(item);
            });
        }
    },
    mounted() {},
    methods: {
        //获取工单类型价格
        getReportPriceByBillType(item) {
            var params = {};
            params.vin = this.baseInfo.vin;
            params.carModelId = this.baseInfo.carModelId;
            params.carLineId = this.baseInfo.carLineId;
            params.carBrandId = this.baseInfo.carBrandId;
            params.carYear = this.baseInfo.produceYear;
            params.billType = item.billTypeKey;
            billApi.getReportPriceByBillType(params).then(res => {
                if (
                    res.code == 20000 &&
                    res.data &&
                    res.data.ownerReportPrice &&
                    res.data.ownerReportPrice != 0
                ) {
                    item.price = res.data.ownerReportPrice;
                }
                this.billTypeList.push(item);
            });
        },
        /**
         * @Description: 本地缓存推荐人
         * @Param:
         * @Author: qys
         * @LastEditors: qys
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-26
         */
        cacheReferee() {
            if (
                !this.baseInfo.referee ||
                this.baseInfo.referee.refereePhone == ""
            ) {
                return;
            }
            let refereePhone = this.baseInfo.referee.refereePhone;
            let refereeName = this.baseInfo.referee.refereeName;
            //不存在或者为空则不需要储存

            let refereeAdd = [];
            let refereeArr = this.refereeArr;

            if (refereeArr.length > 0) {
                //创建需要储存的数据
                let refereeObj = {
                    refereePhone: refereePhone,
                    refereeName: refereeName
                };

                let indexVal = "";
                //遍历是否存在缓存数据中,存在则删除
                refereeArr.forEach(function(item, index) {
                    if (+item.refereePhone == refereePhone) {
                        refereeArr.splice(index, 1);
                    }
                });
                //大于等于3,删除第一个
                if (refereeArr.length >= 3) {
                    refereeArr.splice(0, 1); //删除下标0的
                }
                refereeArr.push(refereeObj);

                refereeAdd = refereeArr;
            } else {
                let refereeObj = {
                    refereePhone: refereePhone,
                    refereeName: refereeName
                };
                refereeAdd.push(refereeObj);
            }
            this.$local.set("refereeArr", refereeAdd);
        },
        //处理开单提交的数据
        nextClick() {
            let params = {};
            params.baseInfo = this.baseInfo;
            // let baseInfoCarCc = this.baseInfo.carCc;
            //判断没有填写推荐人电话是 不需要该字段数据
            if (
                params.baseInfo.referee &&
                this.baseInfo.referee.refereePhone == ""
            ) {
                delete params.baseInfo.referee;
            }
            params.baseInfo.carCc = parseFloat(this.baseInfo.carCc).toFixed(1) + this.baseInfo.dwUnit;
            //有预约单ID或者有接车单ID
            if (this.billId && this.billId != "") {
                params.billId = this.billId;
            } else if (this.workBoardId && this.workBoardId != "") {
                params.workBoardId = this.workBoardId;
            }
            //故障描述
            if (this.faultPhenomenon && this.faultPhenomenon.length > 0) {
                params.faultPhenomenon = this.faultPhenomenon;
            }
            //仪表+其他
            if (this.consultingVal && this.consultingVal.length > 0) {
                params.consultingVal = this.consultingVal;
            }
            //信息备注
            if (this.faultPhenomenonDescs && this.faultPhenomenonDescs != "") {
                params.faultPhenomenonDescs = this.faultPhenomenonDescs;
            }
            //车辆图标的
            if (this.checkCarVal && this.checkCarVal != "") {
                params.checkCarVal = this.checkCarVal;
            }
            //获取选中技师数据
            if (this.assignArr.length > 0) {
                params.assign = this.assignArr;
                this.checkState = true;
            } else {
                this.$toast("请选择指派技师");
                setTimeout(() => {
                    this.$toast.clear();
                }, 500);
                return false;
            }
            this.billingFun(params);
        },
        //提交数据 开单
        billingFun(params) {
            if (params.billId && params.billId != "") {
                billApi.saveConsulting(params).then(res => {
                    if (res.code == 20000 && res.data) {
                        this.emptyData(); //清空临时数据
                        this.cacheReferee(); //缓存推荐人信息
                        this.gonative(); //触发原生跳转
                    } else {
                        this.$toast(res.msg);
                        setTimeout(() => {
                            this.$toast.clear();
                        }, 1500);
                    }
                });
            } else {
                billApi.saveCreateBill(params).then(res => {
                    if (res.code == 20000 && res.data) {
                        this.emptyData(); //清空临时数据
                        this.cacheReferee(); //缓存推荐人信息
                        this.gonative(); //触发原生跳转
                    } else {
                        this.$toast(res.msg);
                        setTimeout(() => {
                            this.$toast.clear();
                        }, 1500);
                    }
                });
            }
        },
        //指派成功之后跳转
        gonative() {
            let getUrlArr = getUrlParams();
            let token = getUrlArr.token;
            let status = getUrlArr.status;
            let education = this.$local.get("education");
            if (this.reportType && this.reportType == "W001") {
                if (status == "ios") {
                    // 返回ios列表
                    window.location =
                        "objc://" + "doFunc" + "/" + "solutionBillList";
                    setTimeout(function() {
                        window.location.replace(
                            process.env.VUE_APP_WEB_DOCDEV_URL +
                                "/resolveSolution/index.html?token=" +
                                token +
                                "&status=ios&" +
                                (education ? "education=1&" : "")
                        );
                    }, 1000);
                } else {
                    // Android 返回 order_list
                    android.orderlist("solutionBillList");
                }
            } else {
                if (status == "ios") {
                    // 返回ios列表
                    window.location ="objc://" +"doFunc" +"/" +"orderList" +"/" +"指派成功";
                    setTimeout(function() {
                        window.location.replace(
                            process.env.VUE_APP_WEB_DOCDEV_URL +
                                "/menu.html?token=" +
                                token +
                                "&status=ios&" +
                                (education ? "education=1&" : "")
                        );
                    }, 1000);
                } else {
                    // Android 返回 order_list
                    android.orderlist("order_list", "指派成功");
                }
            }
        },
        //清空缓存数据
        emptyData() {
            //处理一下没有必要的缓存数据
            this.$local.clear();
        },
        /**
         * @Description: 后退事件
         * @Param:
         * @Author: qys
         * @LastEditors: qys
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-23
         */
        back() {
            if (this.leftText != "") {
                this.$router.back();
            } else {
                jnsApi.back();
            }
        },
        /**
         * @Description: 选择指派的技师
         * @Param:
         * @Author: qys
         * @LastEditors: qys
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-23
         */
        onInputFun(checked, billTypeIndex) {
            this.billTypeIndex = billTypeIndex;
            // console.log(checked);
            let _this = this;
            this.techListArr = [];
            this.choosableTechList = [];
            this.techList.map((item, index) => {
                if (item["is_" + checked]) {
                    this.techListArr.push(item);
                    this.choosableTechList.push(item.realname);
                }
            });

            this.popupShow = true;
        },
        //遍历是否有选择技师
        clickTech() {
            //选中指派发技师数据
            this.assignArr = [];
            this.checkState = false;
            this.billTypeList.forEach(item => {
                if (item.checked) {
                    this.checkState = true;
                    let assignObj = {
                        userOpenId: item.userOpenId,
                        type: item.type,
                        billTypeKey: item.billTypeKey
                    };
                    this.assignArr.push(assignObj);
                }
            });
        },
        //
        onConfirm(value, index) {
            this.billTypeList[this.billTypeIndex].techName = value;
            this.billTypeList[this.billTypeIndex].userOpenId = this.techListArr[
                index
            ].userOpenId;
            this.billTypeList[this.billTypeIndex].checked = true;
            this.popupShow = false;
            this.clickTech(); //处理是否有选择技师
        },
        onCancel() {
            this.billTypeList[this.billTypeIndex].techName = "";
            this.billTypeList[this.billTypeIndex].userOpenId = "";
            this.billTypeList[this.billTypeIndex].checked = false;
            this.popupShow = false;
            this.clickTech(); //处理是否有选择技师
        },
        //删除工单类型
        deleteBillType(item, key) {
            billApi.delBillType({ billTypeId: item.billTypeKey }).then(res => {
                if (res.code == 20000) {
                    this.$toast(item.billTypeName + "删除成功");
                    setTimeout(() => {
                        this.$toast.clear();
                    }, 1500);
                    this.billTypeList.splice(key, 1);
                    this.billType_list.forEach((items, index) => {
                        if (items.billTypeKey == item.billTypeKey) {
                            this.billType_list.splice(index, 1);
                        }
                    });
                    this.billTypeFun();
                }
            });
        },
        //工单类型缓存
        billTypeFun() {
            this.$session.set("billType_list", this.billType_list);
        },
        //输入框聚焦
        addBillInput() {},
        addBillFun() {
            this.dialogShow = true;
            this.focusStatus = true;
        },
        addBillConfirm() {
            if (this.addBillValue == "") {
                this.$toast("请输入工单名称");
                this.focusStatus = false;
                this.dialogShow = true;
                setTimeout(() => {
                    this.$toast.clear();
                }, 1500);
                return false;
            }
            //添加工单类型
            billApi
                .addBillType({ billTypeName: this.addBillValue })
                .then(res => {
                    if (res.code == 20000 && res.data) {
                        this.$toast("添加成功");
                        setTimeout(() => {
                            this.$toast.clear();
                        }, 1500);
                        let addBill = {
                            billType: "M",
                            billTypeKey: res.data.billTypeId,
                            billTypeName: res.data.billTypeName,
                            checked: false,
                            price: "",
                            type: "user"
                        };
                        this.billTypeList.push(addBill);
                        this.billType_list.push(addBill);
                        this.addBillValue = "";
                        this.dialogShow = false;
                        this.focusStatus = false;
                        this.billTypeFun();
                    }
                });
        },
        addBillCancel() {
            // console.log("取消");
            this.addBillValue = "";
            this.dialogShow = false;
            this.focusStatus = false;
        }
    }
};
</script>

<style lang="less" scoped>
.main-container {
    padding: 10px 0px;
    /deep/ .van-cell {
        line-height: 0px;
        .title-style {
            line-height: 20px;
        }
        .label-main {
            color: #17cb7c;
        }
        .default-style {
            position: relative;
            right: 5px;
            bottom: 4px;
            z-index: 3;
            color: #000;
        }
        .cross-type {
            font-size: 20px;
            color: #f00;
            margin-left: 6px;
        }
        .switch-icon {
        }
        .add-bill {
            font-size: 20px;
        }
    }
    .dialog-input {
        display: block;
        border: 1px solid #f2f2f2;
        width: 80%;
        height: 45px;
        padding: 0 10px;
        margin: 30px auto;
        outline: none;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
}
</style>