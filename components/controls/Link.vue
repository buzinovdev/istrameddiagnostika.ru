<template>
  <NuxtLink :to="path" class="btn-link"><slot></slot>{{ text }}</NuxtLink>
</template>

<script setup>
defineProps({
  path: {type: String, default: '/'},
  text: {type: String, default: ''}
})
</script>
