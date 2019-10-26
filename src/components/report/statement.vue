<!--
 * @Description: 声明
 * @Author: xwq
 * @Date: 2019-07-05 17:30:18
 -->
<template>
    <div class="page">
        <div class="main-container">
            <div class="statement">
                <h3>声明</h3>
                <ul>
                    <li>1.广州万国汽车技术有限公司（以下简称"JNS"）为第三方权威检测机构。</li>
                    <li>2.JNS对于用户从其他渠道下载、链接等方式所取得的检测报告以及信息，不保证真实性和准确性。</li>
                    <li>3.本检测报告不得用于其他商业用途，JNS对非本机构的交易和行为不承担任何直接、间接、附带或衍生的损失和责任，并保留向其追究法律责任的权利。</li>
                    <li>4.本检测报告的检测数据由检测机构提供，检测报告的最终解释权归JNS所有。</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        padding: 0px;
        .statement {
            color: #666;
            padding: 10px;
            background-color: #fff;
            border-radius: 5px;
            h3 {
                font-size: 18px;
                margin-bottom: 6px;
                font-weight: bold;
            }
            ul {
                li {
                    font-size: 15px;
                    line-height: 1.1;
                    margin-bottom: 5px;
                    line-height: 20px;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
</style>
