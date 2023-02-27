<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import Field from '@/components/forms/Field'
import PageTitle from '@/components/PageTitle'
import Files from "@/components/forms/Files";
import Btn from '@/components/controls/Btn'
import Add from '@/components/controls/Add'
import {useStore} from '@/store'

const router = useRouter()
const route = useRoute()
const store = useStore()
const cookieToken = useCookie<string>('token')
const service = computed(() => store.services.find(el => el.path === route.params.slug))
const img = ref<FormData>()
const {$translate} = useNuxtApp()
const checkedForm = computed<boolean>(() => !(service.value.title.length > 0 && (service.value.list.length > 0 && service.value.list[0].service.length > 0 && service.value.list[0].price.length > 0)))
const handler = async () => {
  const uploadFiles: string[] = []
  if (img.value) {
    await $fetch(`${store.apiLink}upload`, {
      method: 'POST',
      headers: {'Authorization': `Bearer ${cookieToken.value}`},
      body: img.value
    }).then((res) => {
      if (res?.status === 200) {
        uploadFiles.push(...res.files)
      }
    }).catch(e => console.log(e))
  }
  await $fetch(`${store.apiLink}services/update`, {
    method: 'POST',
    headers: {'Authorization': `Bearer ${cookieToken.value}`},
    body: {
      id: service.value._id,
      title: service.value.title.trim(),
      path: $translate(service.value.title.trim()),
      img: uploadFiles[0] || '',
      list: service.value.list,
      content: service.value.content
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
    <PageTitle text="Редактировать услугу"/>
    <div class="admin-wrapper">
      <form class="form" @submit.prevent>
        <Field label="Название услуги" desc="Например: Терапевт" v-model:value="service.title"/>
        <Files label="Выбрать новую картинку" :multiple="false" v-model:value="img"/>
        <div class="title m-24">Добавить услуги</div>
        <div class="services-add field flex flex-gap align-items-center justify-content-between">
          <ul class="services-add-list">
            <Add class="add" @click="service.list.push({service: '', price:''})"/>
            <li class="services-add-item services-add-header">
              <div class="head">Название услуги</div>
              <div class="content price-rouble">Цена</div>
              <div class="delete"></div>
            </li>
            <li class="services-add-item services-add-rows" v-for="(item, idx) in service.list" :key="idx">
              <div class="head"><input type="text" v-model="service.list[idx].service" placeholder="Первичный прием">
              </div>
              <div class="content"><input type="text" v-model="service.list[idx].price" placeholder="10000"></div>
              <button class="delete" @click="service.list.splice(idx, 1);" :disabled="service.list.length <= 1">Удалить
              </button>
            </li>
          </ul>
        </div>
        <div class="title m-24">Добавить контент на страницу</div>
        <Editor class="editor" v-model:value="service.content"/>
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

.editor {
  margin: 24px 5px 0;
}

.services-add-item + .services-add-item {
  border-top: 1px solid $main-color-alt;
}
</style>
