import { FormGroup } from '@angular/forms';

export function UpdateFormValuesValidator(defaultValues, controls) {

  return (formGroup: FormGroup) => {
    const matchingControl = formGroup.controls.isUpdateFormValuesValidator;

    let isUpdate = false;
    controls.forEach((controlName, index) => {
      const control = formGroup.controls[controlName];
      if (control.value !== defaultValues[index]) {
        isUpdate = true;
      }
    });

    isUpdate ? matchingControl.setErrors(null) : matchingControl.setErrors({ mustContainUpdateValues: true });
    isUpdate = false;
  };

}
