import { Component } from '@angular/core';

import { PORTAL_USERS } from '@mocks/portal-users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent  {

  users = PORTAL_USERS;

}
