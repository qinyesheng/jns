<template>
    <div class="jns-container">
        <headerOne :title="title" :isFixed="true"></headerOne>
        <div class="main-container">
            <div class="vin-input-block">
                <div>
                    <h4 class="vin-car-info-title">车辆信息</h4>
                </div>
                <div class="vin-car-info-son-title">
                    <h4>VIN号</h4>
                </div>
                <div class="vin-input-div">
                    <van-cell-group>
                        <van-field
                            v-model="vinValue"
                            v-on:input="vinInput($event)"
                            placeholder="请输入17位车架号"
                            label-align="center"
                            maxlength="20"
                            @focus="focus"
                            @blur="blur"
                            :style="inputBorderColor"
                        />
                        <!-- <van-button slot="button" size="small" type="primary">扫描VIN</van-button> -->
                    </van-cell-group>
                    <div
                        class="again-scan-vin"
                        v-if="againScanVinStatus"
                        v-on:click="againScanVin"
                    >扫描VIN</div>
                    <span
                        class="vin-validate-error"
                        style="color:#f00"
                        v-if="!vinConfirmStatus&&vinValue.length!=0"
                    >请输入17位车架号</span>
                </div>
                <div class="vin-scan-img" v-if="vinScanImg">
                    <img class="vin-scan-img-src" :src="vinScanImg" alt="VIN码图片" />
                    <div class="margin-top-sm text-center">请仔细核对vin码</div>
                </div>
                <!-- v-show="!scanVinStatus&&!vinConfirmStatus" -->
                <div>
                    <pubButton @buttonConfirm="vinSubmit" title="继续" v-show="vinConfirmStatus"></pubButton>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import carOwnerApi from "@/api/carOwner/guest";
import pubButton from "@/components/public/pubButton";
import jnsApi from "@/utils/jnsApi";
import { Field } from "vant";
export default {
    components: {
        headerOne,
        pubButton,
        vanField: Field
    },
    data() {
        return {
            scanVinStatus: true,
            againScanVinStatus: true,
            vinValue: "",
            vinScanImg: "",
            vinConfirmStatus: false,
            inputFocus: false,
            inputBorderColor: "",
            carInfo: {
                vin: ""
            }
        };
    },
    props: ["title"],

    created: function() {},
    mounted: function() {
        this.handleVin();
    },
    methods: {
        handleVin() {
            let vin = this.$session.get("carVinForVinComponents");
            if (vin) {
                this.vinValue = this.keepSpaceForVin(vin);
                this.carInfo.vin = this.vinValue.replace(/\s/g, "");
            }
            this.vinConfirmStatus = true;
            this.scanVinStatus = false;
            // 无力洋数据的
            // this.vinValue = '12345 67890 12345 67';
            // 有力洋数据的
            // this.vinValue = "LBVVZ 5106D MA105 37";
        },
        keepSpaceForVin: function(vin) {
            return vin.replace(/\s/g, "").replace(/(.{5})/g, "$1 ");
        },
        filterSpaceForVin: function(vin) {
            return vin.replace(/\s/g, "");
        },
        splitForCarCc: function(carCc) {
            let list = { unit: "", carCc: "" };
            if (carCc.indexOf("T") > -1) {
                list.unit = "T";
            } else {
                list.unit = "L";
            }
            list.carCc = carCc.slice(0, -1);
            return list;
        },
        vinSubmit: function() {
            let vin = this.filterSpaceForVin(this.vinValue);
            if (!vin) {
                this.$toast("请输入车架号");
                return false;
            }
            // let historyCurrentName = this.$router.history.current.name;
            let routerUrlName = "changeCar";
            //
            this.$session.remove("carInfo");
            this.$session.set("carVin", vin);
            this.$router.push({
                name: routerUrlName
            });
            /**
            if (this.vinConfirmStatus) {
                carOwnerApi.getCarInfoByVin({ vin: vin }).then(res => {
                    this.$session.remove("carInfo");
                    // 20400 旧code 兼容处理
                    if (res.code == 20000 || res.code == 20400) {
                        if (res.data && res.data.length) {
                            // 解析的车辆数据获取
                            this.carInfo = res.data[0];
                            // 车架号赋值
                            this.carInfo.vin = vin;
                            // 排量处理
                            let splitForCarCc = this.splitForCarCc(
                                this.carInfo.carCc
                            );
                            this.carInfo.unit = splitForCarCc.unit;
                            this.carInfo.carCc = splitForCarCc.carCc;
                            this.$session.set("carInfo", this.carInfo);
                        } else {
                            this.$session.set("carVin", vin);
                        }
                        this.$router.push({
                            name: routerUrlName
                        });
                    } else {
                        this.$toast(res.msg);
                    }
                });
            }
            */
        },
        focus() {
            this.inputFocus = true;
            this.inputBorderColor = "border:1px solid #ccc";
        },
        blur() {
            this.inputFocus = true;
            this.inputBorderColor = "";
        },
        vinFocus: function() {
            var self = this;
            self.againScanVinStatus = true;
            self.scanVinStatus = false;
        },
        vinInput: function(e) {
            var self = this;
            var v = self.vinValue.toString().toUpperCase();
            var is = true;
            /\S{6}/.test(v) &&
                (function() {
                    self.vinValue = self.keepSpaceForVin(v);
                    is = false;
                })();
            if (is) {
                self.vinValue = v;
            }
            self.vinValidate();
        },
        vinValidate: function() {
            var self = this;
            if (!self.value) {
                self.vinConfirmStatus = false;
            }
            var reg = /^[0-9a-zA-Z]{17}$/;
            var vin = self.filterSpaceForVin(self.vinValue);
            if (vin.length == 17 && reg.test(vin)) {
                self.vinConfirmStatus = true;
            } else {
                self.vinConfirmStatus = false;
            }
        },
        againScanVin: function() {
            var self = this;
            console.log("againScanVin ...");
            jnsApi.vinScanning(function(vin, imgUrl) {
                self.vinValue = self.keepSpaceForVin(vin);
                self.vinValidate();
                self.vinScanImg = imgUrl;
                self.scanVinStatus = false;
                self.againScanVinStatus = true;
            });
        }
    }
};
</script>
<style lang='less' scoped>
.jns-container {
    .vin-car-info-title {
        font-size: 27px;
    }
    .vin-car-info-son-title {
        padding: 20px 0px 0px 0px;
        h4 {
            font-size: 16px;
            font-weight: bold;
        }
    }
    .van-cell {
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        box-sizing: border-box;
    }
    .van-field__control {
        text-align: center;
    }
    .van-nav-bar__left {
        left: 4px;
    }
    .header-container {
        margin-top: 10px;
        padding: 0 10px;
    }
    .vin-img {
        height: 64px;
    }

    .vin-scan-img {
        padding: 10px 0px 15px 0px;
        .vin-scan-img-src {
            width: 100%;
            height: 50px;
        }
    }

    .vin-input-div {
        position: relative;
        margin-top: 10px;
    }

    .vin-validate-error {
        position: absolute;
        top: -6px;
        left: 8px;
        background: rgb(255, 255, 255);
        padding: 0px 4px;
        border-radius: 2px;
        font-size: 14px;
        /*border: 1px #f00 solid;*/
    }

    .again-scan-vin {
        position: absolute;
        height: 46px;
        line-height: 46px;
        top: 0;
        bottom: 0;
        right: 10px;
        z-index: 10;
        color: #46aef7;
        font-size: 14px;
    }

    .vin-input {
        height: 45px;
        border-radius: 5px;
    }

    .vin-input-right {
        padding-right: 80px;
    }
}
</style>

