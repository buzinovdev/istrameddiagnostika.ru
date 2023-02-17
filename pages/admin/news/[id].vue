<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import DateSelect from "~/components/forms/DateSelect.vue";
import Field from '~/components/forms/Field.vue'
import PageTitle from '~/components/PageTitle.vue'
import Files from "~/components/forms/Files.vue";
import Btn from '~/components/controls/Btn.vue'
import {useStore} from '~/store'

const router = useRouter()
const route = useRoute()
const store = useStore()
const cookieToken = useCookie<string>('token')
const news = computed(() => store.news.find(el => el._id === route.params.id))
onBeforeMount(()=>{
  console.log(news.value.dateStart.split('T').shift())
})
const img = ref<FormData>()
const {$translate} = useNuxtApp()
const checkedForm = computed<boolean>(() => !(news.value.title.length > 0))
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
  console.log(news.value.dateStart, new Date(news.value.dateStart))
  await $fetch(`${store.apiLink}news/update`, {
    method: 'POST',
    headers: {'Authorization': `Bearer ${cookieToken.value}`},
    body: {
      id: route.params.id,
      type: news.value.type.trim(),
      title: news.value.title.trim(),
      preview: news.value.preview.trim(),
      path: $translate(news.value.title.trim()),
      img: uploadFiles[0] || '',
      content: news.value.content,
      date: new Date(),
      dateStart: news.value.dateStart,
      dateEnd: news.value.dateEnd
    }
  }).then((res) => {
    store.setNotify({text: res.msg, type: res.msgType, active: res.msgActive})
    store.getNews()
    router.push('/admin/news')
  }).catch(e => console.log(e))
}
</script>

<template>
  <div class="admin">
    <PageTitle text="Добавить новость или акцию"/>
    <div class="admin-wrapper">
      <form class="form anim-item" @submit.prevent>
        <Field label="Заголовок" v-model:value="news.title"/>
        <div class="flex flex-gap field" v-if="news.type === 'promotion'">
          <DateSelect label="Дата начала акции" current v-model:value="news.dateStart"/>
          <DateSelect label="Дата конца акции" current v-model:value="news.dateEnd"/>
        </div>
        <Field label="Небольшое описание для превью" text v-model:value="news.preview"/>
        <Files label="Выбрать картинку" :multiple="false" v-model:value="img"/>
        <div class="title m-24">Добавить контент на страницу</div>
        <Editor class="editor" v-model:value="news.content"/>
        <div class="form-controls">
          <Btn class="success" text="Сохранить" :disabled="checkedForm" @click="handler"/>
          <Btn class="danger" text="Отменить" @click="router.push('/admin')"/>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "assets/styles/_variables.scss";

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
