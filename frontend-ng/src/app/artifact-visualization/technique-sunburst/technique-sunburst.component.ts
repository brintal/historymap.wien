import {Component, ElementRef, OnInit} from '@angular/core';
import Sunburst from 'sunburst-chart';
import {HttpClient} from "@angular/common/http";
import {D3, D3Service} from "d3-ng2-service";

@Component({
  selector: 'app-technique-sunburst',
  templateUrl: './technique-sunburst.component.html',
  styleUrls: ['./technique-sunburst.component.scss']
})
export class TechniqueSunburstComponent implements OnInit {

  private d3: D3;

  constructor(private http: HttpClient, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {
    const color = this.d3.scaleOrdinal(this.d3.schemePaired);

    this.http.get("/api/getSunburstTechniqueData").subscribe(data => {
      Sunburst()
        .data(data)
        .size('value')
        .width('400')
        .height('400')
        // .onNodeClick(node => console.log("node clicked "+ node.name + " "+node.value))
        .color((d, parent) => color(parent ? parent.data.name : null))
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
