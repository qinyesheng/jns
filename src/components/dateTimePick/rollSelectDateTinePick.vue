<!--
 * @Description: 日期控件-带工单筛选
 * @Author: xwq
 * @Date: 2019-08-28 09:34:32
 * @LastEditTime: 2019-08-29 18:09:48
 -->
<template>
    <div class="page">
        <div class="header-date">
            <span @click="changeDate">
                {{dateYear}}
                <van-icon name="arrow-down" class="date-icon-down" />
            </span>

            <div class="date-select">
                <van-swipe
                    :show-indicators="false"
                    :loop="false"
                    :width="50"
                    :height="50"
                    :initial-swipe="initialSwipe"
                    ref="scrollTo"
                    @change="change"
                >
                    <van-swipe-item
                        v-for="(i,k) in dateTimeList"
                        :key="k"
                        v-html="i"
                        :class="{active:selectItemNum==k}"
                        @click="selectMonthHandle(k)"
                    ></van-swipe-item>
                </van-swipe>
            </div>
            <span @click="openScreenpanel" v-show="isShowScreenMenu">筛选</span>
        </div>
        <!-- 筛选面板 -->
        <van-popup
            v-model="screenShow"
            position="right"
            :close-on-click-overlay="false"
            @click-overlay="clickOverlay"
        >
            <div class="screen-container">
                <div class="screen-container-top">
                    <!-- 升降序 -->
                    <div class="screen-block screen-sort">
                        <div class="block-title">排序规则</div>
                        <div class="block-content">
                            <div
                                class="block-btn"
                                :class="sortActiveIndex == index?'block-btn-active':''"
                                v-for="(item, index) of sortList"
                                :key="index"
                                @click="sortActive(item,index)"
                            >{{item.name}}</div>
                        </div>
                    </div>
                    <!-- 工单类型 -->
                    <div class="screen-block">
                        <div class="block-title">工单类型</div>
                        <div class="block-content">
                            <div
                                class="block-btn"
                                :class="billActiveNames.includes(item.value)?'block-btn-active':''"
                                v-for="(item, index) of billTypeList"
                                :key="index"
                                @click="billActive(item)"
                            >{{item.name}}</div>
                        </div>
                    </div>
                </div>
                <!-- 重置及确定 -->
                <van-row type="flex" justify="space-between" class="screen-bottom-btns">
                    <van-col span="8" class="reset-btn" @click.native="resetScreenPanle">重置</van-col>
                    <van-col span="16" class="confirm-btn" @click.native="screenConfirm">确定</van-col>
                </van-row>
            </div>
        </van-popup>
        <!-- 年份选择控件 -->
        <van-popup v-model="dateShow" position="bottom" :close-on-click-overlay="false">
            <van-datetime-picker
                v-model="currentDate"
                type="year-month"
                :max-date="maxDate"
                :min-date="minDate"
                :formatter="dateFormatter"
                @confirm="dateConfirm"
                @cancel="dateCancel"
            />
        </van-popup>
    </div>
</template>
<script>
import { DatetimePicker, Swipe, SwipeItem } from "vant";
export default {
    components: {
        [DatetimePicker.name]: DatetimePicker,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem
    },
    props: {
        dateTimeYear: {
            type: Number
        },
        dateTimeMonth: {
            type: Number
        },
        sortList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        billTypeList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        isShowScreenMenu: {
            type: Boolean,
            default: true
        },
        screenShow: {
            type: Boolean
        }
    },
    data() {
        return {
            sortActiveIndex: 0,
            billActiveNames: ["all"],
            screen: {
                // 筛选条件
                order_by: "desc", // 升降序（默认降序）
                bill_type: "all" // 工单类型（默认所有：all）多个英文逗号拼接
            },
            dateShow: false,
            minDate: new Date(2015, 1, 1),
            maxDate: new Date(),
            dateYear: new Date().getFullYear(),
            dateMonth: new Date().getMonth() + 1,
            currentDate: new Date(),
            copyCurrentDate: "", // 用于重置源数据
            dateTimeList: [], //月份选择组件
            initialSwipe: 0,
            selectItemNum: 2
            // isScreenShow: ""
        };
    },
    created() {
        if (this.screenShow) {
            this.isScreenShow = this.screenShow;
        }
    },
    mounted() {
        if (this.dateTimeYear) {
            this.init(this.dateTimeYear);
        }
        if (this.dateTimeMonth) {
            this.dateMonth = this.dateTimeMonth;
            this.selectMonthHandle(this.dateTimeMonth + 1);
        } else {
            this.selectMonthHandle(this.dateMonth + 1);
        }
    },
    methods: {
        /**
         * @Description: 日期改变事件
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-27 18:00:39
         */
        change(index) {
            this.selectItemNum = index + 2;
            if (index > this.dateTimeList.length - 3) {
                this.$refs.scrollTo.swipeTo(this.dateTimeList.length - 3);
            } else if (index == 0) {
                this.$refs.scrollTo.swipeTo(0);
            }
            this.dateMonth = index + 1;
            let currentDate = index + 1 > 9 ? index - 1 : "0" + (index + 1);
            this.$emit("monthRollChange", this.dateYear + "-" + currentDate);
        },
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
        // 日期组件
        dateFormatter(type, value) {
            if (type === "year") {
                return `${value}&nbsp;年`;
            } else if (type === "month") {
                return `${value}&nbsp;月`;
            }
            return value;
        },
        /**
         * @Description: 月份选择
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-28 16:41:24
         */
        selectMonthHandle(index) {
            if (index < 2) {
                return false;
            }
            this.selectItemNum = index;
            this.$refs.scrollTo.swipeTo(index - 2);
            let currentMonth = index - 1 > 9 ? index - 1 : "0" + (index - 1);
            this.dateMonth = index - 1;
            this.$emit("selectMonthHandle", this.dateYear + "-" + currentMonth);
        },
        /**
         * @Description: 显示年份选择控件
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-28 09:40:05
         */
        changeDate() {
            this.dateShow = true;
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
            let currentDateYear = new Date();
            let getMonth = currentDateYear.getMonth() + 1;
            let currentMonth = "";
            if (currentDateYear.getFullYear() === this.dateYear) {
                if (this.dateMonth > getMonth) {
                    this.selectMonthHandle(getMonth + 1);
                    currentMonth = getMonth > 9 ? getMonth : "0" + getMonth;
                    this.$emit("dateConfirm", this.dateYear + "-" + getMonth);
                    return;
                }
            }
            currentMonth =
                this.dateMonth > 9 ? this.dateMonth : "0" + this.dateMonth;
            this.selectMonthHandle(this.dateMonth + 1);
            this.$emit("dateConfirm", this.dateYear + "-" + currentMonth);
        },
        //底部弹窗取消
        dateCancel() {
            this.dateShow = false;
        },
        /**
         * @Description: 打开筛选面板
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-28 16:41:03
         */
        openScreenpanel() {
            this.$emit("openScreenpanel");
        },
        /**
         * @Description: 升降序点击
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-28 16:40:56
         */
        sortActive(item, index) {
            this.sortActiveIndex = index;
            this.screen.order_by = item.value;
            this.$emit("sortActive", item, index);
        },

        /**
         * @Description: 工单类型点击
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-28 16:40:46
         */
        billActive(item) {
            let val = item.value;
            let idx = this.billActiveNames.indexOf(val);
            // 选中或者取消选中点击项
            if (idx == -1) {
                this.billActiveNames.push(val);
                let deleteIdx = this.billActiveNames.findIndex(
                    value => value == "all"
                );
                if (val !== "all" && deleteIdx !== -1) {
                    // 若选中某具体工单，则去除不限
                    this.billActiveNames.splice(deleteIdx, 1);
                }
                if (val == "all") {
                    // 若选中不限，则去除所有具体工单
                    this.billActiveNames = ["all"];
                }
            } else {
                this.billActiveNames.splice(idx, 1);
            }
            // 若无一项选中，则默认选中不限
            if (this.billActiveNames.length == 0) {
                this.billActiveNames = ["all"];
            }
            // 将选中数组转成字符串
            this.screen.bill_type = this.billActiveNames.join(",");
            this.$emit("billActive", item);
        },

        /**
         * @Description: 筛选重置
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-28 16:40:35
         */
        resetScreenPanle() {
            this.sortActiveIndex = 0;
            this.billActiveNames = ["all"];
            this.screen = {
                order_by: "desc",
                bill_type: "all"
            };
            this.$emit("resetScreenPanle");
        },
        /**
         * @Description: 筛选确定
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-28 16:40:24
         */
        screenConfirm() {
            this.$emit("screenConfirm", this.screen);
        },
        /**
         * @Description: 工单筛选_遮罩层点击关闭
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-29 11:48:04
         */

        clickOverlay() {
            this.$emit("clickOverlay");
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    /deep/ .van-picker__columns {
        & .van-picker-column:nth-child(2) {
            position: absolute;
            left: -9999px;
            top: -9999px;
        }
    }
    /deep/ .van-swipe-item {
        line-height: 50px;
        opacity: 0.3;
    }
    /deep/ .van-swipe {
        width: 240px;
    }
    /deep/ .van-swipe__track {
        width: 660px;
    }
    .header-date {
        background: #fff;
        padding: 0 10px;
        display: flex;
        position: fixed;
        width: 100%;
        user-select: none;
        & > :nth-child(1) {
            width: 70px;
            height: 50px;
            line-height: 50px;
            & > .date-icon-down {
                vertical-align: baseline;
            }
        }
        & > :nth-child(2) {
            flex: 1;
            text-align: center;
            overflow: hidden;
        }
        & > :nth-child(3) {
            width: 60px;
            height: 50px;
            line-height: 50px;
            color: #7ac4f9;
            text-align: center;
            position: relative;
            left: -5px;
        }
        .active {
            background-color: #f2f2f2;
            color: #46aef7;
            opacity: 1;
            font-weight: bold;
        }
    }
    .screen-container {
        width: 76vw;
        min-height: 100vh;
        padding-top: 16px;
        box-sizing: border-box;
        position: relative;
        .screen-container-top {
            padding: 16px;
            .screen-block {
                margin-bottom: 20px;
                .block-title {
                    margin-bottom: 15px;
                    font-size: 16px;
                    color: #333;
                }
                .block-content {
                    display: flex;
                    flex-wrap: wrap;
                    .block-btn {
                        font-size: 12px;
                        padding: 10px 12px;
                        text-align: center;
                        border: 1px solid #999;
                        color: #666;
                        border-radius: 4px;
                        width: 45%;
                        box-sizing: border-box;
                        flex-shrink: 0;
                        margin-bottom: 10px;
                        &:nth-child(odd) {
                            margin-right: 12px;
                        }
                    }
                    .block-btn-active {
                        border: 1px solid #46aef7;
                        background: #46aef7;
                        color: #fff;
                    }
                }
            }
            .screen-sort {
                .block-content {
                    .block-btn {
                        margin-bottom: 0;
                    }
                }
            }
        }
        .screen-bottom-btns {
            width: 100%;
            position: absolute;
            bottom: 0;
            text-align: center;
            font-size: 18px;
            .reset-btn {
                padding: 10px;
                background: #fff;
                color: #333;
                border-top: 1px solid #ccc;
            }
            .confirm-btn {
                padding: 10px;
                background: #46aef7;
                color: #fff;
                border-top: 1px solid #46aef7;
            }
        }
    }
}
</style>