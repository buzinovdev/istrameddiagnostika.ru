<template>
  <div class="field">
    <label for="email" class="label">{{label}}</label>
    <input
        class="input"
        :value="value"
        :id="id"
        :type="type"
        :placeholder="placeholder"
        @input="updateValue"
        v-if="text === false"
    >
    <textarea
        class="input input-message"
        type="textarea"
        :id="id"
        :value="value"
        :placeholder="placeholder"
        @input="updateValue"
        v-else
    ></textarea>
    <small v-if="desc.length > 0">{{ desc }}</small>
<!--    <small v-if="type === 'email'">Например: qwerty@mail.ru</small>-->

  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:value'])
defineProps({
  value: null,
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  text: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  }
})
const id = ref<string>("input-" + Math.random())
const updateValue = (e: Event) => {
  emit('update:value', (e.target as HTMLInputElement).value)
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

</style>