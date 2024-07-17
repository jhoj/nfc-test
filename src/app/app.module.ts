import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NfcReaderComponent } from './nfc-reader/nfc-reader.component';

@NgModule({
  declarations: [
    AppComponent,
    NfcReaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
