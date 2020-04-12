import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MapComponent} from './map/map.component';
import {MakerService} from './services/maker.service';
import {WheaterComponent} from './wheater/wheater.component';

@NgModule({
  declarations: [
    AppComponent,
      MapComponent,
      WheaterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MakerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
