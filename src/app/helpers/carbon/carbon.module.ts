import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, GridModule, HeaderModule, InputModule, ModalModule, PlaceholderModule, TableModule } from 'carbon-components-angular';
import { CheckmarkOutlineModule,CheckmarkFilledWarningModule, LogoutModule } from '@carbon/icons-angular';
import { HeaderBackendComponent } from 'src/app/components/header-backend/header-backend.component';



@NgModule({
  declarations: [
    HeaderBackendComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    ButtonModule,
    PlaceholderModule,
    InputModule,
    GridModule,
    TableModule,
    CheckmarkOutlineModule,
    CheckmarkFilledWarningModule,
    HeaderModule,
    LogoutModule,
  ],
  exports : [
    ModalModule,
    ButtonModule,
    PlaceholderModule,
    InputModule,
    GridModule,
    TableModule,
    CheckmarkOutlineModule,
    CheckmarkFilledWarningModule,
    HeaderBackendComponent,
    HeaderModule,
    LogoutModule,
  ]
})
export class CarbonModule { }
