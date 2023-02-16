<template>
  <button class="btn"><slot></slot>{{ text }}</button>
</template>

<script setup>
defineProps({
  path: {type: String, default: '/'},
  text: {type: String, default: ''}
})
</script>
