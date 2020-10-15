import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Country } from '@models/countries/countries.dto';

@Injectable({
  providedIn: 'root'
})
export class CountriesRestService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<any[]>('https://restcountries.eu/rest/v2/all')
      .pipe(map( data => data.map(item => new Country({ value: item.alpha2Code, viewValue: item.name }))));
  }

}
