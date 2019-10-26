<!--
 * @Description: 单选组件
 * @Author: lp
 * @Date: 2019-06-11 18:14:49
 * @LastEditTime: 2019-06-12 09:54:53
 * @LastEditors: Please set LastEditors
 -->

<template>
    <div class="page">
        <van-radio-group class="gearbox-type-list" v-model="currentChecked" @change="radioCheck">
            <van-cell-group>
                <van-cell
                    clickable
                    @click="currentChecked = value"
                    v-for="(value,key) in list"
                    :key="key"
                    :title="value"
                >
                    <van-radio :name="value"/>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </div>
</template>
<script>
import { RadioGroup, Radio } from "vant";
export default {
    data() {
        return {
            currentChecked: this.checked
        };
    },
    props: ["title", "checked", "list"],
    components: {
        vanRadioGroup: RadioGroup,
        vanRadio: Radio
    },
    created() {},
    mounted() {},
    methods: {
        radioCheck() {
            this.$emit("radioCheck", this.currentChecked);
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
}
</style>



