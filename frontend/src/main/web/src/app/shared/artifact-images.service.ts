import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Location} from "./location.model";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {AppSettings} from "./AppSettings";

@Injectable()
export class ArtifactImagesService {

  private http: Http;
  private artifactDataSubject = new ReplaySubject<Location[]>();
  public artifactData$ = this.artifactDataSubject.asObservable();

  constructor(http: Http) {
    this.http = http;
  }

  private getResponse(operation: string, headers?: Headers): Observable<Response> {
    return this.http.get(AppSettings.API_ENDPOINT + operation, {headers: headers});
  }

  public getImage(id: number): Observable<string> {
    return this.getResponse(AppSettings.API_OPERATION_IMAGE + id)
      .map((response: Response) => response.text());
  }

  public fetchAllArtifacts() {
    return this.getResponse(AppSettings.API_OPERATION_ALL_ARTIFACTS, ArtifactImagesService.getJsonHeaders())
      .map(response => response.json().map(ArtifactImagesService.toArtifact)).subscribe(artifact => this.artifactDataSubject.next(artifact));
  }

  private static getJsonHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  private static toArtifact(r: any): Location {
    return new Location(r.id, r.title, r.longitude, r.latitude, r.year);
  }
}

