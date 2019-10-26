<template>
    <div class="page">
        <headerOne :title="headTitle" isFixed/>
        <div class="main-container">
            <h3 style="font-size:27px;padding:10px;margin-top:46px">{{title}}</h3>
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
                        <dd v-for="(v, k) in val" class="dd_select" :key="k">
                            <a href="javascript:;" v-on:click="selectCarLineHandle(v)">
                                <!-- <img v-lazy="'https://www.wanguoqiche.com/files/logo/'+v.icoName+'.jpg'"> -->
                                <span>{{v.name}}</span>
                            </a>
                        </dd>
                    </dl>
                </div>
                <span class="prompt" style="display: none;"></span>
            </div>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import choiceCarInfoApi from "@/api/circuitDiagram/choiceCarInfo";
export default {
    components: {
        headerOne
    },
    data() {
        return {
            navLetter: [], //字母数组
            brandList: [], //品牌数组
            headTitle: "",
            title: "选择品牌"
        };
    },
    created: function() {
        this.selectBrandHandle();
    },
    mounted: function() {
        /**
         * 监视滚动条，控制头部显隐
         * @param 无
         * @return 无
         * @author linpeng 2019/1/2
         */
        window.onscroll = () => {
            var a =
                document.documentElement.scrollTop || document.body.scrollTop; //滚动条y轴上的距离
            var b =
                document.documentElement.clientHeight ||
                document.body.clientHeight; //可视区域的高度
            var c =
                document.documentElement.scrollHeight ||
                document.body.scrollHeight; //可视化的高度与溢出的距离（总高度）
            if (a + b == c) {
                // alert('已滚动到底部!')
            }
            if ((a <= b || a > b) && a >= 100) {
                this.headTitle = "选择品牌";
            } else {
                this.headTitle = "";
            }
        };
    },
    methods: {
        /**
         * 函数描述
         * @param 无
         * @return 无
         * @author linpeng 2019/1/2
         */
        selectBrandHandle: function() {
            // 选择车辆品牌
            var self = this;
            if (this.brandList.length == 0) {
                choiceCarInfoApi.getCarBrandList().then(res => {
                    if (res.error_code == 0) {
                        var data = res.data.list;
                        var tempLetter = [],
                            tempList = {};
                        var tempnavLetter = [];
                        if (data) {
                            for (var item in data) {
                                tempLetter.push(item);
                                tempnavLetter.push(item);
                                tempList[item] = data[item];
                            }
                        }
                        var tempListObj = {};
                        var str =
                            "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,ZT";
                        str.split(",").forEach(function(v, i) {
                            if (tempnavLetter.indexOf(v) !== -1) {
                                self.navLetter.push(v);
                                tempListObj[v] = tempList[v];
                            }
                        });
                        self.brandList = tempListObj;
                    }
                });
            }
        },
        /**
         * 跳转到车型选择页面
         * @param 无
         * @return 无
         * @author linpeng 2019/1/2
         */
        selectCarLineHandle: function(item) {
            let circuitCarInfo = {
                // 将品牌id存入缓存
                org_id: "402881485aef1e86015af3cfe1b50038",
                c_b_id: item.id
            };
            this.$sessionStorage.set("circuitCarInfo", circuitCarInfo);
            this.$router.push({
                //将品牌id传递到选择车系页
                path: "/circuitDiagram/selectCarLine",
                query: {
                    carBrandId: item.id
                }
            });
        },
        /**
         * 用户点击字母跳转到对应位置
         * @param {string} letterId 对应位置的dom元素id名称
         * @return 无
         * @author linpeng 2019/1/2
         */
        letterPosition: function(letterId) {
            var div_top = document.getElementById(letterId).offsetTop;
            window.scrollTo(0, div_top - 60);
        }
    }
};
</script>


<style lang='less' scoped>
.page {
    .main-container {
        padding: 0;
        /*选择车辆品牌*/
        .navbar {
            position: fixed;
            top: 54%;
            right: 2px;
            width: 1rem;
            padding: 10px 3px;
            border-radius: 5px;
            z-index: 21;
            transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            -o-transform: translateY(-50%);
        }

        .navbar a {
            display: block;
            text-align: center;
            color: #46aef7;
            line-height: 18px;
            text-decoration: none;
            padding-top: 5px;
            font-size: 16px;
        }

        .picker-box .prompt {
            display: block;
            width: 1.4rem;
            height: 1.4rem;
            line-height: 1.4rem;
            font-size: 0.6rem;
            border-radius: 10px;
            background-color: #999;
            color: #dedede;
            text-align: center;
            position: fixed;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            z-index: 23;
        }

        .navbar.active {
            background: #fff;
        }

        .picker-conts {
            font-size: 16px;
        }

        .picker-conts dt {
            background-color: #efefef;
            padding: 8px 20px;
        }

        .dd_select {
            height: 56px;
            border-bottom: 1px solid #dbdbdb;
            margin-top: 0px;
            cursor: pointer;
        }

        .dd_select a {
            color: #535353;
            padding: 8px 20px;
            display: block;
        }

        .dd_select a:focus,
        .dd_select a:hover {
            color: #535353;
            text-decoration: none;
        }

        .dd_select img {
            width: 50px;
            height: 40px;
            margin-right: 10px;
            display: block;
            float: left;
        }

        .dd_select span {
            display: block;
            line-height: 40px;
        }

        .picker-main .prompt {
            display: block;
            width: 1.4rem;
            height: 1.4rem;
            line-height: 1.4rem;
            font-size: 0.6rem;
            border-radius: 10px;
            background-color: #999;
            color: #fff;
            text-align: center;
            position: fixed;
            top: 50%;
            left: 50%;
            font-weight: 600;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            z-index: 23;
        }

        .navbar a:hover {
            text-decoration: none;
        }

        .car_series_li {
            padding: 15px 10px;
            border-bottom: 1px solid #ccc;
        }

        .selectCar-header {
            width: 100%;
            height: 50px;
            line-height: 50px;
            z-index: 10;
            overflow: hidden;
        }

        .selectCar-header-icon {
            font-size: 24px;
            color: #000;
            position: absolute;
            left: 0px;
            width: 30px;
            height: 50px;
            z-index: 2;
        }

        .selectCar-header-fixed-top {
            margin-top: 60px;
        }

        .selectCar-header-top {
            margin-top: 10px;
        }

        .selectCar-header-left {
            padding-left: 0px;
            position: relative;
            height: 50px;
        }
    }
}
</style>

