import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { Task } from '../../models/Task';
import { environment } from '../../../environments/environment.development';
import { State } from '../../models/Enums';
import { Kpi } from '../../models/Kpi';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private dataChnageSubject: Subject<void> = new Subject<void>();
  dataChnaged$: Observable<void> = this.dataChnageSubject.asObservable();
  constructor(private http: HttpClient) { }
  private url: string = environment.TaskApiurl;

  get(state:string):Observable<Task[]> {
    let params=new HttpParams();
    params=params.set('state',state)
    // params=params.append('state',State.Active);
    return this.http.get<Task[]>(`${this.url}`,{params});
  }
  add(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.url}`, task).pipe(
      tap(()=>{
        this.dataChnageSubject.next();
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      tap(()=>{
        this.dataChnageSubject.next();
      })
    );
  }
  
  update(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.url}/${id}`, task).pipe(
      tap(()=>{
        this.dataChnageSubject.next();
      })
    );
  }
  

  getKpi():Observable<Kpi>{
    return this.http.get<Kpi>(`${this.url}/kpi`);
  }
}
