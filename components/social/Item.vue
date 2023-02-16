<script setup>
defineProps({
  path: {type: String, default: '/'},
  text: {type: String, default: ''},
  site: {type: String, default: ''}
})
</script>

<template>
  <a class="social-item" target="_blank" :href="path"><img :src="`/${site}.svg`"></a>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.social-item {
  display: flex;
  margin-left: 12px;
}

</style>