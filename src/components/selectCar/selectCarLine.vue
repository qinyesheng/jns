<!--
 * @Description: 解决方案_选择车型
 * @Author: xwq
 * @Date: 2019-03-01 17:00:52
 -->
<template>
    <div class="selectCarLine">
        <div class="container">
            <ul>
                <li
                    class="car_series_li"
                    v-for="(item, key) in carLine"
                    :key="key"
                    @click="carLineConfirm(item)"
                >{{item.lineName}}</li>
            </ul>
            <van-field
                v-model="CarLineName" 
                class="CarLineName"
                v-if="CarLineShow"
                placeholder="请输入车型名称"
            />
            <div 
                class="pubButton" 
                v-if="CarLineShow"
            >
                <pubButton 
                    title="确定" 
                    @buttonConfirm="carLineNameConfirm()"
                    :isFixed="false"
                />
            </div>
        </div>
    </div>
</template>
<script>
import { Field } from "vant";
import carOwnerApi from "@/api/carOwner/guest";

import pubButton from "@/components/public/pubButton";
export default {
    components: {
        [Field.name]: Field,
        pubButton,
    },
    name: "selectCarLine",
    props: {
        carBrandId: {
            default: ""
        },
        carBrandName:{
            default: ""
        },
        carLineId: {
            default: ""
        }
    },
    data: function() {
        return {
            title: "选择车型",
            CarLineName: "",
            CarLineShow: false,
            carLine: [] //车辆系列

        };
    },
    watch: {
        carBrandId() {
            // console.log(this.carBrandId);
            this.selectCarLineHandle(this.carBrandId);
            
        }
    },
    created() {
        // this.carInfo = this.carBrandId;
        // this.selectCarLineHandle(this.carBrandId);
    },
    methods: {
        /**
         * @Description: 根据车辆ID获取车型数据
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-03-04 13:53:13
         */
        selectCarLineHandle: function(brandId) {
            var self = this;
            if (brandId) {
                carOwnerApi.billCarLineList({brandId}).then(res => {
                    if (res.code == 20000) {
                        self.carLine = res.data;
                    }else{
                        self.carLine = [];
                    }
                });
                //选择其他则显示输入框
                if(this.carBrandName=="其他"){
                    this.CarLineName = "";
                    this.CarLineShow = true;
                }else{
                    this.CarLineShow = false;
                }
            }
        },
        carLineNameConfirm: function(){
            if(!this.CarLineName){
                this.$toast("请输入车型名称");
                setTimeout(() => {
                    this.$toast.clear();
                }, 500);
                return false;
            }
            let item = {
                lineName:this.CarLineName,
                id:"",
            }
            this.$emit("carLineConfirm", item);
        },
        /**
         * @Description: 选择车型后
         * @Param: item  选中的车型
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-03-04 13:51:57
         */
        carLineConfirm: function(item) {
            this.$emit("carLineConfirm", item);
        }
    }
};
</script>
<style lang='less' scoped>
.selectCarLine {
    .container {
        background: #fff;
        .car_series_li {
            padding: 18px 10px;
            border-bottom: 1px solid #ccc;
            font-size: 14px;
        }
        .CarLineName{
            padding-top: 20px;
            margin-bottom: 0px;
        }
        /deep/ .van-cell:not(:last-child)::after{
            border: 0px;
        }
        /deep/ .van-field__control{
            height: 46px;
            padding: 0px 10px;
            border: 1px solid #ccc;
        }
        .pubButton{
            padding: 15px;
        }
    }
}
</style>

