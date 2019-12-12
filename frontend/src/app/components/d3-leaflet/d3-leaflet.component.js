"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var d3 = require("d3");
var D3LeafletComponent = (function () {
    function D3LeafletComponent(elementRef, http) {
        this.http = http;
        this.parentNativeElement = elementRef.nativeElement;
    }
    D3LeafletComponent.prototype.ngOnInit = function () {
        var mymap = L.map('mapid').setView([48.208043, 16.368739], 13);
        // L.marker([51.5, -0.09]).addTo(mymap);
        var Stamen_Toner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 18,
            ext: 'png'
        }).addTo(mymap);
        var watercolorLayer = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 18,
            opacity: 0.6,
            ext: 'png'
        }).addTo(mymap);
        d3.json("http://localhost:8080/artifacts", function (error, data) {
            if (error)
                throw error;
            var markers = L.markerClusterGroup();
            d3.entries(data).forEach(function (location) { return markers.addLayer(L.marker([location.value.latitude, location.value.longitude])); });
            // d3.entries(data).forEach(location => L.marker([location.value.latitude, location.value.longitude]).addTo(mymap))
            mymap.addLayer(markers);
        });
    };
    return D3LeafletComponent;
}());
D3LeafletComponent = __decorate([
    core_1.Component({
        selector: 'app-d3-leaflet',
        templateUrl: './d3-leaflet.component.html',
        styleUrls: ['./d3-leaflet.component.css', '../../'],
        encapsulation: core_1.ViewEncapsulation.None // without we need shadow piercing like >>> in front of the styles to also have effect on the svg
    })
], D3LeafletComponent);
exports.D3LeafletComponent = D3LeafletComponent;
