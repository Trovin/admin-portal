import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMatMenuComponent } from './user-mat-menu.component';

describe('UserMatMenuComponent', () => {
  let component: UserMatMenuComponent;
  let fixture: ComponentFixture<UserMatMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMatMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMatMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
