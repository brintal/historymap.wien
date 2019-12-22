export class Artifact {
  id: number;
  title: string;
  year: number;
  latitude: number;
  longitude: number;
  techniqueCategory: string;

  constructor(id: number, title: string, longitude: number, latitude: number, year:number, techniqueCategory:string) {
    this.id = id;
    this.title = title;
    this.longitude = longitude;
    this.latitude = latitude;
    this.year = year;
    this.techniqueCategory = techniqueCategory
  }
}
