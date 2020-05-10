import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ArtifactImageService} from "../../artifact-map/shared/artifact-image.service";
import {ScaleBand, ScaleLogarithmic} from "d3-scale";
import * as d3 from 'd3';
import {Artifact} from "../../shared/generated/domain";
import {Selection} from "d3-selection";
import {BrushBehavior} from "d3-brush";

@Component({
  selector: 'app-temporal-bar-chart',
  templateUrl: './temporal-bar-chart.component.html',
  styleUrls: ['./temporal-bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemporalBarChartComponent implements OnInit {

  @Input() showDescription: boolean = true;
  @Input() chartId: string;

  private data: Artifact[];
  private initialized: boolean = false;
  private t = d3.transition().duration(750);
  private x: ScaleBand<string>;
  private y: ScaleLogarithmic<number, number>;
  private yearCount: Map<number, number> = new Map();
  private yearBuckets: [number, number][];
  private filterId: string = "TEMPORAL_CHART_FILTER";
  private width: number;
  private height: number;
  private chart: Selection<any, any, any, any>;
  private colorRange = Array.from(d3.schemeSpectral[11].entries()).map(value => value[1]);
  // @ts-ignore
  private color = d3.scaleLinear().range(this.colorRange).domain([1650, 1700, 1750, 1775, 1800, 1825, 1850, 1875, 1900, 1950, 1990]);
  private brushSelectionIndexFrom:number;
  private brushSelectionIndexTo:number;

  constructor(private artifactImagesService: ArtifactImageService) {
  }

  ngOnInit() {
    let subscription = this.artifactImagesService.artifactData$.subscribe(data => {
      this.data = data;
      this.yearBuckets = this.createYearBuckets(data);
      this.initBarChart(this.yearBuckets);
      this.updateBarChart(this.yearBuckets);
      this.initBrush();
      subscription.unsubscribe();
    });

    this.artifactImagesService.filters$.subscribe(filters => {
      let filteredData: Artifact[] = [];
      this.data.forEach(artifact => {
        filteredData.push(artifact);
      })
      for(var filter of filters) {
        if (filter.id == this.filterId) continue;
        filteredData = filteredData.filter(filter.filterFunction);
      }
      this.yearBuckets = this.createYearBuckets(filteredData);
      this.updateBarChart(this.yearBuckets);
    });
  }

  private initialize(data: [number, number][]) {
    this.initBarChart(data);
    this.updateBarChart(data);
    this.initBrush();

    this.initialized = true;
  }


  private initBarChart(data: [number, number][]) {
    let margin = {top: 20, right: 30, bottom: 30, left: 40};
    this.width = 500 - margin.left - margin.right;
    this.height = 150 - margin.top - margin.bottom;
    this.x = d3.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3.scaleLog().range([this.height, 0]).base(2);

    let xAxis = d3.axisBottom(this.x).tickFormat(num => {
      if (num === "1650")
        return "<1650";
      if (parseInt(num)%50 === 0 ) {
        return num;
      }
      return "";
    });
    let yAxis = d3.axisLeft(this.y).ticks(6).tickFormat(num => {
      if (num < 1)
        return "0";
      return num.toString();
    });

    this.chart = d3.select("#"+this.chartId)
      .attr("width", this.width + margin.left + margin.right)
      .attr("height", this.height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.x.domain(data.map(d => d[0].toString()));
    this.y.domain([0.4, d3.max(data, d => d[1])]);

    this.chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(xAxis);

    this.chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);


    // this.artifactImagesService.clearFilterNotify$.subscribe(value => {
    //   this.clearFilter();
    // });

  }

  private updateBarChart(data: [number, number][]) {

    // data = data.filter(value => value[1] > 0);

    let rects: Selection<SVGRectElement, [number, number], any, any>;
    rects = this.chart.selectAll<SVGRectElement, any>("rect")
      .data(data);

    // rects.exit()
    //   // .attr("fill", "red")
    //   // .transition(this.t)
    //   // .attr("y", this.y(0.4))
    //   // .attr("height", 0)
    //   .remove();

    rects
      .enter().append("rect")
      .attr("class", "bar")
      .attr("fill",d => this.color(d[0].toString()))
      .attr("x", d => this.x(d[0].toString()))
      .attr("y", 0)
      .attr("height", 0)
      .attr("width", this.x.bandwidth())
      .merge(rects)
      .transition(this.t)
        .attr("x", d => this.x(d[0].toString()))
        .attr("width", this.x.bandwidth())
        .attr("y", d => d[1] != 0 ? this.y(d[1]) : this.y(0.4))
        .attr("height", d =>  d[1] != 0 ? this.height - this.y(d[1]) : 0);

  }

  private brush: BrushBehavior<any>;

  private initBrush() {

    let self = this;

    this.brush = d3.brushX().extent([[0, 0], [this.width, this.height]]);

    let brushElement = this.chart.append("g")
      .attr("class", "brush");

    brushElement.call(this.brush);

    this.brush.on("end", () => { //on: "end" or "brush"
      if (!d3.event.sourceEvent) return; // Only transition after input.
      if (!d3.event.selection) return; // Ignore empty selections.

      let index1 = Math.round((d3.event.selection[0] / this.x.step())) - 1;
      let index2 = Math.round((d3.event.selection[1] / this.x.step())) - 1;
      let val1 = this.x.domain()[index1] || 0;
      let val2 = this.x.domain()[index2] || 2000;

      if (this.brushSelectionIndexFrom != null
        && this.brushSelectionIndexTo != null
        && this.brushSelectionIndexFrom == index1
        && this.brushSelectionIndexTo == index2) return;

      this.brushSelectionIndexFrom = index1;
      this.brushSelectionIndexTo = index2;

      // @ts-ignore
      this.chart.select(".brush").transition(this.t).call(this.brush.move, [this.x(val1.toString()), this.x(val2.toString())]);
      this.artifactImagesService.addFilterById(
        this.filterId,
          `Time: ${val1}-${val2}`,
          artifact => (artifact.year >= Number(val1) && artifact.year <= Number(val2)),
          () => {
            d3.selectAll(".brush").remove();
            self.initBrush();
            self.brushSelectionIndexFrom = null;
            self.brushSelectionIndexTo = null;
          });


    });

  }



  private createYearBuckets(data: Artifact[]): [number, number][] {

    for (var i = 1650; i < 2000; i = i + 10) {
      this.yearCount.set(i, 0);
    }
    data.forEach(artifact => {
      let roundedYear: number;
      if (artifact.year < 1650) {
        roundedYear = 1650;
      } else {

        roundedYear = artifact.year - (artifact.year % 10);
      }
      this.yearCount.set(roundedYear, this.yearCount.get(roundedYear) + 1);
    });

    let yearCountAr: [number, number][] = [];
    let year = 1650;
    for (var i = 0; year < 2000; i++) {
      yearCountAr[i] = [year, this.yearCount.get(year) || 0];
      year += 10;
    }

    return yearCountAr;
  }

}
