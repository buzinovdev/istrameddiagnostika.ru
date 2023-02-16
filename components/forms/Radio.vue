<template>
  <div class="field">
    <label for="services" class="label">{{ label }}</label>
    <div class="field-radio-group">
      <label
          class="radio-label"
          :title="item.label"
          v-for="(item, idx) in items" :key="idx"
          @click.prevent="select(idx,item.value)"
      >
        <input
            class="radio-input"
            type="radio"
            :name="name"
            :value="item.value"
            :checked="idx === selectId"
        >
        <span class="radio-decor"></span>
        <span class="radio-text">{{ item.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:value'])
const props = defineProps({
  items: {type: Array, default: []},
  label: {type: String, default: ''},
  value: {type: String, default: ''},
  checkedId: {type: Number, default: 0}
})
const name = "name-" + Math.random()
const selectId = ref(props.checkedId)
const select = (id,value) => {
  console.log(value)
  selectId.value = id
  emit('update:value', value)
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.radio {
  &-label {
    display: inline-block;
    position: relative;
    user-select: none;
    margin: 5px;
  }

  &-input {
    display: none;
  }

  &-text {
    display: inline-block;
    padding-left: 30px;
    cursor: pointer;
  }

  &-decor {
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    border: 2px solid $main-color;
    border-radius: 50%;

    &::after {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      background-color: $main-color;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity $transition;
    }
  }
}

.radio-input:checked + .radio-decor::after {
  opacity: 1;
}
</style>