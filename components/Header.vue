<script setup>
import Btn from '@/components/controls/Btn'
import BootstrapIcon from "@/components/BootstrapIcon";
import CallNumber from "@/components/CallNumber";
import Copy from "@/components/Copy";
import MenuBtn from "@/components/MenuBtn";
import {useStore} from '@/store'
const store = useStore()
const requisites = computed(() =>store.requisites)
</script>

<template>
  <header class="header">
    <div class="header-top" >
      <div class="container flex align-items-center justify-content-between">
        <div class="flex align-items-center">
          <Icon name="bi:geo-alt-fill"/>
          <Copy :content="requisites.address"/>
        </div>
        <div class="worktime"><Icon name="bi:clock-fill"/>{{requisites.worktime}}</div>
      </div>
    </div>
    <div class="container flex align-items-center justify-content-between">
      <div class="logo"><NuxtLink to="/"><img class="logo" src="~assets/images/logo.svg"></NuxtLink></div>
      <div class="contacts">
        <div class="flex align-items-center">
          <BootstrapIcon name="bi:telephone-fill"/>
          <div class="phone">
            <CallNumber class="column" :phone="item" v-for="item in requisites.phones" :key="item"/>
          </div>
        </div>
      </div>
      <Btn class="record" text="Записаться на прием" @click="store.showRecordAction(true)"><Icon name="bi:calendar-plus-fill"/></Btn>
      <MenuBtn/>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.header-top {
  margin-bottom: 14px;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 14px;
  font-weight: 700;
  color: white;
  background: $bgg;
  svg {
    margin-right: $svg-offset-right;
  }
}

.logo {
  height: 60px;
}

.contacts {
  font-weight: 700;
  font-size: 16px;
}

@media screen and (max-width: 1024px) {
  .header {
    border: none;
    box-shadow: 0 4px 4px 0 rgb(0 0 0 / 20%);
    padding: 14px 0;
  }
  .header-top,
  .contacts,
  .record{
    display: none;
  }
  .logo {
    height: 50px;
  }
  .contacts{
    display: none;
  }
}
</style>