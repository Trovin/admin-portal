import { taskStatusType } from '@enums/task-status-type.enum';
import { taskCategoryList } from '@enums/task-category-list.enum';

export interface ITaskMenuItem {
  list: taskCategoryList;
  status: taskStatusType;
  iconClass: string;
}
