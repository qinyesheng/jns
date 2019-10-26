<!--
 * @Description: 时间组件
 * @Author: xwq
 * @Date: 2019-07-30 15:55:43
 -->
<template>
    <div class="page">
        <van-popup v-model="show" :position="postion" :close-on-click-overlay="false">
            <van-datetime-picker
                v-model="currentDate"
                :type="dateType"
                :min-date="minDate"
                :maxDate="maxDate"
                :formatter="formatter"
                @confirm="confirm(currentDate)"
                @cancel="cancel"
            />
        </van-popup>
    </div>
</template>
<script>
import { DatetimePicker } from "vant";
import { dateFormat } from "@/utils/common";
export default {
    components: {
        [DatetimePicker.name]: DatetimePicker
    },
    props: {
        postion: {
            type: String,
            default: "bottom"
        },
        show: {
            type: Boolean,
            default: false
        },
        dateType: {
            type: String,
            default: "year-month" //时间组件的显示类型[date/year-month/time]
        },
        dateFormatType: {
            type: String,
            default: "yyyy-MM" //时间格式化的类型
        }
    },
    data() {
        return {
            currentDate: new Date(),
            minDate: new Date(2015, 0, 1),
            maxDate: new Date()
        };
    },
    created() {},
    mounted() {},
    methods: {
        /**
         * @Description: 时间格式化
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-30 16:50:00
         */
        formatter(type, value) {
            if (type === "year") {
                return `${value}年`;
            } else if (type === "month") {
                return `${value}月`;
            } else if (type === "day") {
                return `${value}日`;
            }
            return value;
        },
        /**
         * @Description: 选择时间
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-30 16:55:58
         */

        confirm(currentDate) {
            let date = dateFormat(currentDate, this.dateFormatType);
            this.$emit("confirm", date);
        },
        /**
         * @Description: 取消选择
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-30 16:56:25
         */

        cancel() {
            this.$emit("cancel");
        }
    }
};
</script>
<style lang="less" scoped>
.page {
}
</style>
