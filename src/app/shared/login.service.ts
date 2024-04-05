import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private _userRole: "user" | "admin" | null = null

  getUserRole(): "user" | "admin" | null {
    return this._userRole
  }

  login(data: any): Observable<{role: "user" | "admin" | null}> {
    return this.http.post<{role: "user" | "admin" | null}>(environment.BACKEND_BASE_URL + '/login', data).pipe(
      tap(res => {
        console.log("res : ", res);
        
        this._userRole = res.role
      })
      )
  }
}
