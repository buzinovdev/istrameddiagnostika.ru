<script setup lang="ts">
import Field from '~/components/forms/Field'
import Btn from '@/components/controls/Btn'

import {useStore} from '@/store'

const store = useStore()
const email = ref<string>('')
const cookie = useCookie('mailing', {default: () => (true)})
const show = ref<boolean>(false)
const requisites = computed(() => store.requisites)
onBeforeMount(() => {
  setTimeout(() => {
    show.value = cookie.value
  }, 100)
})
const close = () => {
  cookie.value = false
  show.value = false
}
const sendMessage = async () => {
  await $fetch(`${store.apiLink}mailer/mailing`, {
    method: 'POST',
    body: {
      subject: 'Подтверждение рассылки',
      email: email.value.trim(),
      phones: requisites.value.phones,
      worktime: requisites.value.worktime,
    }
  }).then((res) => {
    email.value = ''
    store.setNotify({text: res.msg, type: res.msgType, active: res.msgActive})
  }).catch(e => console.log(e))
}
const checkedForm = computed<boolean>(() => {
  return !(email.value.length > 0)
})
const confirmMailing = async () => {
  await $fetch(`${store.apiLink}stats/mailing`, {
    method: 'POST',
    body: {
      email: email.value.trim(),
      date: new Date()
    }
  }).then((res) => {
    sendMessage()
    close()
  }).catch(e => console.log(e))
}
</script>

<template>
  <div class="mailing" :class="{show}">
    <button class="mailing-close" @click="close">
      <Icon name="bi:x"/>
    </button>
    <div class="mailing-title">Хотите получать новости?</div>
    <div class="mailing-description">
      Подпишитесь на рассылку и станьте одним из первых, кто будет вкурсе всех новостей и акций
    </div>
    <form class="form" @submit.prevent>
      <Field class="light" type="email" placeholder="Ваш email адрес" v-model:value="email"/>
      <Btn class="light" text="Подписаться" :disabled="checkedForm" @click="confirmMailing"/>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.mailing {
  position: fixed;
  right: 25px;
  bottom: 25px;
  z-index: 10;
  opacity: 0;
  max-width: 480px;
  visibility: hidden;
  background: $bgg;
  color: white;
  border-radius: $radius;
  padding: 24px;
  box-shadow: $shadow;
  transform: translateY(150%);
  transition: all 1s ease-in-out;

  &.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0%);
  }

  &-close {
    display: flex;
    border: none;
    background-color: transparent;
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 10px;
    font-size: 24px;
    color: $light-color;
  }

  &-title {
    font-weight: 900;
    font-size: 32px;
    margin-bottom: 23px;
  }

  &-description {
    font-weight: 300;
    margin-bottom: 24px;
  }

  &-form {

  }

  .form {
    width: 100%;
  }
}

@media screen and (max-width: 1024px) {
  .mailing {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0;
  }
}
</style>