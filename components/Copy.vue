<template>
  <div class="copy" title="Скопировать содержимое" @click="copyToClipboard('Содержимое скопировано в буфер обмена',content)">{{content}}</div>
</template>

<script setup lang="ts">
defineProps({
  content: String
})
import { useStore } from '@/store'
const store = useStore()
const copyToClipboard = (text: string, content: string): void => {
  navigator.clipboard.writeText(content)
      .then(() => {
        store.setNotify({text, type: 'success', active: true})
      })
      .catch(err => {
        store.setNotify({text: 'Произошла ошибка', type: 'danger', active: true})
      });
}
</script>

<style lang="scss" scoped>
.copy {
  cursor: pointer;
}
</style>