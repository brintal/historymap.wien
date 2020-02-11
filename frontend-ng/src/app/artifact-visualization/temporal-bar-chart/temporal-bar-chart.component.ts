import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {D3, D3Service} from "d3-ng2-service";
import {ArtifactImageService} from "../../artifact-map/shared/artifact-image.service";
import {ScaleBand, ScaleLogarithmic} from "d3-scale";
import * as d3 from 'd3';
import {Artifact} from "../../shared/generated/domain";

@Component({
  selector: 'app-temporal-bar-chart',
  templateUrl: './temporal-bar-chart.component.html',
  styleUrls: ['./temporal-bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemporalBarChartComponent implements OnInit {

  private d3: D3;
  private parentNativeElement: any;
  private artifactImagesService: ArtifactImageService;

  private x: ScaleBand<string>;
  private y: ScaleLogarithmic<number, number>;
  private bandStep: number;

  @Input() getPeriod: [number, number];
  @Output() getPeriodChange = new EventEmitter<[number, number]>();

  constructor(elementRef: ElementRef, d3Service: D3Service, artifactImagesService: ArtifactImageService) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = elementRef.nativeElement;
    this.artifactImagesService = artifactImagesService;}

  ngOnInit() {
    this.artifactImagesService.artifactData$.subscribe(data => {
      this.initBarChart(this.createYearBuckets(data));
    });
  }

  private createYearBuckets(data: Artifact[]): [number, number][] {
    let yearCount: Map<number, number> = new Map();
    for (var i = 1650; i < 2000; i = i + 10) {
      yearCount.set(i, 0);
    }
    data.forEach(artifact => {
      let roundedYear: number;
      if (artifact.year < 1650) {
        roundedYear = 1650;
      } else {

        roundedYear = artifact.year - (artifact.year % 10);
      }
      yearCount.set(roundedYear, yearCount.get(roundedYear) + 1);
    });

    let yearCountAr: [number, number][] = [];
    let year = 1650;
    for (var i = 0; year < 2000; i++) {
      yearCountAr[i] = [year, yearCount.get(year) || 0];
      year += 10;
    }

    return yearCountAr;
  }

  private initBarChart(data: [number, number][]) {
    let margin = {top: 20, right: 30, bottom: 30, left: 40};
    let width = 500 - margin.left - margin.right;
    let height = 150 - margin.top - margin.bottom;

    this.x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    this.y = d3.scaleLog().range([height, 0]).base(2);

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

    let chart = d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.x.domain(data.map(d => d[0].toString()));
    this.y.domain([0.4, d3.max(data, d => d[1])]);

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
      .attr("class", d=>`bar-${d[0].toString()}`)
      .attr("x", d => this.x(d[0].toString()))
      .attr("y", d => {
        if (d[1] != 0)
          return this.y(d[1]);
        return 0;
      })
      .attr("height", d => {
        if (d[1] != 0)
          return height - this.y(d[1]);
        return 0;
      })
      .attr("width", this.x.bandwidth());

    chart.append("g")
      .attr("class", "brush")
      .call(d3.brushX()
        .extent([[0, 0], [width, height]]).on("end", () => { //on: "end" or "brush"
          if (!d3.event.sourceEvent) return; // Only transition after input.
          if (!d3.event.selection) return; // Ignore empty selections.

          let index1 = Math.round((d3.event.selection[0] / this.bandStep)) - 1;
          let val1 = this.x.domain()[index1] || 0;
          let index2 = Math.round((d3.event.selection[1] / this.bandStep)) - 1;
          let val2 = this.x.domain()[index2] || 2000;
          this.getPeriodChange.emit([Number(val1), Number(val2)])

          // let targetSelection: number[] = [];
          // targetSelection[0] = Math.round((d3.event.selection[0] / this.bandStep))*this.bandStep;
          // targetSelection[1] = Math.round((d3.event.selection[1] / this.bandStep))*this.bandStep;
          // d3.select(d3.event.target).transition().call(d3.event.target.move, targetSelection);
        }));
    this.bandStep = this.x.step();
  }

}
