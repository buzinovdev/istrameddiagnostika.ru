<template>
  <div class="field">
    <label for="email" class="label">{{ props.label }}</label>
    <input
        class="input"
        :id="id"
        :value="splitDate"
        type="date"
        :min="currentDate"
        @input="updateValue"
    />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:value'])
const props = defineProps({
  value: {type: String, default: ''},
  label: {type: String, default: ''},
  current: {type: Boolean, default: false}
})
const splitDate = computed((date: string) => {
  return props.value.includes('T') ? props.value.split('T').shift() : props.value
})
const id = ref<string>("input-" + Math.random())
const currentDate = computed(() => {
  let d = new Date()
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  let year = d.getFullYear()
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return props.current ? [year, month, day].join('-') : '1995-01-01'
})
const updateValue = (e: Event) => {
  emit('update:value', (e.target as HTMLInputElement).value)
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

</style>