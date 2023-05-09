import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable, } from 'rxjs';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private userUrl = "api/users";
  
  constructor(
    private http: HttpClient
  ) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user).pipe(tap((user: User) => console.log(`ajouter users w/ ${user.username} id=${user.id}`)));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }
}
