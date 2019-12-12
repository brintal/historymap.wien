webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_html_bar_chart_html_bar_chart_component__ = __webpack_require__("../../../../../src/app/components/html-bar-chart/html-bar-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_svg_bar_chart_svg_bar_chart_component__ = __webpack_require__("../../../../../src/app/components/svg-bar-chart/svg-bar-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_vertical_bar_chart_vertical_bar_chart_component__ = __webpack_require__("../../../../../src/app/components/vertical-bar-chart/vertical-bar-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_d3_gmaps_d3_gmaps_component__ = __webpack_require__("../../../../../src/app/components/d3-gmaps/d3-gmaps.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_d3_leaflet_d3_leaflet_component__ = __webpack_require__("../../../../../src/app/components/d3-leaflet/d3-leaflet.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_brush_snapping_brush_snapping_component__ = __webpack_require__("../../../../../src/app/components/brush-snapping/brush-snapping.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    { path: '', redirectTo: '/d3-leaflet', pathMatch: 'full' },
    { path: 'html-bar-chart', component: __WEBPACK_IMPORTED_MODULE_2__components_html_bar_chart_html_bar_chart_component__["a" /* HtmlBarChartComponent */] },
    { path: 'svg-bar-chart', component: __WEBPACK_IMPORTED_MODULE_3__components_svg_bar_chart_svg_bar_chart_component__["a" /* SvgBarChartComponent */] },
    { path: 'vertical-bar-chart', component: __WEBPACK_IMPORTED_MODULE_4__components_vertical_bar_chart_vertical_bar_chart_component__["a" /* VerticalBarChartComponent */] },
    { path: 'd3-gmaps', component: __WEBPACK_IMPORTED_MODULE_5__components_d3_gmaps_d3_gmaps_component__["a" /* D3GmapsComponent */] },
    { path: 'd3-leaflet', component: __WEBPACK_IMPORTED_MODULE_6__components_d3_leaflet_d3_leaflet_component__["a" /* D3LeafletComponent */] },
    { path: 'brush-snapping', component: __WEBPACK_IMPORTED_MODULE_7__components_brush_snapping_brush_snapping_component__["a" /* BrushSnappingComponent */] },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<nav>\n   <strong><a routerLink=\"/d3-leaflet\" routerLinkActive=\"active\">HistoryMap</a></strong>\n   | <a routerLink=\"/html-bar-chart\" routerLinkActive=\"active\">HTML Bar Chart</a>\n   | <a routerLink=\"/svg-bar-chart\" routerLinkActive=\"active\">SVG Bar Chart</a>\n   | <a routerLink=\"/vertical-bar-chart\" routerLinkActive=\"active\">Vertical Bar Chart</a>\n   | <a routerLink=\"/d3-gmaps\" routerLinkActive=\"active\">D3 Gmaps</a>\n   | <a routerLink=\"/brush-snapping\" routerLinkActive=\"active\">Brush Snapping</a>\n</nav>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app worksaaaa!';
    }
    AppComponent.prototype.ngOnInit = function () { };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_d3_ng2_service__ = __webpack_require__("../../../../d3-ng2-service/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_html_bar_chart_html_bar_chart_component__ = __webpack_require__("../../../../../src/app/components/html-bar-chart/html-bar-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_svg_bar_chart_svg_bar_chart_component__ = __webpack_require__("../../../../../src/app/components/svg-bar-chart/svg-bar-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_vertical_bar_chart_vertical_bar_chart_component__ = __webpack_require__("../../../../../src/app/components/vertical-bar-chart/vertical-bar-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_d3_gmaps_d3_gmaps_component__ = __webpack_require__("../../../../../src/app/components/d3-gmaps/d3-gmaps.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_d3_leaflet_d3_leaflet_component__ = __webpack_require__("../../../../../src/app/components/d3-leaflet/d3-leaflet.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shared_artifact_images_service__ = __webpack_require__("../../../../../src/app/shared/artifact-images.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_brush_snapping_brush_snapping_component__ = __webpack_require__("../../../../../src/app/components/brush-snapping/brush-snapping.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_html_bar_chart_html_bar_chart_component__["a" /* HtmlBarChartComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_svg_bar_chart_svg_bar_chart_component__["a" /* SvgBarChartComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_vertical_bar_chart_vertical_bar_chart_component__["a" /* VerticalBarChartComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_d3_gmaps_d3_gmaps_component__["a" /* D3GmapsComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_d3_leaflet_d3_leaflet_component__["a" /* D3LeafletComponent */],
            __WEBPACK_IMPORTED_MODULE_14__components_brush_snapping_brush_snapping_component__["a" /* BrushSnappingComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_5__app_routing_module__["a" /* AppRoutingModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_13__shared_artifact_images_service__["a" /* ArtifactImagesService */],
            __WEBPACK_IMPORTED_MODULE_6_d3_ng2_service__["a" /* D3Service */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/brush-snapping/brush-snapping.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".axis--grid .domain {\r\n  fill: #ddd;\r\n  stroke: none;\r\n}\r\n\r\n.axis--x .domain,\r\n.axis--grid .tick line {\r\n  stroke: #fff;\r\n}\r\n\r\n.axis--grid .tick--minor line {\r\n  stroke-opacity: .5;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/brush-snapping/brush-snapping.component.html":
/***/ (function(module, exports) {

module.exports = "\n"

/***/ }),

/***/ "../../../../../src/app/components/brush-snapping/brush-snapping.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrushSnappingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__("../../../../d3/build/d3.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BrushSnappingComponent = (function () {
    function BrushSnappingComponent(elementRef) {
        this.parentNativeElement = elementRef.nativeElement;
    }
    BrushSnappingComponent.prototype.ngOnInit = function () {
        var margin = { top: 200, right: 40, bottom: 200, left: 40 }, width = 960 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;
        var x = __WEBPACK_IMPORTED_MODULE_1_d3__["scaleTime"]()
            .domain([new Date(2013, 7, 1), new Date(2013, 7, 15).getTime() - 1])
            .rangeRound([0, width]);
        var svg = __WEBPACK_IMPORTED_MODULE_1_d3__["select"]("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.append("g")
            .attr("class", "axis axis--grid")
            .attr("transform", "translate(0," + height + ")")
            .call(__WEBPACK_IMPORTED_MODULE_1_d3__["axisBottom"](x)
            .ticks(__WEBPACK_IMPORTED_MODULE_1_d3__["timeHour"], 12)
            .tickSize(-height)
            .tickFormat(function () { return null; }))
            .selectAll(".tick")
            .classed("tick--minor", function (a, d, i) {
            return a.getHours();
        });
        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(__WEBPACK_IMPORTED_MODULE_1_d3__["axisBottom"](x)
            .ticks(__WEBPACK_IMPORTED_MODULE_1_d3__["timeDay"])
            .tickPadding(0))
            .attr("text-anchor", null)
            .selectAll("text")
            .attr("x", 6);
        svg.append("g")
            .attr("class", "brush")
            .call(__WEBPACK_IMPORTED_MODULE_1_d3__["brushX"]()
            .extent([[0, 0], [width, height]])
            .on("end", brushended));
        function brushended() {
            if (!__WEBPACK_IMPORTED_MODULE_1_d3__["event"].sourceEvent)
                return; // Only transition after input.
            if (!__WEBPACK_IMPORTED_MODULE_1_d3__["event"].selection)
                return; // Ignore empty selections.
            var d0 = __WEBPACK_IMPORTED_MODULE_1_d3__["event"].selection.map(x.invert), d1 = d0.map(__WEBPACK_IMPORTED_MODULE_1_d3__["timeDay"].round);
            // If empty when rounded, use floor & ceil instead.
            if (d1[0] >= d1[1]) {
                d1[0] = __WEBPACK_IMPORTED_MODULE_1_d3__["timeDay"].floor(d0[0]);
                d1[1] = __WEBPACK_IMPORTED_MODULE_1_d3__["timeDay"].offset(d1[0]);
            }
            __WEBPACK_IMPORTED_MODULE_1_d3__["select"](this).transition().call(__WEBPACK_IMPORTED_MODULE_1_d3__["event"].target.move, d1.map(x));
        }
    };
    return BrushSnappingComponent;
}());
BrushSnappingComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'brush-snapping',
        template: __webpack_require__("../../../../../src/app/components/brush-snapping/brush-snapping.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/brush-snapping/brush-snapping.component.css")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewEncapsulation */].None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object])
], BrushSnappingComponent);

var _a;
//# sourceMappingURL=brush-snapping.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/d3-gmaps/d3-gmaps.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*agm-map {*/\r\n  /*height: 600px;*/\r\n/*}*/\r\n\r\n\r\n#map {\r\n  width: 1000px;\r\n  height: 800px;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n.stations, .stations svg {\r\n  position: absolute;\r\n}\r\n\r\n.stations svg {\r\n  width: 60px;\r\n  height: 20px;\r\n  padding-right: 100px;\r\n  font: 10px sans-serif;\r\n}\r\n\r\n.stations circle {\r\n  fill: #00BFFF;\r\n  stroke: black;\r\n  stroke-width: 1.5px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/d3-gmaps/d3-gmaps.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- this creates a google map on the page with the given lat/lng from -->\n<!-- the component as the initial center of the map: -->\n<!--<agm-map [latitude]=\"lat\" [longitude]=\"lng\">-->\n  <!--<agm-marker [latitude]=\"lat\" [longitude]=\"lng\"></agm-marker>-->\n<!--</agm-map>-->\n\n<div id=\"map\"></div>\n\n\n\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/components/d3-gmaps/d3-gmaps.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return D3GmapsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__("../../../../d3/build/d3.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var D3GmapsComponent = (function () {
    function D3GmapsComponent(elementRef, http) {
        this.http = http;
        this.parentNativeElement = elementRef.nativeElement;
    }
    D3GmapsComponent.prototype.ngOnInit = function () {
        var locations = [
            { lat: -31.563910, lng: 147.154312 },
            { lat: -33.718234, lng: 150.363181 },
            { lat: -33.727111, lng: 150.371124 },
            { lat: -33.848588, lng: 151.209834 },
            { lat: -33.851702, lng: 151.216968 },
            { lat: -34.671264, lng: 150.863657 },
            { lat: -35.304724, lng: 148.662905 },
            { lat: -36.817685, lng: 175.699196 },
            { lat: -36.828611, lng: 175.790222 },
            { lat: -37.750000, lng: 145.116667 },
            { lat: -37.759859, lng: 145.128708 },
            { lat: -37.765015, lng: 145.133858 },
            { lat: -37.770104, lng: 145.143299 },
            { lat: -37.773700, lng: 145.145187 },
            { lat: -37.774785, lng: 145.137978 },
            { lat: -37.819616, lng: 144.968119 },
            { lat: -38.330766, lng: 144.695692 },
            { lat: -39.927193, lng: 175.053218 },
            { lat: -41.330162, lng: 174.865694 },
            { lat: -42.734358, lng: 147.439506 },
            { lat: -42.734358, lng: 147.501315 },
            { lat: -42.735258, lng: 147.438000 },
            { lat: -43.999792, lng: 170.463352 }
        ];
        var map = new google.maps.Map(__WEBPACK_IMPORTED_MODULE_1_d3__["select"]("#map").node(), {
            zoom: 12,
            center: new google.maps.LatLng(48.208043, 16.368739),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        });
        // Load the station data. When the data comes back, create an overlay.
        __WEBPACK_IMPORTED_MODULE_1_d3__["json"]("http://localhost:8080/artifacts", function (error, data) {
            if (error)
                throw error;
            var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            // Add some markers to the map.
            // Note: The code uses the JavaScript Array.prototype.map() method to
            // create an array of markers based on a given "locations" array.
            // The map() method here has nothing to do with the Google Maps API.
            var markers = __WEBPACK_IMPORTED_MODULE_1_d3__["entries"](data).map(function (location, i) {
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
            var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
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
    };
    return D3GmapsComponent;
}());
D3GmapsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-d3-gmaps',
        template: __webpack_require__("../../../../../src/app/components/d3-gmaps/d3-gmaps.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/d3-gmaps/d3-gmaps.component.css")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewEncapsulation */].None // without we need shadow piercing like >>> in front of the styles to also have effect on the svg
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]) === "function" && _b || Object])
], D3GmapsComponent);

var _a, _b;
//# sourceMappingURL=d3-gmaps.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/d3-leaflet/d3-leaflet.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*agm-map {*/\r\n  /*height: 600px;*/\r\n/*}*/\r\n\r\n#mapid {\r\n  height: 80vh;\r\n  width: 99vw;\r\n}\r\n\r\n.leaflet-popup-content {\r\n  width:auto !important;\r\n}\r\n.leaflet-popup-tip-container {\r\n  left: 190px !important;\r\n}\r\n\r\n.marker-cluster-large div {\r\n  background-color: rgba(16, 168, 255, 0.6);\r\n}\r\n.marker-cluster-large {\r\n  background-color: rgba(58, 183, 255, 0.6);\r\n}\r\n.marker-cluster-medium div {\r\n  background-color: rgba(92, 196, 255, 0.6);\r\n}\r\n.marker-cluster-medium {\r\n  background-color: rgba(126, 208, 255, 0.6);\r\n}\r\n.marker-cluster-small div {\r\n  background-color: rgba(160, 220, 255, 0.6);\r\n}\r\n.marker-cluster-small {\r\n  background-color: rgba(194, 233, 255, 0.6);\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/d3-leaflet/d3-leaflet.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- this creates a google map on the page with the given lat/lng from -->\n<!-- the component as the initial center of the map: -->\n<!--<agm-map [latitude]=\"lat\" [longitude]=\"lng\">-->\n  <!--<agm-marker [latitude]=\"lat\" [longitude]=\"lng\"></agm-marker>-->\n<!--</agm-map>-->\n<div id=\"mapid\"></div>\n<app-vertical-bar-chart [(getPeriod)]=\"selectedPeriod\" (getPeriodChange)=\"onChangeSelectedPeriod($event)\"></app-vertical-bar-chart>\n\n\n\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/components/d3-leaflet/d3-leaflet.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return D3LeafletComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet__ = __webpack_require__("../../../../leaflet/dist/leaflet-src.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet_markercluster__ = __webpack_require__("../../../../leaflet.markercluster/dist/leaflet.markercluster.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet_markercluster___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_leaflet_markercluster__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_artifact_images_service__ = __webpack_require__("../../../../../src/app/shared/artifact-images.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_AppSettings__ = __webpack_require__("../../../../../src/app/shared/AppSettings.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Point = __WEBPACK_IMPORTED_MODULE_2_leaflet__["Point"];
var D3LeafletComponent = D3LeafletComponent_1 = (function () {
    function D3LeafletComponent(http, artifactImagesService) {
        this.selectedPeriod = [0, 2000];
        this.http = http;
        this.artifactImagesService = artifactImagesService;
    }
    D3LeafletComponent.prototype.ngOnInit = function () {
        this.artifactImagesService.fetchAllArtifacts();
        this.map = __WEBPACK_IMPORTED_MODULE_2_leaflet__["map"]('mapid', { attributionControl: false });
        this.map.setView([48.208043, 16.368739], 13);
        D3LeafletComponent_1.createBackgroundLayer().addTo(this.map);
        D3LeafletComponent_1.createWatercolorLayer().addTo(this.map);
        this.loadDataToMap();
    };
    D3LeafletComponent.prototype.loadDataToMap = function () {
        var _this = this;
        this.artifactImagesService.artifactData$.subscribe((function (data) {
            _this.createClusters(data);
        }));
    };
    D3LeafletComponent.prototype.createClusters = function (data) {
        var _this = this;
        this.markers = __WEBPACK_IMPORTED_MODULE_2_leaflet__["markerClusterGroup"]();
        data.forEach(function (location) {
            if (location.year >= _this.selectedPeriod[0] && location.year <= _this.selectedPeriod[1])
                _this.markers.addLayer(_this.createMarker(location));
        });
        this.map.addLayer(this.markers);
    };
    D3LeafletComponent.prototype.createMarker = function (location) {
        var _this = this;
        var marker = __WEBPACK_IMPORTED_MODULE_2_leaflet__["marker"]([location.latitude, location.longitude], { icon: D3LeafletComponent_1.createDefaultIcon() });
        marker.addEventListener("add", function (addEvent) { return marker.setIcon(D3LeafletComponent_1.createCustomIconFromAsset(location.id)); });
        marker.bindPopup(function (layer) { return _this.createPopup(location); }, {
            autoPan: true,
            autoPanPaddingTopLeft: new Point(50, 500),
            autoPanPaddingBottomRight: new Point(550, 50)
        });
        return marker;
    };
    D3LeafletComponent.prototype.createPopup = function (location) {
        var el = document.createElement('div');
        this.artifactImagesService.getImage(location.id).subscribe(function (base64Image) {
            el.innerHTML =
                "<p>" + location.title + " (" + location.year + ")</p>" +
                    ("<a href='" + __WEBPACK_IMPORTED_MODULE_5__shared_AppSettings__["a" /* AppSettings */].API_ENDPOINT + "pictureStore/" + location.id + "/" + location.id + ".jpg' target='_blank'>\n          <img src='data:image/png;base64, " + base64Image + "'/> \n         </a>");
        });
        return el;
    };
    D3LeafletComponent.createBackgroundLayer = function () {
        return __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"]('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
    };
    D3LeafletComponent.createWatercolorLayer = function () {
        return __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"]('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: 'abcd',
            maxZoom: 17,
            opacity: 0.6,
            ext: 'png'
        });
    };
    D3LeafletComponent.createCustomIconFromAsset = function (id) {
        return __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({
            iconUrl: __WEBPACK_IMPORTED_MODULE_5__shared_AppSettings__["a" /* AppSettings */].API_ENDPOINT + 'pictureStore/' + id + '/icon/' + id + '.jpg',
            shadowUrl: '/assets/img/sample_shadow4.png',
            iconSize: [30, 30],
            shadowSize: [60, 60],
            shadowAnchor: [27, 35],
            iconAnchor: [12, 21],
            popupAnchor: [-168, -17]
        });
    };
    D3LeafletComponent.prototype.createCustomIcon = function (iconBase64) {
        return __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({
            iconUrl: "data:image/png;base64, " + iconBase64,
            shadowUrl: '/assets/marker-shadow.png',
            iconSize: [30, 30],
            shadowSize: [41, 41],
            iconAnchor: [12, 41],
            popupAnchor: [-170, -34]
        });
    };
    D3LeafletComponent.createDefaultIcon = function () {
        return __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({
            iconUrl: '/assets/marker-icon.png',
            shadowUrl: '/assets/marker-shadow.png',
            iconSize: [25, 41],
            shadowSize: [41, 41],
            iconAnchor: [12, 41],
            popupAnchor: [-170, -34]
        });
    };
    D3LeafletComponent.prototype.onChangeSelectedPeriod = function ($event) {
        this.markers.clearLayers();
        this.loadDataToMap();
    };
    return D3LeafletComponent;
}());
D3LeafletComponent = D3LeafletComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-d3-leaflet',
        template: __webpack_require__("../../../../../src/app/components/d3-leaflet/d3-leaflet.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/d3-leaflet/d3-leaflet.component.css")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewEncapsulation */].None // without we need shadow piercing like >>> in front of the styles to also have effect on the svg
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__shared_artifact_images_service__["a" /* ArtifactImagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_artifact_images_service__["a" /* ArtifactImagesService */]) === "function" && _b || Object])
], D3LeafletComponent);

var D3LeafletComponent_1, _a, _b;
//# sourceMappingURL=d3-leaflet.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/html-bar-chart/html-bar-chart.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ">>> .chart div {\r\n  font: 10px sans-serif;\r\n  background-color: red;\r\n  text-align: right;\r\n  padding: 3px;\r\n  margin: 1px;\r\n  color: white;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/html-bar-chart/html-bar-chart.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  html-bar-chart works!\n</p>\n\n<div class=\"chart\"></div>\n"

/***/ }),

/***/ "../../../../../src/app/components/html-bar-chart/html-bar-chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HtmlBarChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__ = __webpack_require__("../../../../d3-ng2-service/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HtmlBarChartComponent = (function () {
    function HtmlBarChartComponent(elementRef, d3Service) {
        this.d3 = d3Service.getD3();
        this.parentNativeElement = elementRef.nativeElement;
    }
    HtmlBarChartComponent.prototype.ngOnInit = function () {
        console.log("ngOnInit() called");
        var data;
        var x;
        data = [4, 8, 15, 16, 23, 42];
        x = this.d3.scaleLinear()
            .domain([0, this.d3.max(data)])
            .range([0, 420]);
        this.d3.select(".chart")
            .selectAll("div")
            .data(data)
            .enter().append("div")
            .style("width", function (d) { return x(d) + "px"; })
            .text(function (d) { return d; });
    };
    return HtmlBarChartComponent;
}());
HtmlBarChartComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-html-bar-chart',
        template: __webpack_require__("../../../../../src/app/components/html-bar-chart/html-bar-chart.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/html-bar-chart/html-bar-chart.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__["a" /* D3Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__["a" /* D3Service */]) === "function" && _b || Object])
], HtmlBarChartComponent);

var _a, _b;
//# sourceMappingURL=html-bar-chart.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/svg-bar-chart/svg-bar-chart.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ">>> .chart rect {\r\n  fill: steelblue;\r\n}\r\n>>> .chart text {\r\n  fill: white;\r\n  font: 10px sans-serif;\r\n  text-anchor: end;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/svg-bar-chart/svg-bar-chart.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  svg-bar-chart works!asdf\n</p>\n\n<svg class=\"chart\"></svg>\n"

/***/ }),

/***/ "../../../../../src/app/components/svg-bar-chart/svg-bar-chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SvgBarChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3__ = __webpack_require__("../../../../d3/build/d3.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_d3__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SvgBarChartComponent = (function () {
    function SvgBarChartComponent(elementRef, http) {
        this.http = http;
        this.parentNativeElement = elementRef.nativeElement;
    }
    SvgBarChartComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    SvgBarChartComponent.prototype.type = function (d) {
        d.value = +d.value; // coerce to number
        return d;
    };
    SvgBarChartComponent.prototype.getDataFromBackend = function () {
        return this.http.get("/assets/data/svg-bar-chart-data.tsv", { responseType: 'text' });
    };
    SvgBarChartComponent.prototype.getData = function () {
        var _this = this;
        this.getDataFromBackend()
            .subscribe(function (data) {
            console.log(data);
            _this.handleData(data);
        });
    };
    SvgBarChartComponent.prototype.handleData = function (data) {
        var width = 420;
        var barHeight = 20;
        var bar;
        var scale;
        var chart;
        var parsedData;
        scale = __WEBPACK_IMPORTED_MODULE_3_d3__["scaleLinear"]().range([0, width]);
        chart = __WEBPACK_IMPORTED_MODULE_3_d3__["select"](".chart").attr("width", width);
        parsedData = __WEBPACK_IMPORTED_MODULE_3_d3__["tsvParse"](data, this.type);
        scale.domain([0, __WEBPACK_IMPORTED_MODULE_3_d3__["max"](parsedData, function (d) { return d.value; })]);
        chart.attr("height", barHeight * parsedData.length);
        bar = chart.selectAll("g")
            .data(parsedData)
            .enter().append("g")
            .attr("transform", function (d, i) { return "translate(0," + i * barHeight + ")"; });
        bar.append("rect")
            .attr("width", function (d) { return scale(d.value); })
            .attr("height", barHeight - 1);
        bar.append("text")
            .attr("x", function (d) { return scale(d.value) - 3; })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(function (d) { return d.value; });
        var paragraphs;
        paragraphs = __WEBPACK_IMPORTED_MODULE_3_d3__["selectAll"]("p");
        paragraphs = paragraphs.style("color", "white");
        paragraphs.style("color", function (d, i) { return i % 2 ? "#fff" : "#eee"; });
        __WEBPACK_IMPORTED_MODULE_3_d3__["selectAll"]("p")
            .data([4, 8, 15, 16, 23, 42])
            .style("font-size", function (d) { return d + "px"; });
    };
    return SvgBarChartComponent;
}());
SvgBarChartComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-svg-bar-chart',
        template: __webpack_require__("../../../../../src/app/components/svg-bar-chart/svg-bar-chart.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/svg-bar-chart/svg-bar-chart.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _b || Object])
], SvgBarChartComponent);

var _a, _b;
//# sourceMappingURL=svg-bar-chart.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/vertical-bar-chart/vertical-bar-chart.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ">>> .bar {\r\n  fill: rgba(16, 168, 255, 0.6);\r\n}\r\n\r\n>>> .bar:hover {\r\n  fill: rgba(126, 208, 255, 0.6);\r\n}\r\n\r\n>>> .axis text {\r\n  font-size: 10px;\r\n}\r\n\r\n>>> .axis path,\r\n>>> .axis line {\r\n  fill: none;\r\n  stroke: #000;\r\n  shape-rendering: crispEdges;\r\n}\r\n\r\n>>> .x.axis path {\r\n  display: none;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/vertical-bar-chart/vertical-bar-chart.component.html":
/***/ (function(module, exports) {

module.exports = "<svg class=\"chart\"></svg>\n"

/***/ }),

/***/ "../../../../../src/app/components/vertical-bar-chart/vertical-bar-chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerticalBarChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__("../../../../d3/build/d3.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_ng2_service__ = __webpack_require__("../../../../d3-ng2-service/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_artifact_images_service__ = __webpack_require__("../../../../../src/app/shared/artifact-images.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VerticalBarChartComponent = (function () {
    function VerticalBarChartComponent(elementRef, d3Service, artifactImagesService) {
        this.getPeriodChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.d3 = d3Service.getD3();
        this.parentNativeElement = elementRef.nativeElement;
        this.artifactImagesService = artifactImagesService;
    }
    VerticalBarChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.artifactImagesService.artifactData$.subscribe(function (data) {
            _this.initBarChart(_this.createYearBuckets(data));
        });
    };
    VerticalBarChartComponent.prototype.createYearBuckets = function (data) {
        var yearCount = new Map();
        for (var i = 1650; i < 2000; i = i + 10) {
            yearCount.set(i, 0);
        }
        data.forEach(function (location) {
            var roundedYear;
            if (location.year < 1650) {
                roundedYear = 1650;
            }
            else {
                roundedYear = location.year - (location.year % 10);
            }
            yearCount.set(roundedYear, yearCount.get(roundedYear) + 1);
        });
        var yearCountAr = [];
        var year = 1650;
        for (var i = 0; year < 2000; i++) {
            yearCountAr[i] = [year, yearCount.get(year) || 0];
            year += 10;
        }
        return yearCountAr;
    };
    VerticalBarChartComponent.prototype.initBarChart = function (data) {
        var _this = this;
        var margin = { top: 20, right: 30, bottom: 30, left: 40 };
        var width = 1000 - margin.left - margin.right;
        var height = 150 - margin.top - margin.bottom;
        this.x = __WEBPACK_IMPORTED_MODULE_1_d3__["scaleBand"]().rangeRound([0, width]).padding(0.1);
        this.y = __WEBPACK_IMPORTED_MODULE_1_d3__["scaleLog"]().range([height, 0]).base(2);
        var xAxis = __WEBPACK_IMPORTED_MODULE_1_d3__["axisBottom"](this.x).tickFormat(function (num) {
            if (num === "1650")
                return "<1650";
            return num;
        });
        var yAxis = __WEBPACK_IMPORTED_MODULE_1_d3__["axisLeft"](this.y).ticks(6).tickFormat(function (num) {
            if (num < 1)
                return "0";
            return num.toString();
        });
        var chart = __WEBPACK_IMPORTED_MODULE_1_d3__["select"](".chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        this.x.domain(data.map(function (d) { return d[0].toString(); }));
        this.y.domain([0.4, __WEBPACK_IMPORTED_MODULE_1_d3__["max"](data, function (d) { return d[1]; })]);
        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        chart.append("g")
            .attr("class", "y axis")
            .call(yAxis);
        chart.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return _this.x(d[0].toString()); })
            .attr("y", function (d) {
            if (d[1] != 0)
                return _this.y(d[1]);
            return 0;
        })
            .attr("height", function (d) {
            if (d[1] != 0)
                return height - _this.y(d[1]);
            return 0;
        })
            .attr("width", this.x.bandwidth());
        chart.append("g")
            .attr("class", "brush")
            .call(__WEBPACK_IMPORTED_MODULE_1_d3__["brushX"]()
            .extent([[0, 0], [width, height]]).on("brush", function () {
            if (!__WEBPACK_IMPORTED_MODULE_1_d3__["event"].sourceEvent)
                return; // Only transition after input.
            if (!__WEBPACK_IMPORTED_MODULE_1_d3__["event"].selection)
                return; // Ignore empty selections.
            var index1 = Math.round((__WEBPACK_IMPORTED_MODULE_1_d3__["event"].selection[0] / _this.bandStep)) - 1;
            var val1 = _this.x.domain()[index1] || 0;
            var index2 = Math.round((__WEBPACK_IMPORTED_MODULE_1_d3__["event"].selection[1] / _this.bandStep)) - 1;
            var val2 = _this.x.domain()[index2] || 2000;
            _this.getPeriodChange.emit([Number(val1), Number(val2)]);
            // let targetSelection: number[] = [];
            // targetSelection[0] = Math.round((d3.event.selection[0] / this.bandStep))*this.bandStep;
            // targetSelection[1] = Math.round((d3.event.selection[1] / this.bandStep))*this.bandStep;
            // d3.select(d3.event.target).transition().call(d3.event.target.move, targetSelection);
        }));
        this.bandStep = this.x.step();
    };
    return VerticalBarChartComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Array)
], VerticalBarChartComponent.prototype, "getPeriod", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(),
    __metadata("design:type", Object)
], VerticalBarChartComponent.prototype, "getPeriodChange", void 0);
VerticalBarChartComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-vertical-bar-chart',
        template: __webpack_require__("../../../../../src/app/components/vertical-bar-chart/vertical-bar-chart.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/vertical-bar-chart/vertical-bar-chart.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_d3_ng2_service__["a" /* D3Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_d3_ng2_service__["a" /* D3Service */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_artifact_images_service__["a" /* ArtifactImagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_artifact_images_service__["a" /* ArtifactImagesService */]) === "function" && _c || Object])
], VerticalBarChartComponent);

var _a, _b, _c;
//# sourceMappingURL=vertical-bar-chart.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/AppSettings.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppSettings; });
var AppSettings = (function () {
    function AppSettings() {
    }
    return AppSettings;
}());

AppSettings.API_ENDPOINT = '/';
// public static API_OPERATION_ALL_ARTIFACTS='assets/data/artifacts.json';
AppSettings.API_OPERATION_ALL_ARTIFACTS = 'artifacts';
AppSettings.API_OPERATION_FULL_IMAGE = 'getFullSizeArtifactImage?id=';
AppSettings.API_OPERATION_IMAGE = 'getArtifactImage?id=';
//# sourceMappingURL=AppSettings.js.map

/***/ }),

/***/ "../../../../../src/app/shared/artifact-images.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArtifactImagesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__location_model__ = __webpack_require__("../../../../../src/app/shared/location.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_ReplaySubject__ = __webpack_require__("../../../../rxjs/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_ReplaySubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AppSettings__ = __webpack_require__("../../../../../src/app/shared/AppSettings.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ArtifactImagesService = ArtifactImagesService_1 = (function () {
    function ArtifactImagesService(http) {
        this.artifactDataSubject = new __WEBPACK_IMPORTED_MODULE_3_rxjs_ReplaySubject__["ReplaySubject"]();
        this.artifactData$ = this.artifactDataSubject.asObservable();
        this.http = http;
    }
    ArtifactImagesService.prototype.getResponse = function (operation, headers) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__AppSettings__["a" /* AppSettings */].API_ENDPOINT + operation, { headers: headers });
    };
    ArtifactImagesService.prototype.getImage = function (id) {
        return this.getResponse(__WEBPACK_IMPORTED_MODULE_4__AppSettings__["a" /* AppSettings */].API_OPERATION_IMAGE + id)
            .map(function (response) { return response.text(); });
    };
    ArtifactImagesService.prototype.fetchAllArtifacts = function () {
        var _this = this;
        return this.getResponse(__WEBPACK_IMPORTED_MODULE_4__AppSettings__["a" /* AppSettings */].API_OPERATION_ALL_ARTIFACTS, ArtifactImagesService_1.getJsonHeaders())
            .map(function (response) { return response.json().map(ArtifactImagesService_1.toArtifact); }).subscribe(function (artifact) { return _this.artifactDataSubject.next(artifact); });
    };
    ArtifactImagesService.getJsonHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Accept', 'application/json');
        return headers;
    };
    ArtifactImagesService.toArtifact = function (r) {
        return new __WEBPACK_IMPORTED_MODULE_2__location_model__["a" /* Location */](r.id, r.title, r.longitude, r.latitude, r.year);
    };
    return ArtifactImagesService;
}());
ArtifactImagesService = ArtifactImagesService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], ArtifactImagesService);

var ArtifactImagesService_1, _a;
//# sourceMappingURL=artifact-images.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/location.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Location; });
var Location = (function () {
    function Location(id, title, longitude, latitude, year) {
        this.id = id;
        this.title = title;
        this.longitude = longitude;
        this.latitude = latitude;
        this.year = year;
    }
    return Location;
}());

//# sourceMappingURL=location.model.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map