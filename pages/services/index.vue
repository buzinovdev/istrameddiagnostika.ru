<script setup>
import ServicesSection from "@/components/section/Services";
useHead({
  "title": `Услиги медицинского центра "Диагностика и лечение"`,
  "meta": [
    {
      "name": "description",
      "content": 'Узнайте об услигах, предостовялемых в медицинском центре "Диагностика и лечение"'
    }
  ],
})
</script>

<template>
  <div class="page-services">
    <ServicesSection/>
  </div>
</template>

<style scoped>
.page-services {
  margin: 24px;
}
</style>