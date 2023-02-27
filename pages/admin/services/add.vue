<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import Editor from "~/components/Editor.vue";
import Field from '@/components/forms/Field'
import PageTitle from '@/components/PageTitle'
import Files from "@/components/forms/Files";
import Btn from '@/components/controls/Btn'
import Add from '@/components/controls/Add'
import {useStore} from '@/store'

const router = useRouter()
const store = useStore()
const cookieToken = useCookie<string>('token')
const servicesList = computed(() => store.services)
const title = ref<string>('')
const img = ref<FormData>()
const services = ref([{service: '', price: ''}])
const content = ref('')
const {$translate} = useNuxtApp()
const checkedForm = computed<boolean>(() => !(title.value.length > 0 && img.value && (services.value.length > 0 && services.value[0].service.length > 0 && services.value[0].price.length > 0)))
const handler = async () => {
  const uploadFiles: string[] = []
  await $fetch(`${store.apiLink}upload`, {
    method: 'POST',
    headers: {'Authorization': `Bearer ${cookieToken.value}`},
    body: img.value
  }).then((res) => {
    if (res?.status === 200) {
      uploadFiles.push(...res.files)
    }
  }).catch(e => console.log(e))
  await $fetch(`${store.apiLink}services/add`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${cookieToken.value}`
    },
    body: {
      title: title.value.trim(),
      path: $translate(title.value.trim()),
      img: uploadFiles[0] || '',
      list: services.value,
      content: content.value
    }
  }).then((res) => {
    store.setNotify({text: res.msg, type: res.msgType, active: res.msgActive})
    store.getServices()
    router.push('/admin/services')
  }).catch(e => console.log(e))
}
</script>

<template>
  <div class="admin">
    <PageTitle text="Добавить услуги"/>
    <div class="admin-wrapper">
      <form class="form" @submit.prevent>
        <Field label="Название услуги" desc="Например: Терапевт" v-model:value="title"/>
        <Files label="Выбрать картинку" :multiple="false" v-model:value="img"/>
        <div class="title m-24">Добавить услуги</div>
        <div class="services-add field flex flex-gap align-items-center justify-content-between">
          <ul class="services-add-list">
            <Add class="add" @click="services.push({service: '', price:''})"/>
            <li class="services-add-item services-add-header">
              <div class="head">Название услуги</div>
              <div class="content price-rouble">Цена</div>
              <div class="delete"></div>
            </li>
            <li class="services-add-item services-add-rows" v-for="(item, idx) in services" :key="idx">
              <div class="head"><input type="text" v-model="services[idx].service" placeholder="Первичный прием"></div>
              <div class="content"><input type="text" v-model="services[idx].price" placeholder="10000"></div>
              <button class="delete" @click="services.splice(idx, 1);" :disabled="services.length <= 1">Удалить</button>
            </li>
          </ul>
        </div>
        <div class="title m-24">Добавить контент на страницу</div>
        <Editor class="editor" v-model:value="content"/>
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

.editor {
  margin: 24px 5px;
}

.services {
  &-add-list {
    position: relative;
    width: 100%;
    border: 2px solid $main-color-alt;
    border-radius: $radius;
    overflow: hidden;

    .add {
      position: absolute;
      z-index: 1;
      top: calc(100% - 40px);
      left: 10px;
      width: 32px;
      height: 32px;
    }
  }

  &-add-header {
    background-color: $light-color;

    .head,
    .content {
      font-weight: 700;
      font-size: 20px;
      padding: 12px;
    }
  }

  &-add-rows {
    .head,
    .content,
    .delete {
      height: 50px;
      border-left: 1px solid $main-color-alt;
      font-weight: 700;
    }
  }

  &-add-item {
    position: relative;
    display: flex;
    padding-left: 50px;

    .head,
    .content {
      input {
        height: 50px;
        padding: 12px;
        width: 100%;
        border: none;
      }
    }

    .head {
      width: 70%;
    }

    .content {
      font-weight: 700;
      width: 20%;
    }

    .delete {
      background-color: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10%;
      color: $danger;

      &:disabled {
        color: $light-color;
      }
    }
  }

  &-add-title {
    width: 70%;
  }

  &-add-price {
    width: 20%;
  }

  &-add-remove {
    top: 50%;
    transform: translateY(-50%);
  }
}

.services-add-item + .services-add-item {
  border-top: 1px solid $main-color-alt;
}
</style>
