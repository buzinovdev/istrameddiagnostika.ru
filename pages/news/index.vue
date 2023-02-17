<script setup>
import PageTitle from "@/components/PageTitle";
import Link from '@/components/controls/Link'
import {useStore} from '@/store'

const store = useStore()
const news = computed(() => store.news)
const {$cutString, $translate} = useNuxtApp()
useHead({
  "title": 'Новости и акции медицинского центра "Диагностика и лечение"',
  "meta": [
    {
      "name": "description",
      "content": 'Узнайте последние новости медицинского центра "Диагностика и лечение" и проводимые акции.'
    }
  ],
})
</script>

<template>
  <div class="news">
    <PageTitle text="Новости и акции"/>
    <div class="news-inner">
      <div class="news-list" v-if="news.length > 0">
        <div class="news-item anim-item" v-for="(item, idx) in news" :key="idx">
          <img class="news-img" :src="`/uploads/services/${item.img}`">
          <div class="news-type">{{ item.type === 'promotion' ? 'Акция' : 'Новость' }}</div>
          <h2 class="news-title">{{ item.title }}</h2>
          <div class="news-publication">{{ new Intl.DateTimeFormat("ru").format(new Date(item.date)) }}</div>
          <div class="news-preview">{{ $cutString(item.preview, 100) }}</div>
          <div class="news-date" v-if="item.type === 'promotion'">
            <span>Действует с</span> {{ new Intl.DateTimeFormat("ru").format(new Date(item.dateStart)) }}
            <span>по</span> {{ new Intl.DateTimeFormat("ru").format(new Date(item.dateEnd)) }}
          </div>
          <div class="news-date-empty" v-else></div>
          <Link class="news-more" :path="`/news/${$translate(item.title)}`" text="Подробнее"/>
        </div>
      </div>
      <div class="news-empty anim-item" v-else>Список новостей и акций пуст</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.news {
  &-list {
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    padding: 24px;
    box-sizing: border-box;
  }

  &-empty {
    font-weight: 300;
    font-size: 2rem;
  }

  &-img {
    width: 100%;
    margin-bottom: 12px;
    border-radius: $radius;
  }

  &-item {
    position: relative;
    opacity: 0;
    padding: 14px;
    min-width: 320px;
    width: calc(25% - 18px);
    box-sizing: border-box;
    box-shadow: $shadow;
    border-radius: $radius;
  }

  &-type {
    font-weight: 300;
    border-left: 2px solid $main-color-alt;
    padding-left: 5px;
  }

  &-title {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 22px;
    margin-top: 10px;
  }

  &-publication {
    margin-top: 5px;
    font-weight: 300;
  }

  &-preview {
    margin: 24px 0 34px;
    font-size: 18px;
  }

  &-date {
    text-align: center;
    font-weight: 300;
  }
  &-date-empty {
    min-height: 19px;
  }

  &-more {
    display: block;
    margin-top: 14px;
  }
}

@media screen and (max-width: 768px) {
  .news-item {
    width: 100%;
  }
}
</style>