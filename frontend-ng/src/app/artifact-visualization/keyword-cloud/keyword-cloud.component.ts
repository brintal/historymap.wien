import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as D3 from 'd3';
import {HttpClient} from "@angular/common/http";
import {ArtifactImageService} from "../../artifact-map/shared/artifact-image.service";
import {Artifact, Keyword} from "../../shared/generated/domain";
import {FilterDefinition} from "../../shared/filterDefinition";

declare let d3: any;

type KeywordSummary = { id: number, text: string, size: number, x: number, y: number, rotate: number };

@Component({
  selector: 'app-keyword-cloud',
  templateUrl: './keyword-cloud.component.html',
  styleUrls: ['./keyword-cloud.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class KeywordCloudComponent implements OnInit {

  private data: Artifact[];
  private filterId: string = "KEYWORD_CLOUD_FILTER";
  private selectedKeywordIds: number[] = [];
  private keywordMap: Map<number, KeywordSummary> = new Map<number, KeywordSummary>();

  constructor(private artifactImagesService: ArtifactImageService, private http: HttpClient) {
  }

  ngOnInit(): void {

    let subscription = this.artifactImagesService.artifactData$.subscribe(data => {
      this.data = data;
      this.initCloud(data);
      subscription.unsubscribe();
    });

    this.artifactImagesService.filters$.subscribe(filterChangeEvent => {
      let filteredData: Artifact[] = [];
      this.data.forEach(artifact => {
        filteredData.push(artifact);
      })
      for(var filter of filterChangeEvent.filters) {
        // if (filter.id == this.filterId) continue;
        filteredData = filteredData.filter(filter.filterFunction);
      }

      let keywordMap: Map<string, number> = new Map<string, number>();
      let mappedData = this.mapData(filteredData, keywordMap);

      D3.select(".cloud").selectAll(".keywordElement").classed("currentSelectedKeyword", false);
      D3.select(".cloud").selectAll(".keywordElement").classed("unavailableKeyword", true);

      for(var keywordSummary of mappedData) {
        D3.select(".cloud").select(".keyword"+keywordSummary.id).classed("unavailableKeyword", false);
        if (this.selectedKeywordIds.includes(keywordSummary.id)) {
          D3.select(".cloud").select(".keyword"+keywordSummary.id).classed("currentSelectedKeyword", true);

        }

      }


    });
  }

  private artifactMatchesFilters(artifact: Artifact, filters: FilterDefinition[]) {
    for (var filter of filters) {
      if(!filter.filterFunction.apply(artifact)) {
        return false;
      }
    }
    return true;
  }

  private initCloud(data: Artifact[]) {
    let keywordMap: Map<string, number> = new Map<string, number>();
    let mappedData: KeywordSummary[] = this.mapData(data, keywordMap);

    mappedData.forEach(keywordSummary => {
      this.keywordMap.set(keywordSummary.id, keywordSummary);
    })

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
          .attr("text-anchor", "middle")
          .attr("class", value => 'keywordElement keyword' + value.id)
          .attr("title", value => value.text)
          .attr("transform", value => {
            return "translate(" + [value.x, value.y] + ")rotate(" + value.rotate + ")";
          })
          .text(value => value.text)
          .on("click", value => {
            D3.select(".currentSelectedKeyword").classed("currentSelectedKeyword", false);
            if (!self.selectedKeywordIds.includes(value.id)) {
              D3.select(".keyword" + value.id).classed("currentSelectedKeyword", true);
            }
            self.addKeywordFilter(value.id);
          })
          .append("title")
          .text(value => value.text);
      }
    }

    layout.start();
  }

  private addKeywordFilter(keywordId: number) {
    let self = this;
    if (this.selectedKeywordIds.includes(keywordId)) {
      this.selectedKeywordIds.splice(this.selectedKeywordIds.indexOf(keywordId, 0), 1);
    } else {
      this.selectedKeywordIds.push(keywordId);
    }
    if (this.selectedKeywordIds.length > 0) {
      this.artifactImagesService.addFilterById(
        this.filterId,
        `Keywords: ${this.selectedKeywordIds.map(id => this.keywordMap.get(id).text).join(", ")}`,
        artifact => {
          for(var selectedKeywordId of this.selectedKeywordIds) {
            if (!artifact.keywords.map(keyword => keyword.id).includes(selectedKeywordId)){
              return false;
            }
          }
          return true;
        },
        () => {
          D3.select(".currentSelectedKeyword").classed("currentSelectedKeyword", false);
          self.selectedKeywordIds = [];
        })
    } else {
      this.artifactImagesService.removeFilterAndPublish(this.filterId);
    }

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

