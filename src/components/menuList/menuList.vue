<template>
    <div class="page">
        <div class="main-container">
            <ul class="solution-list">
                <li v-for="(item,key) in list" :key="key" @click="onParentMethod(item)">
                    <img v-lazy="item.iconName">
                    <p>{{item.title}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        list: Array
    },
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {
        onParentMethod: function(item) {
            this.$emit("indexMenuClick", item);
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        padding: 0;
        .solution-list {
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            border-radius: 6px;
            overflow: hidden;
            padding: 10px;
            & > li {
                width: 33.33%;
                height: 110px;
                background-color: #fff;
                margin-right: 1px; /* no */
                padding: 26px 18px;
                box-sizing: border-box;
                & > img {
                    display: block;
                    width: 29px;
                    height: 29px;
                    margin: 0 auto;
                }
                & > p {
                    text-align: center;
                    font-size: 14px;
                    color: rag(59, 59, 59);
                    margin-top: 14px;
                }
            }
            & > li:nth-child(3) {
                margin-right: 0;
            }
        }
    }
}
</style>