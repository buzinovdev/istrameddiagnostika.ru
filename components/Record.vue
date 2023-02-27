<script setup lang="ts">
import Field from '~/components/forms/Field'
import DateSelect from '~/components/forms/DateSelect.vue'
import Selected from '~/components/forms/Selected'
import Checkbox from '@/components/forms/Checkbox'
import Btn from '@/components/controls/Btn'
import Close from "@/components/controls/Close";
import Phone from "@/components/forms/Phone";
import {useStore} from '@/store'

const store = useStore()
const show = computed(() => store.isShowRecord)
const name = ref<string>('')
const email = ref<string>('')
const phone = ref<string>('')
const date = ref('')
const services = ref<string>('Невролог')
const confirm = ref(false)
const servicesList = computed(() => store.servicesList)
const checkedForm = computed<boolean>(() => {
  return !(name.value.length > 0 && phone.value.length > 0 && date.value.length > 0 && confirm.value)
})
const sendMessage = async () => {
  await $fetch(`${store.apiLink}mailer/contact`, {
    method: 'POST',
    body: {
      subject: 'Запись на прием',
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value,
      date: date.value.split('-').reverse().join('.'),
      services: services.value
    }
  }).then((res) => {
    store.showRecordAction(false)
    name.value = ''
    email.value = ''
    phone.value = ''
    services.value = ''
    date.value = ''
    confirm.value = false
    store.setNotify({text: res.msg, type: res.msgType, active: res.msgActive})
  }).catch(e => console.log(e))
}
</script>

<template>
  <div class="record" :class="{show}">
    <div class="record-form">
      <div class="title">Запись на прием</div>
      <Close @click="store.showRecordAction(false)"/>
      <form class="form" @submit.prevent>
        <Field label="Ваше имя" v-model:value="name"/>
        <Field label="Email" type="email" v-model:value="email"/>
        <Phone label="Телефон" type="phone" v-model:value="phone"/>
        <DateSelect label="Предпочитаемая дата" current v-model:value="date"/>
        <Selected label="Выберите услугу" v-model:value="services" :list="servicesList"/>
        <Checkbox v-model:value="confirm" desc="Я согласен (-на) на обработку моих персональных данных"/>
          <NuxtLink class="personal-information" to="/personal-information" @click="store.showRecordAction(false)">
            Политика обработки и защиты персональных данных
          </NuxtLink>
        <Btn text="Записаться" :disabled="checkedForm" @click="sendMessage"/>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.record {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background: $bg-menu;
  opacity: 0;
  visibility: hidden;
  transition: all $transition;

  &.show {
    opacity: 1;
    visibility: visible;
  }

  .close-btn {
    top: 24px;
  }

  &-form {
    position: relative;
    width: 60%;
    margin: 0 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: $radius;
    padding: 24px;
  }

  .form {
    width: 100%;
  }
}
.personal-information {
  display: block;
  margin-top: 5px;
  text-align: center;
  color: $main-color-alt;
}
@media screen and (min-width: 1024px) {

}

@media screen and (max-width: 1024px) {
  .record-form {
    width: 100%;

    .title {
      padding: 0 42px;
      text-align: left;
    }

    .form .input {
      padding: 8px 12px;
    }
  }
}

@media screen and (max-width: 420px) {
  .record-form {
    width: 100%;
    margin: 0;
    border-radius: 0;

    .title {
      padding: 0 42px;
      font-size: 24px;
    }

    .form .input {
      padding: 8px 12px;
    }
  }
}
</style>