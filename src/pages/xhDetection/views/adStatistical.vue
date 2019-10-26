<!--
 * @Description: 广告投放统计
 * @Author: wjx
 * @Date: 2019-08-13 14:18:40
 -->
<template>
    <div class="page">
        <div class="main-container">
            <div class="panel">
                <div class="title">账号信息</div>
                <div>{{adData.owner_name}}</div>
            </div>
            <div class="panel devote">
                <div class="title">投放统计</div>
                <div>数据更新时间</div>
                <div>{{adData.update_time}}</div>
                <div
                    class="list"
                    v-for="(item,index) in adData.list"
                    :key="index"
                    :class="[index==adData.list.length-1?'list_no_line':'']"
                    v-show="adData.list.length>0"
                >
                    <div class="imgbox">
                        <img :src="item.pic" />
                    </div>
                    <div>明细</div>
                    <div class="detail">
                        <div class="left">
                            <div class="num">{{item.browse_num}}</div>
                            <div>浏览量</div>
                        </div>
                        <div class="vLine"></div>
                        <div class="right">
                            <div class="num">{{item.click_num}}</div>
                            <div>点击量</div>
                        </div>
                    </div>
                    <div class="time">
                        <div>投放时间</div>
                        <div>{{item.start_date}} - {{item.end_date}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import xhjcOwnerApi from "@/api/xhjcOwner/xhjcOwner";
export default {
    data() {
        return {
            adData: {
                owner_name: "汝湖", // 广告主名称
                update_time: "2019-08-13 02:00", // 更新时间
                list: [
                    {
                        pic: require("@image/reportPic1.png"), // 广告图
                        start_date: "2019-08-13", // 投放开始时间
                        end_date: "2019-09-13", // 投放结束时间
                        browse_num: "8542", // 浏览量
                        click_num: "15832" // 点击量
                    },
                    {
                        pic: require("@image/reportPic1.png"), // 广告图
                        start_date: "2019-08-13", // 投放开始时间
                        end_date: "2019-09-13", // 投放结束时间
                        browse_num: "8542", // 浏览量
                        click_num: "15832" // 点击量
                    }
                ]
            }
            // adData: {}
        };
    },
    created() {},
    mounted() {
        this.getAdStatistics();
    },
    methods: {
        getAdStatistics() {
            xhjcOwnerApi.getAdStatistics().then(res => {
                if (res.code == 20000) {
                    this.adData = res.data;
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    background-color: #e3e3e3;
    .panel {
        background: #fff;
        padding: 10px 10px 0 10px;
        color: #999999;
        border-radius: 6px;
        margin-bottom: 10px;
        div {
            padding-bottom: 10px;
            font-size: 14px;
        }
        .title {
            color: #666;
            font-size: 16px;
            font-weight: bold;
        }
    }
    .devote {
        padding-bottom: 0;
        .title {
            padding-bottom: 20px;
        }
        .list {
            border-bottom: 1px solid #ccc;
            padding-top: 15px;
            padding-bottom: 5px;
        }
        .list_no_line {
            border-bottom: none;
            padding-bottom: 0px;
        }
        .imgbox {
            img {
                width: 100%;
                // max-height: 120px;
            }
        }
        .detail {
            display: inline-block;
            width: 100%;
            padding-top: 10px;
            .left {
                float: left;
                width: 49.5%;
                text-align: center;
            }
            .right {
                float: left;
                width: 49.5%;
                text-align: center;
            }
            .vLine {
                border-left: solid 1px #ccc;
                height: 36px;
                float: left;
            }
            .num {
                font-size: 20px;
            }
        }
        .time {
            padding-bottom: 0;
        }
    }
}
</style>