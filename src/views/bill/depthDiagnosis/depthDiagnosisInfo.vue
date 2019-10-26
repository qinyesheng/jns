<!--
 * @Description: 深度诊断-车辆信息
 * @Author: lp
 * @Date: 2019-04-20 16:52:41
 * @LastEditTime: 2019-06-05 16:34:08
 * @LastEditors: Please set LastEditors
 -->

<template>
    <div>
        <headerOne :title="$route.meta.title" :isFixed="true" :backgroundStatus="true"/>
        <div class="depthDiagnosis">
            <van-row class="carInfo" type="flex">
                <van-col>
                    <img
                        class="car-icon"
                        v-lazy="carLogoPre + carInfo.icoName + '.jpg'"
                        v-if="iconShow"
                    >
                </van-col>
                <van-col class="carName">{{carInfo.carModelFullName}}</van-col>
            </van-row>
            <div class="mileage">
                <van-row class="title">行驶里程</van-row>
                <van-row class="detail" type="flex" justify="space-between" align="center">
                    <van-col span="20">
                        <input
                            type="number"
                            ref="mileageInput"
                            v-model.number="mileage"
                            placeholder="输入行驶里程"
                            @input="mileageInput"
                        >
                    </van-col>
                    <van-col class="unit">km</van-col>
                </van-row>
            </div>
            <div class="tip">
                <van-row class="title">检测前提醒</van-row>
                <van-row class="detail">
                    <span>请使用ACE-2017专检设备或431检测电控系统，如有</span>
                    <span class="point">异常</span>
                    <span>，请在下一步输入故障码或故障现象</span>
                </van-row>
            </div>
            <div class="btn" @click="next">
                <div class="next-btn">已检测</div>
            </div>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
export default {
    components: {
        headerOne
    },
    data() {
        return {
            carInfo: {},
            carLogoPre: "https://www.wanguoqiche.com/files/logo/", // 汽车图标前缀
            mileage: "", // 行驶里程
            iconShow: false // 读取缓存再显示icon
        };
    },
    methods: {
        // 行驶里程取整数
        mileageInput() {
            this.mileage = parseInt(this.mileage);
        },
        // 跳转下一流程
        next() {
            if (this.mileage) {
                this.carInfo.carKm = this.mileage;
                this.$session.set("carInfo", this.carInfo);
                this.$router.push({
                    name: "searchFaultCode"
                });
            } else {
                this.$toast.fail("请输入里程");
                return false;
            }
        }
    },
    mounted() {
        // 输入框自动聚焦
        this.$nextTick(() => {
            this.$refs["mileageInput"].focus();
        });

        // 获取carInfo缓存数据
        this.carInfo = this.$session.get("carInfo");
        if (this.carInfo.icoName) {
            this.iconShow = true;
        }
    },
    activated() {
        // 输入框自动聚焦
        this.$nextTick(() => {
            this.$refs["mileageInput"].focus();
        });
    }
};
</script>
<style lang='less' scoped>
input {
    background: none;
    outline: none;
    border: 0px;
    width: 100%;
}
.depthDiagnosis {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    // 车辆信息
    .carInfo {
        margin-top: 10px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 18px;
        text-overflow: ellipsis;
        overflow: hidden;
        .car-icon {
            vertical-align: middle;
            height: 44px;
        }
        .carName {
            font-weight: bold;
            margin-left: 12px;
            line-height: 120%;
        }
    }
    // 行驶里程
    .mileage {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        .title {
            color: #333333;
            font-size: 16px;
            // font-weight: bold;
        }
        .detail {
            padding: 12px;
            background: #f2f2f2;
            border-radius: 4px;
            margin-top: 10px;
            color: #666666;
            .unit {
                padding-left: 8px;
                border-left: 1px solid #cccccc;
            }
        }
    }
    // 检测前提醒
    .tip {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        .title {
            color: #333333;
            font-size: 16px;
        }
        .detail {
            padding: 9px 0px;
            color: #969799;
            line-height: 1.1;
            float: left;
            .point {
                color: #ee8e2b;
            }
        }
    }
    // 下一步按钮
    .btn {
        margin: 8px 0 10px;
        .next-btn {
            box-sizing: border-box;
            width: 100%;
            padding: 15px;
            color: #fff;
            background-color: #5aa5f8;
            text-align: center;
            border-radius: 2px;
            font-size: 16px;
            height: 46px;
            border-radius: 4px;
        }
        .disabled {
            background-color: #d2d2d2;
        }
    }
}
</style>