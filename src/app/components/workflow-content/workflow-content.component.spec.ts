import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowContentComponent } from './workflow-content.component';

describe('WorkflowContentComponent', () => {
  let component: WorkflowContentComponent;
  let fixture: ComponentFixture<WorkflowContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
