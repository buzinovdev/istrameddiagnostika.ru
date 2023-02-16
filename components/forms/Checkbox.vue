<template>
  <div class="field">
    <label for="services" class="label">{{ label }}</label>
    <div class="field-checkbox-group">
      <label
          class="checkbox-label"
          :title="desc"
          @click.prevent="select(value)"
      >
        <input
            class="checkbox-input"
            type="checkbox"
            :name="name"
            :value="value"
            :checked="props.value"
        >
        <span class="checkbox-decor"></span>
        <span class="checkbox-text">{{desc }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:value'])
const props = defineProps({
  label: {type: String, default: ''},
  desc: {type: String, default: ''},
  value: {type: Boolean, default: false}
})
const name = "name-" + Math.random()
const select = (value) => {
  emit('update:value', !value)
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.checkbox {
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
    border: 2px solid $main-color-alt;
    border-radius: 4px;

    &::after {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      background-color: $main-color;
      border-radius: 2px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity $transition;
    }
  }
}

.checkbox-input:checked + .checkbox-decor::after {
  opacity: 1;
}
</style>