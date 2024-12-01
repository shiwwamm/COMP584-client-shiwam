import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { LoginResponse } from './login-response';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private _authStatus = new BehaviorSubject<boolean>(false);
  public authStatus = this._authStatus.asObservable();

  private isAuthenticated() : boolean {
    return localStorage.getItem("launchCode") != null;
  }

  getToken() : string | null {
    return localStorage.getItem("launchCode");
  }

  private setAuthStatus(isAuthenticated: boolean) : void {
    this. _authStatus.next(isAuthenticated);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.baseUrl}api/Admin/Login`, loginRequest)
    .pipe(tap(loginResult => {
      if (loginResult.success) {
        localStorage.setItem("launchCode", loginResult.token);
        this.setAuthStatus(true);
      }
      
    }));
    
    }

  logout(){ 
    localStorage.removeItem("launchCode");
    this.setAuthStatus(false);
  }
}