import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggledMenuComponent } from './toggled-menu.component';

describe('ToggledMenuComponent', () => {
  let component: ToggledMenuComponent;
  let fixture: ComponentFixture<ToggledMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggledMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggledMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
