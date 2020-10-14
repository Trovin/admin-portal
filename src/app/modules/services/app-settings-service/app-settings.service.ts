import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { Breakpoint } from '@enums/breakpoint.enum';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  small = ['(min-width: 320px) and (max-width:620px)'];
  medium = ['(min-width: 621px) and (max-width: 1180px)'];
  large = ['(min-width: 1181px)'];

  sidebar = new BehaviorSubject(true);
  isDarkMode = new BehaviorSubject(true);
  screenSizeObserver = new BehaviorSubject<Breakpoint>(Breakpoint.SM);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.initObservers();
  }

  private initObservers() {
    this.breakpointObserver.observe(this.small).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.screenSizeObserver.next(Breakpoint.SM);
        this.sidebar.next(false);
      }
    });
    this.breakpointObserver.observe(this.medium).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.screenSizeObserver.next(Breakpoint.MD);
      }
    });
    this.breakpointObserver.observe(this.large).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.screenSizeObserver.next(Breakpoint.LG);
      }
    });
  }

}
