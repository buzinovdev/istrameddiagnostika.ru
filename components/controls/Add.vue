<template>
  <button class="add-btn"><Icon name="bi:plus-circle-fill" /></button>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.add-btn {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  top: 14px;
  right: 14px;
  font-size: 32px;
  transition: all $transition;
  border-radius: $radius;
  color: $success;
}
</style>
