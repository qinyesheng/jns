<!--
 * @Description: 报告车辆基本信息
 * @Author: lp
 * @Date: 2019-05-30 09:26:45
 * @LastEditTime: 2019-07-27 14:58:08
 * @LastEditors: Please set LastEditors
 -->

<template>
    <div class="carInfo">
        <div class="carInfo-top">
            <img class="car-icon" v-lazy="carLogoPre" v-if="baseInfo.car_icon" @click.prevent />
            <span class="carName">{{baseInfo.car_model_full_name}}</span>
        </div>
        <ul class="carInfo-bottom">
            <li>
                <span class="item-name">车架号（VIN码）</span>
                <span class="item-data">{{baseInfo.vin}}</span>
            </li>
            <li>
                <span class="item-name">公里数</span>
                <span class="item-data">{{baseInfo.miles | handleCarInfoKm}}</span>
            </li>
            <li v-if="baseInfo.detection_time">
                <span class="item-name">检测时间</span>
                <span class="item-data">{{baseInfo.detection_time}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import { getCarBrandIconSrc } from "@/utils/common";
export default {
    data() {
        return {
            carLogoPre: ""
        };
    },
    props: {
        baseInfo: {
            type: Object,
            default: {}
        }
    },
    filters: {
        handleCarInfoKm(value) {
            if (!value) {
                return "";
            }
            value = parseInt(value);
            if (value >= 10000) {
                value = (value / 10000).toFixed(2) + "万";
            } else {
                value = value + "公里";
            }
            return value;
        }
    },
    created() {
        this.carLogoPre = getCarBrandIconSrc(this.baseInfo.car_icon);
    },
    mounted() {},
    methods: {}
};
</script>
<style lang='less' scoped>
.carInfo {
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    .carInfo-top {
        display: -webkit-box;
        padding-bottom: 10px;
        border-bottom: 1px solid #efefef;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 16px;
        text-overflow: ellipsis;
        overflow: hidden;
        .car-icon {
            vertical-align: middle;
            height: 32px;
            margin-top: 2px;
            margin-bottom: 4px;
        }
        .carName {
            font-weight: bold;
            margin-left: 5px;
            margin-top: 5px;
            color: #6e6e6e;
        }
    }
    .carInfo-bottom {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        li {
            display: flex;
            padding: 8px 0px;
            justify-content: space-between;
            .item-name {
                color: #666;
            }
            .item-data {
                color: #bdbdbd;
            }
        }
    }
}
</style>