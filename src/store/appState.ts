import { defineStore } from "pinia";

interface Coordinate {
  lat: Number;
  lon: Number;
}

export const useAppState = defineStore("main", {
  state: () => {
    let myLocation: Coordinate = {};
    let destination: Coordinate = {};
    let destinationInformation: any = {};
    let sideBar: Boolean = false;

    return {
      myLocation,
      destination,
      destinationInformation,
      sideBar,
    };
  },
  actions: {
    toggleSidebar() {
      this.sideBar = !this.sideBar;
    },
    addCurrentLocation(payload: Coordinate) {
      this.myLocation = payload;
    },
    addDestinationLocation(payload: Coordinate) {
      this.destination = payload;
    },
    addDestinationInformation(payload: any) {
      this.destinationInformation = payload;
    },
  },
});
