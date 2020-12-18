import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppSettingsService } from '@services/app-settings-service/app-settings.service';

import { Subscription } from 'rxjs';

import { Task } from '@models/task/task.dto';
import { User } from '@models/user/input-user.dto';

import { AuthService } from '@core/auth/auth.service';
import { TaskRestService } from '@services/task-rest-service/task-rest.service';

import { ComposeChartDataService } from '@services/compose-chart-service/compose-chart-data.service';

import { PORTAL_USERS } from '@mocks/portal-users';

import { IChartStats } from '@interfaces/chart-stats.interface';
import { safeChartType } from '@enums/safe-chart-type.enum';

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

  chartStats: IChartStats = {
    text: '',
    values: [],
    labels: [],
    colors: []
  };

  loading = true;
  chartType = safeChartType;

  constructor(
    private authService: AuthService,
    private taskService: TaskRestService,
    private settingsService: AppSettingsService,
    private chartDataService: ComposeChartDataService
  ) { }

  ngOnInit() {
    this.user = this.authService.userValue;

    this.stream = this.taskService.getPriorityTasks()
      .subscribe(tasks => {
        this.tasks = tasks.slice(0, 8);
        this.loading = false;
        this.chartStats = this.chartDataService.composeData(tasks);
      });
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

}

