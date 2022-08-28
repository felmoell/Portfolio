import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAllRepos() {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };  
    return this.http.get(`${environment.url}/repos`, httpOption).toPromise();
  }
}

