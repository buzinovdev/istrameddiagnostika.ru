<template>
  <div class="project-add">
    <PageTitle text="Выберите услугу для редактирования"/>
    <Link class="block m-24" path="/admin/services/add" text="Добавить услугу"/>
    <div class="services-inner">
      <div class="services-list" :class="{hovered}" v-if="services.length > 0">
        <NuxtLink
            :to="`/admin/services/${item.path}`"
            class="services-item"
            v-for="(item, idx) in services"
            :key="idx"
            @mouseover="hovered = true"
            @mouseleave="hovered = false"
        >
          <div class="services-img">
            <img :src="`/uploads/services/${item.img}`">
          </div>
          <span class="services-link">Редактировать</span>
          <h3 class="services-title">{{ item.title }}</h3>
        </NuxtLink>
      </div>
      <div class="services-empty" v-else>Проекты скоро появятся</div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import PageTitle from '~/components/PageTitle'
import Link from '~/components/controls/Link'
import {useStore} from '@/store'

const router = useRouter()

const store = useStore()
const hovered = ref<boolean>(false)
const serviceItemsDelay = 0.2
const services = computed(() => store.services)
const {$translate} = useNuxtApp()
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.services {
  &-inner {
    padding: 24px;
  }

  &-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
  }

  &-empty {
    color: $light-color;
    font-weight: 300;
    font-size: 2rem;
    padding: 24px;
  }

  &-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(33.3% - 1px);
    overflow: hidden;
    border-radius: 2px;
    transition: all $transition;
  }

  &-title,
  &-link {
    display: block;
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    padding: 12px 24px;
    font-weight: 700;
    box-shadow: $shadow;
    text-align: center;
    border-radius: $radius;
    transition: all $transition;
  }

  &-title {
    opacity: 1;
    letter-spacing: 1px;
    color: $light-color;
    background: $bgg;
    transform: translate(-50%, -50%);
  }

  &-link {
    opacity: 0;
    font-weight: 700;
    transform: translate(-50%, -120%);
    color: $dark-color;
    background-color: $light-color;
  }

  &-img {
    display: flex;
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
    }

    &:before {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0);
      backdrop-filter: blur(0px);
      transition: all $transition;
    }
  }
}

@media screen and (min-width: 1024px) {
  .services-item:not(.show):hover {
    .services-title {
      transform: translate(-50%, 120%);
      opacity: 0;
    }

    .services-link {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }
}

@media screen and (max-width: 1023px) {
  .services-item {
    width: calc(50% - 1px);
  }
}

@media screen and (max-width: 767px) {
  .services-item {
    width: 100%;
  }
}
</style>