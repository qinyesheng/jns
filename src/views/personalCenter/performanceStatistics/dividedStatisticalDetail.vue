<!--
 * @Description: 分成统计明细
 * @Author: xwq
 * @Date: 2019-07-05 22:04:23
 * @LastEditTime: 2019-08-29 18:18:34
 -->
<template>
    <div class="page">
        <headerOne :title="$route.meta.title" :isFixed="true" :backgroundStatus="true" />
        <Vbackground />
        <selectDatePick
            :dateTimeYear="dateTimeYear"
            :dateTimeMonth="dateTimeMonth"
            :sortList="sortList"
            :billTypeList="billTypeList"
            :screenShow="screenShow"
            @openScreenpanel="openScreenpanel"
            @screenConfirm="screenConfirm"
            @selectMonthHandle="selectMonthHandle"
            @clickOverlay="clickOverlay"
        />
        <div class="main-container">
            <div class="bill-list">
                <div class="page-block" v-for="(item, index) of billList" :key="index">
                    <div class="block-title list-title">
                        <span class="block-title-item">{{item.bill_type_name}}</span>
                        <span class="block-title-item">+{{item.bonus}}</span>
                    </div>
                    <div class="plate">{{item.plate_number_all}}</div>
                    <div class="time">{{item.bill_create_time}}</div>
                </div>
            </div>
            <div class="loadmore">{{loadText}}</div>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import billApi from "@/api/personalCenter/billStatistics";
import background from "@/components/background/background";
import { DatetimePicker, Swipe, SwipeItem } from "vant";
// import { dateFormat } from "@/utils/common";
import selectDatePick from "@/components/dateTimePick/selectDatePick";
export default {
    components: {
        headerOne,
        Vbackground: background,
        selectDatePick,
        [DatetimePicker.name]: DatetimePicker,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem
    },
    data() {
        return {
            sortList: [],
            billTypeList: [],
            billList: [],
            loadText: "暂无数据",
            page: 1,
            pagesize: 10,
            screenShow: false,
            screen: {
                // 筛选条件
                order_by: "desc", // 升降序（默认降序）
                bill_type: "all" // 工单类型（默认所有：all）多个英文逗号拼接
            },
            canLoad: true,
            isShowNum: false, //通过url的参数判断需不需要显示列表的金额项
            dateTimeList: [], //月份选择组件
            initialSwipe: 0,
            selectItemNum: 2,
            dateTimeYear: "",
            dateTimeMonth: "",
            currentDate: "",
            id: ""
        };
    },
    created() {
        let params = this.$session.get("dateSearchKey");
        if (params && params.date) {
            this.id = params.id;
            this.dateTimeYear = new Date(params.date).getFullYear();
            this.dateTimeMonth = new Date(params.date).getMonth() + 1;
            this.init(this.dateTimeYear);
        }
    },
    mounted() {
        this.scrollWatch();
        this.getSearchCondition(); //筛选工单
    },
    methods: {
        //初始化
        init(dateTimeYear) {
            let currentDateYear = new Date();
            let monthVal = 12;
            if (currentDateYear.getFullYear() === dateTimeYear) {
                monthVal = currentDateYear.getMonth() + 1;
            }

            this.dateTimeList = ["&#160;", "&#160"];
            for (let i = 1; i <= monthVal; i++) {
                if (i > 9) {
                    this.dateTimeList.push("&nbsp;" + i + "月" + "&nbsp;");
                } else {
                    this.dateTimeList.push(i + "月");
                }
            }
        },
        /**
         * @Description: 选择年份
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-27 10:02:01
         */
        dateConfirm(currentDate) {
            this.dateYear = currentDate.getFullYear();
            this.init(this.dateYear);
            this.dateShow = false;
        },
        /**
         * @Description: 月份选择
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-28 20:16:18
         */
        selectMonthHandle(date) {
            this.canLoad = true;
            this.currentDate = date;
            this.page = 1;
            this.getDividedStatisticsList(date);
        },
        //获取用户ID值
        getUserId() {
            let params = this.$session.get("dateSearchKey");
            if (params) {
                this.id = params.id;
                this.getDividedStatisticsList();
            }
        },
        /**
         * @Description: 获取工单统计列表
         * @Author: linpeng
         * @Date: 2019-04-30 13:22:19
         */
        getDividedStatisticsList(date) {
            // console.log(date, "传过来的");
            if (!this.id) {
                this.getUserId();
                return;
            }
            let params = {
                page: this.page,
                user_id: this.id,
                pagesize: this.pagesize,
                time: date,
                ...this.screen
            };
            if (!this.canLoad) {
                return false;
            }
            billApi.getDividedStatisticsList(params).then(res => {
                /* this.$toast.loading({
                    duration: 0
                });
                this.loadText = "加载中..."; */
                if (res.code == 20000) {
                    if (this.page > 1) {
                        this.billList = [...this.billList, ...res.data.list];
                    } else {
                        this.billList = res.data.list;
                    }
                    if (res.data.list.length < this.pagesize) {
                        this.loadText = "没有更多了";
                        this.canLoad = false;
                    } else {
                        this.loadText = "加载更多";
                    }
                    if (res.data.list.length == 0) {
                        this.loadText = "暂无数据";
                    }
                    /*   setTimeout(() => {
                        this.$toast.clear();
                    }, 500); */
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        /**
         * @Description: 获取工单统计明细列表筛选
         * @Author: linpeng
         * @Date: 2019-05-05 09:59:41
         */
        getSearchCondition() {
            billApi.getSearchCondition().then(res => {
                if (res.code == 20000) {
                    this.sortList = res.data.order_by;
                    this.billTypeList = res.data.bill_type;
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        // 根据滚动条判断是否拉取新数据
        scrollWatch() {
            window.onscroll = () => {
                let a =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop; //滚动条y轴上的距离
                let b =
                    document.documentElement.clientHeight ||
                    document.body.clientHeight; //可视区域的高度
                let c =
                    document.documentElement.scrollHeight ||
                    document.body.scrollHeight; //可视化的高度与溢出的距离（总高度）
                if (a + b == c) {
                    // 已滚动到底部
                    this.page++;
                    this.getDividedStatisticsList(this.currentDate);
                }
            };
        },
        // 打开筛选面板
        openScreenpanel() {
            this.screenShow = true;
        },
        /**
         * @Description: 筛选确定
         * @Author: linpeng
         * @Date: 2019-04-30 13:52:15
         */
        screenConfirm(screenInfo) {
            this.screen = screenInfo;
            this.page = 1;
            this.canLoad = true;
            window.scrollTo(0, 0);
            this.screenShow = false;
            this.billList = [];
            this.getDividedStatisticsList(this.currentDate);
        },
        /**
         * @Description: 筛选控件_点击遮罩层关闭
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-29 11:57:32
         */

        clickOverlay() {
            this.screenShow = false;
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        margin-top: 50px;
        .page-block {
            background: #fff;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 10px;
            .block-title {
                font-size: 18px;
                color: #333;
                margin-bottom: 18px;
            }
            .list-title {
                display: flex;

                .block-title-item {
                    flex: 1;
                }
                & .block-title-item:last-child {
                    text-align: right;
                    font-size: 16px;
                }
            }
            .plate {
                color: #666;
                font-size: 16px;
                margin-bottom: 8px;
            }
            .time {
                color: #999;
                font-size: 14px;
            }
        }
        .loadmore {
            text-align: center;
            font-size: 14px;
            color: #cecece;
            padding-bottom: 15px;
        }
    }
}
</style>