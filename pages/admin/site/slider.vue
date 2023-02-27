<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import PageTitle from '@/components/PageTitle'
import Btn from '@/components/controls/Btn'
import Selected from '~/components/forms/Selected'
import {useStore} from '@/store'

const router = useRouter()
const store = useStore()
const cookieToken = useCookie<string>('token')
const sliderName = ref<string>('')
const sliderList = store.sliders
const slideList = ref([]) // список слайдов
const sliderSelected = computed(() => {
  if (sliderName.value.length === 0) return {}
  const slider = sliderList.find(el => el.title === sliderName.value)
  slider.slides.map(item => urlToObject(item))
  return slider
})
const urlToObject = async (item) => {
  const response = await fetch(`../../uploads/slider/${item.img}`);
  const blob = await response.blob();
  const file = new File([blob], item.img, {type: blob.type});
  slideList.value.push({index: item.index, img: item.img, description: item.description, file})
}
const renderFile = (file) => {
  return URL.createObjectURL(file)
}
const handleFileSelection = (e: Event) => {
  const formData = new FormData();
  const uploadedFiles: any = (e.target as HTMLInputElement).files;
  for (let i = 0; i < uploadedFiles.length; i++) {
    slideList.value.push({
      index: slideList.value.length,
      img: uploadedFiles[i].name,
      description: '',
      file: uploadedFiles[i]
    })
  }
}
const removeFile = (fileKey: number) => {
  slideList.value.splice(fileKey, 1).map((item, index) => item.index = index)
}
const startDragIndex = ref()
const onDrop = (toIndex) => {
  let fromIndex = startDragIndex.value
  let element = slideList.value[fromIndex];
  slideList.value.splice(fromIndex, 1);
  element.index = toIndex
  slideList.value.splice(toIndex, 0, element);
  slideList.value.map((item, index) => item.index = index)
}
const {$translate} = useNuxtApp()
const checkedForm = computed<boolean>(() => !(sliderName.value.length > 0 && slideList.value.length > 0))
const handler = async () => {
  const formData = new FormData();
  for (let i = 0; i < slideList.value.length; i++) {
    formData.append('images[' + i + ']', slideList.value[i].file);
  }
  const uploadFiles = []
  await $fetch(`${store.apiLink}upload`, {
    method: 'POST',
    headers: {'Authorization': `Bearer ${cookieToken.value}`},
    body: formData
  }).then((res) => {
    if (res?.status === 200) {
      uploadFiles.push(...res.files)
    }
  }).catch(e => console.log(e))
  await $fetch(`${store.apiLink}site/updateSlider`, {
    method: 'POST',
    headers: {'Authorization': `Bearer ${cookieToken.value}`},
    body: {
      title: sliderName.value.trim(),
      slideList: slideList.value.reverse()
    }
  }).then((res) => {
    store.setNotify({text: res.msg, type: res.msgType, active: res.msgActive})
    store.getSliders()
    router.push('/admin')
  }).catch(e => console.log(e))
}
</script>

<template>
  <div class="admin">
    <PageTitle text="Редактирование слайдера"/>
    <div class="admin-wrapper">
      <form class="form" @submit.prevent>
        <Selected label="Выберите cлайдер" v-model:value="sliderName" :list="sliderList"/>
      </form>
      <div class="file-wrapper" v-if="Object.keys(sliderSelected).length > 0">
        <div class="title m-24">Слайды</div>
        <form class="form form-files" @submit.prevent>
          <div class="file-container">
            <div class="file-box">
              <input class="file" id="image" type="file" name="avatar" multiple="true" @change="handleFileSelection"/>
              Выберите или перетащите файлы
            </div>
            <ul class="file-list">
              <li class="file-item"
                  v-for="(item,idx) in slideList.sort((a,b)=> a.index - b.index)"
                  draggable="true"
                  @dragstart="startDragIndex = item.index"
                  @drop="onDrop(item.index)"
                  @dragover.prevent
                  @dragenter.prevent
              >
                <div class="file-drag" title="Перетащить">
                  <Icon name="bi:list"/>
                </div>
                <img class="file-render" :src="renderFile(item.file)">
                <div class="file-description field">
                  <label for="email" class="label">Описание cлайда</label>
                  <textarea class="input input-message" v-model="item.description"></textarea>
                </div>
                <button class="file-remove" @click="removeFile(idx)">
                  <Icon name="bi:x"/>
                </button>
              </li>
            </ul>
          </div>
        </form>
        <div class="flex flex-gap mt-2">
          <Btn class="success" text="Сохранить" :disabled="checkedForm" @click="handler"/>
          <Btn class="danger" text="Отменить" @click="router.push('/admin')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.slide {
  &-list {
    width: 100%;
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }

  &-item {
    max-width: 320px;
    background: $bg-menu;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-img {
    width: 100%;
  }
}

.file {
  &-wrapper {
    width: 100%;
  }

  &-container {
    border-radius: $radius;
    padding: 12px;
    background: $bg-menu;
  }

  &-box {
    text-align: center;
    position: relative;
    overflow: hidden;
    color: $light-color;
    font-size: 16px;
    padding: 24px 12px;
    font-weight: 700;
    border-radius: $radius;
    background-color: hsla(0, 0%, 100%, 0.4);

    input {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      opacity: 0.0;
      filter: alpha(opacity=0);
      font-size: 300px;
      height: 200px;
    }
  }

  &-list {
    margin-top: 1rem;
  }

  &-item {
    display: flex;
    align-items: center;
    gap: 14px;
    color: $light-color;
    font-size: 16px;

    & + & {
      padding: 12px 0;
    }
  }

  &-drag {
    font-size: 24px;
    cursor: move;
  }

  &-render {
    max-width: 320px;
    border-radius: $radius;
  }

  &-description {
    height: 100%;
  }

  &-remove {
    position: relative;
    font-size: 30px;
    display: flex;
    color: white;
    border-radius: 50%;
    background-color: $danger;
    border: none;
    margin-left: 14px;
  }
}

.form .input-message {
  min-height: 178px;
  border: none;
  resize: none;
}
</style>
