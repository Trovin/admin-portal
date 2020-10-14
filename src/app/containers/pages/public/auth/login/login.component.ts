import { Component, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';

import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  stream = new Subscription();
  headline = 'Welcome back!';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  login(data) {
    this.stream = this.authService.login(data.email, data.password)
      .subscribe(
        () => this.router.navigate(['portal/home']),
        () => this.snackBar.open('User is not registered', 'Ok', {
          duration: 4000,
          panelClass: ['snackbar'],
          horizontalPosition: 'end'
        })
    );
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

}
