import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Artifact} from "./artifact";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  constructor(
    private http: HttpClient) {
  }

  /** GET heroes from the server */
  getArtifacts(): Observable<Artifact[]> {
    return this.http.get<Artifact[]>('/api/artifacts')
      .pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError<Artifact[]>('getHeroes', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
