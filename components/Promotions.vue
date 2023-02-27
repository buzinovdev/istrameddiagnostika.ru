<script setup lang="ts">
import Link from "@/components/controls/Link";
import {useStore} from '@/store'

const store = useStore()
const promotionCookie = useCookie('promotion', {maxAge: 86400, default: () => (true)})
const show = ref<boolean>(false)
const promotion = computed(() => {
  let reversedArray = store.news.reverse();
  const promotion = reversedArray.filter(el => el.type === "promotion" && new Date(Date.now()) <= new Date(dateEnd(el.dateEnd)))
  const news = reversedArray.filter(el => el.toPromotion)
  return [...promotion, ...news]
})
const {$cutString, $translate} = useNuxtApp()
const dateEnd = (date) => {
  return `${date.split('T').shift()}T23:59:59`
}
onBeforeMount(() => {
  if (promotion.value.length > 0) {
      show.value = promotionCookie.value
    setTimeout(() => {
    }, 5000)
  }
})
const close = () => {
  promotionCookie.value = false
  show.value = false
}
</script>

<template>
  <client-only>
    <div class="promotion" :class="{show}">
      <button class="promotion-close" @click="close">
        <Icon name="bi:x"/>
      </button>
      <div class="promotion-content">
        <div class="promotion-item" :class="{one: promotion.length === 1}" v-for="item in promotion" :key="item">
          <h4 class="promotion-title">{{ item.title }}</h4>
          <div class="promotion-date" v-if="item.type === 'promotion'">
            <span>Действует с</span> {{ new Intl.DateTimeFormat("ru").format(new Date(item.dateStart)) }}
            <span>по</span> {{ new Intl.DateTimeFormat("ru").format(new Date(item.dateEnd)) }}
          </div>
          <div class="promotion-preview">{{ $cutString(item.preview, 100) }}</div>
          <Link class="promotion-link light" :path="`/news/${$translate(item.title)}`" text="Подробнее"
                @click="close"/>
        </div>
      </div>
    </div>
  </client-only>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.promotion {
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  visibility: hidden;
  opacity: 0;
  width: 80%;
  height: calc(80% * 0.5);
  background: linear-gradient(90deg, #567599, #1f2e4b);
  color: white;
  border-radius: $radius;
  box-shadow: $shadow;
  filter: blur(1rem);
  transform: translate(-50%, -50%) scale(1.2);
  transition: all $transition;

  &.show {
    visibility: visible;
    opacity: 1;
    filter: blur(0);
    transform: translate(-50%, -50%) scale(1);
  }

  &-close {
    display: flex;
    border: none;
    background-color: transparent;
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 15px;
    font-size: 24px;
    color: $light-color;
  }

  &-content {
    position: relative;
    background: url("~/assets/images/banner.svg") bottom right no-repeat;
    border-radius: $radius;
    height: 100%;
    box-sizing: border-box;
    padding: 0 30px 0 24px ;
    overflow-y: auto;
  }
  &-item {
    padding: 24px;
    &.one {
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
    }
    &+&{
      border-top: 2px solid white;
      padding-top: 24px;
    }
  }

  &-title {
    font-size: 42px;
    font-weight: 900;
    width: 100%;
  }

  &-date {
    margin-top: 5px;
  }

  &-preview {
    font-size: 18px;
    margin: 24px 0;
  }
}

@media screen and (max-width: 1024px) {
  .promotion-wrapper {
    width: 100%;

    .title {
      padding: 0 30px;
    }
  }
}

@media screen and (max-width: 768px) {
  .promotion-content {
    width: 100%;
  }
  .promotion-background {
    display: none;
  }
}
</style>