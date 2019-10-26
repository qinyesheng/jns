<!--
 * @Description: 开单_车体检查_车况报告
 * @Author: xwq
 * @Date: 2019-08-23 14:11:31
 * @LastEditTime: 2019-09-05 11:45:42
 -->
<template>
    <div class="page">
        <div class="main-container">
            <van-cell
                v-for="(item,key) in reportList"
                :key="key"
                :title="item.title"
                title-class="title-style"
                label-class="label-main"
                @click="reportClick(item)"
            >
                <template slot="label">
                    <span class="label-left">{{item.org_name}}</span>
                    <span class="label-right">{{item.create_time}}</span>
                </template>
            </van-cell>
        </div>
    </div>
</template>
<script>
import billApi from "@/api/bill/createNew";
import { getUrlParams } from "@/utils/common";
import jnsApi from "@/utils/jnsApi";
export default {
    components: {},
    props: {
        reportList: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            token: ""
        };
    },
    created() {
        this.token = getUrlParams().token;
    },
    mounted() {},
    methods: {
        //选择报告并且调用原生
        reportClick(item) {
            if (item.bill_id) {
                if (item.pay_status != "1") {
                    // 未购买
                    let params = {
                        bill_id: item.bill_id,
                        bill_type: item.bill_type,
                        isReloadH5: 1
                    };
                    jnsApi.h5ToApp("payOrder", params);
                } else {
                    let url =
                        process.env.VUE_APP_WEB_OWNER_URL +
                        "/carReport.html?token=" +
                        this.token +
                        "&billId=" +
                        item.bill_id +
                        "&source=h5";

                    if (item.bill_type == "J002") {
                        // 跳转小虎安检报告
                        window.location.href = url;
                    }
                }
            }
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        padding: 0px;
        .title-style {
            font-size: 16px;
        }
        .label-main {
            .label-left {
                float: left;
                text-align: right;
            }
            .label-right {
                float: right;
                text-align: right;
            }
        }
    }
}
</style>