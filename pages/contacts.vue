<script setup>
import PageTitle from "@/components/PageTitle"
import BootstrapIcon from "@/components/BootstrapIcon";
import CallNumber from "@/components/CallNumber";
import Copy from "@/components/Copy";
import SocialList from "@/components/social/List";
import {useStore} from '@/store'
const store = useStore()
const requisites = computed(() => store.requisites)
useHead({
  title: 'Контакты медицинского центра «Диагностика и лечение»',
  meta: [
    {
      name: 'description',
      content: `Контакты медицинского центра «Диагностика и лечение» в Истре. Позвоните нам: ${requisites.value.phones.join(', ')}.`
    }
  ]
})
</script>

<template>
  <div class="page-contacts">
    <PageTitle text="Контакты медицинского центра «Диагностика и лечение»"/>
    <div class="contacts-wrap">
      <div class="contacts-block anim-item">
        <h2 class="contacts-title">Наш адрес</h2>
        <div class="flex align-items-center">
          <BootstrapIcon name="bi:geo-alt-fill"/>
          <Copy :content="requisites.address"/>
        </div>
      </div>
      <div class="contacts-block anim-item">
        <h2 class="contacts-title">Часы работы</h2>
        <div class="flex align-items-center">
          <BootstrapIcon name="bi:clock-fill"/>
          {{requisites.worktime}}
        </div>
      </div>
      <div class="contacts-block anim-item">
        <h2 class="contacts-title">Прием анализов INVITRO</h2>
        <div class="flex align-items-center">
          <BootstrapIcon name="bi:clock-fill"/>
          {{requisites.invitro}}
        </div>
      </div>
      <div class="contacts-block anim-item">
        <h2 class="contacts-title">Телефоны</h2>
        <div class="flex align-items-center">
          <BootstrapIcon name="bi:telephone-fill"/>
          <div class="phone">
            <CallNumber class="column" :phone="item" v-for="item in requisites.phones" :key="item"/>
          </div>
          <SocialList />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.contacts {
  &-wrap {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 24px;
    margin: 24px;
  }

  &-title {
    font-weight: 700;
    margin-bottom: 14px;
    font-size: 18px;
  }
}

@media screen and (max-width: 1024px) {
  .contacts-wrap {
    margin: 0;
  }
}
</style>