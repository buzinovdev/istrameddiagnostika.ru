<template>
  <button class="close-btn"><Icon name="bi:x-circle-fill" /></button>
</template>

<script>
export default {
  name: "Close"
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.close-btn {
  display: flex;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 32px;
  transition: all $transition;
  color: $danger;
}
</style>