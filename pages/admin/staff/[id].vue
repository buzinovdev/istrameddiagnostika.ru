<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import Field from '~/components/forms/Field'
import PageTitle from '~/components/PageTitle'
import CheckboxList from '~/components/forms/CheckboxList'
import Selected from '~/components/forms/Selected'
import Btn from '~/components/controls/Btn'
import {useStore} from '@/store'

const router = useRouter()
const store = useStore()
const route = useRoute()
const cookieToken = useCookie<string>('token')
const staff = computed(() => store.staff?.find(el => el._id === route.params.id))
const servicesList = computed(() => store.services)
const days = [
  {label: 'Понедельник', value: 'Пн'},
  {label: 'Вторник', value: 'Вт'},
  {label: 'Среда', value: 'Ср'},
  {label: 'Четверг', value: 'Чт'},
  {label: 'Пятница', value: 'Пт'},
  {label: 'Суббота', value: 'Сб'},
  {label: 'Воскресенье', value: 'Вс'},
]
const checkedForm = computed<boolean>(() => !(staff.value.person.length > 0 && staff.value.services.length > 0 && staff.value.desc.length > 0))
const handler = async () => {
  await $fetch(`${store.apiLink}staff/update`, {
    method: 'POST',
    headers: {'Authorization': `Bearer ${cookieToken.value}`},
    body: {
      id: route.params.id,
      person: staff.value.person.trim(),
      services: staff.value.services.trim(),
      desc: staff.value.desc.trim(),
      worktime: staff.value.worktime
    }
  }).then((res) => {
    store.setNotify({text: res.msg, type: res.msgType, active: res.msgActive})
    store.getStaff()
    router.push('/admin/staff')
  }).catch(e => console.log(e))
}
</script>

<template>
  <div class="admin">
    <PageTitle text="Редактировать врача"/>
    <div class="admin-wrapper">
      <form class="form" @submit.prevent>
        <Field label="ФИО" v-model:value="staff.person"/>
        <Selected label="Направление" v-model:value="staff.services" :placeholder="staff.services"
                  :list="servicesList"/>
        <Field label="Описание" :text="true" v-model:value="staff.desc"/>
        <CheckboxList label="Дни приема" v-model:value="staff.worktime" :items="days"/>
        <div class="form-controls">
          <Btn class="success" text="Сохранить" :disabled="checkedForm" @click="handler"/>
          <Btn class="danger" text="Отменить" @click="router.push('/admin')"/>
        </div>
      </form>
    </div>
  </div>
</template>