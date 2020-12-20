import { Component, OnInit, OnDestroy } from '@angular/core';

import { Task } from '@models/task/task.dto';
import { User } from '@models/user/input-user.dto';

import { Subscription } from 'rxjs';

import { PORTAL_USERS } from '@mocks/portal-users';

import { safeChartType } from '@enums/safe-chart-type.enum';
import { taskPriorityType } from '@enums/task-priority-type.enum';

import { IChartStats } from '@interfaces/chart-stats.interface';
import { IFormSelectItem } from '@interfaces/form-select-item.inteface';

import { AppSettingsService } from '@services/app-settings-service/app-settings.service';

import { AuthService } from '@core/auth/auth.service';
import { TaskRestService } from '@services/task-rest-service/task-rest.service';

import { ComposeChartDataService } from '@services/compose-chart-service/compose-chart-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  user: User;
  tasks: Task[];

  users = PORTAL_USERS;
  stream: Subscription;

  taskPriority = taskPriorityType;

  chartStats: IChartStats = {
    text: '',
    values: [],
    labels: [],
    colors: []
  };

  loading = true;
  chartType = safeChartType;

  priorities: IFormSelectItem[] = [
    { value: this.taskPriority.ALL, viewValue: this.taskPriority.ALL },
    { value: this.taskPriority.PRIORITY, viewValue: this.taskPriority.PRIORITY }
  ];

  constructor(
    private authService: AuthService,
    private taskService: TaskRestService,
    private settingsService: AppSettingsService,
    private chartDataService: ComposeChartDataService
  ) { }

  ngOnInit() {
    this.user = this.authService.userValue;
    this.stream = this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
        this.composeTasksData(tasks);
      });
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  changeTaskPriority(priorityType: string) {
    const data = priorityType === this.taskPriority.ALL ? this.tasks : this.tasks.filter(task => task.isPriority === true);
    this.composeTasksData(data);
  }

  private composeTasksData(tasks: Task[]) {
    this.loading = false;
    this.chartStats = this.chartDataService.composeData(tasks);
  }

}

