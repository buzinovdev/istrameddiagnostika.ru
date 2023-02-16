<template>
  <a :href="path" class="btn-link" target="_blank">{{ text }}</a>
</template>

<script setup>
defineProps({
  path: {type: String, default: '/'},
  text: {type: String, default: ''}
})
</script>
