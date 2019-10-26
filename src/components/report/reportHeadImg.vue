<!--
 * @Description: 报告头部图片
 * @Author: lp
 * @Date: 2019-05-30 09:26:45
 * @LastEditTime: 2019-05-30 09:48:21
 * @LastEditors: Please set LastEditors
 -->

<template>
    <div class="reportHead">
        <img :src="imgSrc">
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    props: {
        imgSrc: {
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
.reportHead {
    margin-top: 10px;
    margin-bottom: 15px;
    padding: 0px 10px;
    img {
        width: 100%;
    }
}
</style>