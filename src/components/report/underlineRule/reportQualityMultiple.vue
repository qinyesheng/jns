<!--
 * @Description: 报告维修方案质保，多行显示
 * @Author: lp
 * @Date: 2019-05-27 15:39:01
 * @LastEditTime: 2019-05-30 17:04:15
 * @LastEditors: Please set LastEditors
 -->

<template>
    <div class="zb" v-if="qualityDesc || qualityList.length">
        <!-- 有 maintainScheme.quality_list的样式 -->
        <div class="quality-list" v-if="qualityList.length">
            <span class="quality-list-title">
                <img src="@assets/image/zb.png" alt class="zb-icon" @click.prevent>质保
            </span>
            <ul class="quality-list-detail">
                <li v-for="(item, index) of qualityList" :key="index">
                    <div class="item-title">{{item.title}} &nbsp;{{item.content}}</div>
                    <div class="item-desc">{{item.desc}}</div>
                </li>
            </ul>
        </div>
        <!-- 无 maintainScheme.quality_list的样式 -->
        <div v-else class="quality-list">
            <span class="quality-list-title">
                <img src="@assets/image/zb.png" alt class="zb-icon" @click.prevent>质保
            </span>
            <ul class="quality-desc-list">
                <li v-for="(item, index) of qualityDescList" :key="index">{{item}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            qualityDescList: []
        };
    },
    props: {
        // 后端默认的质保数组
        qualityList: {
            type: Array,
            default() {
                return [];
            }
        },
        // 质保字符串
        qualityDesc: {
            type: String,
            default: ""
        }
    },
    components: {},
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            // 质保处理
            if (!this.qualityList.length && this.qualityDesc) {
                this.qualityDescList = this.qualityDesc.split("<br>");
                // 无内容处理
                for (let i = 0; i < this.qualityDescList.length; i++) {
                    if (this.qualityDescList[i] == "") {
                        this.qualityDescList.splice(i, 1);
                        i--;
                    }
                }
            }
        }
    }
};
</script>
<style lang='less' scoped>
.zb {
    padding-left: 10px;
    font-size: 16px;
    color: #898989;
    .zb-icon {
        vertical-align: middle;
        margin-right: 5px;
        height: 24px;
    }
    .quality-list {
        display: flex;
        flex-direction: column;
        .quality-list-title {
            color: #666;
        }
        .quality-list-detail {
            li {
                padding-top: 10px;
                padding-bottom: 5px;
                border-bottom: 1px solid #ccc;
                .item-title {
                    margin-bottom: 8px;
                    color: #666;
                }
                .item-desc {
                    color: #999;
                    line-height: 120%;
                }
                &:last-child {
                    padding-bottom: 0;
                    border-bottom: 0;
                }
            }
        }
        .quality-desc-list {
            margin-bottom: 5px;
            li {
                padding-top: 10px;
                &:last-child {
                    padding-bottom: 0;
                }
            }
        }
    }
}
</style>