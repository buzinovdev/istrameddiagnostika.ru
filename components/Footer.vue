<script setup>
import Btn from '@/components/controls/Btn'
import LinkFile from '@/components/controls/LinkFile'
import BootstrapIcon from "@/components/BootstrapIcon";
import CallNumber from "@/components/CallNumber";
import Copy from "@/components/Copy";
import {useStore} from '@/store'
import SocialList from "@/components/social/List";
const store = useStore()
const nav = computed(() => store.footerNavigation)
const requisites = computed(() => store.requisites)
</script>

<template>
  <footer class="footer">
    <div class="footer-inner container container-0 flex">
      <div class="footer-content flex flex-wrap justify-content-between">
        <div class="footer-item">
          <div class="footer-item-title">Медицинский центр</div>
          <NuxtLink
              class="footer-item-link"
              :to="item.path"
              v-for="(item,idx) in nav"
              :key="idx"
          >{{ item.title }}
          </NuxtLink>
          <LinkFile class="footer-link" path="/documents/license.pdf" text="Лицензия"/>
        </div>
        <div class="footer-item">
          <div class="footer-item-box">
            <div class="footer-item-title">Часы работы</div>
            <div class="worktime">{{ requisites.worktime }}</div>
          </div>
          <div class="footer-item-box">
            <div class="footer-item-title">Прием анализов INVITRO</div>
            <div class="worktime">{{ requisites.invitro }}</div>
          </div>
          <Btn class="footer-link" text="Записаться на прием" @click="store.showRecordAction(true)">
            <Icon name="bi:calendar-plus-fill"/>
          </Btn>
        </div>
        <div class="footer-item">
          <div class="footer-item-title">Контакты</div>
          <div class="contacts flex align-items-center">
            <BootstrapIcon name="bi:telephone-fill"/>
            <div class="phone">
              <CallNumber class="column" :phone="item" v-for="item in requisites.phones" :key="item"/>
            </div>
            <SocialList />
          </div>
          <div class="address flex align-items-center justify-content-center">
            <BootstrapIcon name="bi:geo-alt-fill"/>
            <Copy :content="requisites.address"/>
          </div>
        </div>
      </div>
      <div class="footer-map">
        <div class="footer-map-wrapper" style="position:relative;overflow:hidden;"><a
            href="https://yandex.ru/maps/org/diagnostika_i_lecheniye/1128930660/?utm_medium=mapframe&utm_source=maps"
            style="color:#eee;font-size:12px;position:absolute;top:0px;">Диагностика и лечение</a><a
            href="https://yandex.ru/maps/10731/istra/category/medical_center_clinic/184106108/?utm_medium=mapframe&utm_source=maps"
            style="color:#eee;font-size:12px;position:absolute;top:14px;">Медцентр, клиника в Истре</a><a
            href="https://yandex.ru/maps/10731/istra/category/medical_lab/184106078/?utm_medium=mapframe&utm_source=maps"
            style="color:#eee;font-size:12px;position:absolute;top:28px;">Медицинская лаборатория в Истре</a>
          <iframe
              class="footer-map-frame"
              src="https://yandex.ru/map-widget/v1/?ll=36.861923%2C55.905966&mode=search&oid=1128930660&ol=biz&z=16.14"
              frameborder="1" allowfullscreen="true" style="position:relative;"></iframe>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <a href="https://buzinov.dev/" target="_blank">Buzinov.dev - разработка сайтов</a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.footer {
  border-top: 1px solid $main-color-alt;

  &-content,
  &-map {
    box-sizing: border-box;
    min-height: 360px;
  }

  &-content {
    width: 44%;
    padding: 24px;
    gap: 24px;
  }

  &-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-width: 320px;
  }

  &-item-title {
    margin-bottom: 12px;
    font-weight: 700;
    font-size: 18px;
  }

  &-item-link {
    transition: color $transition;

    & + & {
      margin-top: 6px;
    }

    &:hover {
      color: $main-color-alt;
    }
  }

  &-item-box {
    & + & {
      margin-top: 24px;
    }
  }

  &-link {
    margin-top: 24px;
  }

  .address {
    margin-top: 14px;
  }

  &-map {
    width: 56%;
    background-color: $light-color;
  }

  &-map-wrapper {
    display: flex;
  }

  &-map-frame {
    width: 100%;
    height: 360px;
    border: none;
  }

  &-bottom {
    background-color: $main-color-dark;
    padding: 24px;
    color: white;
  }
}

@media screen and (max-width: 1024px) {
  .footer {
    &-inner {
      flex-direction: column;
    }

    &-content,
    &-map {
      width: 100%;
    }

    &-content {
      gap: 24px;
    }
  }
}
</style>