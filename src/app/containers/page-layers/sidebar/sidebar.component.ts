import { Component, Output, EventEmitter, OnInit, OnDestroy, Renderer2 } from '@angular/core';

import { Breakpoint } from '@enums/breakpoint.enum';

import { Subscription } from 'rxjs';

import { MAIN_MENU_ITEMS } from '@mocks/main-menu-items';

import { AppSettingsService } from '@services/app-settings-service/app-settings.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Output() toggleColorMode = new EventEmitter<boolean>();

  sidebar: boolean;
  smallScreen: boolean;

  isDarkMode: boolean;

  stream = new Subscription();

  menuItems = MAIN_MENU_ITEMS;

  constructor(
    private render: Renderer2,
    private settingsService: AppSettingsService
  ) { }

  ngOnInit() {
    const breakpoint = this.settingsService.screenSizeObserver
      .subscribe(value => this.smallScreen = value as Breakpoint === Breakpoint.SM);

    const modeSettingStream = this.settingsService.isDarkMode
      .subscribe(value => this.isDarkMode = value);

    const sidebarSettingStream = this.settingsService.sidebar
      .subscribe(state => {
        this.sidebar = state;

        if (this.smallScreen) {
          this.changeBodyClass();
        }
      });

    this.stream.add(breakpoint);
    this.stream.add(modeSettingStream);
    this.stream.add(sidebarSettingStream);
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  closeSidebar() {
    if (this.smallScreen) {
      this.settingsService.sidebar.next(false);
    }
  }

  changeColorMode(event) {
    this.toggleColorMode.emit(event.checked);
  }

  setSidebarState(state) {
    this.settingsService.sidebar.next(state.returnValue);
  }

  private changeBodyClass() {
    this.sidebar ? this.render.addClass(document.body, 'hidden-content') : this.render.removeClass(document.body, 'hidden-content');
  }

}
