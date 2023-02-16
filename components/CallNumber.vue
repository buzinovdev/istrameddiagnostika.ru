<script setup>
defineProps({phone: String})
</script>

<template>
  <a class="phone" :href="`tel:+${phone.replace(/[^0-9]/g, '')}`">{{ phone }}</a>
</template>

<style lang="scss" scoped>
.phone {
  display: block;

  &.line {
    & + & {
      &:before {
        content: ',';
        margin-right: 14px;
      }
    }
  }

  &.column {
    & + & {
      margin-top: 5px;
    }
  }
}
</style>