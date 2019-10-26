<!--
 * @Description: 二手车评估报告模板，根据传进来的数据进行页面渲染
 * @Author: lp
 * @Date: 2019-05-20 14:04:04
 * @LastEditTime: 2019-05-24 10:10:25
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="page">
        <div class="inverse-bg-grey"></div>
        <div class="main-container" v-if="report.base_info">
            <div class="carName">
                <div class="car-icon">
                    <img :src="carLogoPre+report.base_info.car_icon+'.jpg'" alt="车标">
                </div>
                <div class="car-detail">
                    <div class="car-detail-name">{{report.base_info.car_model_full_name}}</div>
                    <div class="car-detail-vin">VIN: {{report.base_info.vin}}</div>
                </div>
            </div>
            <div class="assess-result" v-if="report.assess_info">
                <div class="assess-price">
                    <div class="title">评估价</div>
                    <div class="price-detail">
                        <span class="num">{{report.assess_info.car_evaluation_price}}</span>
                        <sup>万元</sup>
                    </div>
                </div>
                <div class="assess-other">
                    <div class="other-item">
                        <div class="titlt">上牌时间</div>
                        <span class="item-content">{{report.assess_info.car_license_time}}</span>
                    </div>
                    <div class="other-item">
                        <div class="titlt">行驶里程</div>
                        <span class="item-content">{{report.base_info.miles | mileTurn}}</span>
                    </div>
                </div>
            </div>
            <div class="report-block org-info">
                <div class="title">
                    <img src="../../assets/image/person.png">
                    <span>检测方</span>
                </div>
                <div class="content">
                    <div class="org-name">{{report.base_info.org_name}}</div>
                    <div class="time">{{report.base_info.detection_time}}</div>
                </div>
            </div>
            <div class="report-block car-picture">
                <div class="title">
                    <img src="../../assets/image/car.png">
                    <span>车辆图片</span>
                </div>
                <div class="content" v-if="pictureList.length">
                    <div class="img-box" v-for="(item, index) of pictureList" :key="index">
                        <img v-lazy="item" @click="enlargeImage(pictureList, index)">
                    </div>
                </div>
                <div class="no-picture-content" v-else>
                    <img src="../../assets/image/noPicture.png">
                    <span class="text">暂无相关车辆图片</span>
                </div>
            </div>
            <div class="report-block statement">
                <div class="title">
                    <img src="../../assets/image/statement.png">
                    <span>免责条款</span>
                </div>
                <div class="content">
                    <ul>
                        <li>1.广州万国汽车技术有限公司（以下简称"JNS"）为第三方权威检测机构。</li>
                        <li>2.JNS对于用户从其他渠道下载、链接等方式所取得的评估报告以及信息，不保证真实性和准确性。</li>
                        <li>3.本评估报告不得用于其他商业用途，JNS对非本机构的交易和行为不承担任何直接、间接、附带或衍生的损失和责任，并保留向其追究法律责任的权利。</li>
                        <li>4.本评估报告的最终解释权归JNS所有。</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ImagePreview } from "vant";
export default {
    components: {},
    data() {
        return {
            carLogoPre: "https://www.wanguoqiche.com/files/logo/",
            pictureList: []
        };
    },
    props: {
        report: {
            type: Object
        }
    },
    filters: {
        mileTurn(val) {
            if (!val) {
                return "";
            }
            val = parseInt(val);
            if (val > 10000) {
                val = (val / 10000).toFixed(2) + "万KM";
                return val.toString();
            } else {
                return val.toString() + "KM";
            }
        }
    },
    mounted() {
        this.reportHandle();
    },
    methods: {
        reportHandle() {
            // 车辆图片处理
            if (this.report.base_info.pic.length) {
                for (let item of this.report.base_info.pic) {
                    this.pictureList.push(item.url);
                }
            }
        },
        /**
         * @Description: 放大缩略图
         * @Author: linpeng
         * @Date: 2019-05-22 10:07:34
         */
        enlargeImage(imgArray, index) {
            ImagePreview({
                images: imgArray,
                loop: false,
                startPosition: index,
                lazyLoad: true,
                showIndicators: true
            });
        }
    }
};
</script>
<style lang='less' scoped>
.page {
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
        padding-left: 0;
        padding-right: 0;
        .carName {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            .car-icon {
                flex-grow: 0;
                flex-shrink: 0;
                width: 42px;
                height: 42px;
                padding: 8px;
                overflow: hidden;
                background: #fff;
                border-radius: 50%;
                margin-right: 10px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .car-detail {
                display: flex;
                flex-direction: column;
                .car-detail-name {
                    font-size: 17px;
                    font-weight: bold;
                    flex-wrap: wrap;
                    margin-bottom: 8px;
                    line-height: 1.1;
                }
                .car-detail-vin {
                    font-size: 12px;
                    color: #666;
                }
            }
        }
        .assess-result {
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            margin-bottom: 10px;
            .assess-price {
                padding-top: 12px;
                padding-bottom: 20px;
                align-items: center;
                display: flex;
                flex-direction: column;
                color: #fff;
                background: linear-gradient(to right, #5daef1, #125ed3);
                .title {
                    margin-bottom: 18px;
                }
                .price-detail {
                    .num {
                        font-size: 38px;
                    }
                    sup {
                        vertical-align: top;
                        margin-left: 4px;
                    }
                }
            }
            .assess-other {
                display: flex;
                background-color: #fff;
                justify-content: space-around;
                padding: 12px 0;
                .other-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .titlt {
                        font-size: 14px;
                        color: #999;
                        margin-bottom: 10px;
                    }
                    .item-content {
                        padding: 4px 15px;
                        background: #5daef1;
                        border-radius: 20px;
                        color: #fff;
                    }
                }
            }
        }
        .report-block {
            background: #fff;
            padding: 10px;
            display: flex;
            flex-direction: column;
            border-radius: 8px;
            margin-bottom: 10px;
            .title {
                padding-bottom: 10px;
                border-bottom: 1px solid #ebedf0;
                margin-bottom: 10px;
                font-size: 18px;
                font-weight: 500;
                display: flex;
                align-items: center;
                img {
                    width: 20px;
                    height: 20px;
                    margin-right: 8px;
                    vertical-align: bottom;
                }
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
        .org-info {
            .content {
                display: flex;
                flex-direction: column;
                .org-name {
                    font-size: 15px;
                    color: #666;
                    margin-bottom: 8px;
                    line-height: 1.1;
                }
                .time {
                    font-size: 14px;
                    color: #999;
                }
            }
        }
        .car-picture {
            .content {
                display: flex;
                flex-direction: column;
                .img-box {
                    padding-bottom: 56%;
                    width: 100%;
                    position: relative;
                    margin-bottom: 10px;
                    img {
                        max-width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
            .no-picture-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 20px;
                margin-bottom: 20px;
                img {
                    width: 50px;
                    height: auto;
                    margin-bottom: 12px;
                }
                .text {
                    font-size: 15px;
                    color: #999;
                }
            }
        }
        .statement {
            ul {
                li {
                    margin-bottom: 6px;
                    font-size: 13px;
                    color: #666;
                    line-height: 1.2;
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
</style>