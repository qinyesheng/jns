<!--
 * @Description: 订单详情
 * @Author: xwq
 * @Date: 2019-07-05 22:04:22
 * @LastEditTime: 2019-10-12 15:07:50
 -->
<template>
    <div class="page">
        <div class="main-container">
            <van-row class="booking-data-block">
                <van-row class="row-block">
                    <van-col class="left-block" span="6">预约状态:</van-col>
                    <van-col class="right-block" span="18">{{statusList[orderData.status]}}</van-col>
                </van-row>
                <van-row class="row-block" v-if="orderData.arrival_time">
                    <van-col class="left-block" span="6">预约时间:</van-col>
                    <van-col class="right-block" span="18">{{orderData.arrival_time}}</van-col>
                </van-row>
                <van-row class="row-block">
                    <van-col class="left-block" span="6">预约站点:</van-col>
                    <van-col class="right-block" span="18">{{orderData.shop_name}}</van-col>
                </van-row>
                <van-row class="row-block">
                    <van-col class="left-block" span="6">站点地址:</van-col>
                    <van-col class="right-block" span="18">{{orderData.address}}</van-col>
                </van-row>
                <van-row class="row-block" v-if="orderData.comment">
                    <van-col class="left-block" span="6">备注:</van-col>
                    <van-col class="right-block" span="18">{{orderData.comment}}</van-col>
                </van-row>
                <van-row class="row-block close-desc" v-if="orderData.close_desc">
                    <van-col class="left-block" span="6">取消原因:</van-col>
                    <van-col class="right-block" span="18">{{orderData.close_desc}}</van-col>
                </van-row>
            </van-row>
        </div>
        <!-- <xhMenu v-model="showMenuStatus"></xhMenu> -->
        <pubButton
            @buttonConfirm="cancelOrder"
            background="#e14732"
            title="取消订单"
            v-if="orderData.status==0"
        ></pubButton>
        <van-popup v-model="cancelOrderStatus" class="cancel-order-popup">
            <van-cell-group title="取消订单原因" class="cancel-order-popup-title">
                <van-radio-group v-model="radioReasonStatus" class="cancel-order-popup-radio">
                    <van-radio
                        :name="key"
                        v-for="(item,key) in radioList"
                        :key="key"
                        @click="checkRadio"
                    >{{item}}</van-radio>
                </van-radio-group>
                <van-field
                    v-model="radioReasonText"
                    class="other-desc"
                    :placeholder="this.radioReasonStatus==2?placeholderOtherInput:placeholder"
                    type="textarea"
                    row="2"
                    :readonly="this.radioReasonStatus==2?false:true"
                    ref="otherInput"
                    @input="radioInput"
                />
            </van-cell-group>
            <van-row class="cancel-button">
                <van-col span="12">
                    <van-button block @click="closePopup">关闭</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="warning" block @click="confirmCancel">确定取消</van-button>
                </van-col>
            </van-row>
        </van-popup>
    </div>
</template>
<script>
import pubButton from "@/components/public/pubButton";
import xhjcOwnerApi from "@/api/xhjcOwner/xhjcOwner";
import { RadioGroup, Radio, Field } from "vant";
export default {
    data() {
        return {
            placeholder: "选择“其他原因”时填写",
            placeholderOtherInput: "请填写取消订单原因",
            radioList: ["等太久", "临时有事", "其他原因"],
            radioReasonStatus: false,
            radioReason: "",
            radioReasonText: "",
            showMenuStatus: false,
            orderData: {},
            statusList: {
                0: "预约成功",
                1: "待处理",
                2: "已取消",
                3: "已完成",
                4: "处理中"
            },
            cancelOrderStatus: false
        };
    },
    components: {
        pubButton,
        [Field.name]: Field,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio
    },
    created() {
        this.init();
    },
    mounted() {},
    methods: {
        init() {
            // console.log(this.$route.params)
            let params = this.$route.params;
            this.getBookingInfoById(params.billId);
        },
        showMenu() {
            this.showMenuStatus = true;
        },
        getBookingInfoById(billId) {
            xhjcOwnerApi.getBookingInfoById(billId).then(res => {
                if (res.code == 20000) {
                    let data = res.data;
                    this.orderData = data;
                    // console.log(this.orderData);
                } else {
                    this.toast.fail(res.msg);
                }
            });
        },
        cancelOrder() {
            this.cancelOrderStatus = true;
        },
        checkRadio() {
            // console.log(this.radioReasonStatus);
            if (this.radioReasonStatus == 2) {
                this.$refs["otherInput"].focus();
                this.radioReason = this.radioReasonText;
            } else {
                this.$refs["otherInput"].blur();
                this.radioReason = this.radioList[this.radioReasonStatus];
            }
        },
        closePopup() {
            this.cancelOrderStatus = false;
        },
        radioInput() {
            this.radioReason = this.radioReasonText;
        },
        confirmCancel() {
            if (this.radioReasonStatus == 2 && !this.radioReasonText) {
                this.$toast("请填写原因");
                return false;
            }
            if (!this.radioReason) {
                this.$toast("请选择取消订单原因");
                return false;
            }
            let params = this.$route.params;
            let billId = params.billId;
            let data = {
                bill_id: billId,
                close_desc: this.radioReason
            };
            xhjcOwnerApi.cancelBookingById(data).then(res => {
                if (res.code == 20000) {
                    this.$toast.success({
                        duration: 500,
                        message: "取消成功"
                    });
                    this.cancelOrderStatus = false;
                    this.$session.set("orderActive", true);
                    this.$session.set("routerActive", 1);
                    setTimeout(() => {
                        this.$router.back(-1);
                    }, 1500);
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        padding: 0px;
    }
    .nav-memu {
        width: 75%;
        height: 100%;
    }
    .cancel-order-popup {
        width: 80%;
        padding: 10px;
        .van-cell-group__title {
            padding: 10px;
            padding-top: 0;
            font-size: 16px;
        }
        .cancel-order-popup-title {
            font-size: 16px;
        }
        .cancel-order-popup-radio {
            .van-radio {
                padding: 10px;
            }
        }
        .other-desc {
            background: #f3f3f3;
        }
    }
    .booking-data-block {
        background: #fff;
        .row-block {
            border-bottom: 1px solid #f3f3f3;
            overflow: hidden;
        }
        .van-col {
            padding: 10px;
            padding-top: 10px;
            padding-bottom: 10px;
            line-height: 2;
        }
        .right-block {
            text-align: right;
        }
    }
    .cancel-button {
        .van-col {
            padding: 10px;
        }
    }
    .close-desc {
        color: #f00;
    }
}
</style>
