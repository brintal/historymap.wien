import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {EndpointSettings} from "../../shared/endpoint-settings";
import {HttpClient} from "@angular/common/http";
import {Artifact} from "../../shared/generated/domain";
import {
  ClearFilterCallbackFunction,
  FilterChangeEvent,
  FilterDefinition,
  FilterFunction
} from "../../shared/filterDefinition";


@Injectable({
  providedIn: 'root'
})
export class ArtifactImageService {

  private filtersSubject = new Subject<FilterChangeEvent>();
  public filters$: Observable<FilterChangeEvent> = this.filtersSubject.asObservable();
  private filterDefinitions: Map<string, FilterDefinition> = new Map<string, FilterDefinition>();

  private artifactDataSubject = new ReplaySubject<Artifact[]>();
  public artifactData$: Observable<Artifact[]> = this.artifactDataSubject.asObservable();
  private clearFilterNotifySubject = new Subject<void>();
  private currentData: Artifact[];

  constructor(private http: HttpClient) {
    this.fetchAllArtifacts();
  }

  private fetchAllArtifacts() {
    return this.http.get<Artifact[]>(EndpointSettings.API_OPERATION_ALL_ARTIFACTS)
      .subscribe(artifacts => {
        this.currentData = artifacts;
        this.artifactDataSubject.next(this.currentData);
        this.publish(null);
      });
  }

  private publish(triggerFilterId: string) {
    let filterChangeEvent: FilterChangeEvent = {
      triggerFilterId: triggerFilterId,
      filters:Array.from(this.filterDefinitions.values())
    };

    this.filtersSubject.next(filterChangeEvent);
  }

  public addFilterById(filterId: string, description: string, callbackfn: FilterFunction, clearFilterClb: ClearFilterCallbackFunction): string {
    this.filterDefinitions.set(filterId, {
      id: filterId,
      filterFunction: callbackfn,
      description: description,
      clearFilterCallback: clearFilterClb
    });

    this.publish(filterId);
    return filterId;
  }

  public removeFilter(filterId: string) {
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
    if (!this.filterDefinitions.has(filterId)) return;
    this.removeFilter(filterId);
    this.publish(null);
  }

  public clearFilters() {
    this.filterDefinitions.forEach(filterDefinition => filterDefinition.clearFilterCallback())
    this.filterDefinitions.clear();
    this.clearFilterNotifySubject.next();
    this.publish(null);
  }
}
