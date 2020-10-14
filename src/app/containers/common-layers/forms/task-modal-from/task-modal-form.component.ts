import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IDialogData } from '@interfaces/task-form-data.interface';

import { iconClass } from '@enums/icon-class.enum';
import { taskStatusType } from '@enums/task-status-type.enum';
import { taskCategoryList } from '@enums/task-category-list.enum';

import { TASK_FORM_SELECT_ITEMS } from '@mocks/task-form-select-items';

@Component({
  selector: 'app-task-modal-form',
  templateUrl: 'task-modal-form.component.html',
  styleUrls: ['./task-modal-form.component.scss']
})
export class TaskModalFormComponent implements OnInit {

  taskForm: FormGroup;

  faIcon = iconClass;

  statusType = taskStatusType;
  categoryList = taskCategoryList;

  selectAnswers = TASK_FORM_SELECT_ITEMS;
  selectedItemValue = TASK_FORM_SELECT_ITEMS[0].value;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    public dialogRef: MatDialogRef<TaskModalFormComponent>
  ) { }

  ngOnInit() {
    this.initForm();
  }

  get form() {
    return this.taskForm.controls;
  }

  cancel() {
    this.dialogRef.close();
  }

  setData(data) {
    this.form.status.setValue(this.statusType[data]);
    this.form.list.setValue(this.categoryList[data]);
  }

  private initForm() {
    this.taskForm = this.formBuilder.group({
      value: ['', [Validators.required, Validators.minLength(3)]],
      list: ['', [Validators.required]],
      status: ['', [Validators.required]],
      isPriority: [false]
    });
  }

}
