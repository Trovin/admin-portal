import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '@core/auth/auth.service';
import { Subscription } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '@models/user/input-user.dto';

import { IAuthFormData } from '@interfaces/auth-form-data.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;

  stream = new Subscription();

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  update(data: IAuthFormData) {
    this.stream = this.authService.update(
      this.user.id,
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.selectedCountry,
      data.registrationDate
    ).subscribe(user => {
      this.snackBar.open('User profile is updated', 'Ok', {
        duration: 4000,
        panelClass: ['snackbar'],
        horizontalPosition: 'end'
      });

      this.user = user;
    });
  }

  ngOnInit() {
    this.user = this.authService.userValue;
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

}
