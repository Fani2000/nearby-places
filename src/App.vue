<script lang="ts">
import MainLayout from "./Layouts/MainLayout.vue";
export default {
  setup() {
    const msg: String = "Fani";
    return { msg };
  },
  components: { MainLayout },
};
</script>

<template>
  <MainLayout />
</template>
