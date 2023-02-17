<script setup>
const props = defineProps({
  text: {type: String, default: ''}
})
</script>

<template>
  <h1 class="page-title anim-item" v-if="text">{{ text }}</h1>
</template>

<style lang="scss">
@import "@/assets/styles/_variables.scss";
.page-title {
  display: block;
  opacity: 0;
  font-size: 32px;
  font-weight: 900;
  background: $bgg;
  color: white;
  padding: 24px;
  text-align: left;
}

@media screen and (min-width: 1900px) {
  .page-title {
    font-size: 24px;
    border-radius: 0 0 12px 12px;
    margin: 0 24px;
  }
}
@media screen and (max-width: 1024px) {
  .page-title {
    font-size: 24px;
  }
}
</style>