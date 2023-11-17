import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  backend = 'https://localhost:7122/'

  constructor(private http: HttpClient) { }

  post(url: string, obj: any) {
    return this.http
      .post(this.backend + url, obj)
  }
}
