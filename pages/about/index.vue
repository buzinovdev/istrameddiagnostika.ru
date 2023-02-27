<script setup lang="ts">
import ServicesSection from "@/components/section/Services";
import {useStore} from '@/store'
import Slider from "@/components/Slider.vue";

const store = useStore()
const {$translate} = useNuxtApp()
const hovered = ref<boolean>(false)
const services = computed(() => store.services)
const requisites = computed(() => store.requisites)
const sliderItem = computed(() => store.sliders.find(el=> el.name === 'about'))
useHead({
  "title": 'О медицинском центре "Диагностика и лечение"',
  "meta": [
    {
      "name": "description",
      "content": "Медицинский центр «Диагностика и лечение» работает в городе Истра с 1995 года. Узнайте больше о нас, услугах и наших специалистах."
    }
  ],
})
</script>

<template>
  <div class="page-main">
    <section class="section page-inner">
      <h1 class="title anim-item">Медицинский центр «Диагностика и лечение» в Истре</h1>
      <div class="company">
        <div class="item anim-item">
          <p>Медицинский центр «Диагностика и лечение» работает в городе Истра с 1995 года.</p>
        </div>
        <div class="item anim-item">
          <p>Мы предлагаем комплексные медицинские услуги своим пациентам. Наши высококвалифицированные специалисты из
            ведущих клиник и институтов г. Москвы (высшей, 1-ой категории, кандидаты и доктора медицинских наук)
            используют самые современные технологии и методы для диагностики и лечения заболеваний.</p>
        </div>
        <div class="item anim-item">
          <p>При необходимости, по результатам обследования, пациенты центра направляются в специализированные
            отделения, а так же на лечение в реабилитационные центы Подмосковья (по страховому полюсу ОМС).</p>
        </div>
        <div class="item anim-item">
          <p>Наш медицинский центр гарантирует, что вы получите высочайшее качество медицинской помощи. Мы ставим ваше
            здоровье и благополучие на первое место и наша цель - предложить вам персонализированные и эффективные
            решения.</p>
        </div>
        <div class="item anim-item">
          <p>Запишитесь на прием сегодня и сделайте первый шаг к хорошему здоровью и качественной медицинской
            помощи.</p>
        </div>
        <div class="item anim-item flex justify-content-center mt-2">
          <ControlsBtn text="Записаться на прием" @click="store.showRecordAction(true)">
            <Icon name="bi:calendar-plus-fill"/>
          </ControlsBtn>
        </div>
      </div>
    </section>
    <section class="contacts page-inner anim-item">
      <div class="contacts-wrap">
        <div class="contacts-block anim-item">
          <h3 class="contacts-title">Наш адрес</h3>
          <div class="flex align-items-center">
            <BootstrapIcon name="bi:geo-alt-fill"/>
            <Copy :content="requisites.address"/>
          </div>
        </div>
        <div class="contacts-block anim-item">
          <h3 class="contacts-title">Часы работы</h3>
          <div class="flex align-items-center">
            <BootstrapIcon name="bi:clock-fill"/>
            {{ requisites.worktime }}
          </div>
        </div>
        <div class="contacts-block anim-item">
          <h3 class="contacts-title">Прием анализов INVITRO</h3>
          <div class="flex align-items-center">
            <BootstrapIcon name="bi:clock-fill"/>
            {{ requisites.invitro }}
          </div>
        </div>
        <div class="contacts-block anim-item">
          <h3 class="contacts-title">Телефоны</h3>
          <div class="flex align-items-center">
            <BootstrapIcon name="bi:telephone-fill"/>
            <div class="phone">
              <CallNumber class="column" :phone="item" v-for="item in requisites.phones" :key="item"/>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Slider class="anim-item" :images="sliderItem.slides.sort((a,b)=> a.index - b.index)" path="/uploads/slider" max-width="740px" v-if="sliderItem"/>
    <section class="section page-inner">
      <h2 class="title anim-item">Современная диагностика – залог успешного лечения</h2>
      <div class="company">
        <div class="item anim-item">
          <p>Точный и вовремя поставленный диагноз позволяет назначить правильное лечение, что в свою очередь повышает
            шансы пациента на выздоровление. Современные технологии и оборудование нашего центра позволяют врачам с
            большей точностью, скоростью и эффективностью диагностировать широкий спектр заболеваний.</p>
        </div>
        <div class="item anim-item">
          <p>Важно, чтобы пациенты постоянно следили за состояние здоровья и предоставляли точную информацию
            о своих симптомах, медицинской истории и образе жизни своему лечащему врачу. Это необходимо для более
            точного установления диагноза. Кроме того, регулярные осмотры и профилактические меры, помогают раньше
            выявить потенциальные проблемы со здоровьем и позволяют проводить вылечится быстрее.</p>
        </div>
        <div class="item anim-item">
          <p>При проведении УЗИ – обследования (Аппарат E-CUBE-9), используется набор датчиков премиального уровня,
            изготовленных по монокристаллической биотехнологии (90% полезного действия). Это принципиально улучшает
            качество получаемого изображения, а соответственно и хорошую визуализацию на глубину внутренних органов, что
            позволяет получить более точные результаты обследования (особенно у крупных и тучных пациентов), повысить
            чувствительность в доплеровских режимах (кровоток) в конвексных секторных фазированных датчиках.</p>
        </div>
      </div>
    </section>
    <section class="license page-inner">
      <h2 class="title anim-item">Лицензии медицинского центра «Диагностика и лечение»</h2>
      <div class="license-list">
        <ControlsLinkFile class="anim-item" path="/documents/license.pdf" text="Лицензия"/>
      </div>
    </section>
    <ServicesSection/>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.section {
  .title {
    margin-bottom: 48px;
  }
}

.company {
  max-width: 1024px;
  margin: 0 auto;

  .item {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    text-indent: 40px;
  }

  .item + .item {
    margin-top: 10px;
  }

  p {
    text-align: justify;
  }
}

.contacts {
  &-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 24px;
  }

  &-block {
    max-width: 25%;
  }

  &-title {
    font-weight: 700;
    margin-bottom: 14px;
    font-size: 18px;
  }
}

.license {
  &-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

.services {
  &-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
  }

  &-empty {
    color: $light-color;
    font-weight: 300;
    font-size: 2rem;
    padding: 24px;
  }

  &-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(25% - 2px);
    opacity: 0;
    overflow: hidden;
    border-radius: 2px;
    transition: all $transition;
  }

  &-title,
  &-link {
    display: block;
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    padding: 12px 24px;
    font-weight: 700;
    box-shadow: $shadow;
    text-align: center;
    border-radius: $radius;
    transition: all $transition;
  }

  &-title {
    opacity: 1;
    letter-spacing: 1px;
    color: $light-color;
    background-color: $main-color-light;
    transform: translate(-50%, -50%);
  }

  &-link {
    opacity: 0;
    font-weight: 700;
    transform: translate(-50%, -120%);
    color: $dark-color;
    background-color: $light-color;
  }

  &-img {
    display: flex;
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
    }

    &:before {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0);
      backdrop-filter: blur(0px);
      transition: all $transition;
    }
  }
}

@media screen and (min-width: 1024px) {
  .services-item:not(.show):hover {
    .services-title {
      transform: translate(-50%, 120%);
      opacity: 0;
    }

    .services-link {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }
}

@media screen and (max-width: 1024px) {
  .services-item {
    width: calc(50% - 1px);
  }
  .contacts-block {
    max-width: 50%;
  }
  .contacts-wrap {
    justify-content: space-evenly;
  }
}

@media screen and (max-width: 767px) {
  .services-item {
    max-width: 100%;
  }
  .contacts-block {
    max-width: 100%;
  }
  .contacts-wrap {
    justify-content: flex-start;
  }
}
</style>