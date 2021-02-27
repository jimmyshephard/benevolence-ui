import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { AlertPanelComponent } from './alert-panel/alert-panel.component';
import { ResponseComponent } from './response/response.component';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    AlertPanelComponent
  ],
  declarations: [
    AlertPanelComponent,
    ResponseComponent
  ]
})
export class SharedModule { }
