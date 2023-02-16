<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import PageTitle from '~/components/PageTitle'
import Link from '~/components/controls/Link'
import Close from '~/components/controls/Close'

const router = useRouter()
import {useStore} from '@/store'

const store = useStore()
const news = computed(() => store.news)
const cookieToken = useCookie<string>('token')
const deleteItem = async (id: string) => {
  await $fetch(`${store.apiLink}news/delete`, {
    method: 'POST',
    headers: {'Authorization': `Bearer ${cookieToken.value}`},
    body: {id}
  }).then((res) => {
    store.setNotify({text: res.msg, type: res.msgType, active: res.msgActive})
    store.getNews()
  }).catch(e => console.log(e))
}</script>

<template>
  <div class="admin">
    <PageTitle text="Новости и акции"/>
    <Link class="block m-24" path="/admin/news/add" text="Добавить"/>
    <div class="admin-wrapper">
      <div class="news-list anim-item" v-if="news.length > 0">
        <div class="news-item " v-for="(item, idx) in news" :key="idx">
          <NuxtLink :to="`/admin/news/${item._id}`" class="news-edit">
            <BootstrapIcon name="bi:pencil-fill"/>
          </NuxtLink>
          <div class="news-info">
            <h2 class="news-title">
              <span>{{item.type === 'promotion' ? 'Акция' : 'Новость' }}</span>
              {{ item.title }} от {{ new Intl.DateTimeFormat("ru").format(new Date(item.date)) }}</h2>
            <div class="news-date" v-if="item.type === 'promotion'">
              <span>Публикация с</span> {{ new Intl.DateTimeFormat("ru").format(new Date(item.dateStart)) }}
              <span>по</span> {{ new Intl.DateTimeFormat("ru").format(new Date(item.dateEnd)) }}
            </div>
            <div class="news-preview">{{ item.preview }}</div>
          </div>
          <Close class="news-delete" @click="deleteItem(item._id)"/>
        </div>
      </div>
      <div class="news-empty anim-item" v-else>Список новостей пуст</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.news {
  &-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    opacity: 0;
    width: 100%;
  }

  &-empty {
    font-weight: 300;
    font-size: 2rem;
  }

  &-item {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: $radius;
    box-shadow: $shadow;
    padding: 24px;
    width: 100%;
    transition: all $transition;

    & + & {
      margin-top: 24px;
    }
  }

  &-edit {
    display: block;
    margin-right: 24px;
  }

  &-info {
    margin-right: 34px;
  }

  &-title {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 20px;
    border-radius: $radius;
    transition: all $transition;
    span {
      font-size: 14px;
      display: block;
      margin-right: 12px;
      padding: 12px;
      border-radius: $radius;
      background: $bg-menu;
      color: white;
    }
  }

  &-date {
    margin-top: 8px;
  }

  &-preview {
    margin-top: 24px;
  }

  &-delete {
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>