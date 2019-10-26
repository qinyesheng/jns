<template>
    <div>
        <div class="tabs">
            <van-tabs
                title-active-color="#3399ff"
                :border="false"
                color="#3399ff"
                @click="tabChange"
                :style="{top:flexTop+'px'}"
            >
                <van-tab v-for="(item,index) in tabList" :title="item.name" :key="index"></van-tab>
            </van-tabs>
        </div>
        <van-row class="header-fixed-margin"></van-row>
    </div>
</template>
<script>
import { Tab, Tabs } from "vant";
export default {
    data() {
        return {};
    },
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs
    },
    props: {
        tabList: {
            type: Array,
            default: []
        },
        flexTop: {
            type: Number,
            default: 0
        }
    },
    created() {},
    mounted() {},
    methods: {
        tabChange(name, title) {
            this.$emit("tabChange", this.tabList[name].id);
        }
    }
};
</script>
<style lang="less" scoped>
.tabs {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
}

.header-fixed-margin {
    margin-top: 32px;
    border: transparent;
}
h1 {
    background: #fff;
}
</style>