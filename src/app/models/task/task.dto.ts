import { taskStatusType } from '@enums/task-status-type.enum';
import { taskCategoryList } from '@enums/task-category-list.enum';

export class Task {
  id?: number;
  value: string;
  list: taskCategoryList;
  status: taskStatusType;
  isPriority: boolean;

  constructor(data: Task) {
    if (data) {
      this.id = data.id;
      this.value = data.value;
      this.list = data.list;
      this.status = data.status;
      this.isPriority = data.isPriority;
    }
  }
}
