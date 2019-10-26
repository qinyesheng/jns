<template>
    <div class="page">
        <div class="text-center bottom-fixed-block">
            <van-button size="normal" type="primary" :block="true" @click="handleClick">{{title}}</van-button>
        </div>
        <van-row class="bottom-fixed"></van-row>
    </div>
</template>
<script>
import { Button } from "vant";
export default {
    name: "FooterOne",
    components: {
        [Button.name]: Button
    },
    props: {
        title: {
            type: String,
            default: ""
        }
    },
    data() {
        return {};
    },
    methods: {
        handleClick() {
            this.$emit("handleClick");
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .bottom-fixed-block {
        position: fixed;
        bottom: 10px;
        left: 10px;
        right: 10px;
        z-index: 2;
    }
}
</style>