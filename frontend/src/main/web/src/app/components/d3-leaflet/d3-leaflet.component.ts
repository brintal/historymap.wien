import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Http} from '@angular/http';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import {ArtifactImagesService} from "../../shared/artifact-images.service";
import {Location} from "../../shared/location.model";
import {AppSettings} from "../../shared/AppSettings";
import Point = L.Point;

@Component({
  selector: 'app-d3-leaflet',
  templateUrl: './d3-leaflet.component.html',
  styleUrls: ['./d3-leaflet.component.css'],
  encapsulation: ViewEncapsulation.None // without we need shadow piercing like >>> in front of the styles to also have effect on the svg
})
export class D3LeafletComponent implements OnInit {

  private http: Http;
  private artifactImagesService: ArtifactImagesService;
  private map: L.Map;
  private markers: L.MarkerClusterGroup;

  selectedPeriod: [number, number] = [0, 2000];

  constructor(http: Http, artifactImagesService: ArtifactImagesService) {
    this.http = http;
    this.artifactImagesService = artifactImagesService;
  }

  ngOnInit() {
    this.artifactImagesService.fetchAllArtifacts();

    this.map = L.map('mapid', {attributionControl: false});
    this.map.setView([48.208043, 16.368739], 13);

    D3LeafletComponent.createBackgroundLayer().addTo(this.map);
    D3LeafletComponent.createWatercolorLayer().addTo(this.map);

    this.loadDataToMap();

  }

  private loadDataToMap() {
    this.artifactImagesService.artifactData$.subscribe((data => {
      this.createClusters(data);
    }));
  }


  private createClusters(data: Location[]) {
    this.markers = L.markerClusterGroup();
    data.forEach(location => {
      if (location.year >= this.selectedPeriod[0] && location.year <= this.selectedPeriod[1])
        this.markers.addLayer(this.createMarker(location))
    });
    this.map.addLayer(this.markers);
  }

  private createMarker(location: Location): L.Layer {
    let marker = L.marker([location.latitude, location.longitude], {icon: D3LeafletComponent.createDefaultIcon()});
    marker.addEventListener("add", addEvent => marker.setIcon(D3LeafletComponent.createCustomIconFromAsset(location.id)));
    marker.bindPopup((layer: L.Layer) => this.createPopup(location), {
      autoPan: true,
      autoPanPaddingTopLeft: new Point(50, 500),
      autoPanPaddingBottomRight: new Point(550, 50)
    });
    return marker;
  }


  private createPopup(location: Location) {
    let el = document.createElement('div');
    this.artifactImagesService.getImage(location.id).subscribe(base64Image => {
      el.innerHTML =
        `<p>${location.title} (${location.year})</p>` +
        `<a href='${AppSettings.API_ENDPOINT}pictureStore/${location.id}/${location.id}.jpg' target='_blank'>
          <img src='data:image/png;base64, ${base64Image}'/> 
         </a>`;
    });
    return el;
  }

  private static createBackgroundLayer(): L.TileLayer {
    return L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
  }

  private static createWatercolorLayer(): L.TileLayer {
    return L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      maxZoom: 17,
      opacity: 0.6,
      ext: 'png'
    });
  }

  private static createCustomIconFromAsset(id: number): L.Icon {
    return L.icon({
      iconUrl: AppSettings.API_ENDPOINT + 'pictureStore/' + id + '/icon/' + id + '.jpg',
      shadowUrl: '/assets/img/sample_shadow4.png',
      iconSize: [30, 30],
      shadowSize: [60, 60],
      shadowAnchor: [27, 35],
      iconAnchor: [12, 21],
      popupAnchor: [-168, -17]
    });
  }

  private createCustomIcon(iconBase64: string): L.Icon {
    return L.icon({
      iconUrl: "data:image/png;base64, " + iconBase64,
      shadowUrl: '/assets/marker-shadow.png',
      iconSize: [30, 30],
      shadowSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [-170, -34]
    });
  }

  private static createDefaultIcon(): L.Icon {
    return L.icon({
      iconUrl: '/assets/marker-icon.png',
      shadowUrl: '/assets/marker-shadow.png',
      iconSize: [25, 41],
      shadowSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [-170, -34]
    });
  }

  onChangeSelectedPeriod($event: Event) {
    this.markers.clearLayers();
    this.loadDataToMap();
  }
}
