<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import PageTitle from '~/components/PageTitle'
import Link from '~/components/controls/Link'
import Close from '~/components/controls/Close'
import {useStore} from '@/store'

const router = useRouter()
const store = useStore()
const staff = computed(() => store.staff)
const cookieToken = useCookie<string>('token')
const deleteItem = async (id: string) => {
  await $fetch(`${store.apiLink}staff/delete`, {
    method: 'POST',
    headers: {'Authorization': `Bearer ${cookieToken.value}`},
    body: {id}
  }).then((res) => {
    store.setNotify({text: res.msg, type: res.msgType, active: res.msgActive})
    store.getStaff()
  }).catch(e => console.log(e))
}
</script>

<template>
  <div class="admin">
    <PageTitle text="Список врачей"/>
    <Link class="block m-24" path="/admin/staff/add" text="Добавить"/>
    <div class="admin-wrapper">
      <div class="staff-list anim-item" v-if="staff.length > 0">
        <div class="staff-item " v-for="(item, idx) in staff" :key="idx">
          <NuxtLink :to="`/admin/staff/${item._id}`" class="staff-edit">
            <BootstrapIcon name="bi:pencil-fill"/>
          </NuxtLink>
          <div class="staff-info">
            <h2 class="staff-person">{{ item.person }}</h2>
            <div class="staff-services"><span>Направление</span>{{ item.services }}</div>
            <div class="staff-desc"><span>Описание</span>{{ item.desc }}</div>
          </div>
          <Close class="staff-delete" @click="deleteItem(item._id)"/>
        </div>
      </div>
      <div class="staff-empty anim-item" v-else>Список врачей пуст</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.staff {
  &-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    opacity: 0;
    width: 100%;
  }

  &-empty {
    color: $light-color;
    font-weight: 300;
    font-size: 2rem;
    padding: 24px;
    opacity: 0;
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

    span {
      margin-right: 12px;
      font-weight: 700;
    }

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

  &-person {
    font-weight: 700;
    font-size: 20px;
    border-radius: $radius;
    transition: all $transition;
  }

  &-services {
    margin-top: 24px;
  }

  &-desc {
    margin-top: 12px;
  }

  &-delete {
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>