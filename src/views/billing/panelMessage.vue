<!--
 * @Description: 开单_车体检查_仪表盘信息
 * @Author: xwq
 * @Date: 2019-08-23 14:11:31
 * @LastEditTime: 2019-09-16 10:07:15
 -->
<template>
    <div class="panel-message-page" v-if="isShow">
        <div class="main-container">
            <div class="panel-message">
                <van-cell-group>
                    <van-cell title="仪表信息" size="large" title-class="title-style-block" />
                    <van-cell
                        :title="item.name"
                        v-for="(item,index) in paneMessageInfo['faultMsgList']"
                        :key="index"
                    >
                        <template slot="default">
                            <van-checkbox-group
                                v-model="paneMessageInfo['selectResult']"
                                @change="change"
                            >
                                <van-checkbox :name="item.value"></van-checkbox>
                            </van-checkbox-group>
                        </template>
                    </van-cell>
                    <van-cell title="记录仪表盘图片" />
                </van-cell-group>
                <div class="pic-upload">
                    <van-uploader :after-read="afterRead">
                        <div class="upload-btn">
                            <img src="@image/billing/upload.png" class="upload-pic" />
                        </div>
                    </van-uploader>
                    <ul class="pic-list">
                        <li
                            class="pic-list-item"
                            v-for="(item,key) in paneMessageInfo['fileList']"
                            :key="key"
                        >
                            <img
                                class="head-img"
                                v-lazy="item"
                                @click="imgPreview(paneMessageInfo['fileList'],key)"
                            />
                            <van-icon name="cross" size="16px" @click="crossPic(key)" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Checkbox, CheckboxGroup, Uploader, ImagePreview } from "vant";
import billApi from "@/api/bill/createNew";
import uploadImg from "@/utils/uploadImg";
import { getUrlParams } from "@/utils/common";
export default {
    components: {
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup,
        [Uploader.name]: Uploader
    },
    data() {
        return {
            isShow: false,
            paneMessageInfo: {
                faultMsgList: [],
                selectResult: [], //选中的结果集合
                fileList: [], //上传的图片文件列表,
                systemPicFile: [] //图片上传成功的url地址
            }
        };
    },
    created() {
        this.init();
    },
    mounted() {
        this.listenerObjectChange();
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
            let queryInfo = getUrlParams();
            let vinStatusChange = this.$local.get("vinStatusChange");
            let getCreateNewInfo = this.$local.get("getCreateNewInfo");
            let paneMessageInfo = this.$local.get("paneMessageInfo");
            if (
                !vinStatusChange &&
                paneMessageInfo &&
                paneMessageInfo["faultMsgList"].length > 0
            ) {
                this.$local.set("vinStatusChange", false);
                this.paneMessageInfo = paneMessageInfo;
                this.isShow = true;
            } else {
                if (getCreateNewInfo["consultingCheckProject"]) {
                    getCreateNewInfo["consultingCheckProject"].forEach(item => {
                        if (item.id == 55) {
                            item["intervalRange"]["list"].map(item => {
                                item["checked"] = false;
                            });
                            this.paneMessageInfo.faultMsgList =
                                item["intervalRange"]["list"];
                            this.isShow = true;
                        }
                    });
                }
            }
        },
        /**
         * @Description:选中的故障项
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-23 15:29:11
         */

        change(item) {},
        /**
         * @Description:上传图片
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-23 17:24:02
         */

        async afterRead(file) {
            let uploadFile = file["file"];
            let result = await uploadImg(uploadFile);
            let baseUrl = window[window.webkitURL ? "webkitURL" : "URL"][
                "createObjectURL"
            ](uploadFile);
            if (result) {
                this.paneMessageInfo["systemPicFile"].push(result.file.url);
                this.paneMessageInfo["fileList"].push(baseUrl);
            }
        },
        /**
         * @Description: 删除已上传的图片
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-24 11:11:18
         */
        crossPic(index) {
            this.paneMessageInfo["fileList"].splice(index, 1);
        },
        /**
         * @Description: 图片预览
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-24 11:18:24
         */

        imgPreview(imgArray, index) {
            ImagePreview({
                images: imgArray,
                loop: false,
                startPosition: index,
                lazyLoad: true,
                showIndicators: true,
                maxZoom: 1
            });
        },
        /**
         * @Description: 监听对象数据变化,实时缓存
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-16 09:48:22
         */

        listenerObjectChange() {
            this.$watch(
                "paneMessageInfo",
                () => {
                    this.$local.set("paneMessageInfo", this.paneMessageInfo);
                },
                { deep: true }
            );
        }
    }
};
</script>
<style lang="less" scoped>
.panel-message-page {
    /deep/ .page .buttonFixed[data-v-cc74d80e] {
        padding: 0;
    }

    .main-container {
        /deep/ .van-cell:not(:last-child)::after {
            border-bottom: 0 none;
        }
        /deep/ [class*="van-hairline"]::after {
            border: 0 none;
        }
        padding: 0;
        // margin-top: 50px;
        padding-bottom: 35px;
        .panel-message {
            padding: 5px;
            border-radius: 10px;
            background-color: #fff;
            .title-style-block {
                & > :first-child {
                    font-weight: bold;
                }
            }
            .pic-upload {
                display: flex;
                margin-bottom: 20px;
                padding-left: 10px;
                .upload-btn {
                    width: 50px;
                    height: 50px;
                    & > .upload-pic {
                        display: block;
                        width: 100%;
                    }
                }
                .pic-list {
                    flex: 1;
                    padding: 0 10px;
                    overflow-y: auto;
                    .pic-list-item {
                        float: left;
                        width: 45px;
                        height: 45px;
                        margin-right: 15px;
                        margin-bottom: 10px;
                        position: relative;
                        img {
                            // display: block;
                            width: 45px;
                            height: 45px;
                            border-radius: 10px;
                        }
                        /deep/ .van-icon {
                            background-color: #f00;
                            color: #fff;
                            border-radius: 50%;
                            border-color: #f00;
                            position: absolute;
                            right: -12px;
                            top: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>