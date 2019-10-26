<!--
 * @Description: 学员列表
 * @Author: qys
 * @LastEditors: Please set LastEditors
 * @Date: 2019-10-23
 * @LastEditTime: 2019-10-23
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
                <!-- <van-cell
                    v-for="(item, index) of workloadList"
                    :key="index"
                    :title="item.user_name"
                    value-class="workload-value"
                    :value="item.total+'单'"
                    @click="openStatistics(item)"
                >
                </van-cell> -->

                <div 
                    class="item-list"
                    v-for="(item, index) of workloadList"
                    :key="index"
                >
                    <div class="item-main">
                        <span class="item-main-left">{{item.user_name}}</span>
                        <span class="item-main-right">{{item.total+'单'}}</span>
                    </div>
                    <div class="item-adrss">{{item.user_name}}</div>
                </div>
            </div>
            <div v-else class="no_traineeMian">
                <img class="no_trainee_img" :src="noTrainee" alt="">
                <div>暂无学员信息</div>
            </div>
        </main>
        <!-- <footer>
            <span class="footer-text">数据统计展示可能存在延迟</span>
        </footer> -->
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
            noTrainee: require("@image/no_trainee_icon.png"),
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
        // this.getStudentList();
        // jnsAppStep=personalTrainee
    },
    methods: {
        //获取时间控件 返回的数据数据
        selectMonthHandle(date) {
            this.getStudentList(date);
        },
        /**
         * @Description: 获取机构所有员工工作量月统计
         * @Author: linpeng
         * @Date: 2019-04-28 15:50:17
         */
        getStudentList(date) {
            this.currentDate = date;

            if (!this.currentDate) {
                this.currentDate = new Date();
            } else {
                this.currentDate = new Date(this.currentDate);
            }
            console.log(this.currentDate);

            let params = {
                page: 1,
                pagesize: 100,
                month_date: date,
            };
            billApi.getStudentList(params).then(res => {
                res.data.list = [];
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
    .item-list{
        width: 100%;
        background: #fff;
        margin-bottom: 15px;
        border-radius: 6px;
        .item-main{
            padding: 0px 15px;
            height: 44px;
            line-height: 44px;
            margin-top: 6px;
            font-size: 14px;
            clear: both;
            .item-main-left{
                float: left;
            }
            .item-main-right{
                float: right;
            }
        }
        .item-adrss{
            height: 26px;
            padding-left: 15px;
            clear: both;
            color: #969799;
            font-size: 12px;
        }
    }
    .no_traineeMian{
        color:#999;
        text-align:center;
        font-size: 12px;
        margin-top: 30%;
    }
    .no_trainee_img{
        width: 120px;
        height: 120px;
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