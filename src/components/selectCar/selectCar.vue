<!--
 * @Description: 选择车品牌公共组件
 * @Author: xwq
 * @Date: 2019-03-05 14:45:15
 -->
<template>
    <div class="page">
        <div class="main-container">
            <div class="pop-carBrand">
                <div class="navbar">
                    <a
                        href="javascript:;"
                        v-for="(item, key) in navLetter"
                        v-on:click="letterPosition('carLetter'+item)"
                        :key="key"
                    >{{item}}</a>
                </div>
                <div class="picker-conts">
                    <dl v-for="(val,key) in brandList" :key="key">
                        <dt :id="'carLetter'+key">{{key}}</dt>
                        <van-cell
                            v-for="(v, k) in val"
                            :key="k"
                            :title="v.brandName"
                            :icon="getCarBrandIconSrc(v.icoName)"
                            v-on:click="carBrandConfirm(v)"
                            class="car-brand-block"
                        >
                            <van-icon
                                slot="icon"
                                :name="getCarBrandIconSrc(v.icoName)"
                                class="custom-icon"
                                size="0.875rem"
                            />
                        </van-cell>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Tag } from "vant";
import carOwnerApi from "@/api/carOwner/guest";
import { getCarBrandIconSrc } from "@/utils/common";
export default {
    components: {
        [Tag.name]: Tag
    },
    props: {
        carBrandId: {
            default: ""
        }
    },
    data() {
        return {
            title: "选择车系",
            navLetter: [], //字母数组
            brandList: [] //品牌数组
        };
    },
    mounted() {
        // console.log(this.carBrandId);
        this.getCarBrandList();
    },
    methods: {
        getCarBrandIconSrc(iconName) {
            return getCarBrandIconSrc(iconName);
        },
        /**
         * @Description: 获取车辆品牌数据
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-03-04 13:54:48
         */
        getCarBrandList: function() {
            var self = this;
            if (this.brandList.length == 0) {
                carOwnerApi.billCarBrandList().then(res => {
                    if (res.code == 20000) {
                        var data = res.data;
                        var tempLetter = [],
                            tempList = {};
                        var tempnavLetter = [];
                        if (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (tempLetter.indexOf(data[i].initial) == -1) {
                                    tempLetter.push(data[i].initial);
                                    tempList[data[i].initial] = [];
                                    tempnavLetter.push(data[i].initial);
                                }
                                tempList[data[i].initial].push(data[i]);
                            }
                        }
                        var tempListObj = {};
                        var str = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,#";
                        str.split(",").forEach(function(v, i) {
                            if (tempnavLetter.indexOf(v) > -1) {
                                self.navLetter.push(v);
                                tempListObj[v] = tempList[v];
                            }
                        });
                        self.brandList = tempListObj;
                        console.log(self.brandList);

                    }
                });
            }
        },
        /**
         * @Description: 选择字母跳到对应的车品牌
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-03-05 17:32:36
         */
        letterPosition: function(e) {
            var div_top = document.getElementById(e).offsetTop;
            window.scrollTo(0, div_top - 60);
        },
        /**
         * @Description: 选择车品牌
         * @Param: item 选中的车品牌
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-03-05 17:30:22
         */
        carBrandConfirm(item) {
            this.$emit("carBrandConfirm", item);
        },
        onClickLeft() {
            this.$emit("back");
        }
    }
};
</script>
<style lang='less' scoped>
/*选择车辆品牌*/
.main-container {
    padding: 10px 0;
    .car-brand-active {
        background: @active-color;
    }
    .pop-carBrand {
        background: #fff;
    }
    .car-brand-block {
        line-height: 32.81px;
        .van-cell__title {
            padding-left: 5px;
        }
    }
    .navbar {
        position: fixed;
        top: 340px;
        right: 0px;
        width: 32px;
        padding: 10px 3px;
        border-radius: 5px;
        height: 570px;
        z-index: 21;
        transform: translateY(-170px);
        -ms-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        -o-transform: translateY(-50%);
    }
    .navbar a {
        display: block;
        text-align: center;
        color: #46aef7;
        line-height: 22px;
        text-decoration: none;
        padding: 1px 0px;
        font-size: 18px;
    }
    .navbar.active {
        background: #fff;
    }
    .picker-conts dt {
        background-color: #efefef;
        padding: 8px 20px;
        font-size: 16px;
        height: 40px;
        box-sizing: border-box;
        line-height: 19px;
    }
    .picker-conts dt .van-cell {
        padding: 20px;
    }
}
</style>