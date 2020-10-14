import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/auth/auth.service';
import { Subscription } from 'rxjs';

import { User } from '@models/user/input-user.dto';

import { IAuthFormData } from '@interfaces/auth-form-data.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;

  stream = new Subscription();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.userValue;
  }

  update(data: IAuthFormData) {

    this.authService.update(this.user.id, data.firstName, data.lastName, data.email, data.password, data.selectedAnswer)
      .subscribe(user => this.user = user);
  }

}
