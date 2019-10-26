<!--
 * @Description: 保存预约订单
 * @Author: xwq
 * @Date: 2019-07-05 22:04:22
 -->
<template>
    <div class="page">
        <div class="main-container">
            <van-row>
                <van-col span="24">预约站点</van-col>
                <van-col span="24">
                    <van-cell-group :border="false">
                        <van-field
                            clearable
                            :readonly="true"
                            :value="this.orgInfo.depart_name"
                            :placeholder="this.orgInfo.depart_name"
                            :border="false"
                        ></van-field>
                    </van-cell-group>
                </van-col>
            </van-row>
            <van-row>
                <van-col span="24">
                    客户名称
                    <span class="required">*</span>
                </van-col>
                <van-col span="24">
                    <van-cell-group>
                        <van-field
                            clearable
                            class="apt-guest-info"
                            placeholder="请输入客户名称"
                            v-model="guestInfo.name"
                        >
                            <van-button
                                slot="button"
                                size="small"
                                plain
                                hairline
                                type="default"
                                class="apt-guest-info-name"
                                :class="checkName==item.value?'nameActive':''"
                                @click="nameActive(item.value)"
                                v-for="(item,key) in nameList"
                                :key="key"
                            >{{item.name}}</van-button>
                        </van-field>
                    </van-cell-group>
                </van-col>
            </van-row>
            <van-row>
                <van-col span="24">
                    手机号
                    <span class="required">*</span>
                </van-col>
                <van-col span="24">
                    <van-cell-group>
                        <van-field
                            clearable
                            class="apt-guest-info"
                            placeholder="请输入手机号"
                            v-model="guestInfo.phone"
                            maxlength="11"
                            type="number"
                        ></van-field>
                    </van-cell-group>
                </van-col>
            </van-row>
            <van-row>
                <van-col span="24">预约到店时间</van-col>
                <van-col span="24">
                    <van-cell-group>
                        <van-field
                            v-model="guestInfo.aptTimeDesc"
                            :readonly="true"
                            class="apt-guest-info"
                            placeholder="请选择预约到店时间"
                            @click="showTimeHandle"
                        ></van-field>
                    </van-cell-group>
                </van-col>
            </van-row>
            <van-row>
                <van-col span="24">备注</van-col>
                <van-col span="24">
                    <van-cell-group>
                        <van-field
                            class="apt-guest-info"
                            placeholder="请输入备注"
                            type="textarea"
                            rows="3"
                            autosize
                            v-model="guestInfo.desc"
                        ></van-field>
                    </van-cell-group>
                </van-col>
            </van-row>
            <pubButton @buttonConfirm="appointment" background="#e14732" title="确定"></pubButton>
        </div>
        <van-popup v-model="showTime" position="bottom">
            <van-picker
                :columns="columns"
                @change="onChange"
                @cancel="cancelChoiceTime"
                @confirm="confirmChoiceTime"
                show-toolbar
                title="预约到店时间"
            />
        </van-popup>
    </div>
</template>
<script>
import orgApi from "@/api/xhjcOwner/org";
import pubButton from "@/components/public/pubButton";
import xhjcOwnerApi from "@/api/xhjcOwner/xhjcOwner";
import { Field, Picker } from "vant";
export default {
    data() {
        return {
            shopOpenId: "",
            orgInfo: {},
            orgBanner: [],
            checkName: "man",
            currentDate: "",
            nameList: [
                {
                    name: "先生",
                    value: "man"
                },
                {
                    name: "女士",
                    value: "women"
                }
            ],
            guestInfo: {
                name: "",
                phone: "",
                aptTime: "",
                desc: "",
                aptTimeDesc: "",
                org_id: "",
                arrivalTimeStart: "",
                arrivalTimeEnd: ""
            },
            showTime: false,
            showMenuStatus: false,
            columns: [],
            orgInfo: {}
        };
    },
    components: {
        pubButton,
        [Field.name]: Field,
        [Picker.name]: Picker
    },
    created() {
        this.init();
    },
    mounted() {},
    methods: {
        init() {
            this.orgInfo = this.$session.get("orgInfo");
            let timeData = this.getTimeData();
            let keys = Object.keys(timeData);
            // console.log(timeData[keys[0]].childs);
            this.columns = [
                {
                    values: keys,
                    className: "column1"
                },
                {
                    values: timeData[keys[0]].childs,
                    className: "column2",
                    defaultIndex: 0
                }
            ];
        },
        appointment() {
            if (!this.guestInfo.name) {
                this.$toast("请填写客户名称");
                return false;
            }
            if (!this.guestInfo.phone) {
                this.$toast("请填写手机号");
                return false;
            }
            let checkName = "";
            for (let i = 0; i < this.nameList.length; i++) {
                if (this.nameList[i].value == this.checkName) {
                    checkName = this.nameList[i].name;
                }
            }
            let customerName = this.guestInfo.name + checkName;
            let data = {
                arrival_time_start: this.guestInfo.arrivalTimeStart,
                arrival_time_end: this.guestInfo.arrivalTimeEnd,
                customer_phone: this.guestInfo.phone,
                customer_name: customerName,
                map_org_id: this.orgInfo.map_org_id,
                comment: this.guestInfo.desc
            };
            xhjcOwnerApi.addBooking(data).then(res => {
                if (res.code == 20000) {
                    this.$toast.success({
                        duration: 500,
                        message: "预约成功"
                    });
                    this.$session.set("orderActive", true);
                    this.$session.set("routerActive", 1);
                    this.$router.push({
                        path: "menuIndex/order"
                    });
                } else {
                    this.$toast(res.msg);
                }
            });
            // console.log(data);
        },
        nameActive(key) {
            this.checkName = key;
        },
        showTimeHandle() {
            this.showTime = true;
        },
        //获取所有时间数据
        getTimeData() {
            let dateDataArr = {};
            let weekdayArr = [
                "星期日",
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五",
                "星期六"
            ];
            let currentDate = new Date();
            let currentHours = currentDate.getHours(); //获取当前时间小时
            // console.log(currentDate.getDay());
            let currentVal = 0;
            if (currentHours > 15) {
                currentVal = 1;
            }
            //输出30天内的时间
            for (let i = 0 + currentVal; i < 30 + currentVal; i++) {
                let date1 = new Date();
                let date2 = new Date(date1);
                date2.setDate(date1.getDate() + i);
                let getFullYear = date2.getFullYear(); //年
                let getMonth = date2.getMonth() + 1; //
                if (getMonth < 10) {
                    getMonth = "0" + getMonth;
                }
                let getDate = date2.getDate(); //
                if (getDate < 10) {
                    getDate = "0" + getDate;
                }
                let getDay = date2.getDay();
                let weekdayVal = weekdayArr[getDay]; //星期日～星期六
                let nDate = 9; //循环的开始时间
                //每天的所有数据
                let dateObj = {
                    id: i,
                    getFullYear: getFullYear,
                    getMonth: getMonth,
                    getDate: getDate,
                    // "weekday":weekdayVal,
                    arrival_time_start:
                        getFullYear + "-" + getMonth + "-" + getDate,
                    arrival_time_end:
                        getFullYear + "-" + getMonth + "-" + getDate,
                    value: getMonth + "-" + getDate + " " + weekdayVal,
                    childs: []
                };
                dateDataArr[dateObj.value] = {};
                dateObj.childs = [];
                if (i == 0) {
                    if (currentHours > 9) {
                        nDate = currentHours;
                    }
                }
                for (let n = nDate; n < 16; n++) {
                    let childsData =
                        (n != 9 ? n : "09") + ":00~" + (n + 1) + ":00";
                    dateObj.childs.push(childsData);
                }
                dateDataArr[dateObj.value] = dateObj;
            }
            return dateDataArr;
        },
        onChange(picker, values) {
            let timeData = this.getTimeData();
            picker.setColumnValues(1, timeData[values[0]].childs);
        },
        cancelChoiceTime() {
            this.showTime = false;
        },
        confirmChoiceTime(items) {
            let timeData = this.getTimeData();
            let listTimeRange = items[1].split("~");
            this.guestInfo.arrivalTimeStart =
                timeData[items[0]].arrival_time_start + " " + listTimeRange[0];
            this.guestInfo.arrivalTimeEnd =
                timeData[items[0]].arrival_time_end + " " + listTimeRange[1];
            this.showTime = false;
            this.guestInfo.aptTimeDesc = items[0] + " " + items[1];
        },
        showMenu() {
            this.showMenuStatus = true;
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .org-banner {
        .org-banner-item,
        img {
            width: 100%;
        }
    }
    .main-container {
        line-height: 1.2;
        .van-row {
            margin-bottom: 10px;
        }
        .van-col {
            padding: 5px;
        }
        .required {
            color: #f00;
        }
        .apt-guest-info {
            border: 1px solid #f3f3f3;
            background-color: #f3f3f3;
        }
        .apt-guest-info-name {
            color: #ccc;
            padding: 0 20px;
        }
        .nameActive {
            color: #000;
            // border: 1px solid #999;
        }
    }
}
</style>
