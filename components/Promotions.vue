<script setup lang="ts">
import Link from "@/components/controls/Link";
import {useStore} from '@/store'

const store = useStore()
const promotionCookie = useCookie('promotion', {maxAge: 86400, default: () => (true)})
const show = ref<boolean>(false)
const promotion = computed(() => {
  let reversedArray = store.news.reverse();
  return reversedArray.find(el => el.type === "promotion")
})
const {$cutString, $translate} = useNuxtApp()
onBeforeMount(() => {
  console.log(useNuxtApp())
  setTimeout(() => {
    show.value = promotionCookie.value
  }, 5000)
})
const close = () => {
  promotionCookie.value = false
  show.value = false
}
</script>

<template>
  <div class="promotion" :class="{show}">
    <button class="promotion-close" @click="close">
      <Icon name="bi:x"/>
    </button>
    <div class="promotion-content">
      <div>
        <h4 class="promotion-title">{{ promotion.title }}</h4>
        <div class="promotion-preview">{{ $cutString(promotion.preview, 100) }}</div>
      </div>
      <Link class="promotion-link light" :path="`/news/${$translate(promotion.title)}`" text="Подробнее" @click="close"/>
    </div>
  </div>
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
    right: 10px;
    font-size: 24px;
    color: $light-color;
  }

  &-content {
    position: relative;
    background: url("~/assets/images/banner.svg") bottom right no-repeat;
    border-radius: $radius;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 24px;
  }

  &-title {
    font-size: 32px;
    font-weight: 900;
    width: 100%;
  }

  &-preview {
    font-size: 18px;
    margin: 24px 0;
  }

  &-background {

  }
}

@media screen and (min-width: 1024px) {

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