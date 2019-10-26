<template>
    <div class="roll-list-selector">
        <van-popup v-model="show" position="bottom" :close-on-click-overlay="clickOverlayStatus">
            <van-picker
                show-toolbar
                :columns="listInfo"
                :title="title"
                @cancel="cancel"
                @confirm="confirm"
            />
        </van-popup>
    </div>
</template>
<script>
import { Picker } from "vant";
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        confirmButtonText: {
            type: String
        },
        cancelButtonText: {
            type: String
        },
        show: {
            type: Boolean,
            default: false
        },
        listInfo: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    components: {
        [Picker.name]: Picker
    },
    data() {
        return {
            clickOverlayStatus: false
        };
    },
    created() {},
    mounted() {},
    methods: {
        //确定
        confirm(val) {
            this.$emit("confirm", val);
        },
        //取消
        cancel() {
            this.$emit("cancel");
        }
    }
};
</script>
<style lang="less" scoped>
.roll-list-selector {
    /deep/ .van-popup {
        z-index: 999999 !important;
    }
}
</style>
