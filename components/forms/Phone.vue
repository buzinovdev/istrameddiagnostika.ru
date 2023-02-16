<template>
  <div class="field">
    <label for="email" class="label">{{ label }}</label>
    <input
        class="input"
        :value="value"
        :id="id"
        type="tel"
        maxlength="18"
        @input="updateValue"
    >
    <small>Введите номер телефона (10 цифр, без 8)</small>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:value'])
defineProps({
  value: null,
  label: {type: String, default: ''}
})
const id = ref("input-" + Math.random())
const updateValue = (event) => {
  let phone = event.target.value
  if (phone.includes('+7')) phone = phone.split('+7').pop()
  if (phone.includes('+7 ')) phone = phone.split('+7 ').pop()
  let x = phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
  emit('update:value', !x[2] ? x[1] : '+7 (' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : ''))
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

</style>