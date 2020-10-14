import { taskStatusType } from '@enums/task-status-type.enum';
import { taskCategoryList } from '@enums/task-category-list.enum';

export interface ITaskMenuAction {
  fromList: string;
  toList?: taskCategoryList;
  itemId: number;
  status?: taskStatusType;
}
