import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Artifact} from "../../shared/generated/domain";

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  constructor(
    private http: HttpClient) {
  }

  getArtifacts(): Observable<Artifact[]> {
    return this.http.get<Artifact[]>('/api/artifacts')
      .pipe(
        tap(_ => console.log('fetched artifacts')),
        catchError(this.handleError<Artifact[]>('getArtifacts', []))
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
