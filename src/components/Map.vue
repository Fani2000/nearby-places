<template>
  <q-page id="map"> hello </q-page>
</template>

<script lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useAppState } from "../store/appState";
import { calculateRoute } from "../Utils/TomTomServicesApi";

interface Coordinate {
  lat: Number;
  lon: Number;
}

export default {
  setup() {
    let map: any | null = null;
    let routeData: any = ref([]);
    const appState = useAppState();

    const geoLocationPromise = () => {
      return new Promise((res, rej) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(res, rej);
        }
      });
    };

    const getCurrentLocation = async () => {
      let lat = 0,
        lon = 0,
        timestamp = 0,
        error = "";
      try {
        const res: any = await geoLocationPromise();
        lat = res.coords.latitude;
        lon = res.coords.longitude;
        timestamp = res.timestamp;
        appState.addCurrentLocation({ lat, lon });
      } catch (err: any) {
        error = err.message;
      }

      return { lat, lon, timestamp, error };
    };

    onMounted(async () => {
      const { lat, lon, error, timestamp } = await getCurrentLocation();

      if (error) {
        alert(error);
        return;
      }

      map = L.map("map").setView([lat, lon], 19);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map);

      L.marker([lat, lon])
        .addTo(map)
        .bindPopup(L.popup({ autoClose: false }))
        .setPopupContent("Your Current Location")
        .openPopup();
    });

    const _destination = computed(() => appState.destination);
    watch(_destination, (newVal) => {
      console.log("DESTINATION CHANGED", newVal);
      (async () => {
        const myLocation = {
          lat: appState.myLocation.lat,
          lng: appState.myLocation.lon,
        };
        const destination = {
          lat: appState.destination.lat,
          lng: appState.destination.lon,
        };

        // console.log(destination, appState.myLocation);

        const routePoints = await calculateRoute.getRoutePoints(
          myLocation,
          destination
        );

        if (Object.hasOwn(routePoints, "error")) return;

        routePoints.map((dt: any) => {
          const formattedPoints: any = [];
          dt.legs[0].points.map((p: any) => {
            formattedPoints.push([p.latitude, p.longitude]);
          });
          routeData.value = [...routeData.value, formattedPoints];
        });
      })();
    });

    watch(routeData, (route) => {
      // console.log(route);
      const line = L.polyline(route, {
        color: "orange",
        snakingSpeed: 200,
      });
      map.fitBounds(line.getBounds());

      line.addTo(map).snakeIn();

      L.marker(route[0][route[0].length - 1])
        .bindPopup(L.popup({ autoClose: false }))
        .setPopupContent(
          `Destination: ${appState.destinationInformation.address.freeformAddress}`
        )
        .openPopup()
        .addTo(map);
      // console.log(route.length);

      // line.on("snakestart", (e) => {
      //   console.log("Hello");
      // });

      // line.on("snakestart snake snakeend", function (ev) {
      //   console.log(ev);
      // });
    });

    return { map };
  },
};
</script>
