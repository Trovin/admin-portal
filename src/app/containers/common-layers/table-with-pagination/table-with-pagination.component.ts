import { AfterViewInit, Component, ViewChild, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Country } from '@enums/country-code.enum';
import { IPortalUser } from '@interfaces/portal-user.inteface';

@Component({
  selector: 'app-table-with-pagination',
  templateUrl: './table-with-pagination.component.html',
  styleUrls: ['./table-with-pagination.component.scss']
})
export class TableWithPaginationComponent implements OnChanges, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() items: IPortalUser[];

  displayedColumns = [
    'email',
    'firstName',
    'lastName',
    'country',
    'registrationDate'
  ];

  dataSource: MatTableDataSource<IPortalUser>;

  filterForm: FormGroup;

  country = Country;

  onSubmit() {
    this.applyFilter(this.filterForm.value.filter);
  }

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.items);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // DataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private initForm() {
    this.filterForm = this.formBuilder.group({ filter: [] });
  }

}
