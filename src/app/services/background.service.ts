import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, timeout} from 'rxjs';
import {environment} from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private apiUrl = `https://api.unsplash.com/photos/random?client_id=${environment.unsplashApiKey}&query=calm&orientation=landscape&count=1`;
  private cacheKey = 'cachedBackground';
  private cacheDuration = 1 * 60 * 60 * 1000; // Cache for 1 hour
  private apiTimeout = 1000;

  constructor(private http: HttpClient) {}

  getCachedBackgroundOrFetchNew(): Observable<string> {
    const cachedData = localStorage.getItem(this.cacheKey);

    if (cachedData) {
      const { imageUrl, timestamp } = JSON.parse(cachedData);
      const now = new Date().getTime();

      if (now - timestamp < this.cacheDuration) {
        console.log('Using cached background');
        return of(imageUrl);
      }
    }
    return this.fetchNewBackground();
  }

  private fetchNewBackground(): Observable<string> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      timeout(this.apiTimeout),
      map(data => {
        if (data && data.length > 0) {
          const newImageUrl = data[0].urls.regular;
          this.saveToCache(newImageUrl);
          return newImageUrl;
        }
        return './images/background1.jpg';
      }),
      catchError(error => {
        console.error('Failed to fetch background:', error);
        return of('./images/background1.jpg');
      })
    );
  }

  private saveToCache(imageUrl: string): void {
    const cacheData = {
      imageUrl,
      timestamp: new Date().getTime()
    };
    localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
  }
}
