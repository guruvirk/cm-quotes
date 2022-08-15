import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule, MatSpinner, MatStepperModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GooglePlacesDirective } from './directives/google-places.directive';
import { GoogleAddressComponent } from './components/google-address/google-address.component';
import { SnackBarComponent } from './services/ux.service';
import { HttpClientModule } from '@angular/common/http';
import { ProcessingIndicatorComponent } from './components/processing-indicator/processing-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    GooglePlacesDirective,
    GoogleAddressComponent,
    SnackBarComponent,
    ProcessingIndicatorComponent
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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  exports: [GooglePlacesDirective],
  providers: [
    {provide: 'googleTagManagerId', useValue: "GTM-MXMQ9T7"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
