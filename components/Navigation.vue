<script setup lang="ts">
import Btn from "@/components/controls/Btn";
import BootstrapIcon from "@/components/BootstrapIcon";
import CallNumber from "@/components/CallNumber";
import Copy from "@/components/Copy";
import {useStore} from '@/store'
const route = useRoute()
const store = useStore()
const requisites = computed(() => store.requisites)
const show = computed(() => store.isShowMenu)
const nav = computed(() => store.nav)
const activeSubItem = ref<number>(0)
const activeSub = (idx: number): void => {
  activeSubItem.value = activeSubItem.value !== idx ? idx : 0
}
const findParentLink = (path, currentPath) => {
  return currentPath.includes(path)
}
</script>

<template>
  <nav class="navbar" :class="{show}">
    <div class="navbar-scroll">
      <ul class="navbar-content container">
        <li class="navbar-item" v-for="(item,idx) in nav" :key="idx">
          <NuxtLink class="navbar-link" :to="'/'+item.path" @click="store.showMenuAction(false)" v-if="!item.sub">
            {{ item.title }}
          </NuxtLink>
          <NuxtLink
              class="navbar-link sublink"
              :class="{'parent-link-active': findParentLink(item.path, route.path.split('/'))}"
              @click="activeSub(idx + 1)" v-else>
            {{ item.title }}
          </NuxtLink>
          <div class="sub" :class="{show: activeSubItem === idx + 1}" v-if="item.sub">
            <ul class="sub-list">
              <li class="sub-item" v-for="(subitem,idx) in item.sub" :key="idx">
                <NuxtLink
                    class="sub-link"
                    :to="(item.path === subitem.path) ? '/'+item.path : '/'+item.path+'/'+subitem.path"
                    @click="store.showMenuAction(false); activeSubItem = 0"
                >{{ subitem.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="mobile container flex column align-items-center">
        <div class="flex align-items-center">
          <BootstrapIcon name="bi:telephone-fill"/>
          <div class="phone">
            <CallNumber class="column" :phone="item" v-for="item in requisites.phones" :key="item"/>
          </div>
        </div>
        <div class="worktime">
          <Icon name="bi:clock-fill"/>
          {{ requisites.worktime }}
        </div>
        <Btn class="record" path="/" text="Записаться на прием"
             @click="store.showMenuAction(false);store.showRecordAction(true)">
          <Icon name="bi:calendar-plus-fill"/>
        </Btn>
      </div>
    </div>
    <div class="address flex align-items-center">
      <BootstrapIcon name="bi:geo-alt-fill"/>
      <Copy :content="requisites.address"/>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.navbar {
  margin-top: 14px;
  border-top: 1px solid $main-color-alt;
  box-shadow: 0 4px 4px 0 rgb(0 0 0 / 20%);

  .mobile,
  .address {
    display: none;
  }

  &-content {
    display: flex;
    justify-content: center;
  }

  &-item {
    position: relative;
  }

  &-link {
    display: block;
    position: relative;
    padding: 16px;
    outline: none;
    font-weight: 700;
    transition: color $transition;
  }

  .sub {
    z-index: 1;

    &-item {
      display: block;
    }

    &-link {
      display: block;
      padding: 12px 24px;
      transition: color $transition;

      &:hover {
        color: $main-color-alt;
      }
    }
  }
}

.router-link-active,
.parent-link-active {
  color: $main-color-alt;
  transition: color $transition;
}

@media screen and (min-width: 1024px) {
  .navbar {
    .sub {
      position: absolute;
      opacity: 0;
      visibility: hidden;
      top: 80%;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 0 0 12px 12px;
      box-shadow: 0 4px 4px 0 rgb(0 0 0 / 20%);
      background-color: white;
      transition: all $transition;

      &-link {
        white-space: nowrap;
      }
    }

    &-item {
      & + & {
        margin-left: 24px;
      }

      &:hover .sub {
        opacity: 1;
        visibility: visible;
        top: 100%;
      }
    }

    &-link:hover {
      color: $main-color-dark;
    }
  }

  .sub-item + .sub-item {
    border-top: 1px solid $main-color-alt;
  }
}

@media screen and (max-width: 1024px) {
  .navbar {
    position: absolute;
    margin: 0;
    top: 78px;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    height: calc(100vh - 78px);
    z-index: 1;
    background-color: #fff;
    box-shadow: none;
    opacity: 0;
    transform: translateX(-80%);
    visibility: hidden;
    transition: all $transition;

    &.show {
      opacity: 1;
      visibility: visible;
      transform: translateX(0%);
    }

    &-scroll {
      overflow-y: scroll;
      height: calc(100% - 86px);
    }

    &-content {
      flex-direction: column;
      padding: 14px;
    }

    &-link {
      padding: 8px 0;
      font-size: 20px;
    }

    .sub {
      transition: all $transition;
      opacity: 0;
      visibility: hidden;
      max-height: 0;

      &.show {
        opacity: 1;
        visibility: visible;
        max-height: 1000px;
      }

      &-item {
        display: block;
      }

      &-link {
        display: block;
        padding: 6px 12px;
        transition: color $transition;
        border-left: 2px solid $main-color-alt;

        &:hover {
          color: $main-color-alt;
        }
      }
    }

    .sub-item + .sub-item {
      margin-top: 10px;
    }

    .mobile {
      margin: 20% 0;
      display: flex;
      padding: 14px;
      font-weight: 700;

      svg {
        margin-right: $svg-offset-right;
      }

      .worktime,
      .record {
        margin-top: 14px;
      }
    }

    .address {
      display: flex;
      height: 58px;
      color: white;
      padding: 14px;
      background-color: $main-color-alt;

      svg {
        margin-right: $svg-offset-right;
        height: 16px;
        width: 16px;
      }
    }
  }
}
</style>