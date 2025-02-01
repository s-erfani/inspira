import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private apiUrl = `https://api.unsplash.com/photos/random?client_id=${environment.unsplashApiKey}&query=calm&orientation=landscape&count=1`;

  constructor(private http: HttpClient) {}

  getRandomBackground(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
