<!--
 * @Description: 交易详情
 * @Author: xwq
 * @Date: 2019-04-25 13:08:09
 -->
<template>
    <div class="page">
        <!--  <headerOne
            :title="title"
            :isFixed="true"
            :isborderBottom="true"
            :onClickLeftStatus="true"
            @onClickLeft="back"
        />-->
        <div class="main-container">
            <div class="deal-info">
                <div class="deal-info-t">
                    <h2>{{dealListInfo.deal_name}}</h2>
                    <p>{{dealListInfo.deal_points}}</p>
                </div>
                <ul class="deal-info-b">
                    <li class="deal-info-b-list order-number" v-show="orderNumber">
                        <span>订单编号</span>
                        <span>{{dealListInfo.order_number}}</span>
                    </li>
                    <li class="deal-info-b-list">
                        <span>创建时间</span>
                        <span>{{dealListInfo.create_time}}</span>
                    </li>
                    <li class="deal-info-b-list">
                        <span>支付金额</span>
                        <span style="font-family:Arial">
                            <b>￥</b>
                            {{dealListInfo.pay_amount}}
                        </span>
                    </li>
                    <li class="deal-info-b-list">
                        <span>支付时间</span>
                        <span>{{dealListInfo.deal_time}}</span>
                    </li>
                    <li class="deal-info-b-list">
                        <span>支付方式</span>
                        <span>{{dealListInfo.deal_way}}</span>
                    </li>
                </ul>
                <p class="report-detail" v-show="reportDetail" @click="toReportDetail">
                    <span>查看报告详情</span>
                    <van-icon name="arrow"/>
                </p>
            </div>
        </div>
        <!-- <xhMenu v-model="showMenuStatus"></xhMenu> -->
    </div>
</template>
<script>
// import headerOne from "@/components/header/headerOne";
// import xhMenu from "@/pages/xhDetection/views/menu";
import carOwnerApi from "@/api/carOwner/usersCenter";
export default {
    data() {
        return {
            title: this.$route.meta.title,
            showMenuStatus: false,
            dealListInfo: {},
            reportDetail: false,
            shortUrl: "",
            orderNumber: false
        };
    },
    created() {},
    mounted() {
        this.getDealInfo();
        console.log(1111)
    },
    methods: {
        /**
         * @Description: 获取交易详情信息
         * @Param: id  列表id
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-10 09:21:39
         */
        getDealInfo() {
            let id = this.$route.query.id;
            carOwnerApi.getDealInfo(id).then(res => {
                if (res.code == 20000 && res.data) {
                    // res.data.deal_name = "小虎安检"; //测试
                    if (res.data.deal_act == "1") {
                        Number(res.data.deal_points) == 0
                            ? ""
                            : (res.data.deal_points =
                                  "+" + res.data.deal_points);
                    } else if (res.data.deal_act == "2") {
                        Number(res.data.deal_points) == 0
                            ? ""
                            : (res.data.deal_points =
                                  "-" + res.data.deal_points);
                    }
                    if (res.data.deal_name == "小虎安检") {
                        this.reportDetail = true;
                        this.shortUrl = res.data.short_url;
                    }
                    if (res.data.order_number) {
                        this.orderNumber = true;
                        // console.log(typeof res.data.order_number);
                    }
                    this.dealListInfo = res.data;
                    this.dealListInfo.orderNumber = Number(
                        res.data.order_number
                    );
                }
            });
        },
        //返回
        back() {
            this.$router.back();
        },
        //报告跳转
        toReportDetail() {
            location.href = this.shortUrl;
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        .deal-info {
            background-color: #fff;
            .deal-info-t {
                margin-bottom: 10px;
                text-align: center;
                & > :first-child {
                    padding: 10px 0;
                    color: #777777;
                    font-size: 22px;
                }
                & > :last-child {
                    padding: 5px 0;
                    font-size: 22px;
                }
            }
            .deal-info-b {
                .deal-info-b-list {
                    display: flex;
                    padding: 5px 0;
                    font-size: 16px;
                    color: #777777;
                    & > :first-child {
                        width: 80px;
                    }
                    & > :last-child {
                        flex: 1;
                        text-align: right;
                        font-size: 14px;
                    }
                }
                .order-number {
                    & > :last-child {
                        word-wrap: break-all;
                        word-break: normal;
                    }
                }
            }
            /* 查看报告详情 */
            .report-detail {
                height: 37px;
                position: absolute;
                right: 0;
                left: 0;
                bottom: 20px;
                display: flex;
                padding: 5px;
                box-sizing: border-box;
                vertical-align: middle;

                & > span {
                    flex: 1;
                    text-align: center;
                    font-size: 16px;
                    line-height: 27px;
                    color: #bfbfbf;
                }

                /deep/ .van-icon {
                    line-height: 27px;
                    position: relative;
                    top: 1.5px;
                    right: 125px;
                    color: #bfbfbf;
                }
            }
        }
    }
}
</style>

