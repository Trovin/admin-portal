import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskRestService } from '@services/task-rest-service/task-rest.service';

import { Task } from '@models/task/task.dto';

import { IUpdateListData } from '@interfaces/update-list-data.interface';
import { ITaskMenuAction } from '@interfaces/task-menu-action.interface';

import { taskStatusType } from '@enums/task-status-type.enum';
import { taskCategoryList } from '@enums/task-category-list.enum';

import { TaskModalFormComponent } from '@containers/common-layers/forms/task-modal-form/task-modal-form.component';

import { moveFromBottomAnimation } from '@modules/shared/animations/move-from-bottom.animation';

const dialogData = {
  value: '',
  list: '',
  status: '',
  isPriority: false
};

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
  animations: [moveFromBottomAnimation],
  entryComponents: [TaskModalFormComponent]
})
export class WorkflowComponent implements OnInit, OnDestroy {

  stream = new Subscription();

  loading = true;
  animationState = false;

  statusType = taskStatusType;
  categoryList = taskCategoryList;

  toDoList = [];
  inProgressList = [];
  completedList = [];

  constructor(
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private taskService: TaskRestService
  ) { }

  ngOnInit() {
    const tasksStream = this.taskService.getTasksByLists()
      .subscribe(tasks => {
        this.sortTasksByList(tasks);
        this.changeAnimationState();
        this.loading = false;
      });

    this.stream.add(tasksStream);
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  drop(event: CdkDragDrop<Task[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    const container = event.container;

    this.updateTasksListsAfterDrop({
      fromList: container.id,
      toList: container.element.nativeElement.id as taskCategoryList,
      status: container.element.nativeElement.getAttribute('data-status') as taskStatusType,
      itemId: Number(event.item.element.nativeElement.id)
    });
  }

  createTask() {
    const dialogRef = this.dialog.open(TaskModalFormComponent, {
      width: '300px',
      data: dialogData
    });

    const modalStream = dialogRef.afterClosed();
    const tasks = modalStream
      .pipe(switchMap(data => data ? this.taskService.createTask(data) : []));

    const tasksStream = tasks.subscribe(tasks => this.sortTasksByList(tasks));
    this.stream.add(tasksStream);
  }

  deleteTask(data: ITaskMenuAction) {
    const tasksStream = this.taskService.deleteTaskById(data.itemId)
      .subscribe(tasks => this.sortTasksByList(tasks));

    this.stream.add(tasksStream);
  }

  updateTask(task: Task) {
    const tasksStream = this.taskService.updateTaskById(task.id, task)
      .subscribe(tasks => this.sortTasksByList(tasks));

    this.stream.add(tasksStream);
  }

  changeTaskList(data: ITaskMenuAction) {
    const item = this[data.fromList].find(item => item.id === data.itemId);

    this[data.fromList] = this[data.fromList].filter(item => item.id !== data.itemId);
    this[data.toList].unshift(item);
    this.updateTasksLists();
  }

  updateTasksListsAfterDrop(data: ITaskMenuAction) {
    this[data.fromList].forEach(item => {
      if (item.id === data.itemId) {
        item.list = data.toList;
        item.status = data.status;
      }
    });

    this.updateTasksLists();
  }

  private updateTasksLists() {
    const tasksStream = this.taskService.updateTasksLists({
      toDoList: this.toDoList,
      inProgressList: this.inProgressList,
      completedList: this.completedList
    }).subscribe(tasks => this.sortTasksByList(tasks));

    this.stream.add(tasksStream);
  }

  private changeAnimationState() {
    setTimeout(() => this.animationState = true, 0);
    this.cdRef.detectChanges();
  }

  private sortTasksByList(tasks: IUpdateListData) {
    this.toDoList = tasks[this.categoryList.TO_DO];
    this.inProgressList = tasks[this.categoryList.IN_PROGRESS];
    this.completedList = tasks[this.categoryList.COMPLETED];
  }

}
