import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppComponent }   from './app.component';
import {FalconeService} from './Services/find.falcone.service';
import {PlanetService} from './Services/planets.service';
import {VehicleService} from './Services/vehicles.service';
import {TokenService} from './Services/token.service';
import {Utility} from './Utils/Utility';
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
