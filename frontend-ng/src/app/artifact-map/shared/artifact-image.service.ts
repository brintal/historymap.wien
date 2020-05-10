import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {EndpointSettings} from "../../shared/endpoint-settings";
import {HttpClient} from "@angular/common/http";
import {Artifact} from "../../shared/generated/domain";
import {ClearFilterCallbackFunction, FilterDefinition, FilterFunction} from "../../shared/filterDefinition";


@Injectable({
  providedIn: 'root'
})
export class ArtifactImageService {

  private filtersSubject = new Subject<FilterDefinition[]>();
  public filters$: Observable<FilterDefinition[]> = this.filtersSubject.asObservable();
  private filterDefinitions: Map<string, FilterDefinition> = new Map<string, FilterDefinition>();

  private artifactDataSubject = new ReplaySubject<Artifact[]>();
  public artifactData$: Observable<Artifact[]> = this.artifactDataSubject.asObservable();
  private clearFilterNotifySubject = new Subject<void>();
  public clearFilterNotify$ = this.clearFilterNotifySubject.asObservable();
  private filters: Map<string, FilterFunction> = new Map<string, FilterFunction>();
  private clearFilterCallbacks: Map<string, ClearFilterCallbackFunction> = new Map<string, ClearFilterCallbackFunction>();
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
    for (var filterFunction of this.filters.values()) {
      filteredData = filteredData.filter(filterFunction);
    }
    this.artifactDataSubject.next(filteredData);

    this.filtersSubject.next(Array.from(this.filterDefinitions.values()));
  }

  public addFilter(callbackfn: (value: Artifact) => boolean): string {
    let filterId = "" + this.filterIdCounter++;
    return this.addFilterById(filterId, "not supported", callbackfn, null);
  }

  public addFilterById(filterId: string, description: string, callbackfn: FilterFunction, clearFilterClb: ClearFilterCallbackFunction): string {
    this.filters.set(filterId, callbackfn); //deprecated

    this.filterDefinitions.set(filterId, {
      id: filterId,
      filterFunction: callbackfn,
      description: description,
      clearFilterCallback: clearFilterClb
    });

    this.publish();
    return filterId;
  }

  public removeFilter(filterId: string) {
    this.filters.delete(filterId);
    this.filterDefinitions.get(filterId).clearFilterCallback();
    this.filterDefinitions.delete(filterId);
  }

  private callClearFilterCallback(filterId: string) {
    this.filterDefinitions.forEach(filterDefinition => {
      if (filterDefinition.id == filterId) {
        filterDefinition.clearFilterCallback();
      }
    })
  }

  public removeFilterAndPublish(filterId: string) {
    this.removeFilter(filterId);
    this.publish();
  }

  public clearFilters() {
    this.filters.clear();
    this.filterDefinitions.forEach(filterDefinition => filterDefinition.clearFilterCallback())
    this.filterDefinitions.clear();
    this.clearFilterNotifySubject.next();
    this.publish();
  }
}
