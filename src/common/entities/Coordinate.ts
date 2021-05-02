export interface CoordinateInterface {
  latitude: number;
  longitude: number;
}

export class Coordinate implements CoordinateInterface {
  latitude = 0;
  longitude = 0;
}
