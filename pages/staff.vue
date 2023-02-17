<script setup>
import PageTitle from "@/components/PageTitle";
import {useStore} from '@/store'
const store = useStore()
const staff = computed(() => store.staff)
useHead({
  "title": 'Специалисты медицинского центра «Диагностика и лечение»',
  "meta": [
    {
      "name": "description",
      "content": 'Узнайте о наших специалистах и приемных днях.'
    }
  ],
})
</script>

<template>
  <div>
    <PageTitle text="Специалисты медицинского центра «Диагностика и лечение»"/>
    <div class="staff-inner">
      <div class="staff-list" v-if="staff.length > 0">
        <div class="staff-item anim-item" v-for="(item, idx) in staff" :key="idx">
            <h2 class="staff-person">{{ item.person }}</h2>
            <div class="staff-services"><span>Направление</span>{{ item.services }}</div>
            <div class="staff-desc"><span>Описание</span>{{ item.desc }}</div>
            <div class="staff-worktime"><span>Приемные дни</span>{{ item.worktime.length > 0 ? item.worktime.join(', ') : 'не указанны' }}</div>
        </div>
      </div>
      <div class="staff-empty" v-else>Список врачей пуст</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.staff {
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
    opacity: 0;
    border-radius: $radius;
    box-shadow: $shadow;
    color: white;
    background: $bgg;
    padding: 24px;
    width: 100%;
    transition: all $transition;

    span {
      margin-right: 12px;
      font-weight: 700;
      font-size: 18px;
      &:after {
        content: ':';
      }
    }

    & + & {
      margin-top: 24px;
    }
  }

  &-person {
    font-weight: 700;
    font-size: 28px;
    border-radius: $radius;
    transition: all $transition;
  }

  &-services {
    margin-top: 24px;
  }

  &-desc,
  &-worktime {
    margin-top: 12px;
  }
}
</style>