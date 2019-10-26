<!--
 * @Description: 消费记录
 * @Author: xwq
 * @Date: 2019-04-16 14:19:16
 -->
<template>
    <div class="page">
        <!--头部-->
        <!-- <headerOne :title="title" :isFixed="true" :isborderBottom="true"/> -->
        <div class="main-container">
            <h4 class="tilte">消费明细</h4>
            <van-pull-refresh v-model="refresh" @refresh="onRefresh" class="pull-refresh">
                <van-row>
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        :finished-text="consumeInfoShow==0?'暂无数据,下拉即可刷新':'没有更多了'"
                        @load="getDealList"
                    >
                        <ul class="container" v-show="consumeInfoShow">
                            <li
                                class="consume-info-list"
                                v-for="(item,key) in consumeInfoList"
                                :key="key"
                                @click="listClick(item.id)"
                            >
                                <div class="consume-info-list-l">
                                    <h3>{{item.deal_name}}</h3>
                                    <p class="source">{{item.deal_source}}</p>
                                    <p class="source-time">{{item.deal_time}}</p>
                                </div>
                                <div class="consume-info-list-r" :style="{fontFamily:'Arial'}">
                                    <h3>{{item.deal_points}}</h3>
                                </div>
                            </li>
                        </ul>
                    </van-list>
                </van-row>
            </van-pull-refresh>
        </div>
        <!-- <xhMenu v-model="showMenuStatus"></xhMenu> -->
    </div>
</template>
<script>
// import headerOne from "@/components/header/headerOne";
// import xhMenu from "@/pages/xhDetection/views/menu";
import carOwnerApi from "@/api/carOwner/usersCenter";
import { PullRefresh, List } from "vant";
export default {
    components: {
        // headerOne,
        // xhMenu,
        [PullRefresh.name]: PullRefresh,
        [List.name]: List
    },
    data() {
        return {
            title: this.$route.meta.title,
            // showMenuStatus: false,
            consumeInfoList: [],
            refresh: false,
            loading: false,
            finished: false,
            requestStatus: false,
            requestInfoOrigin: {},
            requestInfo: {
                page: 1,
                pagesize: 20
            },
            listTotal: 0,
            consumeInfoShow: false
        };
    },
    activated() {
        // console.log("activated");
    },
    created() {},
    mounted() {},
    methods: {
        /*  showMenu() {
            this.showMenuStatus = true;
        }, */

        /**
         * @Description: 获取车主消费记录明细列表
         * @Param:  requestInfo  明细列表
         * @Param:  page  页数  默认第一页
         * @Param:  pagesize  每页的条数  默认20条
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-08 18:03:30
         */
        getDealList() {
            carOwnerApi.getDealList(this.requestInfo).then(res => {
                this.loading = false;
                if (res.code == 20000 && res.data.list) {
                    // console.log(res);
                    let data = res.data.list;
                    this.listTotal = res.total;
                    for (let key in data) {
                        if (
                            data[key].deal_type == "1" &&
                            data[key].deal_act == "1"
                        ) {
                            data[key].deal_points = "+" + data[key].deal_points;
                        } else if (
                            data[key].deal_type == "1" &&
                            data[key].deal_act == "2"
                        ) {
                            data[key].deal_points = "-" + data[key].deal_points;
                        } else if (
                            data[key].deal_type == "2" &&
                            data[key].deal_act == "1"
                        ) {
                            data[key].deal_points =
                                "+" + "￥" + data[key].deal_points;
                        } else if (
                            data[key].deal_type == "2" &&
                            data[key].deal_act == "2"
                        ) {
                            data[key].deal_points =
                                "-" + "￥" + data[key].deal_points;
                        }
                    }
                    this.consumeInfoList = [...this.consumeInfoList, ...data];
                    this.consumeInfoShow = true;
                    if (
                        res.total == 0 ||
                        this.listTotal == this.consumeInfoList.length ||
                        data.length === 0 ||
                        data.length < this.requestInfo.pagesize
                    ) {
                        this.finished = true;
                    } else {
                        this.requestInfo.page++;
                        this.finished = false;
                    }
                    if (this.consumeInfoList.length == 0) {
                        this.consumeInfoShow = false;
                    }
                } else {
                    this.$toast.fail(res.msg);
                    this.finished = true;
                }
            });
        },
        //列表点击查看详情
        listClick(id) {
            this.$router.push({
                name: "consumeDealInfo",
                query: {
                    id
                }
            });
        },
        //下拉刷新
        onRefresh() {
            setTimeout(() => {
                this.refresh = false;
                this.consumeInfoList = [];
                this.requestInfo.page = 1;
                this.getDealList();
            }, 1000);
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        .tilte {
            font-size: 18px;
            font-weight: bold;
        }
        .pull-refresh {
            /deep/ .van-pull-refresh__track {
                min-height: calc(100vh - 50px);
            }
        }
        .container {
            background-color: #fff;
            border-radius: 10px;
            padding-top: 10px;
            border: 1px solid transparent;
            box-sizing: border-box;
            .consume-info-list {
                display: flex;
                border-bottom: 1px solid #f2f2f2;
                box-sizing: border-box;
                margin-top: 10px;
                .consume-info-list-l {
                    flex: 1;
                    & > h3 {
                        margin-bottom: 15px;
                    }
                    .source {
                        font-size: 14px;
                        color: #959595;
                    }

                    .source-time {
                        font-size: 14px;
                        padding: 10px 0;
                        color: #959595;
                    }
                }
                .consume-info-list-r {
                    width: 120px;
                    padding: 10px;
                    font-size: 16px;
                    text-align: center;
                    position: relative;
                    & > h3 {
                        line-height: 100%;
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translate(0, -50%);
                    }
                }
            }
        }
    }
}
</style>
