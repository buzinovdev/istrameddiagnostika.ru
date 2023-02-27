<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import PageTitle from '~/components/PageTitle'
import DateSelect from '~/components/forms/DateSelect.vue'
import Btn from '@/components/controls/Btn'
import {useStore} from '@/store'

const router = useRouter()
const store = useStore()
const cookieToken = useCookie<string>('token')
const {data: stats} = useFetch(`${store.apiLink}stats/get`, {
  headers: {'Authorization': `Bearer ${cookieToken.value}`},
})
const dayStartTime = (date) => {
  console.log(date)
  return `${date.split('T').shift()}T00:00:00`
}
const dayEndTime = (date) => {
  console.log(date)
  return `${date.split('T').shift()}T23:59:59`
}
const phoneFilteredList = ref([])
const update = () => {
  const list = stats.value.phones
  if (list.length === 0) return
  const filtered = list.filter(el => new Date(el.date) >= new Date(dayStartTime(dateStart.value)) && new Date(dayEndTime(el.date)) <= new Date(dayEndTime(dateEnd.value)))
  console.log(list)
  console.log(filtered)
  phoneFilteredList.value = filtered
}
const checkedForm = computed<boolean>(() => {
  return !(dateStart.value.length > 0 && dateEnd.value.length > 0)
})
const dateStart = ref('')
const dateEnd = ref('')
</script>

<template>
  <div class="admin">
    <PageTitle text="Статистика"/>
    <div class="admin-wrapper" v-if="stats">
      <div class="stats-inner">
        <div class="stats-block">
          <div class="stats-title">Социальные сети</div>
          <div class="stats-content">
            <div class="stats-content-item" v-for="item in stats.social" :key="item">
              <img :src="`/${item.social}.svg`">
              <span>Кликов: {{ item.count }}</span>
            </div>
          </div>
        </div>
        <div class="stats-block">
          <div class="stats-title">Рассылка</div>
          <div class="stats-content">
            <div class="stats-content-item">
              Подписалось: {{ stats.mailing.length }}
            </div>
          </div>
        </div>
        <div class="stats-block stats-phones">
          <div class="stats-title">Статистика по звонкам</div>
          <div class="stats-content">
            <div class="stats-content-item">
              <form class="form" @submit.prevent>
                <div class="flex flex-gap">
                  <DateSelect label="Выберите начальную дату звонков" v-model:value="dateStart"/>
                  <DateSelect label="Выберите конечную дату звонков" v-model:value="dateEnd"/>
                </div>
                <Btn text="Показать" :disabled="checkedForm" @click="update"/>
              </form>
            </div>

            <div class="stats-phones-inner" v-if="phoneFilteredList.length > 0">
              <div class="counter">Звонков за выбранные даты: {{ phoneFilteredList.length }}</div>
              <ul class="list">
                <li class="list-item" v-for="(item, idx) in phoneFilteredList" :key="idx">
                  <span>{{ idx + 1 }} - </span>
                  {{ new Intl.DateTimeFormat("ru").format(new Date(item.date)) }} в
                  {{ new Intl.DateTimeFormat("ru", {timeStyle: "short"}).format(new Date(item.date).getTime()) }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.stats {
  &-inner {
    padding: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  &-phones {
    width: 100%;
  }

  &-block {
    box-shadow: $shadow;
    padding: 24px;
    background: white;
    border-radius: $radius;
  }

  &-title {
    color: $main-color-alt;
    font-weight: 900;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  &-content {
    &-item {
      display: flex;
      align-items: center;
      font-size: 18px;

      span {
        margin-left: 14px;
      }
    }

    &-item + &-item {
      margin-top: 14px;
    }
  }

  &-phones-inner {
    margin-top: 48px;

    .counter {
      border-top: 2px solid $main-color-alt;
      border-bottom: 2px solid $main-color-alt;
      padding: 14px 0;
      font-size: 22px;
      font-weight: 700;
    }

    .list {
      margin-top: 24px;
    }

    .list-item {
      padding: 14px 0;
    }

    .list-item + .list-item {
      border-top: 1px solid $dark-color;
    }
  }
}</style>