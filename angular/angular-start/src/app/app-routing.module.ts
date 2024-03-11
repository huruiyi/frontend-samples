import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NzDatePickerComponent} from './nz-date-picker/nz-date-picker.component';
import {NzButtonComponent} from './nz-button/nz-button.component';
import {NzFormComponent} from './nz-form/nz-form.component';

const routes: Routes = [
  {path: 'date', component: NzDatePickerComponent},
  {path: 'button', component: NzButtonComponent},
  {path: 'form', component: NzFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
