import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatSelectModule, MatSnackBarModule, MatStepperModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GooglePlacesDirective } from './directives/google-places.directive';
import { GoogleAddressComponent } from './components/google-address/google-address.component';
import { SnackBarComponent } from './services/ux.service';

@NgModule({
  declarations: [
    AppComponent,
    GooglePlacesDirective,
    GoogleAddressComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule
  ],
  exports: [GooglePlacesDirective],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
