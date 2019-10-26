<template>
    <div class="page"></div>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
    data() {
        return {};
    },
    components: {},
    created() {
        this.$toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: "spinner",
            message: "加载中"
        });
        let reportCode = this.$route.query.reportCode;
        location.replace(
            process.env.VUE_APP_WEB_OWNER_URL +
                "/infoSure.html?token=" +
                getToken() +
                "&reportCode=" +
                reportCode +
                "&title=" +
                encodeURIComponent(this.$route.meta.title)
        );
    },
    mounted() {},
    methods: {}
};
</script>