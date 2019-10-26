<!--
 * @Description: 分成统计
 * @Author: xwq
 * @Date: 2019-07-27 15:22:40
 -->
<template>
    <div class="page">
        <background />
        <div class="main-container" v-if="isShow">
            <div class="user-info">
                <van-cell
                    v-for="(item,key) in userInfo"
                    :key="key"
                    :title-class="item.titleClass"
                    :title="item.title | titleTelFormate"
                ></van-cell>
            </div>
            <div class="earnings" @click="dividedDetail">
                <van-cell title-class="title-style" title="收益(本月)">
                    <template slot="default">
                        <span>明细</span>
                    </template>
                </van-cell>
                <van-cell title-class="content-color">
                    <template slot="title">
                        <span>{{bonus}}元</span>
                    </template>
                </van-cell>
            </div>
            <div class="promotion-channel" v-if="qrCodeLink">
                <van-cell title-class="title-style" title="推广渠道">
                    <template slot="default">
                        <span @click="copylink">复制链接</span>
                    </template>
                </van-cell>
                <QRCode :qrCodeLink="qrCodeLink" :titleStatus="false" :buttonStatus="false" />
            </div>
        </div>
    </div>
</template>
<script>
import carOwnerApi from "@/api/carOwner/usersCenter";
import background from "@/components/background/background";
import QRCode from "@/components/qrCode/qrCode";
export default {
    components: {
        background,
        QRCode
    },
    data() {
        return {
            isShow: false,
            qrCodeLink: "",
            bonus: "",
            userInfo: [
                {
                    titleClass: "title-style",
                    title: "账号信息"
                },
                {
                    titleClass: "content-color",
                    title: ""
                },
                {
                    titleClass: "content-color",
                    title: ""
                }
            ]
        };
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        init() {
            carOwnerApi.getDividedStatistics().then(res => {
                if (res.code == 20000) {
                    let data = res.data;
                    // data.promotion_url = "http://www.baidu.com"; //测试
                    this.userInfo[1].title = data.user_name;
                    this.userInfo[2].title = data.user_mobile;
                    this.qrCodeLink = data.promotion_url;
                    this.bonus = (+data.bonus).toFixed(2);
                    this.isShow = true;
                } else {
                    this.$toast(res.msg);
                }
            });
        },
        /**
         * @Description: 跳转分成明细
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-27 16:46:17
         */
        dividedDetail() {
            this.$router.push({
                name: "dividedDetail"
            });
        },
        /**
         * @Description: 复制链接到剪贴板
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-27 16:50:14
         */
        copylink() {
            let _this = this;
            this.$nextTick(() => {
                let oInput = window.document.createElement("input");
                let range = document.createRange();
                oInput.value = _this.qrCodeLink;
                oInput.className = "copy-input-style";
                oInput.setAttribute("readOnly", false);
                document.body.appendChild(oInput);
                range.selectNode(oInput);
                window.getSelection().addRange(range);
                let successful = document.execCommand("copy");
                _this.$toast(successful);
                try {
                    let msg = successful
                        ? "短链接已复制到手机剪切板"
                        : "复制失败";
                    _this.$toast(msg);
                } catch {
                    _this.$toast("unable to copy");
                }
                window.getSelection().removeAllRanges(); //移除选中的元素
            });
        }
    },
    filters: {
        titleTelFormate(val) {
            let Reg = /^\d{11}$/;
            if (Reg.test(val)) {
                let result = null;
                result =
                    val.substr(0, 3) +
                    " " +
                    val.substr(3, 4) +
                    " " +
                    val.substr(7, 4);
                return result;
            } else {
                return val;
            }
        }
    }
};
</script>
<style>
.copy-input-style {
    opacity: 0;
    cursor: default;
    width: 1px;
    height: 1px;
    position: absolute;
    top: -99999px;
    left: -99999px;
}
</style>

<style lang="less" scoped>
.public-style {
    padding: 10px;
    background-color: #fff;
    margin-bottom: 10px;
    .content-color {
        color: #999;
    }
}
.page {
    .main-container {
        /deep/ .van-cell:not(:last-child)::after {
            border: 0 none;
        }
        /deep/ .van-cell {
            padding: 0;
        }
        .title-style {
            font-size: 16px;
        }
        .user-info {
            .public-style;
        }
        .earnings {
            .public-style;
        }
        .promotion-channel {
            .public-style;
        }
    }
}
</style>
