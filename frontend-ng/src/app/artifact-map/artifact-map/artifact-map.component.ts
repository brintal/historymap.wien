import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ArtifactImageService} from "../shared/artifact-image.service";
import * as L from 'leaflet';
import {LatLng} from 'leaflet';
import 'leaflet.markercluster';
import {EndpointSettings} from "../../shared/endpoint-settings";
import {Artifact, Technique} from "../../shared/generated/domain";
import {NgElement, WithProperties} from '@angular/elements';
import {ArtifactMapPopupComponent} from "../artifact-map-popup/artifact-map-popup.component";
import * as d3 from "d3";
import Point = L.Point;
import {MatRipple} from "@angular/material/core";
import Timeout = NodeJS.Timeout;
import {Circle} from "leaflet";


@Component({
  selector: 'app-artifact-map',
  templateUrl: './artifact-map.component.html',
  styleUrls: ['./artifact-map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArtifactMapComponent implements AfterViewInit {

  opened: boolean;

  @ViewChild('snav') snav;

  private map: L.Map;
  private markers: L.MarkerClusterGroup;
  private data: Artifact[];

  selectedPeriod: [number, number] = [0, 2000];
  selectedOverlay = 'none';

  backgroundLayer: L.TileLayer;
  watercolorLayer: L.TileLayer;
  huberMapLayer: L.TileLayer;
  grimmMapLayer: L.TileLayer;
  moerschnerMapLayer: L.TileLayer;
  luftbild1938MapLayer: L.TileLayer;
  luftbild1956MapLayer: L.TileLayer;
  currentLocation: Circle;
  followLocation = true;

  constructor(private artifactImagesService: ArtifactImageService) {
  }

  ngAfterViewInit() {
    if (this.map != null) {
      this.map.remove();
    }
    this.map = L.map('mapid', {attributionControl: false});
    this.map.setView([48.208043, 16.368739], 13);

    this.backgroundLayer = ArtifactMapComponent.createBackgroundLayer().addTo(this.map);
    this.watercolorLayer = ArtifactMapComponent.createWatercolorLayer().addTo(this.map);
    this.huberMapLayer = ArtifactMapComponent.createHuberMapLayer();
    this.grimmMapLayer = ArtifactMapComponent.createGrimmMapLayer();
    this.moerschnerMapLayer = ArtifactMapComponent.createMoerschnerMapLayer();
    this.luftbild1938MapLayer = ArtifactMapComponent.createluftbild1938MapLayer();
    this.luftbild1956MapLayer = ArtifactMapComponent.createluftbild1956MapLayer();

    this.loadDataToMap();
    var self = this;
    setTimeout(function () {
        self.snav.toggle();
      }
      , 1000);
    setTimeout(function () {
        self.snav.toggle();
      }
      , 2000);

    this.artifactImagesService.clearFilterNotify$.subscribe(value => {
      this.selectedOverlay = 'none';
      this.onOverlayChange();
    })

  }

  private initLocation() {
    this.map.locate({watch: true});
    var self = this;
    this.map.on('locationfound', event => {
      if (self.currentLocation != null) {
        self.currentLocation.removeFrom(self.map);
      }
      self.currentLocation = L.circle(event.latlng, event.accuracy, {color: "yellow"}).addTo(self.map);
      if (self.followLocation) {
        this.map.setView(event.latlng, 16);
      }
    })
    this.map.on('dragstart', event => {
      console.log("dragstart");
      self.followLocation = false;
    });
  }

  public toggleSidebar() {
    this.snav.toggle();
    var self = this;
    setTimeout(function () {
        self.map.invalidateSize();
      }
      , 200);
  }

  public centerMyLocation() {
    if (this.currentLocation == null) {
      this.initLocation();
    } else {
      this.map.setView(this.currentLocation.getLatLng(), 16);
    }
  }


  private loadDataToMap() {
    this.artifactImagesService.artifactData$.subscribe((data => {
      this.data = data;
      if (this.markers) {
        this.markers.clearLayers();
      }
      this.createClusters(data);
    }));
  }


  private createClusters(data: Artifact[]) {
    this.markers = L.markerClusterGroup({
      removeOutsideVisibleBounds: true
    });
    data.forEach(artifact => {
      // if (artifact.year >= this.selectedPeriod[0] && artifact.year <= this.selectedPeriod[1])
        this.markers.addLayer(this.createMarker(artifact))
    });
    this.map.addLayer(this.markers);
  }

  private createMarker(artifact: Artifact): L.Layer {
    let marker = L.marker([artifact.location.latitude, artifact.location.longitude], {});
    marker.addEventListener("add", addEvent => marker.setIcon(ArtifactMapComponent.createDivIcon(artifact)));
    marker.bindPopup((layer: L.Layer) => this.createPopup(artifact));
    marker.on('click', event => {
      let targetPoint: Point = this.map.project(marker.getLatLng(), this.map.getZoom()).subtract([0, 150]);
      let targetLatLng: LatLng = this.map.unproject(targetPoint, this.map.getZoom());
      this.map.setView(targetLatLng, this.map.getZoom());
      // this.map.setView(marker.getLatLng(), this.map.getZoom());
    });
    return marker;
  }


  private createPopup(artifact: Artifact) {
    const popupEl: NgElement & WithProperties<ArtifactMapPopupComponent> = document.createElement('popup-element') as any;
    popupEl.artifact = artifact;
//     let el = document.createElement('div');
//       el.innerHTML =
//         `<p>${artifact.title} (${artifact.year})</p>` +
//         `
// <!-- <a href='${EndpointSettings.API_ENDPOINT}pictureStore/${artifact.onbImageId}/${artifact.onbImageId}.jpg' target='_blank'>-->
//           <div class="crop" onclick="alert('blaaa')">
//            <img src='${EndpointSettings.API_ENDPOINT}pictureStore/${artifact.onbImageId}/medium/${artifact.onbImageId}.jpg'/>
//           </div>
// <!--         </a>-->
// `;
    return popupEl;
  }


  private static createluftbild1938MapLayer(): L.TileLayer {
    return L.tileLayer('http://maps.wien.gv.at/wmts/lb1938/grau/google3857/{z}/{y}/{x}.jpeg', {
      minZoom: 0,
      maxZoom: 20,
    // @ts-ignore
      ext: 'png'
    });
  }

  private static createluftbild1956MapLayer(): L.TileLayer {
    return L.tileLayer('http://maps.wien.gv.at/wmts/lb1956/grau/google3857/{z}/{y}/{x}.jpeg', {
      minZoom: 0,
      maxZoom: 20,
    // @ts-ignore
      ext: 'png'
    });
  }

  private static createMoerschnerMapLayer(): L.TileLayer {
    return L.tileLayer('http://sammlung.woldan.oeaw.ac.at/geoserver/gwc/service/gmaps?layers=geonode:ac04462599_moerschner_wien_1825&zoom={z}&x={x}&y={y}&format=image/jpeg', {
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
    // @ts-ignore
    //   ext: 'png'
    });
  }

  private static createGrimmMapLayer(): L.TileLayer {
    return L.tileLayer('http://sammlung.woldan.oeaw.ac.at/geoserver/gwc/service/gmaps?layers=geonode:ac04382777_grimm_wien_1806&zoom={z}&x={x}&y={y}&format=image/jpeg', {
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
    // @ts-ignore
    //   ext: 'png'
    });
  }

  private static createHuberMapLayer(): L.TileLayer {
    return L.tileLayer('http://sammlung.woldan.oeaw.ac.at/geoserver/gwc/service/gmaps?layers=geonode:ac04408812_huber_wien_1778&zoom={z}&x={x}&y={y}&format=image/jpeg', {
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
    // @ts-ignore
    //   ext: 'png'
    });
  }

  private static createBackgroundLayer(): L.TileLayer {
    return L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
    // @ts-ignore
      ext: 'png'
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

  private static createCustomIconFromAsset(onbImageId: number): L.Icon {
    return L.icon({
      iconUrl: EndpointSettings.API_ENDPOINT + 'pictureStore/' + onbImageId + '/icon/' + onbImageId + '.jpg',
      shadowUrl: '/assets/img/sample_shadow4.png',
      iconSize: [30, 30],
      shadowSize: [60, 60],
      shadowAnchor: [27, 35],
      iconAnchor: [12, 21],
      popupAnchor: [-147, -17]
    });
  }

  private static createDivIcon(artifact: Artifact): L.DivIcon {
    var colorRange = Array.from(d3.schemeSpectral[11].entries()).map(value => value[1]);
    // @ts-ignore
    let color = d3.scaleLinear().range(colorRange).domain([1650, 1700, 1750, 1775, 1800, 1825, 1850, 1875, 1900, 1950, 1990]);
    let yearColor = color(artifact.year);
    return new L.DivIcon({
      className: 'my-div-icon',
      iconAnchor: [12, 21],
      popupAnchor: [5, -17],
      html: `<span class='icon-div-badge'>&nbsp${this.getBadgeIconForTechnique(artifact.technique)}&nbsp</span>` +
        `<img class='icon-div-image' style='border-color:${yearColor}' src='/pictureStore/${artifact.onbImageId}/iconWithoutBorder/${artifact.onbImageId}.jpg'/>`

    });
  }

  private createCustomIcon(iconBase64: string): L.Icon {
    return L.icon({
      iconUrl: "data:image/png;base64, " + iconBase64,
      iconSize: [30, 30],
      shadowSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [-170, -34]
    });
  }

  onChangeSelectedPeriod($event: Event) {
    this.loadDataToMap();
  }

  private static getRoundedYear(year: number): number {
    if (year < 1650) {
      return 1650;
    } else {
      return year - (year % 10);
    }
  }

  private static getBadgeIconForTechnique(technique: Technique): string {
    if (technique === null || technique.category === null) {
      return 'select_all';
    }
    if (technique.category.name.startsWith("Druck")) {
      return 'horizontal_split';
    }
    if (technique.category.name.startsWith("Fotografie")) {
      return 'camera';
    }
    if (technique.category.name.startsWith("Malerei")) {
      return 'brush';
    }
    return 'select_all';

  }

  removeAllOverlays() {
    this.huberMapLayer.removeFrom(this.map);
    this.grimmMapLayer.removeFrom(this.map);
    this.moerschnerMapLayer.removeFrom(this.map);
    this.luftbild1938MapLayer.removeFrom(this.map);
    this.luftbild1956MapLayer.removeFrom(this.map);
  }

  onOverlayChange() {
    this.removeAllOverlays();
    switch (this.selectedOverlay) {
      case 'huber': {
        this.huberMapLayer.addTo(this.map);
        break;
      }
      case 'grimm': {
        this.grimmMapLayer.addTo(this.map);
        break;
      }
      case 'moerschner': {
        this.moerschnerMapLayer.addTo(this.map);
        break;
      }
      case 'luftbild1938': {
        this.luftbild1938MapLayer.addTo(this.map);
        break;
      }
      case 'luftbild1956': {
        this.luftbild1956MapLayer.addTo(this.map);
        break;
      }
      default : {
        break;
      }
    }
  }

  clearFilters() {
    this.artifactImagesService.clearFilters();
  }
}
