<template>
  <div class="editor" :class="{column: display === false}">
    <div class="editor-form">
      <div class="toolbar">
        <div class="toolbar-block">
          <button @click="bold" class="button" title="Выделить жирным">Ж</button>
          <button @click="italic" class="button" title="Сделать курсивом">
            <Icon name="fa6-solid:italic"/>
          </button>
          <button @click="underline" class="button" title="Сделать подчеркнутым">
            <Icon name="fa6-solid:underline"/>
          </button>
          <button @click="strike" class="button" title="Сделать перечеркнутым">
            <Icon name="fa6-solid:strikethrough"/>
          </button>
          <button @click="sup" class="button" title="Добавить верхний текст">
            <Icon name="fa6-solid:superscript"/>
          </button>
          <button @click="sub" class="button" title="Добавить нижний текст">
            <Icon name="fa6-solid:subscript"/>
          </button>
          <button @click="Ul" class="button" title="Добавить маркированный список">
            <Icon name="fa6-solid:list-ul"/>
          </button>
          <button @click="Ol" class="button" title="Добавить нумерованный список">
            <Icon name="fa6-solid:list-ol"/>
          </button>
        </div>
        <div class="toolbar-block">
          <button @click="left" class="button" title="Выравнить по левому краю">
            <Icon name="fa6-solid:align-left"/>
          </button>
          <button @click="center" class="button" title="Выравнить по центру">
            <Icon name="fa6-solid:align-center"/>
          </button>
          <button @click="right" class="button" title="Выравнить по правому краю">
            <Icon name="fa6-solid:align-right"/>
          </button>
          <button @click="justify" class="button" title="Выравнить по ширине">
            <Icon name="fa6-solid:align-justify"/>
          </button>
          <button @click="paragraph" class="button" title="Обернуть выделенный текст в абзац">Абзац</button>
          <button @click="heading3" class="button" title="Добавить заговок по центру">Заголовок 1</button>
          <button @click="heading4" class="button" title="Добавить подзаговок">Заголовок 2</button>
        </div>
        <button @click="horizontal" class="button" title="Добавить линию на весь экран">hr</button>
        <button @click="blockquote" class="button" title="Добавить кавычки">
          <Icon name="fa6-solid:quote-left"/>
        </button>
        <button @click="img" class="button" title="Добавить картинку по ссылке">
          <Icon name="fa6-solid:image"/>
        </button>
        <button @click="link" class="button" title="Добавить ссылку">
          <Icon name="fa6-solid:link"/>
        </button>
        <button @click="unlink" class="button" title="Удалить ссылку">
          <Icon name="fa6-solid:link-slash"/>
        </button>
        <button @click="html" class="button" title="Вставить HTML код">
          <Icon name="fa6-solid:code"/>
        </button>
        <button @click="text" class="button" title="Вставить текст из формы">Текст</button>
        <button @click="undo" class="button" title="Отменить">
          <Icon name="material-symbols:undo-rounded"/>
        </button>
        <button @click="redo" class="button" title="Вернуть">
          <Icon name="material-symbols:redo"/>
        </button>
        <button @click="display = !display" class="button">Отображать {{ display ? 'колонкой' : 'строкой' }}</button>
      </div>
      <div class="content" :contenteditable="contentEditable" @input="onInput" @paste="paste"
           v-html="innerValue || ''"></div>
    </div>
    <div class="editor-generator">
      <div class="generator" v-html="value"></div>
    </div>
  </div>
</template>

<script setup>
const contentEditable = ref(true)
const display = ref(true)
const props = defineProps({value: String})
const emit = defineEmits(['update:value'])
const innerValue = ref(props.value)
const onInput = (event) => {
  emit('update:value', event.target.innerHTML)
}

const bold = () => {
  document.execCommand('bold', false, null);
}
const italic = () => {
  document.execCommand('italic', false, null);
}
const underline = () => {
  document.execCommand('underline', false, null);
}
const strike = () => {
  document.execCommand('strikethrough', false, null);
}
const sup = () => {
  document.execCommand('superscript', false, null);
}
const sub = () => {
  document.execCommand('subscript', false, null);
}
const Ul = () => {
  document.execCommand('insertUnorderedList', false, null);
}
const Ol = () => {
  document.execCommand('insertOrderedList', false, null);
}
const paragraph = () => {
  document.execCommand('formatBlock', false, 'p');
}
const heading3 = () => {
  document.execCommand('formatBlock', false, 'h3');
}
const heading4 = () => {
  document.execCommand('formatBlock', false, 'h4');
}
const horizontal = () => {
  document.execCommand('insertHorizontalRule', false, null);
}
const blockquote = () => {
  document.execCommand('formatBlock', false, 'blockquote');
}
const img = () => {
  let url = prompt('Введите адрес изображения', 'https://snipp.ru/demo/526/image.jpg');
  document.execCommand('insertImage', false, url);
}
const link = () => {
  let url = prompt('Введите URL', '');
  document.execCommand('CreateLink', false, url);
}
const unlink = () => {
  document.execCommand('unlink', false, null);
}
const html = () => {
  let html = prompt('Введите HTML код', '');
  document.execCommand('insertHTML', false, html);
}
const text = () => {
  let text = prompt('Введите текст', '');
  document.execCommand('insertText', false, text);
}
const left = () => {
  document.execCommand('justifyLeft', false, null);
}
const center = () => {
  document.execCommand('justifyCenter', false, null);
}
const right = () => {
  document.execCommand('justifyRight', false, null);
}
const justify = () => {
  document.execCommand('justifyFull', false, null);
}
const undo = () => {
  document.execCommand('undo', false, null);
}
const redo = () => {
  document.execCommand('redo', false, null);
}
const selectAll = () => {
  document.execCommand('selectAll', false, null);
}
const paste = (event) => {
  event.preventDefault();
  let text = (event.originalEvent || event).clipboardData.getData('text/plain');
  document.execCommand("insertHTML", false, text);
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.editor {
  display: flex;
  gap: 24px;

  &-form {
    background: $bgg;
    border-radius: 12px;
  }

  &.column {
    flex-direction: column;
  }
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;

  &-block {
    display: flex;
    gap: 12px;
  }

  button {
    display: flex;
    border: none;
    padding: 12px 14px;
    font-size: 16px;
    font-weight: 700;
    border-radius: $radius;
    box-shadow: $shadow;
    background: $light-color;
    color: $main-color-alt;
    vertical-align: top;
    text-decoration: none;

    &:hover {
      color: $main-color-dark;
    }
  }

  select {
    display: inline-block;
    height: 28px;
    line-height: 28px;
    background: #fff;
    padding: 0;
    margin: 0 5px 10px 0;
    color: #000;
    box-shadow: 1px 1px 2px #ddd;
    border-radius: 3px;
    vertical-align: top;
    font-size: 12px;
  }

  input {
    display: inline-block;
    height: 28px;
    line-height: 28px;
    background: #fff;
    padding: 0;
    margin: 0 5px 10px 0;
    color: #000;
    box-shadow: 1px 1px 2px #ddd;
    border-radius: 3px;
    vertical-align: top;
    font-size: 12px;
  }

  span {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    padding: 0;
    margin: 0 0 10px 0;
    color: #000;
    vertical-align: top;
    font-size: 12px;
  }
}

small {
  display: block;
  margin: 0 5px 5px;
  color: white;
}

.content {
  min-height: 200px;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid $main-color-alt;
  padding: 14px;
  border-radius: 2px;
  background: #fff;
}
</style>