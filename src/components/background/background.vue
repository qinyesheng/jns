<template>
    <div class="page">
        <div id="pageBackground" class="background" :style="styleObject"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            styleObject: {
                background: "#f2f2f2"
            }
        };
    },
    props: ["background"],
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (this.background) {
                this.styleObject.background = this.background;
            }
        }
    }
};
</script>
<style scoped>
.background {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: -1;
}
</style>
