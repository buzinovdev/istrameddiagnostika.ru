<script setup>
import PageTitle from "@/components/PageTitle"
import CallNumber from "@/components/CallNumber";
import {useStore} from "@/store";

const store = useStore()
const requisites = computed(() => store.requisites)
useHead({
  title: 'Реквизиты медицинского центра «Диагностика и лечение»',
  meta: [
    {
      name: 'description',
      content: `Реквизиты медицинского центра «Диагностика и лечение» в Истре. Позвоните нам: ${requisites.value.phones.join(', ')}.`
    }
  ]
})
</script>

<template>
  <div>
    <PageTitle class="anim-item" text="Реквизиты медицинского центра «Диагностика и лечение»"/>
    <div class="requisites page-inner anim-item">
      <ul class="table">
        <li class="row">
          <div class="head">Юр. адрес</div>
          <div class="content">{{ requisites.address }}</div>
        </li>
        <li class="row">
          <div class="head">ИНН / КПП</div>
          <div class="content">{{ requisites.inn }} / {{ requisites.kpp }}</div>
        </li>
        <li class="row">
          <div class="head">ОГРН</div>
          <div class="content">{{ requisites.ogrn }}</div>
        </li>
        <li class="row">
          <div class="head">ОКПО</div>
          <div class="content">{{ requisites.okpo }}</div>
        </li>
        <li class="row">
          <div class="head">Банк</div>
          <div class="content">{{ requisites.bank }}</div>
        </li>
        <li class="row">
          <div class="head">Р/сч</div>
          <div class="content">{{ requisites.rs }}</div>
        </li>
        <li class="row">
          <div class="head">К/сч</div>
          <div class="content">{{ requisites.ks }}</div>
        </li>
        <li class="row">
          <div class="head">БИК</div>
          <div class="content">{{ requisites.bik }}</div>
        </li>
        <li class="row">
          <div class="head">Email</div>
          <div class="content">{{ requisites.email }}</div>
        </li>
        <li class="row">
          <div class="head">Телефоны</div>
          <div class="content">
            <CallNumber class="column" :phone="item" v-for="item in requisites.phones" :key="item"/>
          </div>
        </li>
        <li class="row">
          <div class="head">Главный врач</div>
          <div class="content">
            {{ requisites.chiefDoc }}
            <CallNumber class="column content-phones" :phone="item" v-for="item in requisites.chiefDocPhones" :key="item" v-if="requisites.chiefDocPhones.length > 0"/>
            <span class="content-email" v-if="requisites.chiefDocEmail">Email: {{ requisites.chiefDocEmail }}</span>
          </div>
        </li>
        <li class="row">
          <div class="head">Генеральный директор</div>
          <div class="content">
            {{ requisites.gendir }}
            <CallNumber class="column content-phones" :phone="item" v-for="item in requisites.gendirPhones" :key="item" v-if="requisites.gendirPhones.length > 0"/>
            <span class="content-email" v-if="requisites.gendirEmail">Email: {{ requisites.gendirEmail }}</span>
          </div>
        </li>
        <li class="row">
          <div class="head">Гл.бухгалтер</div>
          <div class="content">
            {{ requisites.glbuh }}
            <CallNumber class="column content-phones" :phone="item" v-for="item in requisites.glbuhPhones" :key="item" v-if="requisites.glbuhPhones.length > 0"/>
            <span class="content-email" v-if="requisites.glbuhEmail">Email: {{ requisites.glbuhEmail }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.requisites {
  .table {
    display: block;
    margin: 0 auto;
    border: 2px solid $main-color-alt;
    border-radius: $radius;
    overflow: hidden;
  }

  .row {
    display: flex;
  }

  .row + .row {
    border-top: 1px solid $main-color-alt;
  }

  .head,
  .content {
    padding: 12px 24px;
    box-sizing: border-box;
  }

  .head {
    width: 200px;
    font-weight: 700;
    background-color: $light-color;
  }

  .content {
    width: calc(100% - 200px);
    &-phones {
      margin-top: 12px;
    }
    &-email {
      display: block;
      margin-top: 5px;
    }
  }
}
@media screen and (max-width: 767px) {
  .requisites {
    .row {
      flex-direction: column;
    }

    .head,
    .content {
      padding: 12px 14px;
      box-sizing: border-box;
      width: 100%;
      text-align: center;
    }

    .head {
      background-color: transparent;
    }
  }
}
</style>