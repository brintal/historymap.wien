import {Component, ElementRef, OnInit} from '@angular/core';
import {BaseType, D3, D3Service, Selection} from 'd3-ng2-service';
import {DSVParsedArray, DSVRowAny} from "d3-dsv";
import {HttpClient} from "@angular/common/http";
import 'rxjs/Rx';
import {ScaleLinear} from "d3-scale";
import * as d3 from 'd3';

@Component({
  selector: 'app-svg-bar-chart',
  templateUrl: './svg-bar-chart.component.html',
  styleUrls: ['./svg-bar-chart.component.css']
})
export class SvgBarChartComponent implements OnInit {

  private parentNativeElement: any;
  private http: HttpClient;

  constructor(elementRef: ElementRef, http: HttpClient) {
    this.http = http;
    this.parentNativeElement = elementRef.nativeElement;
  }

  ngOnInit() {
    this.getData();
  }

  private type(d:DSVRowAny) : DSVRowAny {
    d.value = +d.value; // coerce to number
    return d;
  }


  public getDataFromBackend() {
    return this.http.get("/assets/data/svg-bar-chart-data.tsv", {responseType: 'text'});
  }

  public getData() {
    this.getDataFromBackend()
      .subscribe((data: string) => {
        console.log(data)
        this.handleData(data);
      });
  }

  private handleData(data: string) {

    let width: number = 420;
    let barHeight: number = 20;
    let bar: Selection<BaseType, any, SVGElement, {}>;
    let scale: ScaleLinear<number, number>;
    let chart: Selection<SVGElement, {}, HTMLElement, {}>;
    let parsedData: DSVParsedArray<DSVRowAny>;

    scale = d3.scaleLinear().range([0, width]);
    chart = d3.select<SVGElement, {}>(".chart").attr("width", width);
    parsedData = d3.tsvParse(data, this.type);

    scale.domain([0, d3.max(parsedData, (d) => d.value)]);

    chart.attr("height", barHeight * parsedData.length);

    bar = chart.selectAll<SVGElement, {}>("g")
      .data(parsedData)
      .enter().append("g")
      .attr("transform", (d, i) => "translate(0," + i * barHeight + ")");

    bar.append("rect")
      .attr("width", (d) => scale(d.value))
      .attr("height", barHeight - 1);

    bar.append("text")
      .attr("x", (d) => scale(d.value) - 3)
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text((d) => d.value);

    let paragraphs: Selection<HTMLParagraphElement, Object, HTMLElement, Object>;
    paragraphs = d3.selectAll<HTMLParagraphElement, Object>("p");
    paragraphs = paragraphs.style("color", "white");
    paragraphs.style("color", (d:undefined,i:number) => i % 2 ? "#fff" : "#eee"  );

    d3.selectAll<HTMLParagraphElement, number>("p")
      .data([4, 8, 15, 16, 23, 42])
      .style("font-size", function(d) { return d + "px"; });


  }

}
