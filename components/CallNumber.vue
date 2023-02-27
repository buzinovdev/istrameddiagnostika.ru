<script setup>
defineProps({phone: String})
import {useStore} from '@/store'
const store = useStore()
const statsAdd = async (phone) => {
  await $fetch(`${store.apiLink}stats/phones`, {
    method: 'POST',
    body: {phone, date: new Date()}
  }).then((res) => {
    console.log(res)
  }).catch(e => {
    console.log(e)
  })
}
</script>

<template>
  <a class="phone" :href="`tel:+${phone.replace(/[^0-9]/g, '')}`" @click="statsAdd(phone)">{{ phone }}</a>
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