import axios from "axios";

interface Coordinate {
  lat: Number;
  lng: Number;
}

class AxiosWrapper {
  private url: string;
  constructor(url: string) {
    this.url = url;
  }
  async getData() {
    try {
      const res = await axios.get(this.url);
      const status = await res.status;
      const data = await res.data;
      return { data, status };
    } catch (error) {
      return { error };
    }
  }
}

abstract class TomTomServicesAPI {
  apiKey = import.meta.env.VITE_API_KEY;
  baseURL = "https://api.tomtom.com/";
}

class CalculateRoutePoints extends TomTomServicesAPI {
  private typeUrl = "routing/1/calculateRoute/";
  fullUrl = "";

  constructor(point1: Coordinate, point2: Coordinate) {
    super();
    this.typeUrl += `${point1.lat},${point1.lng}:${point2.lat},${point2.lng}/json?key=${this.apiKey}`;
    this.fullUrl = this.baseURL + this.typeUrl;
  }

  async getRoutePoints() {
    const CustomAxios = new AxiosWrapper(this.fullUrl);
    // console.log(this.fullUrl);
    const routeRes = await CustomAxios.getData();

    if (routeRes.status !== 200) return { error: "The data can't be found" };

    const routes = routeRes.data?.routes;

    return routes;
  }
}

class PointsOfInterest extends TomTomServicesAPI {
  url = "";
  constructor() {
    super();
    this.url = `${this.baseURL}search/2/poiSearch/pizza.json?key=${this.apiKey}`;
    console.log(this.url);
  }
}

export { CalculateRoutePoints, PointsOfInterest };
