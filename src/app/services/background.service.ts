import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private accessKey = 'RGvXvjypwre1gzqert_hZJVU0Ky_7CROGdT8WS88gzw';
  private apiUrl = `https://api.unsplash.com/photos/random?client_id=${this.accessKey}&query=calm&orientation=landscape&count=1`;

  constructor(private http: HttpClient) {}

  getRandomBackground(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
