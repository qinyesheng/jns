<template>
    <div class="reportNotReady">
        <van-icon name="todo-list-o" class="report-icon"/>
        <div>报告未生成，请稍候查看</div>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {};
    },
    methods: {},
    mounted() {}
};
</script>
<style lang='less' scoped>
.reportNotReady {
    background-color: #fff;
    padding: 20px 10px;
    border-radius: 4px;
    font-size: 16px;
    text-align: center;
    border: 1px solid #e6e6e6;
    .report-icon {
        font-size: 80px;
        color: #46aef7;
        margin-bottom: 20px;
    }
}
</style>