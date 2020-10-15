import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { IChartStats } from '@interfaces/chart-stats.interface';
import { safeChartType } from '@enums/safe-chart-type.enum';
import { ComposeChartDataService } from '@services/compose-chart-service/compose-chart-data.service';

import { Task } from '@models/task/task.dto';
import { TaskRestService } from '@services/task-rest-service/task-rest.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  tasks: Task[];

  stream = new Subscription();

  chartStats: IChartStats = {
    text: '',
    values: [],
    labels: [],
    colors: []
  };

  loading = true;
  chartType = safeChartType;

  constructor(
    private taskService: TaskRestService,
    private chartDataService: ComposeChartDataService
  ) { }

  ngOnInit() {
    this.stream = this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
        this.loading = false;
        this.chartStats = this.chartDataService.composeData(tasks);
      });
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

}
