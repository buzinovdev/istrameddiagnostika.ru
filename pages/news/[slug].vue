<script setup>
import PageTitle from "@/components/PageTitle"
import {useStore} from '@/store'

const route = useRoute()
const store = useStore()
const {$translate} = useNuxtApp()
const news = computed(() => store.news.find(el => $translate(el.title) === route.params.slug))
const space = (number) => {
  if (number === undefined) return
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
</script>

<template>
  <div class="news">
    <div class="news-top anim-item">
      <img class="news-img" :src="`/uploads/services/${news.img}`">
      <div class="news-info">
        <div class="flex flex-gap align-items-center">
          <h1 class="news-title">{{ news.title }}</h1>
          <div class="news-type">{{ news.type === 'promotion' ? 'Акция' : 'Новость' }}</div>
        </div>
        <div class="news-publication" v-if="news.type !== 'promotion'">
          Дата публикации: {{ new Intl.DateTimeFormat("ru").format(new Date(news.date)) }}
        </div>
        <div class="news-date" v-if="news.type === 'promotion'">
          <span>Действует с</span> {{ new Intl.DateTimeFormat("ru").format(new Date(news.dateStart)) }}
          <span>по</span> {{ new Intl.DateTimeFormat("ru").format(new Date(news.dateEnd)) }}
        </div>
      </div>
    </div>
    <div class="news-preview generator anim-item" v-html="news.content"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.news {
  &-top {
    display: flex;
    flex-wrap: wrap;
    background: $bgg;
    color: white;
    padding: 24px;
  }

  &-img {
    max-width: 320px;
    border-radius: $radius;
    box-shadow: $shadow;
  }

  &-info {
    margin-left: 48px;
    min-width: 60%;
  }
  &-title {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 42px;
  }
  &-type {
    font-weight: 700;
    padding: 7px 14px;
    color: $dark-color;
    background-color: #fff;
    border-radius: $radius;
    box-shadow: $shadow;
  }

  &-publication,
  &-date{
    margin-top: 5px;
  }

  &-preview {
    padding: 24px;
    font-size: 18px;
  }
}

@media screen and (max-width: 767px) {
  .service {
    .row {
      flex-direction: column;
    }

    .table {
      margin: 0;
      width: 100%;
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
  .staff-item {
    width: 100%;
  }
}
</style>