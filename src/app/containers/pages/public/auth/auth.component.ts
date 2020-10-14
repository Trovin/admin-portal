import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { logoSize } from '@enums/logo-size.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  showLogo: boolean;
  stream: Subscription;

  logoSize = logoSize.LARGE;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.stream = this.breakpointObserver
      .observe(['(min-width: 769px)'])
      .subscribe((state: BreakpointState) => this.showLogo = state.matches);
  }

  ngOnDestroy(): void {
    this.stream.unsubscribe();
  }

}
