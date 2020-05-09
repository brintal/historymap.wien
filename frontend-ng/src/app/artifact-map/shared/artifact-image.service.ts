import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, ReplaySubject, Subject} from "rxjs";
import {EndpointSettings} from "../../shared/endpoint-settings";
import {HttpClient} from "@angular/common/http";
import {Artifact} from "../../shared/generated/domain";
import {FilterDefinition, FilterFunction} from "../../shared/filterDefinition";



@Injectable({
  providedIn: 'root'
})
export class ArtifactImageService {

  private filtersSubject = new Subject<FilterDefinition[]>();
  public filters$: Observable<FilterDefinition[]> = this.filtersSubject.asObservable();
  private filterDefinitions: FilterDefinition[] = [];

  private artifactDataSubject = new ReplaySubject<Artifact[]>();
  public artifactData$: Observable<Artifact[]> = this.artifactDataSubject.asObservable();
  private clearFilterNotifySubject = new Subject<void>();
  public clearFilterNotify$ = this.clearFilterNotifySubject.asObservable();
  private filters: Map<string, FilterFunction> = new Map<string, FilterFunction>();
  private currentData: Artifact[];
  private filterIdCounter: number = 0;

  constructor(private http: HttpClient) {
    this.fetchAllArtifacts();
  }

  public getImage(id: number): Observable<string> {
    return this.http.get(EndpointSettings.API_OPERATION_IMAGE + id, {responseType: 'text'});
  }

  public fetchAllArtifacts() {
    return this.http.get<Artifact[]>(EndpointSettings.API_OPERATION_ALL_ARTIFACTS)
      .subscribe(artifacts => {
        this.currentData = artifacts;
        this.publish();
      });
  }

  private publish() {
    let filteredData = [];
    this.currentData.forEach(artifact => {
      filteredData.push(artifact);
    })
    for(var filterFunction of this.filters.values()) {
      filteredData = filteredData.filter(filterFunction);
    }
    this.artifactDataSubject.next(filteredData);

    this.filtersSubject.next(this.filterDefinitions);
  }

  public addFilter(callbackfn: (value: Artifact) => boolean): string {
    let filterId = ""+this.filterIdCounter++;
    return this.addFilterById(filterId, callbackfn);
  }

  public addFilterById(filterId: string, callbackfn: (value: Artifact) => boolean): string {
    this.filters.set(filterId, callbackfn); //deprecated

    this.filterDefinitions.push({
      id: filterId,
      filterFunction: callbackfn
    });

    this.publish();
    return filterId;
  }

  public removeFilter(filterId: string) {
    this.filters.delete(filterId);
    this.filterDefinitions = this.filterDefinitions.filter(filter => filter.id != filterId);
  }

  public removeFilterAndPublish(filterId: string) {
    this.removeFilter(filterId);
    this.publish();
  }

  public clearFilters() {
    this.filters.clear();
    this.filterDefinitions = [];
    this.clearFilterNotifySubject.next();
    this.publish();
  }
}
