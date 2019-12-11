export class Location {
  id: number;
  title: string;
  longitude: number;
  latitude: number;
  year: number;

  constructor(id: number, title: string, longitude: number, latitude: number, year:number) {
    this.id = id;
    this.title = title;
    this.longitude = longitude;
    this.latitude = latitude;
    this.year = year;
  }
}
