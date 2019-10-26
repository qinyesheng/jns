<!--
 * @Description: 报告维修方案质保，单行显示
 * @Author: lp
 * @Date: 2019-05-27 15:39:01
 * @LastEditTime: 2019-05-30 17:14:13
 * @LastEditors: Please set LastEditors
 -->

<template>
    <div class="zb" v-if="qualityDesc">
        <img src="@assets/image/zb.png" class="zb-icon" @click.prevent>
        <span>{{qualityDesc}}</span>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    props: {
        // 质保字符串
        qualityDesc: {
            type: String,
            default: ""
        }
    },
    components: {},
    mounted() {},
    methods: {}
};
</script>
<style lang='less' scoped>
.zb {
    padding-left: 10px;
    font-size: 16px;
    color: #898989;
    .zb-icon {
        vertical-align: middle;
        margin-right: 5px;
        height: 24px;
    }
}
</style>