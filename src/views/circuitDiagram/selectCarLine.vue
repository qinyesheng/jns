<template>
    <div class="page">
        <headerOne title="选择车型"/>
        <div class="main-container">
            <ul>
                <li
                    class="car_series_li"
                    v-for="(item, key) in carLine"
                    @click="getCarYear(item)"
                    :key="key"
                >
                    {{item.name}}
                    <span class="next-icon">
                        <van-icon name="arrow"/>
                    </span>
                </li>
            </ul>
            <p class="noData-text" v-if="noDataShow">该车型电路图正在努力加入中......</p>
        </div>
    </div>
</template>    
<script>
import headerOne from "@/components/header/headerOne";
import choiceCarInfoApi from "@/api/circuitDiagram/choiceCarInfo";
export default {
    props: ["carBrandId", "title"],
    components: {
        headerOne
    },
    data() {
        return {
            circuitCarInfo: {
                carBrand: "",
                carLine: "",
                carLineId: "",
                icoName: ""
            },
            carLine: [], //车辆系列
            noDataShow: false
        };
    },
    methods: {
        /**
         * 获取车型列表
         * @param {string} carBrandId 汽车品牌id号
         * @return 无
         * @author linpeng 2019/1/2
         */
        selectCarLineHandle: function(carBrandId) {
            var self = this;
            choiceCarInfoApi.getCarLineList(carBrandId).then(res => {
                if (res.error_code == 0) {
                    var data = res.data;
                    self.carLine = data.list;
                } else {
                    self.noDataShow = true;
                }
            });
        },
        /**
         * 跳转到车型年款选择页面
         * @param {object} item 用户点选的当前项，包含车型id号
         * @return 无
         * @author linpeng 2019/1/2
         */
        getCarYear: function(item) {
            let circuitCarInfo = this.$sessionStorage.get("circuitCarInfo");
            circuitCarInfo.c_m_id = item.id;
            this.$sessionStorage.set("circuitCarInfo", circuitCarInfo); // 将车型ID存入缓存
            this.$router.push({
                path: "/circuitDiagram/selectCarYear",
                query: {
                    carLineId: item.id
                }
            });
        }
    },
    mounted() {
        this.selectCarLineHandle(this.$route.query.carBrandId);
    }
};
</script>
<style lang='less' scoped>
.page {
    /*选择车辆品牌*/
    .main-container {
        padding: 0;
        .car_series_li {
            padding: 20px 10px;
            border-bottom: 1px solid #ccc;
            font-size: 18px;
            .next-icon {
                float: right;
                font-size: 20px;
                color: #999;
            }
        }

        .noData-text {
            font-size: 16px;
            margin-top: 10px;
            padding: 10px;
        }
    }
}
</style>

