<!--
 * @Description: 员工工作量
 * @Author: lp
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-28 14:10:14
 * @LastEditTime: 2019-09-18 14:51:02
 -->

<template>
    <div class="page">
        <headerOne :title="$route.meta.title" :isFixed="true" />
        <selectDatePick
            :dateTimeYear="dateYear"
            :dateTimeMonth="dateMonth"
            :isShowScreenMenu="false"
            @selectMonthHandle="selectMonthHandle"
        />
        <background />
        <main>
            <!-- 工作量列表 -->
            <div class="workload-list" v-if="workloadList.length">
                <van-cell
                    v-for="(item, index) of workloadList"
                    :key="index"
                    :title="item.user_name"
                    value-class="workload-value"
                    :value="item.total+'单'"
                    @click="openStatistics(item)"
                />
            </div>
            <div v-else style="color:#999;text-align:center;">暂无数据</div>
        </main>
        <footer>
            <span class="footer-text">数据统计展示可能存在延迟</span>
        </footer>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import background from "@/components/background/background";
import { DatetimePicker } from "vant";
import billApi from "@/api/personalCenter/billStatistics";
import { dateFormat } from "@/utils/common";
import selectDatePick from "@/components/dateTimePick/selectDatePick";

export default {
    components: {
        headerOne,
        background,
        [DatetimePicker.name]: DatetimePicker,
        selectDatePick
    },
    data() {
        return {
            currentDate: new Date(),
            dateYear: "",
            dateMonth: "",
            workloadList: []
        };
    },
    computed: {
        dateFormat() {
            return dateFormat(this.currentDate, "yyyy-MM"); // 请求服务器的格式如：2019-04
        }
    },
    created() {
        let sessionParams = this.$session.get("dateSearchKey"); // 从员工工作量页跳转过来
        if (sessionParams) {
            this.currentDate = new Date(sessionParams.date);
        } else {
            this.currentDate = new Date();
        }
        this.dateYear = this.currentDate.getFullYear();
        this.dateMonth = this.currentDate.getMonth() + 1;
    },
    mounted() {
        // this.getStaffStatistics();
    },
    methods: {
        //获取时间控件 返回的数据数据
        selectMonthHandle(date) {
            this.getStaffStatistics(date);
        },
        /**
         * @Description: 获取机构所有员工工作量月统计
         * @Author: linpeng
         * @Date: 2019-04-28 15:50:17
         */
        getStaffStatistics(date) {
            this.currentDate = date;

            if (!this.currentDate) {
                this.currentDate = new Date();
            } else {
                this.currentDate = new Date(this.currentDate);
            }
            console.log(this.currentDate);

            let params = {
                date: date
            };
            billApi.getStaffStatistics(params).then(res => {
                if (res.code == 20000) {
                    this.workloadList = res.data.list;
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        // 跳转个人业绩统计页
        openStatistics(item) {
            console.log(this.currentDate);
            let parmas = {
                date: this.currentDate.getTime(),
                id: item.user_id
            };
            // console.log(
            //     new Date(parmas.date).getMonth()+1
            //     );
            // return false;
            this.$session.set("dateSearchKey", parmas);
            this.$router.push({
                name: "personalStatistics"
            });
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    main {
        padding: 10px;
        margin-top: 60px;
        .time {
            margin-top: 12px;
            padding: 10px 0;
            color: #333;
            font-size: 16px;
            .time-icon {
                font-size: 20px;
                margin-right: 5px;
                color: #d2d2d2;
                vertical-align: bottom;
                margin-bottom: -3px;
            }
        }
        .workload-list {
            /deep/ .van-cell {
                border-radius: 10px;
                color: #353535;
                margin-bottom: 15px;
            }
            .workload-value {
                color: #353535;
            }
        }
    }
    footer {
        padding-bottom: 15px;
        width: 100%;
        display: flex;
        justify-content: center;
        position: fixed;
        bottom: 0;
        .footer-text {
            font-size: 16px;
            color: #ccc;
        }
    }
}
</style>