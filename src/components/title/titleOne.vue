<template>
  <h4 class="vin-title">{{ title }}</h4>
</template>
<script>
export default {
  name: "TitleOne",
  data() {
    return {};
  },
  props: ["title"],
  methods: {}
};
</script>
<style lang="css">
.vin-title {
  font-size: 27px;
  padding-top: 37px;
}
</style>
