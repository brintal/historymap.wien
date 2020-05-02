import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, ReplaySubject, Subject} from "rxjs";
import {EndpointSettings} from "../../shared/endpoint-settings";
import {HttpClient} from "@angular/common/http";
import {Artifact} from "../../shared/generated/domain";


type FilterFunction = (value: Artifact) => boolean;

@Injectable({
  providedIn: 'root'
})
export class ArtifactImageService {


  private artifactDataSubject = new ReplaySubject<Artifact[]>();
  public artifactData$: Observable<Artifact[]> = this.artifactDataSubject.asObservable();
  private clearFilterNotifySubject = new Subject<void>();
  public clearFilterNotify$ = this.clearFilterNotifySubject.asObservable();
  private filters: Map<number, FilterFunction> = new Map<number, FilterFunction>();
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
  }

  public addFilter(callbackfn: (value: Artifact) => boolean): number {
    let filterId = this.filterIdCounter++;
    this.filters.set(filterId, callbackfn);
    this.publish();
    return filterId;
  }

  public removeFilter(filterId: number) {
    this.filters.delete(filterId);
    this.publish();
  }

  public clearFilters() {
    this.filters.clear();
    this.publish();
    this.clearFilterNotifySubject.next();
  }
}
