<template>
  <div class="slider-container">
    <div class="slider" ref="sliderContainer">
      <div class="slides" :style="slideStyles">
        <div v-for="(image, index) in props.images" :key="index" class="slide"
             :class="{ 'active': index === currentSlide }">
          <img :src="`${props.path}/${image.img}`" :alt="image.description"/>
          <div class="slide-description" v-if="image.description">{{ image.description }}</div>
        </div>
      </div>
      <button class="prev" @click="prevSlide">
        <Icon name="bi:arrow-left-short"/>
      </button>
      <button class="next" @click="nextSlide">
        <Icon name="bi:arrow-right-short"/>
      </button>
    </div>
    <ul class="slider-dot">
      <li v-for="(image, index) in props.images" :key="index" @click="currentSlide=index"
          :class="{ 'active': index === currentSlide }"></li>
    </ul>
  </div>
</template>

<script setup>
import {onMounted} from "vue";

const props = defineProps({
  maxWidth: {type: String, default: '100%'},
  path: {type: String, default: ''},
  images: {type: Array, default: []}
})

const currentSlide = ref(0);
const slideStyles = computed(() => {
  return {
    transform: `translateX(-${currentSlide.value * 100}%)`
  }
});
const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? props.images.length - 1 : currentSlide.value - 1;
};
const nextSlide = () => {
  currentSlide.value = currentSlide.value === props.images.length - 1 ? 0 : currentSlide.value + 1;
};
const sliderContainer = ref(null)
const touchstartX = ref(0)
const touchendX = ref(0)
const checkDirection = () => {
  if (touchendX.value < touchstartX.value) nextSlide()
  if (touchendX.value > touchstartX.value) prevSlide()
}
onMounted(() => {
  const slider = sliderContainer.value
  slider.addEventListener('touchstart', e => {
    touchstartX.value = e.changedTouches[0].screenX
  })
  slider.addEventListener('touchend', e => {
    touchendX.value = e.changedTouches[0].screenX
    checkDirection()
  })
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.slider-container {
  max-width: v-bind(maxWidth);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.slider {
  position: relative;
  overflow: hidden;
}

.slider-dot {
  margin-top: 14px;
  display: flex;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 20px;
    height: 20px;
    background: $bgg;
    margin: 0 5px;
    border-radius: $radius;

    &:before {
      content: '';
      background: white;
      width: 16px;
      height: 16px;
      border-radius: $radius;
    }

    &.active:before {
      content: '';
      background: transparent;
    }
  }
}

.slides {
  display: flex;
  align-items: center;
  background: $light-color;
  border-radius: $radius;
  transition: transform 0.5s ease-in-out;
}

.slide {
  display: flex;
  flex: 0 0 100%;
  position: relative;
  opacity: 0;
  overflow: hidden;
  border-radius: $radius;
  transition: opacity 0.5s ease-in-out;

  &.active {
    opacity: 1;

    .slide-description {
      opacity: 1;
      visibility: visible;
      transform: translateY(0%);
    }
  }

  img {
    border-radius: inherit;
    width: 100%;
    height: auto;
  }

  &-description {
    position: absolute;
    z-index: 10;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.8);
    color: white;
    padding: 14px 24px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(50%);
    transition: all .3s .5s ease-in-out;
  }
}

.prev,
.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  padding: 5px;
  color: white;
  background: $bgg;
  border: none;
  box-shadow: $shadow;
  border-radius: 50%;
  cursor: pointer;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

@media screen and (min-width: 1024px) {
  .slider-dot {
    display: none;
  }
}

@media screen and (max-width: 740px) {
  .slide,
  .slides {
    border-radius: 0;
  }
  .prev,
  .next {
    display: none;
  }
}
</style>
