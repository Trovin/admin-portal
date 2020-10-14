import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeHeadlineComponent } from './large-headline.component';

describe('LargeHeadlineComponent', () => {
  let component: LargeHeadlineComponent;
  let fixture: ComponentFixture<LargeHeadlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LargeHeadlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
