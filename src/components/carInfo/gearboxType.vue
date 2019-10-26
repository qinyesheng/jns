<template>
    <div class="page">
        <van-radio-group
            class="gearbox-type-list"
            v-model="gearboxTypeChecked"
            @change="gearboxTypeConfirm"
        >
            <van-cell-group>
                <van-cell
                    clickable
                    @click="gearboxTypeChecked = value"
                    v-for="(value,key) in list"
                    :key="key"
                    :title="value"
                >
                    <van-radio :name="value"/>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
        <!-- <div class="gearbox-type-confirm">
            <van-button size="normal" :block="true" @click="gearboxTypeConfirm" type="info">确定</van-button>
        </div>-->
    </div>
</template>
<script>
import { RadioGroup, Radio } from "vant";
export default {
    data() {
        return {
            list: [
                "电子无级变速器",
                "手动变速器",
                "手自一体变速器",
                "双离合变速器",
                "无级变速器",
                "序列变速器",
                "自动变速器"
            ],
            gearboxTypeChecked: this.checked
        };
    },
    props: ["title", "checked"],
    watch: {
        checked() {
            // console.log(this.checked);
            this.gearboxTypeChecked = this.checked;
        }
    },
    components: {
        vanRadioGroup: RadioGroup,
        vanRadio: Radio
    },
    created() {},
    mounted() {},
    methods: {
        gearboxTypeConfirm() {
            this.$emit("gearboxTypeConfirm", this.gearboxTypeChecked);
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .gearbox-type-list {
        position: fixed;
        top: 46px;
        bottom: 60px;
        left: 0;
        right: 0;
        overflow-y: scroll;
    }
    .gearbox-type-confirm {
        position: fixed;
        padding-top: 10px;
        bottom: 10px;
        left: 10px;
        right: 10px;
    }
}
</style>



