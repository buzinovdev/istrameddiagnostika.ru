<script setup lang="ts">
import Phone from "@/components/forms/Phone";
import Field from '@/components/forms/Field'
import PageTitle from '@/components/PageTitle'
import Btn from '@/components/controls/Btn'
import PageLine from "@/components/PageLine";
import {useStore} from '@/store'

definePageMeta({
  middleware: 'auth'
})
const store = useStore()
const route = useRoute()
const router = useRouter()
const cookieToken = useCookie<string>('token')
const requisites = computed(() => store.requisites[0])
const checkedForm = computed<boolean>(() => {
  return !(requisites.value.address.length > 0
      && requisites.value.inn.length > 0
      && requisites.value.kpp.length > 0
      && requisites.value.ogrn.length > 0
      && requisites.value.okpo.length > 0
      && requisites.value.bank.length > 0
      && requisites.value.rs.length > 0
      && requisites.value.ks.length > 0
      && requisites.value.bik.length > 0
      && requisites.value.email.length > 0
      && requisites.value.phones.length > 0)
})
const handler = async () => {
  const data = requisites.value
  console.log(data)
  await $fetch(`${store.apiLink}requisites/update`, {
    method: 'POST',
    headers: {'Authorization': `Bearer ${cookieToken.value}`},
    body: {
      id: data._id,
      address: data.address.trim(),
      worktime: data.worktime.trim(),
      invitro: data.invitro.trim(),
      inn: data.inn.trim(),
      kpp: data.kpp.trim(),
      ogrn: data.ogrn.trim(),
      okpo: data.okpo.trim(),
      bank: data.bank.trim(),
      rs: data.rs.trim(),
      ks: data.ks.trim(),
      bik: data.bik.trim(),
      email: data.email.trim(),
      phones: data.phones,
      chiefDoc: data.gendir,
      chiefDocPhones: data.gendirPhones,
      chiefDocEmail: data.gendirEmail,
      gendir: data.gendir,
      gendirPhones: data.gendirPhones,
      gendirEmail: data.gendirEmail,
      glbuh: data.glbuh,
      glbuhPhones: data.glbuhPhones,
      glbuhEmail: data.glbuhEmail
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
    <PageTitle text="Редактировать реквизиты"/>
    <div class="admin-wrapper">
      <form class="form anim-item" @submit.prevent>
        <Field label="Юр. адрес" v-model:value="requisites.address"/>
        <div class="field flex flex-gap align-items-center justify-content-between">
          <Field label="Время работы" v-model:value="requisites.worktime"/>
          <Field label="Время приема анализов INVITRO" v-model:value="requisites.invitro"/>
        </div>
        <div class="field flex flex-gap align-items-center justify-content-between">
          <Field label="ИНН" v-model:value="requisites.inn"/>
          <Field label="КПП" v-model:value="requisites.kpp"/>
        </div>
        <div class="field flex flex-gap align-items-center justify-content-between">
          <Field label="ОГРН" v-model:value="requisites.ogrn"/>
          <Field label="ОКПО" v-model:value="requisites.okpo"/>
        </div>
        <div class="field flex flex-gap align-items-center justify-content-between">
          <Field label="Email" type="email" v-model:value="requisites.email"/>
          <Phone label="Первый телефон" v-model:value="requisites.phones[0]"/>
          <Phone label="Второй телефон" v-model:value="requisites.phones[1]"/>
        </div>
        <PageLine/>
        <Field label="Банк" v-model:value="requisites.bank"/>
        <div class="field flex flex-gap align-items-center justify-content-between">
          <Field label="Р/сч" v-model:value="requisites.rs"/>
          <Field label="К/сч" v-model:value="requisites.ks"/>
          <Field label="БИК" v-model:value="requisites.bik"/>
        </div>
        <PageLine/>
        <Field label="Главный врач" v-model:value="requisites.chiefDoc"/>
        <div class="field flex flex-gap align-items-center justify-content-between">
          <Phone label="Первый телефон" v-model:value="requisites.chiefDocPhones[0]"/>
          <Phone label="Второй телефон" v-model:value="requisites.chiefDocPhones[1]"/>
          <Field label="Email" type="email" v-model:value="requisites.chiefDocEmail"/>
        </div>
        <PageLine/>
        <Field label="Генеральный директор" v-model:value="requisites.gendir"/>
        <div class="field flex flex-gap align-items-center justify-content-between">
          <Phone label="Первый телефон" v-model:value="requisites.gendirPhones[0]"/>
          <Phone label="Второй телефон" v-model:value="requisites.gendirPhones[1]"/>
          <Field label="Email" type="email" v-model:value="requisites.gendirEmail"/>
        </div>
        <PageLine/>
        <Field label="Гл.бухгалтер" v-model:value="requisites.glbuh"/>
        <div class="field flex flex-gap align-items-center justify-content-between">
          <Phone label="Первый телефон" v-model:value="requisites.glbuhPhones[0]"/>
          <Phone label="Второй телефон" v-model:value="requisites.glbuhPhones[1]"/>
          <Field label="Email" type="email" v-model:value="requisites.glbuhEmail"/>
        </div>
        <div class="form-controls">
          <Btn class="success" text="Сохранить" :disabled="checkedForm" @click="handler"/>
          <Btn class="danger" text="Отменить" @click="router.push('/admin')"/>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
</style>