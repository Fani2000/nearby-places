<template>
  <p>Sidebar</p>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { PointsOfInterest } from "../Utils/TomTomServicesApi";

export default {
  setup() {
    onMounted(() => {
      const pointsOfInterest = new PointsOfInterest();
    });
  },
};
</script>
