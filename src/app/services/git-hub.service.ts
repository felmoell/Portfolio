import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GitHubService {

  constructor(private http: HttpClient) { }
  
  getData(): Promise<any> {
    const url = "https://porftilioapi-eufkg8eubuf9g2dm.germanywestcentral-01.azurewebsites.net/api/repos/allRepos";    
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get(url, httpOption).toPromise();
  }

  getTopicsData(repo:string): Promise<any> {
    const url = repo;    
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.mercy-preview+json'
      })
    };
    return this.http.get(url, httpOption).toPromise();
  }

  
}
