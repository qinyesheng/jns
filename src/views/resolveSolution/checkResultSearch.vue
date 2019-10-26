<!--
 * @Description: 诊断结果搜索
 * @Author: xwq
 * @Date: 2019-03-02 09:36:02
 -->
<template>
    <div class="checkResultSearch">
        <div class="check-result-search-block" v-if="helperEngineFaultPhenomenon">
            <div class="check-result-search">
                <form action="/">
                    <van-search
                        name="title"
                        v-model="keyword"
                        :placeholder="faultPhenomenonPlaceholder"
                        show-action
                        background="none"
                        @input="searchEngineFaultPhenomenon"
                        @cancel="onCancel"
                        autofocus
                    />
                </form>
            </div>
        </div>
        <!-- 内容展示 -->
        <ul class="engine-fault-flow-ul">
            <li v-for="(item,key) in list" :key="key" @click="qualityAssurancePlan(item.id)">
                <p>{{item.check_result}}</p>
                <van-icon name="arrow"/>
            </li>
            <p class="bottomDesc">
                <span @click="searchMore" v-if="nextPage">加载更多</span>
                <span v-if="noMoreContent" class="noMore">没有更多了</span>
            </p>
        </ul>
    </div>
</template>
<script>
import { Search, Icon } from "vant";
import aiMaintainSolutionApi from "@/api/aiMaintainSolution/solution";
export default {
    data: function() {
        return {
            list: [],
            pageConfig: {
                page: 1,
                pagesize: 20
            },
            nextPage: false,
            noMoreContent: false,
            keyword: "",
            searchTime: "",
            helperEngineFaultPhenomenon: true,
            helperEngineDetection: false,
            faultPhenomenonPlaceholder: "请输入诊断结果",
            requestUrl: {
                enigine0: {},
                enigine1: {
                    detectionUrl:
                        "/Helper/HelperEngine/getEngineTemperatureProjectList",
                    detectionResultUrl:
                        "/Helper/HelperEngine/getEngineTemperatureResult"
                },
                enigine2: {
                    detectionUrl:
                        "/Helper/HelperEngine/getOxygenSensorProjectList",
                    detectionResultUrl:
                        "/Helper/HelperEngine/getOxygenSensorResult"
                }
            }
        };
    },
    components: {
        vanSearch: Search,
        vanIcon: Icon
    },
    created: function() {
        var self = this;
        var data = {
            requestUrl: self.requestUrl,
            phenomenonResult: null
        };
        self.$local.set("helperEngine", data);
        var sessionEngine = {
            switchTitle: null
        };
        self.$local.set("sessionEnginePhenomenon", sessionEngine);
    },
    methods: {
        getCheckResultList(data) {
            var self = this;
            data = data || self.pageConfig;
            aiMaintainSolutionApi.getCheckResultList(data).then(res => {
                if (res.code == 20000) {
                    var data = res.data.list,
                        total = res.total;
                    if (data) {
                        self.list.push(...data);
                    }
                    if (
                        total > self.pageConfig.pagesize &&
                        total > self.list.length
                    ) {
                        self.pageConfig.page += 1;
                        self.nextPage = true;
                    }
                    if (total <= self.list.length) {
                        self.noMoreContent = true;
                        self.nextPage = false;
                    }
                } else {
                }
            });
        },
        //查询更多
        searchMore() {
            this.getCheckResultList();
        },
        //实时搜索数据
        searchEngineFaultPhenomenon() {
            var self = this;
            if (!self.keyword) {
                self.list = [];
                self.pageConfig.page = 1;
                self.nextPage = false;
                self.noMoreContent = false;
                return false;
            }
            self.pageConfig.keyword = self.keyword;
            if (self.searchTime) {
                clearTimeout(self.searchTime);
            }
            self.searchTime = setTimeout(function() {
                self.getCheckResultList(self.pageConfig);
            }, 300);
        },
        onCancel: function() {
            this.$router.go(-1);
        },
        qualityAssurancePlan(id) {
            this.$router.push({
                path: "qualityAssurancePlan",
                query: { checkResultSearchId: id }
            });
        }
    }
};
</script>
<style lang='less' scoped>
.checkResultSearch {
    padding: 0 10px;
    /deep/ .check-result-search {
        padding-right: 0 !important;
    }
    /deep/ .van-search {
        padding: 0;
        height: 38px;
        .van-cell {
            background-color: #f5f5f5;
            height: 38px;
            line-height: 32px;
        }
        /deep/ .van-search__action {
            height: 38px;
            line-height: 38px;
            padding: 0 10px 0 18px;
            color: #444;
        }
    }
    .check-result-search-block {
        margin: 0px;
    }
    .check-result-search {
        position: relative;
        margin: 10px 0px;
        padding-right: 60px;
    }
    .check-result-search input {
        border: 0px;
        background-color: #f5f5f5;
    }
    .check-result-search button {
        width: 60px;
        height: 38px;
        line-height: 38px;
        position: absolute;
        border: 0px;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: #fff;
        color: #333;
    }

    .engine-fault-flow-ul {
        margin-top: 10px;
        border-top: 1px solid #d2d2d2;
        li {
            position: relative;
            border-bottom: 1px solid #d2d2d2;
            font-weight: 500;
            display: flex;
            font-size: 14px;
            height: 59px;
            p {
                flex: 1;
                padding: 20px 0 20px 10px;
            }
            i {
                display: block;
                width: 50px;
                text-align: center;
                line-height: 53px;
                font-size: 24px;
                color: rgb(210, 210, 210);
            }
        }
        .bottomDesc {
            margin: 20px 0;
            text-align: center;

            span {
                padding: 5px 20px;
                background-color: #f5f5f5;
                font-size: 14px;
                color: #333;
            }
            .noMore {
                color: #999;
                background-color: rgba(255, 255, 255, 0);
            }
        }
    }
}
</style>


