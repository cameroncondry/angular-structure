
import {NgModule} from "@angular/core";
import {FormCheckboxElement} from "./elements/checkbox.component";
import {FormInputElement} from "./elements/input.component";
import {FormComponent} from "./form.component";

@NgModule({
  declarations: [
    FormComponent,
    FormCheckboxElement,
    FormInputElement
  ]
})
export class FormModule {}
