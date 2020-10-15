export class Country {
  value: string;
  viewValue: string;

  constructor(data: any) {
    if (data) {
      this.value = data.value;
      this.viewValue = data.viewValue;
    }
  }
}
