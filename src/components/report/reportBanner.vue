<!--
 * @Description: 报告轮播图组件
 * @Author: xwq
 * @Date: 2019-07-01 16:59:15
 -->
 <template>
    <div class="banner" v-if="baseInfoPic.length">
        <van-swipe :autoplay="3000" :show-indicators="false" :height="bannerHeight">
            <van-swipe-item v-for="(image, index) in baseInfoPic" :key="index">
                <img v-lazy="image" width="100%" @click="enlargeImage(baseInfoPic, index)" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
 <script>
import { bannerHeightHandle } from "@/utils/common";
import { ImagePreview, Swipe, SwipeItem } from "vant";
export default {
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem
    },
    props: {
        baseInfoPic: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            title: "",
            bannerHeight: bannerHeightHandle() //获取动态高度
        };
    },
    created() {},
    mounted() {},
    methods: {
        /**
         * @Description: 放大缩略图
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-01 17:12:47
         */

        enlargeImage(imgArray, index) {
            ImagePreview({
                images: imgArray,
                loop: false,
                startPosition: index,
                lazyLoad: true,
                showIndicators: true
            });
        }
    }
};
</script>
 <style lang="less" scoped>
.banner {
    margin-bottom: 8px;
    img {
        max-width: 100%;
    }
    /deep/ .van-swipe {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
}
</style>
 
