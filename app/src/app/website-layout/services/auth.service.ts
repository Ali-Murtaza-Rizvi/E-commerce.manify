import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  constructor(private http:HttpClient) { }

  //get token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  
  isAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    }
    return false;
  }
  
  getName(): any {
    const token = localStorage.getItem(this.tokenKey);
    if(token){
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload.username);
      return payload.username;
    }
  }
  //signup
  signup(email: string, username:string, password:string, isAdmin:boolean){
    return this.http.post('http://localhost:7001/api/auth/register', { email,username,password,isAdmin });
  }
  
  //login
  
  // 🔁 BehaviorSubject to track login state
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public loggedIn$ = this.loggedInSubject.asObservable(); // observable to subscribe from component
  
  // 🔁 Check if token exists in local storage
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
  
  login(email: string, password: string){
    return this.http.post<{token:string}>('http://localhost:7001/api/auth/login', {email, password}).pipe(
      tap((response: any) => {
        const token = response.token;
        localStorage.setItem(this.tokenKey, token);
        this.loggedInSubject.next(true); // emit true when logged in
      })
    )
  }

   // ✅ Reactive status
   isLoggedIn(): Observable<boolean> {
    return this.loggedIn$;
  }


  //logout
  
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.loggedInSubject.next(false); // 🔁 emit logged out
  }
}