import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-large-headline',
  templateUrl: './large-headline.component.html',
  styleUrls: ['./large-headline.component.scss']
})
export class LargeHeadlineComponent implements OnChanges {

  @Input() headline: string;

  text: string;
  decoratedText: string;

  ngOnChanges(): void {
    const text = this.headline.split(' ');
    this.decoratedText = text.pop();
    this.text = text.join(' ');
  }

}
