import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Artifact} from "./generated/domain";
import {EndpointSettings} from "./endpoint-settings";

@Injectable({
  providedIn: 'root'
})
export class ApikeyService {

  public googleApiKey: string;

  constructor(private http: HttpClient) {
    this.fetchApiKey();
  }

  private fetchApiKey() {
    // @ts-ignore
    return this.http.get<string>(EndpointSettings.API_OPERATION_API_KEY, {responseType: 'text'})
      .subscribe(googleApiKey => {
        this.googleApiKey = googleApiKey;
      });
  }
}
