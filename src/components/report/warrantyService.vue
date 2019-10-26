<!--
 * @Description: 汽车质量延长保修服务
 * @Author: wjx
 * @Date: 2019-09-03 09:55:41
 -->

<template>
    <div
        class="warrantyService"
        v-if="qualityWarranty.extended_warranty && qualityWarranty.extended_warranty.length>0"
    >
        <div class="box select" v-if="reportType=='bill'">
            <h4>
                <b>汽车质量延长保修服务</b>
            </h4>
            <div class="content">
                <div v-for="(item,index) in  qualityWarranty.extended_warranty" :key="index">
                    <van-checkbox-group v-model="warrantyList" disabled>
                        <van-checkbox class="list special" :class="item.check!=1?'hidden':''">
                            <h5>{{item.system_name }}</h5>
                            <span>{{item.price}} 元</span>
                        </van-checkbox>
                        <van-checkbox
                            v-for="(items, indexs) in item.child_system"
                            :key="indexs"
                            class="list"
                            :class="item.check!=1 && items.check==1?'':'hidden'"
                        >
                            {{items.system_name }}
                            <span>{{items.price}} 元</span>
                        </van-checkbox>
                    </van-checkbox-group>
                </div>
            </div>
        </div>
        <div class="boxs" v-else-if="reportType=='carOwner'">
            <h4>
                <b>汽车质量延长保修服务</b>
            </h4>
            <div class="t2">
                <div class="left">
                    <img :src="icon" />
                </div>
                <div class="right">
                    <div>维修后系统质保一年</div>
                    <div>{{insuredSystemTips}}</div>
                </div>
            </div>
            <ul class="list-content">
                <li v-for="(item,index) in qualityWarranty.extended_warranty" :key="index">
                    <van-row>
                        <van-col span="16">
                            <h5>{{item.system_name}}</h5>
                        </van-col>
                        <van-col v-if="item.price!=0" span="8" class="text-right">{{item.price}} 元</van-col>
                    </van-row>
                    <ul>
                        <li
                            v-for="(items,indexs) in item.child_system"
                            :key="indexs"
                            v-show="item.child_system"
                        >
                            <van-row>
                                <van-col span="16">{{items.system_name}}</van-col>
                                <van-col span="8" class="text-right" v-if="items.price!=0">{{items.price}} 元</van-col>
                            </van-row>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { Checkbox, CheckboxGroup } from "vant";
export default {
    data() {
        return {
            icon: require("@image/zb.png"),
            warrantyList: []
        };
    },
    props: {
        qualityWarranty: {
            type: Object,
            default: {}
        },
        reportType: {
            type: String,
            default: ""
        },
        insuredSystemTips:{
            type: String,
            default: ""
        },
    },
    components: {
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup
    },
    created() {},
    mounted() {
        console.log(this.reportType)
        console.log(this.qualityWarranty);
        var data = this.qualityWarranty.extended_warranty;
        for (var i = 0; i < data.length; i++) {
            if (data[i].check == 1) {
                this.warrantyList.push(data[i]);
            }
            for (var j = 0; j < data[i].child_system.length; j++) {
                if (data[i].child_system[j].check == 1) {
                    this.warrantyList.push(data[i].child_system[j]);
                }
            }
        }
    },
    methods: {}
};
</script>
<style lang="less" scoped>
.warrantyService {
    margin-bottom: 15px;
    .boxs {
        align-items: center;
        background: #fff;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 15px;
        h4 {
            padding: 10px 0 0 0px;
            margin-bottom: 10px;
            b {
                font-weight: bold;
                font-size: 20px;
            }
        }
        h5 {
            font-size: 17px;
            color: #595959;
            font-weight: bold !important;
        }
        .list-content {
            display: flex;
            flex-direction: column;
            margin-top: 10px;
            .box {
                padding: 0;
            }

            li {
                padding: 9px 8px;
                color: #666;
                min-height: 20px;
                line-height: 20px;
            }
            .name {
                padding: 9px 8px 8px 0;
                color: #000;
                font-weight: bold;
            }
        }
    }
    .select {
        h4 {
            padding: 10px 0 0 0px;
            margin-bottom: 10px;
            b {
                font-weight: bold;
                font-size: 20px;
            }
        }
        background: #fff;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 15px;
        /deep/.van-checkbox__label {
            flex-grow: 1;
            color: #666;
            span {
                float: right;
            }
        }
        h5 {
            font-size: 17px;
            color: #595959;
            font-weight: bold;
            padding-left: 30px;
        }
        .special {
            /deep/.van-checkbox__label {
                position: relative;
            }
            h5 {
                padding-left: 0;
            }
            span {
                top: 0px;
                position: absolute;
                right: 0px;
            }
        }
        .list {
            padding: 9px 8px;
            display: flex;
        }
        .noCheck {
            padding: 9px 8px;
            display: flex;
            color: #666;
        }
    }
    .text-right {
        text-align: right;
    }
    .hidden {
        /deep/.van-checkbox__icon--round .van-icon {
            z-index: -1;
        }
    }
    /deep/.van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
        color: #fff;
    }
    /deep/.van-checkbox__icon--disabled .van-icon {
        background-color: #1989fa;
        border-color: #1989fa;
        color: #fff;
    }  
    .t2 {
        color: #666;
        padding-top: 5px;
        display: flex;
        align-items: center;
        .left {
            padding-right: 10px;
            img {
                width: 22px;
                height: 23px;
            }
        }
        .right {
            line-height: 24px;
            div:nth-child(2) {
                color: #e23b43;
            }
        }
    }
}
</style>

