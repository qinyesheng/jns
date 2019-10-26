<!--
 * @Description: 解决方案_行驶里程
 * @Author: xwq
 * @Date: 2019-02-27 17:04:03
 -->
<template>
    <div class="carKmInput">
        <headerOne :isFixed="true" :title="''" />
        <div class="main-container">
            <div class="carKm-input-block">
                <div>
                    <h3>{{$route.meta.title}}</h3>
                </div>
                <div>
                    <p class="carInfo">
                        <span>车辆信息</span>
                        <span>
                            <router-link
                                v-if="routeFrom&&routeFrom=='vin'"
                                style="color:#46aef7"
                                to="changeCar"
                            >车型变更</router-link>
                        </span>
                    </p>
                    <div class="carInfoDesc">{{carInfo.carModelFullName}}</div>
                </div>
                <div class="steerMileage">
                    <h4>行驶里程</h4>
                    <div class="inputKm">
                        <van-cell-group>
                            <van-field
                                name="carKm"
                                maxlength="6"
                                v-model="carKm"
                                placeholder="请输入行驶里程"
                                @focus="focus"
                                @blur="blur"
                                :style="inputBorderColor"
                            />
                        </van-cell-group>
                        <span>km</span>
                    </div>
                </div>
                <div class="car-km-submit">
                    <pubButton @buttonConfirm="carKmSubmit" title="继续" :isFixed="false"></pubButton>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import pubButton from "@/components/public/pubButton";
import aiMaintainSolutionApi from "@/api/aiMaintainSolution/solution";
import { Field } from "vant";
export default {
    components: {
        headerOne,
        pubButton,
        [Field.name]: Field
    },
    data() {
        return {
            carInfo: {},
            carKm: "",
            message: "",
            inputFocus: false,
            inputBorderColor: "",
            routeFrom: false
        };
    },
    created: function() {
        let carInfo = this.$session.get("carInfo");
        if (carInfo) {
            this.carInfo = carInfo;
        }
    },
    mounted() {
        let routeFrom = this.$router.history.current.query.routeFrom;
        if (routeFrom) {
            this.routeFrom = routeFrom;
        }
    },
    methods: {
        carKmSubmit() {
            if (!this.carKm) {
                this.$toast("请输入行驶里程", { position: top });
                return false;
            }
            let data = {
                vin: this.carInfo.vin,
                brand_id: this.carInfo.carBrandId,
                brand_name: this.carInfo.carBrandName,
                line_id: this.carInfo.carLineId,
                line_name: this.carInfo.carLineName,
                model_id: this.carInfo.carModelId,
                model_name: this.carInfo.carModelName,
                car_style: this.carInfo.nianKuan,
                car_cc: this.carInfo.carCc + this.carInfo.unit,
                car_km: this.carKm
            };
            this.carInfo.carKm = this.carKm;
            this.$session.set("carInfo", this.carInfo);
            aiMaintainSolutionApi.getSaveCarData(data).then(res => {
                if (res.code == 20000) {
                    this.$router.push({
                        name: "checkResultSearch"
                    });
                } else {
                    this.$toast(res.msg);
                }
            });
        },
        focus() {
            this.inputFocus = true;
            this.inputBorderColor = "border:1px solid #ccc";
        },
        blur() {
            this.inputFocus = true;
            this.inputBorderColor = "";
        }
    }
};
</script>
<style lang='less' scoped>
.main-container {
    .carKmInputHeader {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
    }
    /deep/ .van-cell {
        height: 38px;
        line-height: 0;
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        box-sizing: border-box;
    }
    /deep/ .van-hairline--top-bottom::after {
        border-width: 0;
    }
    /deep/ .van-field__control {
        height: 16px;
    }
    .carKm-input-block {
        h3 {
            font-size: 27px;
        }
        .carInfo {
            padding: 15px 0;
            display: flex;
            span {
                display: block;
                width: 100%;
                font-size: 14px;
                font-weight: bold;
            }
            span:last-child {
                text-align: right;
            }
        }
        .carInfoDesc {
            padding: 10px 0;
            font-size: 14px;
        }
        .steerMileage {
            margin-top: 20px;
            h4 {
                padding: 10px 0;
                font-size: 14px;
                font-weight: bold;
            }
            .inputKm {
                box-sizing: border-box;
                position: relative;
                > span:last-child {
                    position: absolute;
                    top: 12px;
                    bottom: 12px;
                    right: 10px;
                    z-index: 999;
                    font-size: 14px;
                }
            }
        }
    }
    .car-km-submit {
        margin-top: 20px;
    }
}
</style>

