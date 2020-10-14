import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '@core/auth/auth.service';
import { AppSettingsService } from '@services/app-settings-service/app-settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() toggleSidebarState = new EventEmitter<boolean>();

  @Input() darkMode: boolean;

  stream = new Subscription();

  sidebar = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private settingsService: AppSettingsService
  ) { }

  ngOnInit() {
    const settingsServiceStream = this.settingsService.sidebar
      .subscribe(state => this.sidebar = state);

    this.stream.add(settingsServiceStream);
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  changeSidebarState(event) {
    this.toggleSidebarState.emit(event.returnValue);
  }

  logout() {
    const logoutStream = this.authService.logout()
      .subscribe(() => this.router.navigate(['auth/login']));

    this.stream.add(logoutStream);
  }

}
