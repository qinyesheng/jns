<template>
    <div class="page">
        <div @click="onParentMethod" :class="isFixed? 'introduce_fixed' : 'introduce'">
            <img src="../../assets/image/introduce.png" class="introduce_icon">
            <span>详细功能介绍</span>
            <img src="../../assets/image/right_icon2.png" class="introduce_icon">
        </div>
        <div class="padding" v-if="isFixed"></div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {};
    },
    props: ["isFixed"],
    methods: {
        onParentMethod: function() {
            this.$emit("showFlow");
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .introduce {
        background: #46aef7;
        height: 40px;
        line-height: 40px;
        color: #fff;
        font-size: 17px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
    }
    .introduce_fixed .introduce_icon,
    .introduce .introduce_icon {
        height: 16px;
        margin: 0px 5px;
        margin-top: 2px;
    }

    .introduce_fixed {
        width: 100%;
        position: fixed;
        top: 46px;
        margin-top: 0;
        background: #46aef7;
        height: 40px;
        line-height: 40px;
        color: #fff;
        font-size: 17px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
    }

    .padding {
        padding-bottom: 40px;
    }
}
</style>