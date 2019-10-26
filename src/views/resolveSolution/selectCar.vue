<!--
 * @Description: 解决方案_选择品牌
 * @Author: xwq
 * @Date: 2019-02-28 16:37:00
 -->
<template>
    <selectCar @carBrandHandle="carBrandHandle"/>
</template>
<script>
import selectCar from "@/components/selectCar/selectCar";
export default {
    data: function() {
        return {
            carInfo: {
                carBrandId: "",
                carBrandName: "",
                icoName: "",
                carLineName: "",
                carLineId: ""
            }
        };
    },
    components: {
        selectCar: selectCar
    },
    methods: {
        /**
         * @Description: 选择车品牌
         * @Param: item  选中的车品牌
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-03-04 13:54:03
         */
        carBrandHandle: function(item) {
            var self = this;
            self.carInfo.carBrandId = item.id;
            self.carInfo.carBrandName = item.brandName;
            self.carInfo.icoName = item.icoName;
            var data = self.$session.get("carInfo");
            for (var itemKey in self.carInfo) {
                data[itemKey] = self.carInfo[itemKey];
            }
            self.$session.set("carInfoCache", data);
            self.$router.push({
                name: "selectCarLine",
                query: {
                    carBrandId: self.carInfo.carBrandId
                }
            });
        }
    }
};
</script>
<style lang='less' scoped>
</style>

