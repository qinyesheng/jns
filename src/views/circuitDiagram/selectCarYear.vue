<template>
    <div class="page">
        <headerOne title="选择车款"></headerOne>
        <div class="main-container">
            <ul>
                <li
                    class="car_series_li"
                    v-for="(item, index) in carYear"
                    @click="getCircuit(item)"
                    v-show="item.detail"
                    :key="index"
                >{{item.detail}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import { Icon } from "vant";
import choiceCarInfoApi from "@/api/circuitDiagram/choiceCarInfo";
export default {
    props: ["carBrandId", "title"],
    components: {
        headerOne
    },
    data: function() {
        return {
            carYear: [] //车型年款
        };
    },
    methods: {
        /**
         * 获取车型年款列表
         * @param {string} id 车型id号
         * @return 无
         * @author linpeng 2019/1/2
         */
        getCarYear: function(id) {
            choiceCarInfoApi.getCarYearList(id).then(res => {
                if (res.error_code == 0) {
                    this.carYear = res.data.list;
                }
            });
        },
        /**
         * 跳转到结果查询页面
         * @param {object} item 用户点选的当前项，包含年款id号
         * @return 无
         * @author linpeng 2019/1/2
         */
        getCircuit: function(item) {
            let circuitCarInfo = this.$sessionStorage.get("circuitCarInfo");
            circuitCarInfo.c_v_id = item.id;
            this.$sessionStorage.set("circuitCarInfo", circuitCarInfo); // 将年款ID存入缓存
            this.$router.push({
                path: "/circuitDiagram/searchResult"
            });
        }
    },
    mounted: function() {
        this.getCarYear(this.$route.query.carLineId);
    }
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        padding: 0;

        .car_series_li {
            padding: 15px 10px;
            border-bottom: 1px solid #ccc;
            font-size: 16px;
        }
    }
}
</style>

