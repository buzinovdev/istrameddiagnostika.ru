<script setup>
defineProps({
  path: {type: String, default: '/'},
  text: {type: String, default: ''},
  social: {type: String, default: ''}
})
import {useStore} from '@/store'
const store = useStore()
const statsAdd = async (social) => {
  await $fetch(`${store.apiLink}stats/social`, {
    method: 'POST',
    body: {social}
  }).then((res) => {
    console.log(res)
  }).catch(e => {
    console.log(e)
  })
}
</script>

<template>
  <a class="social-item" target="_blank" :href="path" @click="statsAdd(social)"><img :src="`/${social}.svg`"></a>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.social-item {
  display: flex;
  margin-left: 12px;
}

</style>