<script setup>
import PageTitle from "@/components/PageTitle"
import {useStore} from '@/store'
const route = useRoute()
const store = useStore()
const service = computed(() => store.services.find(el => el.path === route.params.slug))
const staff = computed(() => store.staff.filter(el => el.services === service.value.title))
const space = (number) => {
  if (number === undefined) return
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
useHead({
  "title": `${service.value.title}. Медицинский центр "Диагностика и лечение".`,
  "meta": [
    {
      "name": "description",
      "content": `Медицинский центр "Диагностика и лечение". ${service.value.title}. Узнайте о услугах и специалистах...`
    }
  ],
})
</script>

<template>
  <div class="service">
      <PageTitle :text="service.title"/>
    <div class="service-inner">
      <div class="service anim-item" v-if="service.list.length > 0">
        <div class="title">Предлагаемые услуги</div>
        <ul class="table">
          <li class="row" v-for="item in service.list" :key="item">
            <h3 class="head">{{ item.service }}</h3>
            <div class="content price-rouble">{{ space(item.price) }}</div>
          </li>
        </ul>
      </div>
      <div class="staff anim-item mt-2" v-if="staff.length > 0">
        <div class="title">Прием {{ staff.length > 1 ? 'ведут' : 'ведет' }}</div>
        <ul class="staff-list">
          <li class="staff-item anim-item" v-for="(item, idx) in staff" :key="idx">
            <h2 class="staff-person">{{ item.person }}</h2>
            <div class="staff-desc">{{ item.desc }}</div>
            <div class="staff-worktime"><span>Приемные дни</span>{{ item.worktime.length > 0 ? item.worktime.join(', ') : 'не указанны' }}</div>
          </li>
        </ul>
      </div>
      <div class="generator" v-html="service.content"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.service {


  &-inner {
    padding: 24px;
  }

  .table {
    display: block;
    margin: 0 auto;
    border: 2px solid $main-color-alt;
    border-radius: $radius;
    overflow: hidden;
    width: 70%;
    font-size: 18px;
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
  }

  .head {
    width: 70%;
  }

  .content {
    font-weight: 700;
    background-color: $light-color;
    width: 30%;
  }

  .description {
    margin-top: 48px;
    font-size: 18px;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
}


.staff {
  &-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
  }

  &-item {
    opacity: 0;
    border-radius: $radius;
    box-shadow: $shadow;
    color: white;
    background: $bgg;
    padding: 14px;
    width: calc(50% - 40px);
    transition: all $transition;

    span {
      margin-right: 12px;
      font-weight: 700;

      &:after {
        content: ':';
      }
    }
  }

  &-person {
    font-weight: 700;
    font-size: 24px;
    border-radius: $radius;
    transition: all $transition;
  }

  &-desc,
  &-worktime {
    margin-top: 12px;
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