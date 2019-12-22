import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ArtifactImageService} from "../shared/artifact-image.service";
import * as L from 'leaflet';
import {LatLng} from 'leaflet';
import 'leaflet.markercluster';
import {EndpointSettings} from "../../shared/endpoint-settings";
import {Artifact} from "../../shared/artifact";
import Point = L.Point;


@Component({
  selector: 'app-artifact-map',
  templateUrl: './artifact-map.component.html',
  styleUrls: ['./artifact-map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArtifactMapComponent implements OnInit {

  private artifactImagesService: ArtifactImageService;
  private map: L.Map;
  private markers: L.MarkerClusterGroup;

  selectedPeriod: [number, number] = [0, 2000];

  constructor(artifactImagesService: ArtifactImageService) {
    this.artifactImagesService = artifactImagesService;
  }

  ngOnInit() {
    this.artifactImagesService.fetchAllArtifacts();

    this.map = L.map('mapid', {attributionControl: false});
    this.map.setView([48.208043, 16.368739], 13);

    ArtifactMapComponent.createBackgroundLayer().addTo(this.map);
    ArtifactMapComponent.createWatercolorLayer().addTo(this.map);

    this.loadDataToMap();
  }


  private loadDataToMap() {
    this.artifactImagesService.artifactData$.subscribe((data => {
      this.createClusters(data);
    }));
  }


  private createClusters(data: Artifact[]) {
    this.markers = L.markerClusterGroup({
      removeOutsideVisibleBounds: true
    });
    data.forEach(location => {
      if (location.year >= this.selectedPeriod[0] && location.year <= this.selectedPeriod[1])
        this.markers.addLayer(this.createMarker(location))
    });
    this.map.addLayer(this.markers);
  }

  private createMarker(location: Artifact): L.Layer {
    let marker = L.marker([location.latitude, location.longitude], {icon: ArtifactMapComponent.createDefaultIcon()});
    marker.addEventListener("add", addEvent => marker.setIcon(ArtifactMapComponent.createDivIcon(location)));
    marker.bindPopup((layer: L.Layer) => this.createPopup(location));
    marker.on('click', event => {
      let targetPoint: Point = this.map.project(marker.getLatLng(), this.map.getZoom()).subtract([0, 150]);
      let targetLatLng: LatLng = this.map.unproject(targetPoint, this.map.getZoom());
      this.map.setView(targetLatLng, this.map.getZoom());
      // this.map.setView(marker.getLatLng(), this.map.getZoom());
    });
    return marker;
  }


  private createPopup(location: Artifact) {
    let el = document.createElement('div');
    this.artifactImagesService.getImage(location.id).subscribe(base64Image => {
      el.innerHTML =
        `<p>${location.title} (${location.year})</p>` +
        `<a href='${EndpointSettings.API_ENDPOINT}pictureStore/${location.id}/${location.id}.jpg' target='_blank'>
          <div class="crop">
           <img src='${EndpointSettings.API_ENDPOINT}pictureStore/${location.id}/medium/${location.id}.jpg'/>
          </div>
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
      //@ts-ignore
      ext: 'png'
    });
  }

  private static createCustomIconFromAsset(id: number): L.Icon {
    return L.icon({
      iconUrl: EndpointSettings.API_ENDPOINT + 'pictureStore/' + id + '/icon/' + id + '.jpg',
      shadowUrl: '/assets/img/sample_shadow4.png',
      iconSize: [30, 30],
      shadowSize: [60, 60],
      shadowAnchor: [27, 35],
      iconAnchor: [12, 21],
      popupAnchor: [-147, -17]
    });
  }

  private static createDivIcon(artifact: Artifact): L.DivIcon {
    return new L.DivIcon({
      className: 'my-div-icon',
      iconAnchor: [12, 21],
      popupAnchor: [-147, -17],
      html: `<span class='icon-div-badge'>&nbsp${this.getBadgeIconForTechniqueCategory(artifact.techniqueCategory)}&nbsp</span>` + `<img class='icon-div-image icon-div-image-${this.getRoundedYear(artifact.year)}' src='/pictureStore/${artifact.id}/iconWithoutBorder/${artifact.id}.jpg'/>`

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

  private static getRoundedYear(year: number): number {
    if (year < 1650) {
      return 1650;
    } else {
      return year - (year % 10);
    }
  }

  private static getBadgeIconForTechniqueCategory(techniqueCategory: string): string {
    if (techniqueCategory.startsWith("Druck")) {
      return 'horizontal_split';
    }
    if (techniqueCategory.startsWith("Fotografie")) {
      return 'camera';
    }
    if (techniqueCategory.startsWith("Malerei")) {
      return 'brush';
    }
    return 'select_all';

  }
}
