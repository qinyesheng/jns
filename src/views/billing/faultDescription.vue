<!--
 * @Description: 开单_车体检查_故障描述
 * @Author: xwq
 * @Date: 2019-08-26 09:25:27
 * @LastEditTime: 2019-09-09 16:19:39
 -->
<template>
    <div class="page" v-if="isShow">
        <div class="main-container">
            <div class="fault-description">
                <van-cell-group>
                    <van-cell title="故障描述" size="large" title-class="title-style-block" />
                    <van-collapse
                        v-model="faultDescriptionInfo['listActiveId']"
                        @change="change"
                        accordion
                    >
                        <van-collapse-item
                            :title="item.className"
                            :name="item.id"
                            v-for="(item,key) in faultDescriptionInfo['faultList']"
                            :key="key"
                        >
                            <van-cell
                                :title="i.faultPhenomenonName"
                                v-for="(i,k) in item.faultMsgList"
                                :key="k"
                                class="checkbox-list"
                            >
                                <template slot="default">
                                    <van-checkbox-group v-model="faultDescriptionInfo['result']">
                                        <van-checkbox :name="''+i.id"></van-checkbox>
                                    </van-checkbox-group>
                                </template>
                            </van-cell>
                            <van-cell
                                title="添加故障现象"
                                icon="add-o"
                                class="add-new-fault"
                                title-class="title-style"
                                @click="addNewFault(key)"
                            ></van-cell>
                        </van-collapse-item>
                    </van-collapse>
                </van-cell-group>
            </div>
        </div>
        <slotDialog
            title="添加故障现象"
            :show="faultDescriptionInfo['dialogShow']"
            @confirm="confirm"
            @cancel="cancel"
        >
            <template #dialogValue>
                <input
                    v-model="faultDescriptionInfo['value']"
                    name="example"
                    v-focus="focusStatus"
                    autocomplete="off"
                    class="dialog-input"
                    @input="inputVal"
                />
            </template>
        </slotDialog>
    </div>
</template>
<script>
import slotDialog from "@/components/dialog/slotDialog";
import { Collapse, CollapseItem, Checkbox, CheckboxGroup } from "vant";
import billApi from "@/api/bill/createNew";
export default {
    components: {
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup,
        [Collapse.name]: Collapse,
        [CollapseItem.name]: CollapseItem,
        slotDialog
    },
    data() {
        return {
            isShow: false,
            focusStatus: false,
            faultDescriptionInfo: {
                activeId: [], //已展开过的Id
                faultList: [], //列表数据
                // faultMsgList: [],
                result: [],
                listActiveId: "",
                dialogShow: false,
                emptyStatus: false,
                value: "", //添加故障现象
                addNewFaultKey: "" //新增故障现象对应列表的key值
            }
        };
    },
    //指令定义
    directives: {
        focus: {
            //每当指令绑定到元素上时，会立即执行这个bind函数，只执行一次
            bind: function() {},
            //inserted表示元素插入到DOM中时，会执行inserted函数，只触发一次，el表示被绑定的那个原生js对象
            inserted: function(el) {
                el.focus();
            },
            //当VNode更新时会执行updated，可触发多次
            update(el, { value }) {
                if (value) {
                    el.focus();
                } else {
                    el.blur();
                }
            }
        }
    },
    created() {
        this.init();
    },
    mounted() {
        this.$watch(
            "faultDescriptionInfo",
            () => {
                this.$local.set(
                    "faultDescriptionInfo",
                    this.faultDescriptionInfo
                );
            },
            { deep: true }
        );
    },
    methods: {
        /**
         * @Description:初始化列表数据
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-26 14:20:50
         */
        init() {
            let vinStatusChange = this.$local.get("vinStatusChange");
            let getCreateNewInfo = this.$local.get("getCreateNewInfo");
            let faultDescriptionInfo = this.$local.get("faultDescriptionInfo");
            if (faultDescriptionInfo && !vinStatusChange) {
                this.faultDescriptionInfo = faultDescriptionInfo;
                this.isShow = true;
                this.$local.set("vinStatusChange", false);
            } else {
                // this.$local.set("vinStatusChange", true);
                if (
                    getCreateNewInfo &&
                    getCreateNewInfo["faultPhenomenonClass"]
                ) {
                    getCreateNewInfo["faultPhenomenonClass"].map(
                        (item, index) => {
                            return (item.faultMsgList = []);
                        }
                    );
                    this.faultDescriptionInfo["faultList"] =
                        getCreateNewInfo["faultPhenomenonClass"];
                    this.isShow = true;
                    // this.$local.set("faultDescriptionList", this.faultDescriptionInfo['faultList']);
                }
            }
        },
        /**
         * @Description: 展开列表项
         * @Param: listActiveId 展开项的Id
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-26 09:40:01
         */

        change(listActiveId) {
            let allSelectActiveId = this.$local.get("selectActiveId");
            let allFaultList = this.$local.get("faultList");
            if (allSelectActiveId && allSelectActiveId.includes(listActiveId)) {
                if (allFaultList && allFaultList.length > 0) {
                    this.faultDescriptionInfo["faultList"] = allFaultList;
                    return;
                }
            }
            if (
                listActiveId != "" &&
                !this.faultDescriptionInfo["activeId"].includes(listActiveId)
            ) {
                this.faultDescriptionInfo["activeId"].push(listActiveId);
                // this.$local.set("selectActiveId", this.faultDescriptionInfo['activeId']);
                billApi
                    .getFaultPhenomenon({
                        sysClassId: listActiveId
                    })
                    .then(res => {
                        if (res.code == 20000) {
                            this.faultDescriptionInfo["faultList"].map(
                                (item, key) => {
                                    if (item.id == listActiveId) {
                                        item["faultMsgList"] = res.data;
                                    }
                                }
                            );
                            // this.$local.set("faultList", this.faultDescriptionInfo['faultList']);
                        }
                    });
            }
        },
        /**
         * @Description: 新增故障现象
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-30 11:00:10
         */

        addNewFault(key) {
            this.faultDescriptionInfo["dialogShow"] = true;
            this.faultDescriptionInfo["addNewFaultKey"] = key;
            if (this.faultDescriptionInfo["emptyStatus"]) {
                this.focusStatus = false;
            } else {
                this.focusStatus = true;
            }
        },
        /**
         * @Description: 监听输入框输入
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-31 11:21:46
         */
        inputVal() {
            this.focusStatus = true;
        },
        /**
         * @Description: 添加新的故障现象_确定按钮
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-30 11:53:54
         */

        confirm() {
            //空值处理
            if (this.faultDescriptionInfo["value"] == "") {
                this.$toast("请输入故障现象");
                this.faultDescriptionInfo["emptyStatus"] = true;
                this.focusStatus = false;
                this.faultDescriptionInfo["dialogShow"] = true;
                setTimeout(() => {
                    this.$toast.clear();
                }, 1500);
                return;
            }
            //非空时
            let params = {
                faultPhenomenonName: this.faultDescriptionInfo["value"],
                sysClassId: this.faultDescriptionInfo["faultList"][
                    this.faultDescriptionInfo["addNewFaultKey"]
                ]["id"]
            };
            billApi.addFaultPhenomenon(params).then(res => {
                if (res.code == 20000 && res.data) {
                    // console.log(res);
                    let newAddFaultInfo = res.data;
                    this.faultDescriptionInfo["faultList"][
                        this.faultDescriptionInfo["addNewFaultKey"]
                    ]["faultMsgList"].push(newAddFaultInfo);
                    this.$toast(res.msg);
                    this.faultDescriptionInfo["emptyStatus"] = false;
                    this.focusStatus = false;
                    this.faultDescriptionInfo["dialogShow"] = false;
                    this.faultDescriptionInfo["value"] = "";
                    // this.$local.set("faultList", this.faultDescriptionInfo['faultList']);
                    setTimeout(() => {
                        this.$toast.clear();
                    }, 1500);
                } else {
                    this.$toast(res.msg);
                }
            });
        },
        /**
         * @Description: 添加新的故障现象_取消按钮
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-30 11:53:54
         */
        cancel() {
            this.faultDescriptionInfo["emptyStatus"] = false;
            this.focusStatus = false;
            this.faultDescriptionInfo["dialogShow"] = false;
            this.faultDescriptionInfo["value"] = "";
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    /deep/ .page .buttonFixed[data-v-cc74d80e] {
        padding: 0;
    }
    .main-container {
        /deep/ .van-collapse-item__content {
            padding: 0 16.5px;
        }
        /deep/ .van-hairline--top-bottom::after {
            border-width: 0;
        }

        padding: 0;
        .fault-description {
            padding: 5px;
            padding-bottom: 50px;
            border-radius: 10px;
            background-color: #fff;
            .title-style-block {
                & > :first-child {
                    font-weight: bold;
                }
            }
            .checkbox-list {
                padding: 11px 0;
                /deep/ .van-cell__value {
                    flex: 0.3;
                }
            }
            .add-new-fault {
                padding: 11px 0;
            }
            .title-style {
                & > :first-child {
                    font-weight: bold;
                }
            }
        }
        .dialog-input {
            display: block;
            border: 1px solid #f2f2f2;
            width: 80%;
            height: 45px;
            padding: 0 10px;
            margin: 30px auto;
            outline: none;
            -webkit-appearance: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
    }
}
</style>