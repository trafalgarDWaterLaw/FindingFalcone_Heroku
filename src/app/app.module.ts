import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppComponent }   from './app.component';
import {FalconeService} from './services/find.falcone.service';
import {PlanetService} from './services/planets.service';
import {VehicleService} from './services/vehicles.service';
import {TokenService} from './services/token.service';
import {Utility} from './utils/Utility';
import {MissionFalcone} from './missionfalcone.component';

@NgModule({
  imports:      [ BrowserModule,
                    FormsModule,
                    HttpModule ],
  declarations: [ AppComponent,
                  MissionFalcone ],
  providers: [FalconeService,
              PlanetService,
              VehicleService,
                  Utility,
                  TokenService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
