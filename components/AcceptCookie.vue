<script setup lang="ts">
import Btn from "@/components/controls/Btn";

const allowCookie = useCookie('allowCookie', {default: () => (false)})
const show = ref<boolean>(true)
onBeforeMount(()=>{
  setTimeout(()=>{
    show.value = allowCookie.value
  },2000)
})
const accept = () => {
  allowCookie.value = true
  show.value = true
}
</script>

<template>
  <div class="cookie" :class="{show: show === false, hide: show}">
    <p>Мы используем файлы cookie, чтобы улучшить работу сайта и предоставить вам больше функционала.</p>
    <p>Продолжая использовать сайт вы соглашаетесь с
      <NuxtLink class="cookie-link" to="/terms-of-use">условиями использования</NuxtLink>
      файлов cookie.
    </p>
    <Btn class="cookie-btn" text="Согласен" @click="accept"/>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.cookie {
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  padding: 24px;
  font-size: 18px;
  box-shadow: $shadow;
  border-top: 1px solid $main-color-alt;
  color: $dark-color;
  transform: translateY(100%);
  visibility: hidden;
  transition: all 2s ease-in-out;

  &.show {
    transform: translateY(0%);
    visibility: visible;
  }

  p + p {
    margin-top: 5px;
  }

  &-link {
    color: $main-color-alt;
  }

  &-btn {
    display: block;
    margin-top: 24px;
    font-size: 18px;
  }
}
</style>