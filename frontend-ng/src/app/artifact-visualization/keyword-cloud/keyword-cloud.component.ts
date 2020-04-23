import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as D3 from 'd3';
import {HttpClient} from "@angular/common/http";

declare let d3: any;

@Component({
  selector: 'app-keyword-cloud',
  templateUrl: './keyword-cloud.component.html',
  styleUrls: ['./keyword-cloud.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KeywordCloudComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get("/api/getKeywordSummary").subscribe(data => {

      console.log(data);


      var cloud = d3.layout.cloud;

      // @ts-ignore
      data = data.filter(entry => entry.size > 10);


      // var myScale = D3.scaleLinear()
      //   .domain([1, data[0].size])
      //   .range([10, 50]);

      var myScale = D3.scaleLog()
        .base(2)
        .domain([10, data[0].size])
        .range([5, 50]);

      var layout = cloud()
        .size([500, 500])
      // @ts-ignore
        .words(data.map(function(d) {
          return {text: d.text, size: myScale(d.size), id: d.id};
        }))
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 1) * 90; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", draw);

      layout.start();

      function draw(words) {
        D3.select(".cloud")
          .attr("width", layout.size()[0])
          .attr("height", layout.size()[1])
          .append("g")
          .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
          .selectAll("text")
          .data(words)
          .enter().append("text")
          .style("font-size", function(d) {
            // @ts-ignore
            return d.size + "px"; })
          .style("font-family", "Impact")
          .style("fill", function(d, i) { return '#000'; })
          .style("cursor", "pointer")
          .attr("text-anchor", "middle")
        // @ts-ignore
          .attr("class", d => 'keyword'+d.id)
          .attr("transform", function(d) {
            // @ts-ignore
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
            // @ts-ignore
          .text(function(d) { return d.text; })
          .on("click", d => {
            D3.select(".currentSelectedKeyword").classed("currentSelectedKeyword", false);
            // @ts-ignore
            D3.select(".keyword"+d.id).classed("currentSelectedKeyword", true);
            });
      }


    });
  }
}

