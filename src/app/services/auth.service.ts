import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(mail, pw) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      
    };

    let body = {
      "email": mail,
      "password": pw
    }
    return this.http.post(`${environment.url}/login`,body, httpOption).toPromise();
  }

  getAuthToken(){
    return localStorage.getItem("Bearer_Token")
  }
}
