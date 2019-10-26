<template>
    <section>
        <headerOne :title="title" :isFixed="true"></headerOne>
        <div class="inverse-bg-grey"></div>
        <div class="main-container">
            <ul class="list">
                <li
                    v-for="(item, index) in boughtReport"
                    :key="index"
                    @click="openReportDetail(item)"
                >
                    <div class="item-left">
                        <img v-lazy="carLogoPre + item.car_brand_logo + '.jpg'" />
                        <span
                            class="carNum"
                        >{{item.plate_number_p}}{{item.plate_number_c}}&nbsp;{{item.plate_number}}</span>
                    </div>
                    <div class="item-right">
                        <div class="data-item reportName">{{item.title}}</div>
                        <div class="data-item vin">{{item.vin}}</div>
                        <div class="data-item time">{{item.create_time}}</div>
                    </div>
                </li>
            </ul>
            <div class="loadmore">{{loadText}}</div>
        </div>
    </section>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import jnsApi from "@/utils/jnsApi";
import personalCenterApi from "@/api/personalCenter/report";
import { getToken, getUrlParamsCache } from "@/utils/auth";
export default {
    components: {
        headerOne
    },
    data() {
        return {
            title: "已获得报告",
            reportUrl: "",
            reportShow: false,
            carLogoPre: "https://www.wanguoqiche.com/files/logo/",
            boughtReport: [],
            canLoad: true, // 是否允许加载数据
            loadText: "",
            page: 1, // 当前页码数
            pagesize: 10 // 单页显示条数
        };
    },

    created() {
        this.headWatch();
        this.getBoughtReport();
        let urlParams = getUrlParamsCache();
        if (urlParams.menuTitle) {
            this.title = urlParams.menuTitle;
        }
    },
    methods: {
        // 根据滚动条判断是否拉取新数据
        headWatch() {
            window.onscroll = () => {
                let a =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop; //滚动条y轴上的距离
                let b =
                    document.documentElement.clientHeight ||
                    document.body.clientHeight; //可视区域的高度
                let c =
                    document.documentElement.scrollHeight ||
                    document.body.scrollHeight; //可视化的高度与溢出的距离（总高度）
                if (a + b == c) {
                    // alert('已滚动到底部!')
                    this.page++;
                    this.getBoughtReport();
                }
            };
        },
        /**
         * 获取已购买报告列表
         * @return {Object} 返回值描述
         * @author linpeng 2019/3/30
         */
        getBoughtReport() {
            if (!this.canLoad) {
                return false;
            }
            this.loadText = "加载中...";
            let params = {
                page: this.page,
                pagesize: this.pagesize
            };
            personalCenterApi.getReportList(params).then(res => {
                if (res.code == 20000) {
                    this.boughtReport = this.boughtReport.concat(res.data.list);
                    if (res.data.list.length < this.pagesize) {
                        this.loadText = "没有更多了";
                        this.canLoad = false;
                    } else {
                        this.loadText = "加载更多";
                    }

                    if (this.boughtReport.length == 0) {
                        this.loadText = "暂无数据";
                    }
                }
            });
        },
        /**
         * @Description: 跳转报告详情页面
         * @Author: linpeng
         * @Date: 2019-04-04 14:14:39
         */
        openReportDetail(item) {
            this.token = getToken();
            if (item.bill_id) {
                if (item.bill_type == "J002") {
                    // 跳转小虎安检报告
                    window.location.href = `${process.env.VUE_APP_WEB_OWNER_URL}/carReport.html?token=${this.token}&billId=${item.bill_id}`;
                }
            }
        }
    }
};
</script>
<style lang='less' scoped>
.inverse-bg-grey {
    background: #f2f2f2;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: -1;
}
.main-container {
    padding: 0px 0px 10px 0px;
    position: relative;
    .list {
        margin: 10px;
        display: flex;
        flex-direction: column;
        padding-top: 8px;
        li {
            background: #fff;
            padding: 10px 0px;
            margin-bottom: 8px;
            display: flex;
            .item-left {
                min-width: 110px;
                box-sizing: border-box;
                padding: 0px 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-right: 1px solid #efefef;
                img {
                    width: 60px;
                    height: auto;
                }
                .carNum {
                    margin-top: 5px;
                }
            }
            .item-right {
                padding-left: 15px;
                display: flex;
                flex-direction: column;
                .data-item {
                    margin-bottom: 10px;
                }
                .data-item:last-child {
                    margin-bottom: 0px;
                }
                .reportName {
                    font-size: 18px;
                }
                .vin {
                    margin-top: 12px;
                }
                .time {
                    color: #babcbd;
                }
            }
        }
    }
    .loadmore {
        text-align: center;
        font-size: 14px;
        color: #cecece;
        padding-bottom: 15px;
    }
}
</style>