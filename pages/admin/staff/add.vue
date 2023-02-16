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
const cookieToken = useCookie<string>('token')
const servicesList = computed(() => store.services)
const person = ref<string>('')
const services = ref<string>('')
const desc = ref<string>('')
const worktime = ref<string[]>([])
const days = [
  {label: 'Понедельник', value: 'Пн'},
  {label: 'Вторник', value: 'Вт'},
  {label: 'Среда', value: 'Ср'},
  {label: 'Четверг', value: 'Чт'},
  {label: 'Пятница', value: 'Пт'},
  {label: 'Суббота', value: 'Сб'},
  {label: 'Воскресенье', value: 'Вс'},
]
const checkedForm = computed<boolean>(() => !(person.value.length > 0 && services.value.length > 0 && desc.value.length > 0))
const handler = async () => {
  if (worktime.value.length > 0) {
    worktime.value.sort((a, b) => days.findIndex(el => el.value === a) - days.findIndex(el => el.value === b))
  }
  await $fetch(`${store.apiLink}staff/add`, {
    method: 'POST',
    headers: {'Authorization': `Bearer ${cookieToken.value}`},
    body: {
      person: person.value.trim(),
      services: services.value.trim(),
      desc: desc.value.trim(),
      worktime: worktime.value
    }
  }).then((res) => {
    store.setNotify({text: res.msg, type: res.msgType, active: res.msgActive})
    store.getStaff()
    router.push('/admin')
  }).catch(e => console.log(e))
}
</script>

<template>
  <div class="admin">
    <PageTitle text="Добавить врача"/>
    <div class="admin-wrapper">
      <form class="form anim-item" @submit.prevent>
        <Field label="ФИО" v-model:value="person"/>
        <Selected label="Направление" v-model:value="services" :list="servicesList"/>
        <Field label="Описание" :text="true" v-model:value="desc"/>
        <CheckboxList label="Дни приема" v-model:value="worktime" :items="days"/>
        <div class="form-controls">
          <Btn class="success" text="Сохранить" :disabled="checkedForm" @click="handler"/>
          <Btn class="danger" text="Отменить" @click="router.push('/admin')"/>
        </div>
      </form>
    </div>
  </div>
</template>
