import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../shared/user';
import appConfig from '../config/app-config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = `${appConfig.API_URL}/api/users`;
  user: User | undefined;

  constructor(private http: HttpClient) {}

  public async saveUser(user: User) {
    try {
      this.user = await firstValueFrom(this.findUserByEmail(user.email!));
      // console.log('로컬 유저 정보: ', this.user);
    } catch {
      (error: Error) => console.log(error);
      console.log('등록된 정보가 없습니다: 사용자 ', user, '를 등록합니다.');
      this.http
        .post<User>(this.baseUrl, user, {
          headers: {
            contentType: 'application/json',
          },
        })
        .subscribe((newUser) => {
          this.user = newUser;
          // console.log('로컬 유저 정보: ', this.user);
        });
    }
  }

  public findUserByEmail(email: string): Observable<User> {
    const url = `${this.baseUrl}/search/findUserByEmail?email=${email}`;
    return this.http.get<User>(url);
  }

  public invalidateUser() {
    this.user = undefined;
  }
}
