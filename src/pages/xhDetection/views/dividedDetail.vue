<!--
 * @Description: 分成统计_分成明细
 * @Author: xwq
 * @Date: 2019-07-29 09:35:29
 -->
<template>
    <div class="page">
        <background />
        <div class="main-container">
            <div class="select-date">
                <van-cell
                    title-class="title-style"
                    value-class="value-style"
                    :title="selectDateTime"
                >
                    <template slot="default">
                        <span @click="selectDate">选择时间</span>
                    </template>
                </van-cell>
            </div>
            <p class="no-list-desc" v-if="listInfo.length==0">暂无数据</p>
            <div v-if="listInfo.length>0">
                <div class="list-items" v-for="(item,key) in listInfo" :key="key">
                    <van-cell title-class="title-style" :title="item.bill_name"></van-cell>
                    <van-cell
                        title-class="title-content-color"
                        value-class="value-content-color"
                        :title="item.plate_no?item.plate_no:' '"
                        :value="item.bonus"
                    ></van-cell>
                    <van-cell title-class="title-content-color" :title="item.date"></van-cell>
                </div>
            </div>
        </div>
        <dateTimePick @confirm="confirm" @cancel="cancel" :show="show" />
    </div>
</template>
<script>
import background from "@/components/background/background";
import dateTimePick from "@/components/dateTimePick/dateTimePick";
import carOwnerApi from "@/api/carOwner/usersCenter";
import { dateFormat } from "@/utils/common";
export default {
    components: {
        background,
        dateTimePick
    },
    data() {
        return {
            show: false,
            selectDateTime: "",
            listInfo: []
        };
    },
    created() {
        if (!this.selectDateTime) {
            this.selectDateTime = dateFormat(new Date(), "yyyy-MM");
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        /**
         * @Description: 获取明细列表
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-01 14:43:06
         */
        init() {
            carOwnerApi
                .getDividedList({ month_date: this.selectDateTime })
                .then(res => {
                    let listLength = res.data.list.length;
                    if (res.code == 20000 && listLength > 0) {
                        this.listInfo = res.data.list;
                    } else {
                        this.listInfo = [];
                    }
                });
        },
        /**
         * @Description: 选择时间
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-30 15:23:18
         */
        selectDate() {
            this.show = true;
        },
        /**
         * @Description: 选择时间
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-30 16:58:42
         */
        confirm(currentTime) {
            this.selectDateTime = currentTime;
            this.show = false;
            this.init();
        },
        /**
         * @Description: 取消
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-30 16:58:53
         */
        cancel() {
            this.show = false;
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        /deep/ .van-cell:not(:last-child)::after {
            border: 0 none;
        }
        /deep/ .van-cell {
            padding: 0;
        }
        .no-list-desc {
            padding: 10px;
            text-align: center;
            font-size: 16px;
            color: #ccc;
        }
        .list-items {
            padding: 10px;
            background-color: #fff;
            margin-bottom: 10px;
            .title-style {
                font-size: 16px;
            }
            .title-content-color {
                color: #999;
            }
            .value-content-color {
                color: #333;
                font-size: 16px;
            }
        }
        .select-date {
            padding: 10px 5px;
            /deep/ .van-cell {
                background-color: rgba(242, 242, 242, 0);
            }
            .title-style {
                color: #999;
            }
            .value-style {
                color: #97cdf4;
            }
        }
    }
}
</style>
