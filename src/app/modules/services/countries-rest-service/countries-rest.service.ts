import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Country } from '@models/countries/countries.dto';

@Injectable({
  providedIn: 'root'
})
export class CountriesRestService {

  private countries = new BehaviorSubject<Country[]>(null);

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    if (this.countries.value) {
      return this.countries.asObservable();
    }

    return this.http.get<any[]>('https://restcountries.eu/rest/v2/all')
      .pipe(map( data => {
        const newData = data.map(item => new Country({ value: item.alpha2Code, viewValue: item.name }));
        this.countries.next(newData);
        return newData;
      }));
  }

}
