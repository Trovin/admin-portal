import { Component, OnDestroy, OnInit } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';

import { Subscription } from 'rxjs';

import { AppSettingsService } from '@services/app-settings-service/app-settings.service';

interface IColorsSetting {
  themeColor: string;
  navItemColor: string;
  themeInfoColor: string;
  wrapperLayoutColor: string;
}

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit, OnDestroy {

  width: SafeStyle;
  sidebar: boolean;

  stream = new Subscription();

  darkThemeColors: IColorsSetting = {
    themeColor: '#0e1a35',
    navItemColor: '#122143',
    themeInfoColor: '#FFFFFF',
    wrapperLayoutColor: '#FFFFFF'
  };

  lightThemeColors: IColorsSetting = {
    themeColor: '#666ad6',
    navItemColor: '#4f39d7',
    themeInfoColor: '#FFFFFF',
    wrapperLayoutColor: '#FFFFFF'
  };

  constructor(private settingsService: AppSettingsService) {
    this.changeThemeColor(this.darkThemeColors);
  }

  ngOnInit() {
    const sidebarSetting = this.settingsService.sidebar.subscribe(state => this.sidebar = state);
    const modeSetting = this.settingsService.isDarkMode.subscribe(state => {
      state ? this.changeThemeColor(this.darkThemeColors) : this.changeThemeColor(this.lightThemeColors);
    });

    this.stream.add(modeSetting);
    this.stream.add(sidebarSetting);
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  setColorMode(state: boolean) {
    this.settingsService.isDarkMode.next(state);
  }

  setSidebarState(state: boolean) {
    this.settingsService.sidebar.next(state);
  }

  private changeThemeColor(colors: IColorsSetting) {
    document.documentElement.style.setProperty('--theme-color', colors.themeColor);
    document.documentElement.style.setProperty('--nav-item-color', colors.navItemColor);
    document.documentElement.style.setProperty('--theme-info-color', colors.themeInfoColor);
    document.documentElement.style.setProperty('--wrapper-layout-color', colors.wrapperLayoutColor);
  }

}
