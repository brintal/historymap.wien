import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {EndpointSettings} from "../../shared/endpoint-settings";
import {HttpClient} from "@angular/common/http";
import {Artifact} from "../../shared/generated/domain";

@Injectable({
  providedIn: 'root'
})
export class ArtifactImageService {

  private artifactDataSubject = new ReplaySubject<Artifact[]>();
  public artifactData$ = this.artifactDataSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  public getImage(id: number): Observable<string> {
    return this.http.get(EndpointSettings.API_OPERATION_IMAGE + id, {responseType: 'text'});
  }

  public fetchAllArtifacts() {
    return this.http.get<Artifact[]>(EndpointSettings.API_OPERATION_ALL_ARTIFACTS)
      .subscribe(artifact => this.artifactDataSubject.next(artifact));
  }
}
