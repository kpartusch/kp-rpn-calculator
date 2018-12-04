import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule, MatDividerModule, MatListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { StackComponent } from './calculator/stack/stack.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    StackComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
