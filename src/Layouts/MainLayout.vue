<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> NearPOI! </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <Sidebar />
    </q-drawer>

    <q-page-container>
      <Map :coords="[lat, lng]" />
    </q-page-container>
  </q-layout>
</template>

<script>
import Map from "../components/Map.vue";
import Sidebar from "../components/Sidebar.vue";
import { ref } from "vue";

export default {
  components: { Map, Sidebar },
  setup() {
    const leftDrawerOpen = ref(false);

    const lat = 51.5,
      lng = -0.09;

    return {
      lat,
      lng,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
