<!--
 * @Description: 开单_车体检查_车况报告
 * @Author: xwq
 * @Date: 2019-08-23 14:11:31
 * @LastEditTime: 2019-09-03 14:36:49
 -->
<template>
    <!-- v-if="isShow" -->
    <div class="page">
        <div class="main-container">
            <div class="year-page" @click="yearClick()">
                <span>{{yearVal+'年'}}</span>
                <van-icon name="arrow-down" class="down-icon" />
            </div>
            <div class="box-page">
                <div class="baseline">&nbsp;</div>
                <div class="slide-box">
                    <div 
                        class="slide-item" 
                        v-for="(item,key) in monthList" 
                        :key="key" 
                        @click="monthClick(item)"
                        :class="item.indexVal==highlightVal?'highlightClass':''"
                        v-html="item.monthName"
                    ></div>
                </div>
            </div>
            <div class="screen-btn"  @click="openScreenpanel" v-show="isShowScreenMenu">筛选</div>
            <!-- 筛选面板 -->
            <van-popup
                v-model="screenShow"
                position="right"
                :close-on-click-overlay="false"
                @click-overlay="clickOverlay"
            >
                <div class="screen-container">
                    <div class="screen-container-top">
                        <!-- 升降序 -->
                        <div class="screen-block screen-sort">
                            <div class="block-title">排序规则</div>
                            <div class="block-content">
                                <div
                                    class="block-btn"
                                    :class="sortActiveIndex == index?'block-btn-active':''"
                                    v-for="(item, index) of sortList"
                                    :key="index"
                                    @click="sortActive(item,index)"
                                >{{item.name}}</div>
                            </div>
                        </div>
                        <!-- 工单类型 -->
                        <div class="screen-block">
                            <div class="block-title">工单类型</div>
                            <div class="block-content">
                                <div
                                    class="block-btn"
                                    :class="billActiveNames.includes(item.value)?'block-btn-active':''"
                                    v-for="(item, index) of billTypeList"
                                    :key="index"
                                    @click="billActive(item)"
                                >{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 重置及确定 -->
                    <van-row type="flex" justify="space-between" class="screen-bottom-btns">
                        <van-col span="8" class="reset-btn" @click.native="resetScreenPanle">重置</van-col>
                        <van-col span="16" class="confirm-btn" @click.native="screenConfirm">确定</van-col>
                    </van-row>
                </div>
            </van-popup>
            <!-- 请选择年份 -->
            <van-popup 
                v-model="yearShow" 
                position="bottom"
            >
                <van-picker
                  show-toolbar
                  :default-index="yearIndex"
                  :columns="yearArr"
                  @cancel="onCancel"
                  @confirm="onConfirm"
                />
            </van-popup>
        </div>
    </div>
</template>
<script>
import { Picker } from 'vant';
export default {
    components: {
        [Picker.name]:Picker,
    },
    props: {
        dateTimeYear: {
            type: Number
        },
        dateTimeMonth: {
            type: Number
        },
        sortList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        billTypeList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        isShowScreenMenu: {
            type: Boolean,
            default: true
        },
        screenShow: {
            type: Boolean
        }
    },
    data() {
        return {
            sortActiveIndex: 0,
            billActiveNames: ["all"],
            screen: {
                // 筛选条件
                order_by: "desc", // 升降序（默认降序）
                bill_type: "all" // 工单类型（默认所有：all）多个英文逗号拼接
            },
            monthList: [],//全部月份对象数据
            yearArr: [],//年份
            yearShow: false,
            nowYear: new Date().getFullYear(),//默认获取当前年份
            nowMonth: new Date().getMonth()+1,//默认获取当前月份

            yearVal: new Date().getFullYear(),//用于储存当前选择的年份
            monthVal: new Date().getMonth()+1,//用于储存当前选择的月份
            box: null,
            parameter: null,
            highlightVal: 0,//
            selectDate: "",
            yearIndex: 0,
        };
    },
    created() {
        if(this.dateTimeYear){
            this.yearVal = this.dateTimeYear;
        }
        if(this.dateTimeMonth){
            this.monthVal = this.dateTimeMonth;
        }
        //this.selectDate = this.yearVal+'-'+(this.monthVal<10?'0'+this.monthVal:this.monthVal);
        // console.log(this.selectDate);
        this.getAllMonth();
    },
    mounted() {
        let _this = this;
        this.$nextTick(()=>{
            _this.box = document.querySelector('.slide-box');
            let slideItem = document.querySelector('.slide-item');
            let style = window.getComputedStyle(slideItem).width.replace('px','');
            _this.parameter = +style;

            var scrollTimer
            let timeout = 100;
            //滚动结束事件
            function scrollEnd(){
                let scrollLeft = _this.box.scrollLeft;
                let integer = parseInt(scrollLeft/_this.parameter);//取整数
                let numVal = (scrollLeft%_this.parameter);//取余数
                let indexVal = '';//计算月份

                if(numVal>=20){
                    scrollLeft = _this.parameter*(integer+1);
                    indexVal = integer+2;
                }else{
                    scrollLeft = _this.parameter*integer;
                    indexVal = integer+1;
                }
                _this.box.scrollLeft =  scrollLeft;
                _this.slideMonth(indexVal);//获取滑动到时间
            }
            //滑动处理
            _this.box.addEventListener("scroll",(e)=>{
                clearTimeout(scrollTimer)
                scrollTimer = setTimeout(scrollEnd, timeout);
                return;
            });
            // _this.monthVal = _this.nowMonth;
            // _this.yearVal = _this.nowYear;
            _this.getIndexVal(_this.yearVal,_this.monthVal);
        });
    },
    methods: {
        //获取全部月份
        getAllMonth(){
            this.monthList = [];
            //用于填充前后空格
            let nullObj = {
                indexVal: "",
                monthName: "&#160",
                month: "",
                year: "",
                date: "",
            };
            let allMonthList = [];
            let nowYear = this.nowYear;
            let nowMonth = this.nowMonth;//当前月份
            let index = 1;//用于滚动到指定位置的下标
            //获取全部年份
            this.yearArr = [];
            for(let i=nowYear; i>2014; i--){
                this.yearArr.push(i);
            }

            allMonthList.push(nullObj);//占位
            allMonthList.push(nullObj);//占位
            allMonthList.push(nullObj);//占位
            //遍历获取过去年月
            for( let year = 2015; year<nowYear; year++){
                // console.log(year);
                for(let month=1; month<=12; month++){
                    //处理传后端的年月
                    let dateMonth = month<10?'0'+month:month;
                    let date = year+'-'+dateMonth;

                    let monthObj = {
                        indexVal: index,
                        monthName: month+'月',
                        month: month,
                        year: year,
                        date: date,
                    };
                    allMonthList.push(monthObj);
                    index++;
                }
            }
            //遍历获取当前年月
            for(let month=1; month<=nowMonth; month++){
                //处理传后端的年月
                let dateMonth = month<10?'0'+month:month;
                let date = nowYear+'-'+dateMonth;
                // console.log(month);
                let monthObj = {
                    indexVal: index,
                    monthName: month+'月',
                    month: month,
                    year: nowYear,
                    date: date,
                };
                allMonthList.push(monthObj);
                index++;
            }

            allMonthList.push(nullObj);//占位
            // allMonthList.push(nullObj);//占位

            this.monthList = allMonthList;
            // console.log(allMonthList);
        },
        //点击选择月份
        monthClick(item){
            if(!item.indexVal){
                return;
            }
            this.yearIndex = this.yearArr.findIndex((indexVal)=>{
                return item.year==indexVal;
            });

            this.monthVal = item.month;
            let integer = item.indexVal-1;
            this.box.scrollLeft = integer*this.parameter;
            //阻止重复提交
            if(this.selectDate!=item.date){
                this.selectDate = item.date;
                this.$emit("selectMonthHandle", item.date);
            }
        },
        //滑动获取到的年月
        slideMonth(indexVal){
            this.highlightVal = indexVal;

            let getDate = this.monthList[indexVal+2];
            this.yearVal = this.monthList[indexVal+2].year;
            this.monthVal = this.monthList[indexVal+2].month;
            // console.log(getDate.date);//回传需要的数据 如：2015-01
            // 阻止重复提交
            if(this.selectDate!= getDate.date){
                this.selectDate = getDate.date;
                this.$emit("selectMonthHandle", getDate.date);
            }

            this.yearIndex = this.yearArr.findIndex((indexVal)=>{
                return this.yearVal==indexVal;
            });
        },
        //显示年份控件
        yearClick(){
            this.yearShow = true;
        },
        //取消选择
        onCancel(){
            this.yearShow = false;
        },
        //通过年月获取滚动下标
        getIndexVal(year,monthVal){
            this.monthVal = monthVal;
            this.yearVal = year;

            this.monthList.forEach((item)=>{
                if(year==item.year && item.month==monthVal){
                    this.monthClick(item);
                }
            });
        },
        //选择年份
        onConfirm(value,index){
            //判断选择的年份是否属于当前年份
            if(this.nowYear==value){
                //当年份属于当前年份时，判断月份是否超过当前月份,超过则使用当前月份
                if(this.monthVal>this.nowMonth){
                    this.monthVal = this.nowMonth;
                }
            }
            this.getIndexVal(value,this.monthVal);
            this.yearShow = false;
        },

        /**
         * @Description: 打开筛选面板
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-28 16:41:03
         */
        openScreenpanel() {
            this.$emit("openScreenpanel");
        },
        /**
         * @Description: 升降序点击
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-28 16:40:56
         */
        sortActive(item, index) {
            this.sortActiveIndex = index;
            this.screen.order_by = item.value;
            this.$emit("sortActive", item, index);
        },

        /**
         * @Description: 工单类型点击
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-28 16:40:46
         */
        billActive(item) {
            let val = item.value;
            let idx = this.billActiveNames.indexOf(val);
            // 选中或者取消选中点击项
            if (idx == -1) {
                this.billActiveNames.push(val);
                let deleteIdx = this.billActiveNames.findIndex(
                    value => value == "all"
                );
                if (val !== "all" && deleteIdx !== -1) {
                    // 若选中某具体工单，则去除不限
                    this.billActiveNames.splice(deleteIdx, 1);
                }
                if (val == "all") {
                    // 若选中不限，则去除所有具体工单
                    this.billActiveNames = ["all"];
                }
            } else {
                this.billActiveNames.splice(idx, 1);
            }
            // 若无一项选中，则默认选中不限
            if (this.billActiveNames.length == 0) {
                this.billActiveNames = ["all"];
            }
            // 将选中数组转成字符串
            this.screen.bill_type = this.billActiveNames.join(",");
            this.$emit("billActive", item);
        },

        /**
         * @Description: 筛选重置
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-28 16:40:35
         */
        resetScreenPanle() {
            this.sortActiveIndex = 0;
            this.billActiveNames = ["all"];
            this.screen = {
                order_by: "desc",
                bill_type: "all"
            };
            this.$emit("resetScreenPanle");
        },
        /**
         * @Description: 筛选确定
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-28 16:40:24
         */
        screenConfirm() {
            this.$emit("screenConfirm", this.screen);
        },
        /**
         * @Description: 工单筛选_遮罩层点击关闭
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-29 11:48:04
         */

        clickOverlay() {
            this.$emit("clickOverlay");
        }

    }
};
</script>
<style lang="less" scoped>
.page {
    width: 100%;
    position: fixed;
    background: #fff;
    top: 46px;
    left: 0px;
    z-index: 1000;
    .main-container {
        height: 40px;
        padding: 5px 0px;
        ::-webkit-scrollbar{
            display:none;
        }
        .year-page{
            width: 80px;
            line-height: 40px;
            text-align: center;
            float: left;
            .down-icon{
                vertical-align:middle;
            }
        }
        .box-page{
            overflow: hidden;
            ::-webkit-scrollbar{
                display:none;
            }
            background: #fff;
            width: 200px;
            float: left;
            margin-left: 10px;
            position: relative;
            .baseline{
                width: 40px;
                height: 2px;
                background: #46aef7;
                position: absolute;
                top: 38px;
                right: 40px;
                z-index: 10;
            }
            .slide-box{
                width: 200px;
                display: -webkit-box;
                overflow-x: scroll;
                -webkit-overflow-scrolling:touch;
                pointer-events: auto;
                .slide-item{
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    color: #ccc;
                }
                .highlightClass{
                    color: #46aef7;
                }
            }
        }
        .screen-btn{
            float: right;
            height: 40px;
            padding-right: 15px;
            line-height: 40px;
            color:#46afe7;
        }
        .screen-container {
            width: 76vw;
            min-height: 100vh;
            padding-top: 16px;
            box-sizing: border-box;
            position: relative;
            .screen-container-top {
                padding: 16px;
                .screen-block {
                    margin-bottom: 20px;
                    .block-title {
                        margin-bottom: 15px;
                        font-size: 16px;
                        color: #333;
                    }
                    .block-content {
                        display: flex;
                        flex-wrap: wrap;
                        .block-btn {
                            font-size: 12px;
                            padding: 10px 12px;
                            text-align: center;
                            border: 1px solid #999;
                            color: #666;
                            border-radius: 4px;
                            width: 45%;
                            box-sizing: border-box;
                            flex-shrink: 0;
                            margin-bottom: 10px;
                            &:nth-child(odd) {
                                margin-right: 12px;
                            }
                        }
                        .block-btn-active {
                            border: 1px solid #46aef7;
                            background: #46aef7;
                            color: #fff;
                        }
                    }
                }
                .screen-sort {
                    .block-content {
                        .block-btn {
                            margin-bottom: 0;
                        }
                    }
                }
            }
            .screen-bottom-btns {
                width: 100%;
                position: absolute;
                bottom: 0;
                text-align: center;
                font-size: 18px;
                .reset-btn {
                    padding: 10px;
                    background: #fff;
                    color: #333;
                    border-top: 1px solid #ccc;
                }
                .confirm-btn {
                    padding: 10px;
                    background: #46aef7;
                    color: #fff;
                    border-top: 1px solid #46aef7;
                }
            }
        }
    }
}
</style>