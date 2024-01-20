import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Demo } from '../models/demo.model';

@Injectable({
  providedIn: 'root'
})

export class DemoService {
  private DemoAPIapp: string = '/Demo';

  public constructor(private http: HttpClient, private router: Router) {}

  public getDemos(): Observable<Demo[]> {
    return this.http.get<Demo[]>(environment.DemoAPIhost + this.DemoAPIapp);
  }

  public getDemo(id: number): Observable<Demo> {
    return this.http.get<string | Demo>(environment.DemoAPIhost + this.DemoAPIapp + '/' + id)
      .pipe(catchError(this.handleError<string>())) as unknown as Observable<Demo>;
  }

  public addDemo(demo: Demo): Observable<string> {
    return this.http.post<string>(environment.DemoAPIhost + this.DemoAPIapp, demo)
      .pipe(catchError(this.handleError<string>()));
  }

  public updateDemo(id: number, demo: Demo): Observable<string> {
    return this.http.put<string>(environment.DemoAPIhost + this.DemoAPIapp + '/' + id, demo)
      .pipe(catchError(this.handleError<string>()));
  }

  public deleteDemo(id: number): Observable<string> {
    return this.http.delete<string>(environment.DemoAPIhost + this.DemoAPIapp + '/' + id)
    .pipe(catchError(this.handleError<string>()));
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      let errObj = JSON.parse(JSON.stringify(error));
      this.router.navigate(['error', errObj.error.Result])
      return of(result as T);
    };
  }
}
