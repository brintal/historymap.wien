import {AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';

import * as d3 from 'd3';
import {HttpClient} from "@angular/common/http";

declare var google: any;
declare var MarkerClusterer: any;

@Component({
  selector: 'app-d3-gmaps',
  templateUrl: './d3-gmaps.component.html',
  styleUrls: ['./d3-gmaps.component.css'],
  encapsulation: ViewEncapsulation.None // without we need shadow piercing like >>> in front of the styles to also have effect on the svg
})
export class D3GmapsComponent implements OnInit {

  private parentNativeElement: any;
  private http: HttpClient;

  constructor(elementRef: ElementRef, http: HttpClient) {
    this.http = http;
    this.parentNativeElement = elementRef.nativeElement;
  }


  ngOnInit() {

    var locations = [
      {lat: -31.563910, lng: 147.154312},
      {lat: -33.718234, lng: 150.363181},
      {lat: -33.727111, lng: 150.371124},
      {lat: -33.848588, lng: 151.209834},
      {lat: -33.851702, lng: 151.216968},
      {lat: -34.671264, lng: 150.863657},
      {lat: -35.304724, lng: 148.662905},
      {lat: -36.817685, lng: 175.699196},
      {lat: -36.828611, lng: 175.790222},
      {lat: -37.750000, lng: 145.116667},
      {lat: -37.759859, lng: 145.128708},
      {lat: -37.765015, lng: 145.133858},
      {lat: -37.770104, lng: 145.143299},
      {lat: -37.773700, lng: 145.145187},
      {lat: -37.774785, lng: 145.137978},
      {lat: -37.819616, lng: 144.968119},
      {lat: -38.330766, lng: 144.695692},
      {lat: -39.927193, lng: 175.053218},
      {lat: -41.330162, lng: 174.865694},
      {lat: -42.734358, lng: 147.439506},
      {lat: -42.734358, lng: 147.501315},
      {lat: -42.735258, lng: 147.438000},
      {lat: -43.999792, lng: 170.463352}
    ];

    var map = new google.maps.Map(d3.select("#map").node(), {
      zoom: 12,
      center: new google.maps.LatLng(48.208043, 16.368739),
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });

// Load the station data. When the data comes back, create an overlay.
    d3.json("http://localhost:8080/artifacts", function (error, data) {
      if (error) throw error;

      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

      // Add some markers to the map.
      // Note: The code uses the JavaScript Array.prototype.map() method to
      // create an array of markers based on a given "locations" array.
      // The map() method here has nothing to do with the Google Maps API.

      var markers = d3.entries(data).map(function(location, i) {
        return new google.maps.Marker({
          position: new google.maps.LatLng(location.value.latitude, location.value.longitude),
          map: map,
          label: labels[i % labels.length]
        });
      });
      // var markers = locations.map(function(location, i) {
      //   return new google.maps.Marker({
      //     position: location,
      //     label: labels[i % labels.length]
      //   });
      // });

      // Add a marker clusterer to manage the markers.
      var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});





      //
      // var overlay = new google.maps.OverlayView();
      //
      // // Add the container when the overlay is added to the map.
      // overlay.onAdd = function () {
      //   var layer = d3.select(this.getPanes().overlayLayer).append("div")
      //     .attr("class", "stations");
      //
      //   // Draw each marker as a separate SVG element.
      //   // We could use a single SVG, but what size would it have?
      //   overlay.draw = function () {
      //     var projection = this.getProjection(),
      //       padding = 10;
      //
      //     var marker = layer.selectAll("svg")
      //       .data(d3.entries(data))
      //       .each(transform) // update existing markers
      //       .enter().append("svg")
      //       .each(transform)
      //       .attr("class", "marker");
      //
      //     // Add a circle.
      //     marker.append("circle")
      //       .attr("r", 4.5)
      //       .attr("cx", padding)
      //       .attr("cy", padding);
      //
      //     // Add a label.
      //     marker.append("text")
      //       .attr("x", padding + 7)
      //       .attr("y", padding)
      //       .attr("dy", ".31em")
      //       .text(function (d) {
      //         return d.value.title;
      //       });
      //
      //     function transform(d: any) {
      //       d = new google.maps.LatLng(d.value.latitude, d.value.longitude);
      //       d = projection.fromLatLngToDivPixel(d);
      //       return d3.select(this)
      //         .style("left", (d.x - padding) + "px")
      //         .style("top", (d.y - padding) + "px");
      //     }
      //   };
      // };
      //
      // // Bind our overlay to the map…
      // overlay.setMap(map);
    });

  }

}
