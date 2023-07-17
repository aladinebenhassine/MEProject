// auth.service.ts
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthService {
  private apiUrl = 'http://localhost:5000';

  private JWT_TOKEN = 'jwt_token';

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  getToken(): any {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
  register(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const body = { email, password };
    return this.http.post(url, body);
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const body = { email, password };
    return this.http.post(url, body);
  }
}
