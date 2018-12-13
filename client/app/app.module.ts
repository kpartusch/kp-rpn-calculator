import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatGridListModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { StackComponent } from './calculator/stack/stack.component';
import { ButtonsComponent } from './calculator/buttons/buttons.component';
import { CalculatorService } from './calculator.service';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    StackComponent,
    ButtonsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    CalculatorService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
