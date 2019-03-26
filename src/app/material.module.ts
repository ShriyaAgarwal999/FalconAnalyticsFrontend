import { NgModule } from '@angular/core';


import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonToggleModule,
  MatSidenavModule,
  MatTableModule,
  MatListModule,
  MatSelectModule,
  MatRadioModule,

} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatTableModule,
    MatListModule,
    MatSelectModule,
    MatRadioModule,

  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatTableModule,
    MatListModule,
    MatSelectModule,
    MatRadioModule,

    
  ]
})
export class MaterialModule {}