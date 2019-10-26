<template>
    <div class="page">
        <van-popup v-model="status" position="right" class="nav-memu" @close="closeMenu">
            <div class="main-container">
                <van-cell-group>
                    <van-cell
                        :title="item.title"
                        :icon="item.icon"
                        size="large"
                        @click="locaitonHref(item)"
                        v-for="(item,key) in menuList"
                        :key="key"
                    />
                </van-cell-group>
            </div>
        </van-popup>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
export default {
    data() {
        return {
            menuList: [
                {
                    title: "预约检车",
                    icon: "wap-home",
                    hash: "orgMap",
                    type: "replace"
                },
                {
                    title: "我的报告",
                    icon: "orders-o",
                    hash: "order",
                    type: "replace"
                },
                {
                    title: "个人中心",
                    icon: "user-circle-o",
                    hash: "personalCenter",
                    type: "replace"
                },
                {
                    title: "用户协议",
                    icon: "newspaper-o",
                    hash: "agreement",
                    type: "href"
                }
            ],
            status: this.checked
        };
    },
    components: {
        headerOne
    },
    model: {
        prop: "checked",
        event: "closeEvent"
    },
    props: ["checked"],
    watch: {
        checked() {
            this.status = this.checked;
        }
    },
    created() {},
    mounted() {},
    methods: {
        init() {},
        appointment() {},
        closeMenu() {
            this.$emit("closeEvent", false);
        },
        onClickLeft() {
            return false;
        },
        locaitonHref(item) {
            this.closeMenu();
            if (this.$router.history.current.name == item.hash) {
                return;
            } else {
                if (item.type == "href") {
                    this.$router.push({
                        name: item.hash
                    });
                } else {
                    this.$router.replace({
                        name: item.hash
                    });
                }
            }
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        padding: 0;
    }
    /deep/ .van-nav-bar__text {
        color: #e14732;
        font-size: 16px;
    }
    .header-one {
        /deep/ .van-nav-bar__left {
            left: 12px;
        }
    }
    .nav-memu {
        width: 75%;
        height: 100%;
    }
}
</style>
