import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CronService {

  constructor(private http: HttpClient) { }

  getAllCronJobs() {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(`${environment.url}/cron`, httpOption).toPromise();
  }
}
