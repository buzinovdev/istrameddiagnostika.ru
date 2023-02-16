<template>
  <div class="dashboard">
    <PageTitle text="Панель управления"/>
    <div class="dashboard-inner">
      <div class="dashboard-block anim-item">
        <div class="dashboard-title">Услуги<span class="dashboard-counter">{{ services.length }}</span></div>
        <div class="dashboard-controls">
          <Link class="light" path="/admin/services" text="Перейти к списку"/>
        </div>
      </div>
      <div class="dashboard-block anim-item">
        <div class="dashboard-title">Врачи<span class="dashboard-counter">{{ staff.length }}</span></div>
        <div class="dashboard-controls">
          <Link class="light" path="/admin/staff" text="Перейти к списку"/>
        </div>
      </div>
      <div class="dashboard-block anim-item">
        <div class="dashboard-title">Новости и акции</div>
        <div class="dashboard-controls">
          <Link class="light" path="/admin/news" text="Редактировать"/>
        </div>
      </div>
      <div class="dashboard-block anim-item">
        <div class="dashboard-title">Реквизиты и контактные данные</div>
        <div class="dashboard-controls">
          <Link class="light" path="/admin/requisites" text="Редактировать"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
import Link from '@/components/controls/Link'
import {useStore} from "@/store";
const store = useStore()
const services = computed(() => store.services)
const staff = computed(() => store.staff)
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.dashboard {
  &-inner {
    padding: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }
  &-block {
    background-color: rgba(0, 0, 0, .5);
    padding: 24px;
    color: $light-color;
    background: $bgg;
    border-radius: $radius;
  }

  &-title {
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  &-counter {
    margin-left: 12px;
  }

  &-controls {
    a + a {
      margin-left: 14px;
    }
  }
}
</style>