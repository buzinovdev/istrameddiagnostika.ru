<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import PageTitle from '@/components/PageTitle'
import Link from '@/components/controls/Link'
</script>

<template>
  <div class="dashboard">
    <PageTitle text="Панель управления"/>
    <div class="dashboard-inner">
      <div class="dashboard-block">
        <div class="dashboard-title">Слайдеры</div>
        <div class="dashboard-controls">
          <Link class="light" path="/admin/site/slider" text="Перейти"/>
        </div>
      </div>
    </div>
  </div>
</template>

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