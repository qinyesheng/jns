<!--
 * @Description: 地图页面_公共组件
 * @params: 路由query传入经纬度：lng(经度)  lat(维度)
 * @Author: xwq
 * @Date: 2019-03-18 17:49:21
 -->
<template>
    <div class="page">
        <headerOne :isFixed="isFixed"/>
        <div class="main-container">
            <div id="amap" v-if="mapInfo.lng || mapInfo.lng"></div>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
export default {
    components: {
        headerOne
    },
    data() {
        return {
            isFixed: true,
            mapInfo: {
                lng: "", //经度
                lat: "" //维度
            }
        };
    },
    mounted() {
        //获取经纬度参数
        let lng = this.$route.query.lng || "",
            lat = this.$route.query.lat || "";
        this.mapInfo.lng = lng;
        this.mapInfo.lat = lat;
        this.$nextTick(function() {
            this.initMap();
        });
    },
    methods: {
        //初始化地图
        initMap() {
            let self = this;
            new Promise(function(resolve, reject) {
                window.initAMapOnload = () => {
                    let { lng, lat } = self.mapInfo;
                    let map = new AMap.Map("amap", {
                        resizeEnable: true,
                        center: [lng, lat],
                        zoom: 12
                    });
                    self.addMarker(map); //实例化完地图后执行添加覆盖物函数
                };
                // 创建script标签
                let script = document.createElement("script");
                script.type = "text/javascript";
                script.src =
                    "//webapi.amap.com/maps?v=1.3&key=f65184f029e86e47b9fdbcbbe41c24c5&callback=initAMapOnload";
                document.head.appendChild(script);
            });
        },

        //创建覆盖物
        addMarker(map) {
            let self = this,
                { lng, lat } = self.mapInfo,
                icon = new AMap.Icon({
                    size: new AMap.Size(31, 36), // 图标显示尺寸
                    image: require("@/assets/image/locationUCD.png"), // Icon引入
                    // imageOffset: new AMap.Pixel(0, -2),  // 图像相对展示区域的偏移量，适于雪碧图等
                    imageSize: new AMap.Size(31, 36) // 根据所设置的大小拉伸或压缩图片
                }),
                marker = new AMap.Marker({
                    position: [lng, lat],
                    offset: new AMap.Pixel(-13, -30),
                    icon: icon
                });
            map.add(marker);

            //添加具体地址内容显示框
            //如果有需要可以在上一页保存本地session要显示的内容 - [type-Object]。
            var dataInfo = JSON.parse(
                window.sessionStorage.getItem("markerInfo")
            );
            if (!dataInfo || typeof dataInfo != "object") return;
            var infoWindow = new AMap.InfoWindow({
                autoMove: true,
                offset: { x: 0, y: -30 }
            });
            try {
                infoWindow.setContent(this.createContent(dataInfo));
                infoWindow.open(map, marker.getPosition());
            } catch (error) {
                console.log(error);
            }
        },

        createContent(arr) {
            var s = [];
            s.push("<b>名称：" + arr.name + "</b>");
            s.push("地址：" + arr.address);
            s.push("电话：" + arr.tel);
            // s.push("类型：" + arr.type);
            return s.join("<br>");
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    height: 100vh;
    overflow: hidden;
    background-color: #ccc;
    .main-container {
        padding: 0;
        #amap {
            width: 100%;
            height: 100vh;
        }
    }
}
</style>
