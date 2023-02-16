<template>
  <div class="app-icon">
    <Icon :name=name />
  </div>
</template>

<script setup>
defineProps({name: String})
</script>

<style lang="scss">
@import "@/assets/styles/_variables.scss";

.app-icon {
  padding: 12px;
  background: $bgg;
  border-radius: 50%;
  margin-right: 12px;
  display: flex;
  box-shadow: $shadow;

  svg {
    height: 16px;
    width: 16px;

    path {
      fill: $light-color;
    }
  }
}
</style>