<template>
    <div class="page">
        <headerOne title="电路图" v-show="!headerFixed"></headerOne>
        <van-search
            type="search"
            placeholder="输入路线图关键字"
            v-model="val"
            input-align="center"
            @input="search()"
        />
        <div class="main-container">
            <ul>
                <li
                    class="resultList"
                    v-for="(item,key) in dataList"
                    :key="key"
                    @click="getCircuitDetails(item)"
                >
                    <p class="text">{{item.title}}</p>
                    <div class="img-div">
                        <div class="total-num">
                            <span>{{item.count}}张</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import { Search } from "vant";
import choiceCarInfoApi from "@/api/circuitDiagram/choiceCarInfo";
import { getUrlParams } from "@/utils/common";
export default {
    props: ["title"],
    components: {
        headerOne,
        [Search.name]: Search
    },
    data: function() {
        return {
            val: "", //搜索框
            headerFixed: false,
            dataList: [], //列表渲染数据,
            list: [] // 源数据副本
        };
    },
    mounted: function() {
        this.getCircuitList();
    },
    methods: {
        /**
         * @获取电路图页面列表数据:
         * @Param:  c_b_id:汽车品牌ID  type:Number
         * @Param:  c_m_id:汽车车型ID  type:Number
         * @Param:  c_v_id:汽车年款ID  type:Number
         * @Param:  org_id:机构ID  type:String
         * @Author: JOJO
         * @Date: 2018-12-27 16:57:27
         * @LastEditors: JOJO
         * @LastEditTime: Do not edit
         * @:return
         */
        getCircuitList: function() {
            let params;
            let urlParams = getUrlParams();
            let line_id = urlParams.id;
            let year = urlParams.y;
            if (line_id && year) {
                // 通过地址栏参数获取列表
                params = {
                    line_id: line_id,
                    year: year
                };
                choiceCarInfoApi.getListByYun(params).then(res => {
                    if (res.error_code == 0) {
                        this.dataList = res.data.list;
                        this.list = res.data.list;
                    } else {
                        this.$toast.fail(res.msg);
                    }
                });

                return false;
            }
            let data = this.$sessionStorage.get("circuitCarInfo");
            if (data) {
                // 通过本地存储参数获取列表
                params = {
                    c_b_id: data.c_b_id,
                    c_m_id: data.c_m_id,
                    c_v_id: data.c_v_id,
                    org_id: "402881485aef1e86015af3cfe1b50038"
                };
                choiceCarInfoApi.getsearchResultList(params).then(res => {
                    if (res.error_code == 0) {
                        this.dataList = res.data.list;
                        this.list = res.data.list;
                    } else {
                        this.$toast.fail(res.msg);
                    }
                });
            }
        },

        /**
         * @获取电路图页面详情数据:
         * @Param: detailsId
         * @Author: JOJO
         * @Date: 2018-12-27 19:57:19
         * @LastEditors: JOJO
         * @LastEditTime: Do not edit
         * @:return
         */
        getCircuitDetails: function(item) {
            this.$router.push({
                name: "resultDetails",
                query: {
                    detailsId: item.id,
                    detailsTitle: item.title
                }
            });
        },

        /**
         * @实现搜索功能：
         * @Param:
         * @Author: JOJO
         * @Date: 2018-12-28 10:40:38
         * @LastEditors: JOJO
         * @LastEditTime: Do not edit
         * @:return
         */
        search() {
            var newArr = [];
            this.dataList = this.list; //每次查询恢复成源数据
            if (this.val == "") {
                return false;
            }
            // console.log("搜索", this.val);
            for (var i = 0; i < this.dataList.length; i++) {
                if (this.dataList[i].title.indexOf(this.val) != -1) {
                    newArr.push(this.dataList[i]);
                }
            }
            this.dataList = newArr;
        }
    }
};
</script>
<style lang='less' scoped>
* {
    box-sizing: border-box;
}
.page {
    /deep/ .van-search__content {
        background: #fff;
        border-radius: 3px;
    }
    /deep/ .van-search {
        background: rgb(242, 242, 242) !important;
        padding: 7px 15px;
    }
    .main-container {
        padding: 0;
        .resultList {
            width: 100%;
            padding: 15px;
            border-bottom: 1px solid #ccc;
            display: flex;
            align-items: center;
            -webkit-align-items: center;
            justify-content: center;
            .text {
                flex: 1;
                font-size: 14px;
                letter-spacing: 0.3px;
                display: table-cell;
                vertical-align: middle;
                padding-right: 15px;
                line-height: 18px;
            }

            .img-div {
                width: 60px;
                height: 60px;
                float: right;
                background: url(../../assets/image/tip-img1.png) no-repeat
                    center;
                position: relative;
                vertical-align: middle;
            }

            .total-num {
                width: 63px;
                height: 22px;
                color: #fff;
                background: rgba(0, 0, 0, 0.3);
                text-align: center;
                position: absolute;
                bottom: 0px;
                left: -3px;
                line-height: 22px;
            }
        }
    }
}
</style>

