
<!--
 * @Description: 公共警告弹窗组件
 * @Author: xwq
 * @Date: 2019-05-08 09:37:48
 -->
<template>
    <div class="page">
        <div class="main-container">
            <van-dialog
                v-model="show"
                show-cancel-button
                :cancel-button-text="cancelButtonText"
                :cancel-button-color="cancelButtonColor"
                :confirm-button-text="confirmButtonText"
                :confirm-button-color="confirmButtonColor"
                @confirm="confirm"
                @cancel="cancel"
            >
                <van-row>
                    <van-col span="24" class="close-btn">
                        <van-icon name="cross" size="30px" color="#666" @click="closeHandle" />
                    </van-col>
                </van-row>
                <img src="@/assets/image/dialogIcon.png" />
                <p class="warning-info" v-text="warningInfoText"></p>
            </van-dialog>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { Dialog } from "vant";
Vue.use(Dialog);
// import { Dialog } from "vant";
export default {
    components: {
        // [Dialog.name]: Dialog
    },
    props: {
        cancelButtonText: {
            type: String,
            default: "取消"
        },
        confirmButtonText: {
            type: String,
            default: "确定"
        },
        cancelButtonColor: String,
        confirmButtonColor: String,
        warningInfoText: String
    },
    data() {
        return {
            show: true
        };
    },
    created() {},
    mounted() {},
    methods: {
        /**
         * @Description: 弹窗关闭
         * @Param:
         * @Author: xwq
         * @Date: 2019-05-08 17:12:00
         */
        closeHandle() {
            this.$emit("closeHandle");
        },
        /**
         * @Description: 弹窗确定按钮
         * @Param:
         * @Author: xwq
         * @Date: 2019-05-08 17:12:20
         */
        confirm() {
            this.$emit("confirm");
        },
        /**
         * @Description: 弹窗取消按钮
         * @Param:
         * @Author: xwq
         * @Date: 2019-05-08 17:12:22
         */
        cancel() {
            this.$emit("cancel");
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        padding: 0;
        /deep/ .van-dialog {
            border-radius: 10px;
        }
        /deep/ .van-dialog__content {
            text-align: center;
            & > img {
                width: 100px;
            }
            .warning-info {
                padding: 20px 0;
                font-size: 16px;
                font-weight: bold;
            }
        }
        .close-btn {
            padding: 10px;
            text-align: right;
        }
    }
}
</style>
