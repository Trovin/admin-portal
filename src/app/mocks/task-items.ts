import { Task } from '@models/task/task.dto';

import { taskStatusType } from '@enums/task-status-type.enum';
import { taskCategoryList } from '@enums/task-category-list.enum';

export const TO_DO_TASKS: Task[] = [
  {
    id: 1,
    value: 'Get to work',
    list: taskCategoryList.TO_DO,
    status: taskStatusType.TO_DO,
    isPriority: true
  },
  {
    id: 2,
    value: 'Get to shop',
    list: taskCategoryList.TO_DO,
    status: taskStatusType.TO_DO,
    isPriority: true
  },
  {
    id: 3,
    value: 'Pick up groceries',
    list: taskCategoryList.TO_DO,
    status: taskStatusType.TO_DO,
    isPriority: true
  },
  {
    id: 4,
    value: 'Go home',
    list: taskCategoryList.TO_DO,
    status: taskStatusType.TO_DO,
    isPriority: true
  },
  {
    id: 5,
    value: 'Fall asleep',
    list: taskCategoryList.TO_DO,
    status: taskStatusType.TO_DO,
    isPriority: true
  }
];

export const IN_PROGRESS_TASKS: Task[] = [
  {
    id: 6,
    value: 'Get up',
    list: taskCategoryList.IN_PROGRESS,
    status: taskStatusType.IN_PROGRESS,
    isPriority: false
  },
  {
    id: 7,
    value: 'Brush teeth',
    list: taskCategoryList.IN_PROGRESS,
    status: taskStatusType.IN_PROGRESS,
    isPriority: true
  },
  {
    id: 8,
    value: 'Take a shower',
    list: taskCategoryList.IN_PROGRESS,
    status: taskStatusType.IN_PROGRESS,
    isPriority: false
  },
  {
    id: 9,
    value: 'Check e-mail',
    list: taskCategoryList.IN_PROGRESS,
    status: taskStatusType.IN_PROGRESS,
    isPriority: true
  },
];

export const COMPLETED_TASKS: Task[] = [
  {
    id: 10,
    value: 'Check phone',
    list: taskCategoryList.COMPLETED,
    status: taskStatusType.COMPLETED,
    isPriority: true
  },
  {
    id: 11,
    value: 'Walk dog',
    list: taskCategoryList.COMPLETED,
    status: taskStatusType.COMPLETED,
    isPriority: true
  }
];
