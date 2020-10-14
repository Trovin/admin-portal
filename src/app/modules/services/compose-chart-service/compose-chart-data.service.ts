import { Injectable } from '@angular/core';

import { Task } from '@models/task/task.dto';

import { IChartStats } from '@interfaces/chart-stats.interface';

@Injectable({
  providedIn: 'root'
})
export class ComposeChartDataService {

  defaultColors = ['#25396e', '#3755a4', '#4164c2', '#4163c2', '#4162c2'];

  composeData(items: Task[]): IChartStats {
    const newStats: IChartStats = {
      text: '',
      values: [],
      labels: [],
      colors: []
    };

    if (items.length) {
      newStats.text = String(items.length);
      newStats.colors = this.defaultColors;

      const labelsSet = new Set();
      items.forEach(item => labelsSet.add(item.status));
      newStats.labels = Array.from(labelsSet);

      items.forEach(item => {
        const index = newStats.labels.indexOf(item.status);
        newStats.values[index] = newStats.values[index] ? newStats.values[index] + 1 : 1;
      });
    }

    return newStats;
  }

}
