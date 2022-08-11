import { createApp } from "vue";
import { Quasar } from "quasar";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import "leaflet.polyline.snakeanim";

// Import icon libraries
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";

import "quasar/src/css/index.sass";
import store from "./store";

import App from "./App.vue";

const app = createApp(App);

app.use(store);

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});
app.mount("#app");
