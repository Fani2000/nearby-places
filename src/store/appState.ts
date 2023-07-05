import { defineStore } from "pinia";

interface Coordinate {
  lat: Number;
  lon: Number;
}

export type RootType = {
  myLocation: Coordinate;
  destination: Coordinate;
  destinationInformation: any;
  sideBar: Boolean;
};

export const useAppState = defineStore("main", {
  state: () => ({
    myLocation: {} as Coordinate,
    destination: {} as Coordinate,
    destinationInformation: {} as any,
    sideBar: false as Boolean,
  }),
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
