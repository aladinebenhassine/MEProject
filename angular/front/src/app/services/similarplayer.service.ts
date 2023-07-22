import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SimilarplayerService {

  private apiUrl = 'http://127.0.0.1:105/';
  private playersUrl = this.apiUrl + 'players/';
  private similarPlayersUrl = this.apiUrl + 'getlike/';

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<string[]> {
    return this.http.get<any>(this.playersUrl).pipe(
      map(response => {
        if (response && response.result === 'success') {
          return response.data;
        } else {
          throw new Error('Failed to fetch players.');
        }
      })
    );
  }

  getSimilarPlayers(playerName: string): Observable<any> {
    const formData = new FormData();
    formData.append('Player', playerName);

    return this.http.post<any>(this.similarPlayersUrl, formData).pipe(
      map(response => {
        if (response && response.result === 'success') {
          return response.data;
        } else {
          throw new Error('Failed to fetch similar players.');
        }
      })
    );
  }
}
