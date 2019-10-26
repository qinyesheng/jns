<template>
    <selectCar @carBrandConfirm="carBrandConfirm"/>
</template>
<script>
import selectCar from "@/components/selectCar/selectCar";
export default {
    data: function() {
        return {
            carInfo: {
                carBrandId: "",
                carBrandName: "",
                icoName: ""
            }
        };
    },
    components: {
        selectCar
    },
    created() {},
    mounted() {},
    methods: {
        // 选择车型
        carBrandConfirm(item) {
            this.carInfo.carBrandId = item.id;
            this.carInfo.carBrandName = item.brandName;
            this.carInfo.icoName = item.icoName;
            this.$session.set("usedCarDealersCarInfo", {
                carBrandId: this.carInfo.carBrandId,
                carBrandName: this.carInfo.carBrandName,
                icoName: this.carInfo.icoName
            });
            this.$router.push({
                // 告诉首页选择了某个brand
                path: "/usedCar",
                query: {
                    carBrandId: item.id
                }
            });
        }
    }
};
</script>
<style lang='less' scoped>
</style>