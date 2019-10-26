<template>
    <div>
        <headerOne/>
        <div class="header-container">
            <div id="agreementImg" class="layui-row iframe-amap agreement-img">
                <div id="fwxy" style="width:100%;" @click="fwxyImagePreview">
                    <img :src="agreementUrl" width="100%">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import { ImagePreview } from "vant";
export default {
    data() {
        return {
            amap: {},
            cityName: "",
            // transitionName: 'slide-left'
            loading: "",
            agreementId: "fwxy",
            agreementUrl: "",
            title: "协议说明"
        };
    },
    components: {
        headerOne
    },
    created: function() {},
    mounted: function() {
        this.fwxyHandle();
    },
    methods: {
        fwxyHandle() {
            if (this.$route.params.agreementId) {
                this.agreementId = this.$route.params.agreementId;
            }

            this.agreementUrl = require("../../assets/image/fwxy/" +
                this.agreementId +
                ".png");
        },
        fwxyImagePreview() {
            ImagePreview({
                images: [this.agreementUrl],
                onClose() {}
            });
        }
    }
};
</script>
<style lang='less' scoped>
/*header*/
.iframe-amap {
    width: 100%;
    position: absolute;
    top: 50px;
    bottom: 0;
    left: 0;
    right: 0;
}
/*header*/
.city-search {
    position: absolute;
    top: 90px;
    left: 40px;
    right: 40px;
    z-index: 10;
}
.agreement-img .pinch-zoom-container {
    height: auto;
    overflow: auto !important;
}
</style>