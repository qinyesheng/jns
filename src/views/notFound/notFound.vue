<template>
    <div class="page">
        <div class="main-container">
            <van-row class="not-find">
                <van-row class="not-find-relative">
                    <van-row class="not-find-absolute">
                        <van-col :span="24" class="not_page_wrap text-center">
                            <img src="@image/404@2x.png" alt>
                        </van-col>
                        <van-col :span="24" class="not_page_p">
                            <h3 class="text-center not-find-text">Not Found</h3>
                        </van-col>
                    </van-row>
                </van-row>
            </van-row>
        </div>
    </div>
</template>
<script>
import jnsApi from "@/utils/jnsApi";
import { isWeixin } from "@/utils/common";
export default {
    name: "NotFind-404",
    data() {
        return {
            s: 3
        };
    },
    mounted() {
        let _this = this;
        if (isWeixin()) {
            return false;
        }
        let setInId = setInterval(() => {
            _this.s--;
            if (_this.s < 1) {
                clearInterval(setInId);
                jnsApi.back();
            }
        }, 1000);
    }
};
</script>

<style scoped type="text/less" lang="less">
.page {
    .not-find {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 10;
        .not-find-relative {
            position: relative;
            width: 100%;
            height: 100%;
        }
        .not-find-absolute {
            position: absolute;
            height: 50%;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }
        .not_page_wrap {
            img {
                height: 150px;
            }
        }
        .not_page_p {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            text-align: center;
            line-height: 22px;
            padding: 0;
            margin: 30px auto 0;
            font-weight: 300;
            span {
                font-size: 16px;
                color: red;
                font-weight: 600;
            }
        }
        .not-find-text {
            font-size: 27px;
        }
    }
}
</style>