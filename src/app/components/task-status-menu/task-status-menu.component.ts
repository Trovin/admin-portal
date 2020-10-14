import { Component, Output, EventEmitter, Input } from '@angular/core';

import { Task } from '@models/task/task.dto';

import { TASK_MENU_ITEMS } from '@mocks/task-menu-items';

import { taskCategoryList } from '@enums/task-category-list.enum';

import { ITaskMenuItem } from '@interfaces/task-menu-item.interface';
import { ITaskMenuAction } from '@interfaces/task-menu-action.interface';

@Component({
  selector: 'app-task-status-menu',
  templateUrl: './task-status-menu.component.html',
  styleUrls: ['./task-status-menu.component.scss']
})
export class TaskStatusMenuComponent {

  @Output() addNewTask = new EventEmitter<void>();
  @Output() removeTaskItem = new EventEmitter<ITaskMenuAction>();
  @Output() updateTaskStatus = new EventEmitter<ITaskMenuAction>();
  @Output() toggleTaskPriority = new EventEmitter<Task>();

  @Input() item: Task;
  @Input() currentList: string;

  items = TASK_MENU_ITEMS;

  changePriority() {
    this.item.isPriority = !this.item.isPriority;
    this.toggleTaskPriority.emit(this.item);
  }

  removeSelectedTask() {
    this.removeTaskItem.emit(this.getSelectedItemData());
  }

  processTaskStatus(item: ITaskMenuItem) {
    const data = this.getSelectedItemData(item);
    this.item.status = item.status;
    this.item.list = data.toList as taskCategoryList;
    this.updateTaskStatus.emit(this.getSelectedItemData(item));
  }

  getSelectedItemData(item?: ITaskMenuItem): ITaskMenuAction {
    return {
      fromList: this.currentList,
      toList: item?.list,
      itemId: Number(this.item.id)
    };
  }

}
