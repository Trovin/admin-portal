import { Component, OnDestroy, OnInit } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';

import { Subscription } from 'rxjs';

import { IColorsSetting } from '@interfaces/color-settings.interface';

import { AppSettingsService } from '@services/app-settings-service/app-settings.service';
import { darkThemeColors, lightThemeColors } from '@modules/shared/helpers';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit, OnDestroy {

  width: SafeStyle;
  sidebar: boolean;

  stream = new Subscription();

  decorationItems = [];

  darkTheme = darkThemeColors;
  lightTheme = lightThemeColors;

  constructor(private settingsService: AppSettingsService) {
    this.decorationItems.length = 15;
    this.changeThemeColor(this.darkTheme);
  }

  ngOnInit() {
    const sidebarSetting = this.settingsService.sidebar.subscribe(state => this.sidebar = state);
    const modeSetting = this.settingsService.isDarkMode.subscribe(state => {
      state ? this.changeThemeColor(this.darkTheme) : this.changeThemeColor(this.lightTheme);
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
    document.documentElement.style.setProperty('--headline-color', colors.headlineColor);
    document.documentElement.style.setProperty('--nav-item-color', colors.navItemColor);
    document.documentElement.style.setProperty('--theme-item-color', colors.themeItemColor);
    document.documentElement.style.setProperty('--theme-info-color', colors.themeInfoColor);
    document.documentElement.style.setProperty('--wrapper-layout-color', colors.wrapperLayoutColor);
  }

}
