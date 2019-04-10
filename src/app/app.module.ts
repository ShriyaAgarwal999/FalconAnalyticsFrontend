import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FalconAnalyticsComponent } from './falcon-analytics/falcon-analytics.component';

import { Routes,RouterModule } from '@angular/router';

import { ChartsModule } from 'ng2-charts';

import {HttpClientModule} from "@angular/common/http";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavigationComponent } from './navigation/navigation.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FooterComponent } from './footer/footer.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes=[
{path: 'falcon-analytics', component: FalconAnalyticsComponent},
{path: 'login', component: AppComponent},
{path: 'logout', component: AppComponent},
{path: 'home', component: AppComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    FalconAnalyticsComponent,
    NavigationComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
