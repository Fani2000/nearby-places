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

  constructor() {
    super();
  }

  async getRoutePoints(point1: Coordinate, point2: Coordinate) {
    this.typeUrl += `${point1.lat},${point1.lng}:${point2.lat},${point2.lng}/json?key=${this.apiKey}`;

    const fullUrl = this.baseURL + this.typeUrl;
    console.log(fullUrl);

    const CustomAxios = new AxiosWrapper(fullUrl);

    const routeRes = await CustomAxios.getData();

    if (routeRes.status !== 200) return { error: routeRes.error };

    const routes = routeRes.data?.routes;

    return routes;
  }
}

class PointsOfInterest extends TomTomServicesAPI {
  url = "";
  constructor() {
    super();
  }

  async getPointsOfInterest(query: String, point: Coordinate) {
    this.url = `${this.baseURL}search/2/poiSearch/${query}.json?key=${this.apiKey}&lat=${point.lat}&lon=${point.lng}`;
    const CustomAxios = new AxiosWrapper(this.url);
    const poiRes = await CustomAxios.getData();

    if (poiRes.status !== 200) return { error: poiRes.error };

    const poi = poiRes.data?.results;

    return poi;
  }
}

const calculateRoute = new CalculateRoutePoints();
const pointsOfInterests = new PointsOfInterest();

export { calculateRoute, pointsOfInterests };
