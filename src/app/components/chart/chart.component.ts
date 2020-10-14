import { Component, Input, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Breakpoint } from '@enums/breakpoint.enum';

import { Chart } from 'chart.js';

import { safeChartType } from '@enums/safe-chart-type.enum';
import { AppSettingsService } from '@services/app-settings-service/app-settings.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges, OnDestroy {

  chartType = safeChartType;

  @ViewChild('canvas', { static: true }) private chartRef;

  @Input() type = this.chartType.DOUGHNUT;
  @Input() text = '';
  @Input() idKey = '1';
  @Input() labels: string[];
  @Input() values: number[];
  @Input() colors: string[];
  @Input() itemsCount: number;

  get isDoughnutChart(): boolean {
    return this.type === this.chartType.DOUGHNUT;
  }

  get showText(): boolean {
    return this.isDoughnutChart && !!this.text;
  }

  get showLabels(): boolean {
    return this.isDoughnutChart && this.largeScreen;
  }

  get backgroundColor(): string[] | string {
    return this.isDoughnutChart ? this.colors : this.mainChartColor;
  }

  chart: Chart;
  currentId: string;

  stream = new Subscription();

  largeScreen = true;

  labelColor = '#8492af';
  innerTextColor = '#a5afc4';
  mainChartColor = 'rgba(47, 80, 168, .7)';

  composeTitlePlugin = {
    id: 'innerText',
    beforeDraw: (chart: any) => {
      const ctx = chart.chart.ctx;
      const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      const text = this.text;
      const ident = this.text.length > 1 ? 10 : 5;

      ctx.restore();
      ctx.font = 'bold 28px Roboto';
      ctx.fillStyle = this.innerTextColor;
      ctx.textBaseline = 'middle';

      ctx.fillText(text, centerX - ident, centerY);
      ctx.save();
    }
  };

  constructor(private settingsService: AppSettingsService) { }

  ngOnChanges() {
    this.renderChart();
    this.composeTitle();

    this.stream = this.settingsService.screenSizeObserver
      .subscribe((value) => {
        this.largeScreen = value !== Breakpoint.SM;
        this.renderChart();
      });
  }

  renderChart() {
    this.chart?.destroy();
    this.composeChart();
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
    Chart.pluginService.unregister(this.composeTitlePlugin);
  }

  composeChart() {
    this.currentId = 'canvas' + this.idKey;
    this.chart = new Chart(this.chartRef.nativeElement.getContext('2d'), {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: [{
          data: this.values,
          borderWidth: 2,
          borderColor: this.mainChartColor,
          backgroundColor: this.backgroundColor
        }]
      },
      options: {
        plugins: {
          innerText: this.showText
        },
        title: { display: false },
        legend: {
          display: this.showLabels,
          labels: {
            boxWidth: 8,
            padding: 15,
            fontSize: 18,
            fontStyle: '300',
            fontColor: this.labelColor,
            usePointStyle: true,
            fontFamily: 'Roboto'
          },
          align: 'center',
          position: 'right'
        }
      }
    });
  }

  composeTitle() {
    Chart.pluginService.register(this.composeTitlePlugin);
  }

}
