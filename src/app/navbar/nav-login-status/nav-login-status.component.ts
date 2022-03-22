import { Component, Inject, Input, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { filter, firstValueFrom, map, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-login-status',
  templateUrl: './nav-login-status.component.html',
  styleUrls: ['./nav-login-status.component.css'],
})
export class NavLoginStatusComponent implements OnInit {
  @Input() public offcanvas: boolean = false;
  public isAuthenticated!: boolean;

  constructor(
    private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.oktaAuthService.authState$
      .pipe(
        filter((s: AuthState) => !!s),
        map((s: AuthState) => s.isAuthenticated ?? false)
      )
      .subscribe((res) => {
        this.isAuthenticated = res;
        this.getUser();
      });
  }

  public async signIn(): Promise<void> {
    await this.oktaAuth.signInWithRedirect();
  }

  public async signOut(): Promise<void> {
    await this.oktaAuth.signOut();
    this.userService.invalidateUser();
  }

  public async getUser(): Promise<void> {
    if (this.isAuthenticated) {
      console.log('로그인된 상태입니다.');
      const user = await this.oktaAuth.getUser();
      this.userService.saveUser({
        name: user.name,
        email: user.email,
      });
    } else {
      console.log('로그아웃된 상태입니다.');
      this.userService.user = undefined;
    }
  }
}
