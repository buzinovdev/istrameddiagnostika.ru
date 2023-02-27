<script setup>
import Navigation from '@/components/Navigation'
import Record from '@/components/Record'
import Notification from '@/components/Notification'
import {useStore} from '@/store'
import AcceptCookie from "@/components/AcceptCookie";
import Promotions from "./components/Promotions";
import Mailing from "./components/Mailing";
const store = useStore()
store.getRequisites()
store.getServices()
store.getStaff()
store.getNews()
store.getSliders()
</script>

<template>
  <div class="main">
    <Header/>
    <Navigation/>
    <Record/>
    <NuxtPage class="page"/>
    <Notification/>
    <AcceptCookie/>
    <Promotions/>
    <Mailing/>
    <Footer />
  </div>
</template>

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