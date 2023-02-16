<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import DateSelect from "~/components/forms/DateSelect.vue";
import Radio from "@/components/forms/Radio";
import Editor from "~/components/Editor.vue";
import Field from '~/components/forms/Field.vue'
import PageTitle from '~/components/PageTitle.vue'
import Files from "~/components/forms/Files.vue";
import Btn from '~/components/controls/Btn.vue'
import Add from '~/components/controls/Add.vue'
import {useStore} from '~/store'

const router = useRouter()
const store = useStore()
const cookieToken = useCookie<string>('token')
const radioList = [
  {label: 'Новость', value: 'news'},
  {label: 'Акция', value: 'promotion'}
]
const type = ref<string>(radioList[0].value)
const title = ref<string>('')
const preview = ref<string>('')
const img = ref<FormData>()
const dateStart = ref('')
const dateEnd = ref('')
const content = ref('')
const {$translate} = useNuxtApp()
const checkedForm = computed<boolean>(() => !(title.value.length > 0 && img.value))
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
  await $fetch(`${store.apiLink}news/add`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${cookieToken.value}`
    },
    body: {
      type: type.value.trim(),
      title: title.value.trim(),
      preview: preview.value.trim(),
      path: $translate(title.value.trim()),
      img: uploadFiles[0] || '',
      content: content.value,
      date: new Date(),
      dateStart: new Date(dateStart.value),
      dateEnd: new Date(dateEnd.value)
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
        <Radio label="Выберите тип записи" v-model:value="type" :items="radioList"/>
        <Field label="Заголовок" v-model:value="title"/>
        <div class="flex flex-gap field" v-if="type === 'promotion'">
          <DateSelect label="Дата начала акции" current v-model:value="dateStart"/>
          <DateSelect label="Дата конца акции" current v-model:value="dateEnd"/>
        </div>
        <Field label="Небольшое описание для превью" text v-model:value="preview"/>
        <Files label="Выбрать картинку" :multiple="false" v-model:value="img"/>
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
@import "assets/styles/_variables.scss";

.editor {
  margin: 24px 5px;
}

</style>

<style lang="scss">
@import "assets/styles/_variables.scss";

.result {
  h3 {
    font-size: 36px;
    font-weight: 900;
    margin-bottom: 24px;
    text-align: center;
    width: 100%;
  }

  h4 {
    font-size: 22px;
    font-weight: 900;
    margin-bottom: 24px;
    width: 100%;
  }

  ul {
    margin-top: 14px;
  }

  li {
    position: relative;
    padding-left: 25px;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 10px;
      height: 3px;
      border-radius: 2px;
      background: $bgg;
    }
  }

  li + li {
    margin-top: 12px;
  }

  p {
    display: block;
    text-indent: 40px;
  }

  p + p {
    margin-top: 14px;
  }
}
</style>