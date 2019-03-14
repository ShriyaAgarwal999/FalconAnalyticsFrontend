import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FalconAnalyticsComponent } from './falcon-analytics/falcon-analytics.component';

import { Routes,RouterModule } from '@angular/router';

import { ChartsModule } from 'ng2-charts';

import {HttpClientModule} from "@angular/common/http";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'

const appRoutes: Routes=[
{path: '', component: AppComponent},
{path: 'falcon-analytics', component: FalconAnalyticsComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    FalconAnalyticsComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
