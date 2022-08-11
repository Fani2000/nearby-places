<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleSidebar" />

        <q-toolbar-title> NearPOI! </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      behavior="mobile"
      show-if-above
      v-model="sidebar"
      side="left"
      bordered
    >
      <Sidebar />
    </q-drawer>

    <q-page-container>
      <Map />
    </q-page-container>
  </q-layout>
</template>

<script>
import Map from "../components/Map.vue";
import Sidebar from "../components/Sidebar.vue";
import { useAppState } from "../store/appState";
import { ref } from "vue";

export default {
  components: { Map, Sidebar },
  setup() {
    const appState = useAppState();
    const sidebar = ref(false);

    appState.$subscribe((state) => {
      console.log(state.events.target);
      sidebar.value = state.events.target.sideBar;
      // console.log(sidebar.value);
    });

    const toggleSidebar = () => {
      appState.toggleSidebar();
      // sidebar.value = appState.sideBar;
    };
    return {
      sidebar,
      toggleSidebar,
    };
  },
};
</script>
