import {Component, ElementRef, OnInit} from '@angular/core';
import {D3, D3Service,} from 'd3-ng2-service';
import {ScaleLinear} from "d3-scale";


@Component({
  selector: 'app-html-bar-chart',
  templateUrl: './html-bar-chart.component.html',
  styleUrls: ['./html-bar-chart.component.css']
})
export class HtmlBarChartComponent implements OnInit {

  private d3: D3;
  private parentNativeElement: any;

  constructor(elementRef: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = elementRef.nativeElement;
  }


  ngOnInit() {
    console.log("ngOnInit() called");

    let data: number[];
    let x: ScaleLinear<number, number>;

    data = [4, 8, 15, 16, 23, 42];
    x = this.d3.scaleLinear()
      .domain([0, this.d3.max(data)])
      .range([0, 420]);

    this.d3.select(".chart")
      .selectAll("div")
      .data(data)
      .enter().append("div")
      .style("width", (d:number) => x(d) + "px")
      .text((d:number) => d);

  }

}
