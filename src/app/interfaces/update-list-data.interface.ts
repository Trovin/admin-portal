import { Task } from '@models/task/task.dto';

export interface IListsData {
  toDoList: Task[];
  inProgressList: Task[];
  completedList: Task[];
}

export interface IUpdateListData {
  data: Task[];
}
