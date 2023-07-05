<template>
  <div class="q-pa-sm">
    <p class="text-h6 q-my-xs text-green">NearPOI</p>
    <q-separator />
    <p class="text-subtitle1 text-weight-bold q-my-sm text-center">
      Find the nearby places and also directions
    </p>
    <q-input
      dense
      @keypress.enter="searchMethod"
      v-model="searchTerm"
      placeholder="Restaurant"
      round
      outlined
    >
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <div class="q-my-sm" v-for="poi in pointsOfInterests" :key="poi.name">
      <Place :placeInformation="poi" />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch } from "vue";
import { useAppState } from "../store/appState";
import { pointsOfInterests as pointOfInterestsRes } from "../Utils/TomTomServicesApi";
import Place from "./Place.vue";

export default {
  setup() {
    const pointsOfInterests = ref([]);
    const searchTerm = ref("");
    const loading = ref(false);
    const appState = useAppState();

    const searchMethod = async () => {
      if (searchTerm.value.length <= 0) return;

      const poi = await pointOfInterestsRes.getPointsOfInterest(
        searchTerm.value,
        { lat: appState.myLocation.lat, lng: appState.myLocation.lon }
      );
      // console.log(poi)
      pointsOfInterests.value = poi;
    };
    return { pointsOfInterests, searchTerm, searchMethod };
  },
  components: { Place },
};
</script>
