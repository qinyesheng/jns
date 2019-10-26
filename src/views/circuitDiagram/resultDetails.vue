<template>
    <div class="page">
        <headerOne :title="title"/>
        <div class="main-container">
            <div class="iframe-amap" @click="circuitDiagramImagePreview">
                <van-swipe class="fwxy-custom-swipe" indicator-color="#000">
                    <van-swipe-item
                        v-for="(item, index) in imgList"
                        :key="index"
                        class="text-center"
                    >
                        <img v-lazy="item" :preview="index" :preview-text="title">
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import { ImagePreview, Swipe, SwipeItem } from "vant";
import choiceCarInfoApi from "@/api/circuitDiagram/choiceCarInfo";
export default {
    components: {
        headerOne,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem
    },
    data() {
        return {
            current: 0,
            imgList: [],
            touchable: true,
            title: this.$route.query.detailsTitle
        };
    },
    created() {},
    mounted() {
        this.getResultDetails();
    },
    methods: {
        getResultDetails() {
            this.$toast.loading({
                mask: true,
                message: "加载中...",
                duration: 1000
            });
            if (this.$route.query.detailsId) {
                let id = this.$route.query.detailsId;
                choiceCarInfoApi.getResultDetails(id).then(res => {
                    if (res.error_code == 0 && res.data.list.length > 0) {
                        this.imgList = res.data.list;
                    }
                });
            }
        },
        circuitDiagramImagePreview() {
            if (this.imgList.length > 0) {
                ImagePreview({
                    images: this.imgList,
                    onClose() {
                        // do something
                    }
                });
            }
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        padding: 0;
        .iframe-amap {
            width: 100%;
            position: absolute;
            top: 50px;
            bottom: 0;
            left: 0;
            right: 0;
            background: #fff;
            .fwxy-custom-swipe {
                width: 100%;
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                height: 70%;
                /deep/ .van-swipe-item {
                    position: relative;
                }
                /deep/ .van-swipe-item img {
                    height: 100%;
                    margin: 0 auto;
                }
            }
        }
    }
}
</style>

