<!--
 * @Description: 支付页面
 * @Author: xwq
 * @Date: 2019-04-22 10:49:02
 -->
<template>
    <div class="page">
        <!-- <h1>支付页面</h1> -->
    </div>
</template>
<script>
import carOwnerApi from "@/api/carOwner/PointsDeal";
export default {
    data() {
        return {};
    },
    created() {},
    mounted() {
        this.pointsRecharge();
    },
    methods: {
        /**
         * @Description: 安检公众号支付入口
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-08 18:09:46
         */
        pointsRecharge() {
            carOwnerApi.pointsRecharge().then(res => {
                if (res.code == 30100 && res.data.url) {
                    location.href = res.data.url;
                }
            });
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    @test: #58bc58;
    /*    h1 {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, 50%);
        color: @test;
    } */
}
</style>


