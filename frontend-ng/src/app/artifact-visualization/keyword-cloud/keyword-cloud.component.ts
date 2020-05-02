import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as D3 from 'd3';
import {HttpClient} from "@angular/common/http";
import {ArtifactImageService} from "../../artifact-map/shared/artifact-image.service";
import {Artifact, Keyword} from "../../shared/generated/domain";

declare let d3: any;

type KeywordSummary = { id: number, text: string, size: number, x: number, y: number, rotate: number };

@Component({
  selector: 'app-keyword-cloud',
  templateUrl: './keyword-cloud.component.html',
  styleUrls: ['./keyword-cloud.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class KeywordCloudComponent implements OnInit {

  private filterId: number;
  private selectedKeywordId: number;

  constructor(private artifactImagesService: ArtifactImageService, private http: HttpClient) {
  }

  ngOnInit(): void {

    let keywordMap: Map<string, number> = new Map<string, number>();

    let subscription = this.artifactImagesService.artifactData$.subscribe(data => {
      let mappedData = this.mapData(data, keywordMap);

      let myScale = D3.scaleLog()
        .base(2)
        .domain([10, mappedData[0].size])
        .range([5, 50]);

      let layout = d3.layout.cloud()
        .size([500, 500])
        .words(mappedData.map(keywordSummary => (<KeywordSummary>{
          text: keywordSummary.text,
          size: myScale(keywordSummary.size),
          id: keywordSummary.id
        })))
        .padding(5)
        // .rotate(() => ~~(Math.random() * 1) * 90)
        .font("Impact")
        .fontSize(keyword => keyword.size)
        .on("end", draw);

      let self = this;

      function draw(words: KeywordSummary[]) {
        {
          D3.select(".cloud")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", value => value.size + "px")
            .style("font-family", "Impact")
            .style("fill", (d, i) => 'darkgray')
            .style("cursor", "pointer")
            .attr("text-anchor", "middle")
            .attr("class", value => 'keyword' + value.id)
            .attr("title", value => value.text)
            .attr("transform", value => {
              return "translate(" + [value.x, value.y] + ")rotate(" + value.rotate + ")";
            })
            .text(value => value.text)
            .on("click", value => {
              D3.select(".currentSelectedKeyword").classed("currentSelectedKeyword", false);
              if (value.id != self.selectedKeywordId) {
                D3.select(".keyword" + value.id).classed("currentSelectedKeyword", true);
              }
              self.addKeywordFilter(value.id);
            })
            .append("title")
            .text(value => value.text);
        }
      }
      layout.start();
      subscription.unsubscribe();
    });

    this.artifactImagesService.clearFilterNotify$.subscribe(value => {
      D3.select(".currentSelectedKeyword").classed("currentSelectedKeyword", false);
    })
  }

  private addKeywordFilter(keywordId: number) {
    if (this.selectedKeywordId == keywordId) {
      this.artifactImagesService.removeFilter(this.filterId);
      this.selectedKeywordId = null;
      this.filterId = null;
      return;
    }
    this.artifactImagesService.removeFilter(this.filterId);
    this.filterId = this.artifactImagesService.addFilter(artifact => {
      for (var keyword of artifact.keywords) {
        if (keyword.id == keywordId) {
          return true;
        }
      }
      return false;
    })
    this.selectedKeywordId = keywordId;
  }

  private mapData(data: Artifact[], keywordMap: Map<string, number>): KeywordSummary[] {
    data.forEach(artifact => {
      for (var keyword of artifact.keywords) {
        let keywordAsString = JSON.stringify(keyword);
        if (keywordMap.has(keywordAsString)) {
          keywordMap.set(keywordAsString, keywordMap.get(keywordAsString) + 1);
        } else {
          keywordMap.set(keywordAsString, 1);
        }
      }
    });
    let mappedData: KeywordSummary[] = Array.from(keywordMap, ([key, value]) => {
      let keyword: Keyword = JSON.parse(key);
      return <KeywordSummary>{id: keyword.id, text: keyword.value, size: value}
    });
    mappedData = mappedData
      .filter(entry => entry.size > 5)
      .sort((a, b) => {
        if (a.size > b.size) {
          return -1;
        }
        if (a.size < b.size) {
          return 1;
        }
        return 0;
      });
    return mappedData;
  }
}

