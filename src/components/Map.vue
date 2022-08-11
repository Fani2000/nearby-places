<template>
  <q-page id="map"> hello </q-page>
</template>

<script lang="ts">
import { onMounted, ref, watch } from "vue";
import { CalculateRoutePoints } from "../Utils/TomTomServicesApi";

interface Coordinate {
  lat: Number;
  lng: Number;
}

export default {
  props: ["coords"],
  setup(props) {
    let map;
    let point1: Coordinate = { lat: 52.50931, lng: 13.42936 };
    let point2: Coordinate = { lat: 52.50274, lng: 13.43872 };
    let routeData: [Object] = ref([]);

    const getData = async () => {
      const routePoint = new CalculateRoutePoints(point1, point2);
      const data = await routePoint.getRoutePoints();
      // return data;
      if (data.error) return;

      data.map((dt) => {
        // console.log(dt);
        const formattedPoints = [];
        dt.legs[0].points.map((p) => {
          formattedPoints.push([p.latitude, p.longitude]);
        });
        routeData.value = [...routeData.value, formattedPoints];
      });
    };

    onMounted(() => {
      map = L.map("map").setView([point1.lat, point1.lng], 19);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map);

      L.marker([point1.lat, point1.lng]).addTo(map);
      L.marker([point2.lat, point2.lng]).addTo(map);

      setTimeout(() => {
        getData();
      }, 3000);

      // console.log(map);
    });

    watch(routeData, (route) => {
      console.log(route);
      const line = L.polyline(route, {
        color: "orange",
        snakingSpeed: 200,
      });
      map.fitBounds(line.getBounds());

      line.addTo(map).snakeIn();

      // line.on("snakestart", (e) => {
      //   console.log("Hello");
      // });

      // line.on("snakestart snake snakeend", function (ev) {
      //   console.log(ev);
      // });
    });

    const message: String = "LeaftLet";
    return { message, map };
  },
};
</script>
