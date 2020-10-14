import { ITaskMenuItem } from '@interfaces/task-menu-item.interface';
import { taskStatusType } from '@enums/task-status-type.enum';
import { taskCategoryList } from '@enums/task-category-list.enum';

export const TASK_MENU_ITEMS: ITaskMenuItem[] = [
  {
    list: taskCategoryList.TO_DO,
    status: taskStatusType.TO_DO,
    iconClass: 'fa fa-external-link-square'
  },
  {
    list: taskCategoryList.IN_PROGRESS,
    status: taskStatusType.IN_PROGRESS,
    iconClass: 'fa fa-spinner'
  },
  {
    list: taskCategoryList.COMPLETED,
    status: taskStatusType.COMPLETED,
    iconClass: 'fa fa-check'
  }
];
