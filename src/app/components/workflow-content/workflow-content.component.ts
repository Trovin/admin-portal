import { Component, Input } from '@angular/core';

import { Task } from '@models/task/task.dto';

@Component({
  selector: 'app-workflow-content',
  templateUrl: './workflow-content.component.html',
  styleUrls: ['./workflow-content.component.scss']
})
export class WorkflowContentComponent {

  @Input() item: Task;
  @Input() className = '';

}
