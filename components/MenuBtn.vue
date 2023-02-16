<template>
  <button class="menu-btn" :class="{show}" @click="openMenu">
    <span class="bar1"></span>
    <span class="bar2"></span>
    <span class="bar3"></span>
  </button>
</template>

<script setup>
import { useStore } from '@/store'
const store = useStore()
const show = computed(() => store.isShowMenu)
const openMenu = () => {
  const action = !show.value
  store.showMenuAction(action)
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.menu {
  &-btn {
    display: none;
    flex-direction: column;
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: relative;
    z-index: 2;
    width: 48px;
    height: 40px;
    padding: 10px;

    .bar1, .bar2, .bar3 {
      display: block;
      height: 3px;
      position: absolute;
      transition: all .2s ease-in-out;
      border-radius: 4px;
    }

    .bar1, .bar3 {
      background-color: $dark-color;
      width: 16px;
    }

    .bar1 {
      top: 10px;

    }

    .bar2 {
      background-color: $main-color-alt;
      width: 28px;
      top: 50%;
      transform: translateY(-50%);
    }

    .bar3 {
      right: 10px;
      bottom: 10px;
    }

    &.show {
      .bar1, .bar3 {
        top: 50%;
        width: 28px;
      }

      .bar1 {
        transform: translateY(-50%) rotate(45deg);
      }

      .bar2 {
        opacity: 0;
      }

      .bar3 {
        right: auto;
        transform: translateY(-50%) rotate(-45deg);
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .menu-btn {
    display: flex;
  }
}
</style>