<!--
 * @Description: 使用说明
 * @Author: xwq
 * @Date: 2019-07-05 22:04:22
 * @LastEditTime: 2019-10-12 15:10:22
 -->
<template>
    <div class="page">
        <div class="main-container">
            <h1 class="use-descInfo-title">使用说明</h1>
            <ul class="use-descInfo-list">
                <li v-for="(item,key) in deacList" :key="key">{{item}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            deacList: [
                "1、账户充值目前仅限充值卡在线充值,暂不支持其他支付方式。",
                "2、账户充值返现金额即时到账。",
                "3、账户余额暂不支持退款。",
                "4、如需开具发票,请向前台提交申请,完善发票开具信息;开票金额为您实际支付充值金额,不包含充值返现金额。"
            ]
        };
    },
    created() {},
    mounted() {}
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        margin-top: 20px;
        padding: 0;
        .use-descInfo-title {
            padding: 5px 15px;
            font-size: 18px;
            font-weight: bold;
        }
        .use-descInfo-list {
            padding: 5px 15px;
            & > li {
                padding: 10px 0 0 0;
                color: #6c6c6c;
                line-height: 25px;
            }
        }
    }
}
</style>
