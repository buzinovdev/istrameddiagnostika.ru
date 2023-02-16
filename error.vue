<template>
  <div class="main">
    <Header/>
    <Navigation/>
    <Record/>
    <div class="page error">
      <div class="error-title">Ошибка 404</div>
      <div class="error-text">Вы ищите страницу, которой не существует</div>
      <Link class="error-link" text="Вернуться на главную"/>
    </div>
    <Notification/>
    <Footer />
  </div>
</template>

<script setup>
import Link from '@/components/controls/Link'
import Navigation from '@/components/Navigation'
import Record from '@/components/Record'
import Notification from '@/components/Notification'
import {useStore} from '@/store'
const store = useStore()
store.getRequisites()
store.getServices()
store.getStaff()
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 24px;
  &-title {
    font-size: 48px;
    font-weight: 900;
    margin-bottom: 48px;
  }
  &-text {
    font-size: 18px;
    max-width: 780px;
    margin-bottom: 32px;
  }
}
</style>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>