import { Component, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '@core/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnDestroy {

  stream = new Subscription();
  headline = 'Glad to meet you!';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  register(data) {
    this.stream = this.authService.register(data.firstName, data.lastName, data.email, data.password, data.selectedCountry, data.registrationDate)
      .subscribe(() => this.router.navigate(['portal/home']));
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

}

