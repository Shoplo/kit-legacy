// declare global {
//   export interface window {
//     H: any;
//   }

export interface ShMap {
  getViewBounds(): any;

  setCenter(value: ShCoordinates): any;

  setZoom(value: number): any;

  addEventListener(event: string, callback: any): any;

  addObjects(markers: any): any;

  removeObjects(markers: any): any;
}

export interface ShPlatform {
  createDefaultLayers(): any;

  getGeocodingService(): any;

  geocode(value: any, callback: any, error: any): any;

  normal: any;
}

export interface ShH {
  service: ShHService;
  Map: any;
  map: any;
  mapevents: any;
  ui: any;
}

export interface ShHService {
  Platform(setting: any): void;
}

export interface ShRect {
  getCenter(): any;

  getTopLeft(): any;

  getBottomRight(): any;
}

export interface ShCoordinates {
  lat: string;
  lng: string;
}

export interface ShGeocoder {

}
// }
