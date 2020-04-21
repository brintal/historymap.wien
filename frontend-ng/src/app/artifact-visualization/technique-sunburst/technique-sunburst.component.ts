import {Component, OnInit} from '@angular/core';
import Sunburst from 'sunburst-chart';
import {HttpClient} from "@angular/common/http";
import * as d3 from 'd3';

@Component({
  selector: 'app-technique-sunburst',
  templateUrl: './technique-sunburst.component.html',
  styleUrls: ['./technique-sunburst.component.scss']
})
export class TechniqueSunburstComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    this.http.get("/api/getSunburstTechniqueData").subscribe(data => {
      Sunburst()
        .data(data)
        .size('value')
        .width(400)
        .height(400)
        // .onNodeClick(node => console.log("node clicked "+ node.name + " "+node.value))
        // @ts-ignore
        .color(obj => {
          if (obj.name == 'Techniken') {
            return '#303030';
          }
          if (obj.__dataNode.parent != null && obj.__dataNode.parent.data.name != 'Techniken') {
            return d3.rgb(color(obj.__dataNode.parent.data.name)).brighter(1);
          }
          return color(obj.name);

        })
        // .color((d, parent) => color(parent ? parent.data.name : null))
        .tooltipContent((d, node) => `Size: <i>${node.value}</i>`)
        (document.getElementById('chart'));
    });
    // const data = {
    //   name: 'main',
    //   color: 'magenta',
    //   children: [{
    //     name: 'a',
    //     color: 'yellow',
    //     size: 1
    //   },{
    //     name: 'b',
    //     color: 'red',
    //     children: [{
    //       name: 'ba',
    //       color: 'orange',
    //       size: 1
    //     }, {
    //       name: 'bb',
    //       color: 'blue',
    //       children: [{
    //         name: 'bba',
    //         color: 'green',
    //         size: 1
    //       }, {
    //         name: 'bbb',
    //         color: 'pink',
    //         size: 1
    //       }]
    //     }]
    //   }]
    // };

  }


}
