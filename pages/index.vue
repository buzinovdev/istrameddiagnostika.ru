<template>
  <div class="page-main">
    <section class="top anim-item">
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
          <Btn class="light" text="Записаться на прием" @click="store.showRecordAction(true)">
            <Icon name="bi:calendar-plus-fill"/>
          </Btn>
        </div>
      </div>
    </section>
    <ServicesSection/>
  </div>
</template>

<script setup lang="ts">
import Btn from '@/components/controls/Btn'
import ServicesSection from "@/components/section/Services";
import {useStore} from '@/store'

const store = useStore()
useHead({
  "title": 'Медицинский центр "Диагностика и лечение" в городе Истра',
  "meta": [
    {
      "name": "description",
      "content": "Мы предлагаем комплексные медицинские услуги своим пациентам. Наши высококвалифицированные специалисты из ведущих клиник и институтов г. Москвы (высшей, 1-ой категории, кандидаты и доктора медицинских наук) используют самые современные технологии и методы для диагностики и лечения заболеваний."
    }
  ],
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

section {
  padding: 24px;
}

.top {
  background: $bgg;
  color: white;

  .title {
    margin-bottom: 48px;
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

@media screen and (max-width: 1023px) {
  .services-item {
    width: calc(50% - 1px);
  }
  .top .company p {
    text-align: left;
  }
}

@media screen and (max-width: 767px) {
  .services-item {
    width: 100%;
  }
}
</style>