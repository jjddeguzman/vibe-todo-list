import { FormArray, FormGroup } from '@angular/forms';

export class CommonUtil {
  static log(variableName: string, value: any) {
    console.groupCollapsed(
      `📝 Debugging: ${variableName} | TYPE: (${typeof value})`
    );
    console.log(value);
    console.groupEnd();
  }

  static logFormGroupErrors(formGroup: FormGroup, path: string = ''): void {
    Object.keys(formGroup.controls).forEach((controlName) => {
      const control = formGroup.controls[controlName];
      const currentPath = path ? `${path}.${controlName}` : controlName;

      if (control instanceof FormGroup) {
        CommonUtil.logFormGroupErrors(control, currentPath); // Recurse into nested FormGroup
      } else if (control instanceof FormArray) {
        control.controls.forEach((arrayControl, index) => {
          const arrayControlPath = `${currentPath}[${index}]`;
          if (arrayControl instanceof FormGroup) {
            CommonUtil.logFormGroupErrors(arrayControl, arrayControlPath); // Recurse into FormGroup within FormArray
          } else if (arrayControl.errors) {
            console.groupCollapsed(`Error in control❗: ${arrayControlPath}`); // Start collapsed group
            console.error(arrayControl.errors);
            console.groupEnd(); // End group
          }
        });
      } else if (control.errors) {
        console.groupCollapsed(`Error in control ❗: ${currentPath}`); // Start collapsed group
        console.error(control.errors);
        console.groupEnd(); // End group
      }
    });
  }
}
