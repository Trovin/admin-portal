import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatusMenuComponent } from './task-status-menu.component';

describe('TaskStatusMenuComponent', () => {
  let component: TaskStatusMenuComponent;
  let fixture: ComponentFixture<TaskStatusMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskStatusMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskStatusMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
