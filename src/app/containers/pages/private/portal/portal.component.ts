import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { Subscription } from 'rxjs';

import { AppSettingsService } from '@services/app-settings-service/app-settings.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit, OnDestroy {

  width: SafeStyle;
  sidebar: boolean;
  isDarkMode: boolean;

  stream = new Subscription();

  constructor(private settingsService: AppSettingsService) { }

  ngOnInit() {
    const modeSetting = this.settingsService.isDarkMode.subscribe(state => this.isDarkMode = state);
    const sidebarSetting = this.settingsService.sidebar.subscribe(state => this.sidebar = state);

    this.stream.add(modeSetting);
    this.stream.add(sidebarSetting);
  }

  setColorMode(state: boolean) {
    this.settingsService.isDarkMode.next(state);
  }

  setSidebarState(state: boolean) {
    this.settingsService.sidebar.next(state);
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

}
