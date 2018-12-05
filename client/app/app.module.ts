import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
