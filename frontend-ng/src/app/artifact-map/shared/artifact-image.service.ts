import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {EndpointSettings} from "../../shared/endpoint-settings";
import {Artifact} from "../../shared/artifact";
import {HttpClient} from "@angular/common/http";

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

  private static toArtifact(r: any): Artifact {
    return new Artifact(r.id, r.title, r.longitude, r.latitude, r.year, r.techniqueCategory);
  }
}
