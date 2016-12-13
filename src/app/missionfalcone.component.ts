import { Component, OnInit} from '@angular/core';
import {Planet} from './models/planet.model';
import {Vehicle} from './models/vehicle.model';
import {Utility} from './utils/utility';
import {PlanetService} from './services/planets.service';
import {VehicleService} from './services/vehicles.service';
import {TokenService} from './services/token.service';
import {FalconeService} from './services/find.falcone.service';


@Component({
    selector: 'miss-falc',
    templateUrl: './missionfalcone.component.html',
    styleUrls:['./missionfalcone.component.css']
})
export class MissionFalcone implements OnInit{ 
  header :string = 'Select planets you want to search in';
  planetArr:Planet[] = [];

  dest1PlanetArr:Planet[] = [];
  dest2PlanetArr:Planet[] = [];
  dest3PlanetArr:Planet[] = [];
  dest4PlanetArr:Planet[] = [];

  resource1:number[] = [];

  isFindValid:boolean = false;
  isSuccess:boolean = false;
  status:string = '';
  planetFound:string = '';
  isResultDisplay:boolean = false;
  currentVehicleArr:Vehicle[] = [];
  vehicleArr:Vehicle[] = [];
  timeTaken:number = 0;
  selectedPlanet:Planet[] = [];
  selectedVehicle:Vehicle[] = [];
  selectedVehicleID:number[] = [];
  selectedPlanetBoolArr:boolean[] = [];
  selectedVehicleBoolArr:boolean[] = [];
  constructor(private tknSvc:TokenService,private planetSvc:PlanetService,private vehicleSvc:VehicleService,private falconeSvc:FalconeService, private utils:Utility){
  }
    
  ngOnInit(){
       this.tknSvc.getToken();
        for(let i =0;i<4;i++){
            this.selectedPlanetBoolArr.push(false);
            this.selectedVehicleBoolArr.push(false);
            this.resource1.push(-1);
        }
       console.log('Selected Vehicle has length of '+ this.selectedVehicle.length);
       this.planetSvc.getPlanetDetails().then((planetDetailArr)=>{
            this.planetArr = planetDetailArr;
            this.dest1PlanetArr = this.planetArr;
            this.dest2PlanetArr = this.planetArr;
            this.dest3PlanetArr = this.planetArr;
            this.dest4PlanetArr = this.planetArr;
        });
        this.vehicleSvc.getVehicleDetails().then((vehicletDetailArr)=>{
            this.vehicleArr = vehicletDetailArr;
            this.currentVehicleArr = this.vehicleArr;
        });
    }

    onPlanetSelect(destID:number){
        switch(destID){
            case 0: this.dest1PlanetArr = this.utils.updatePlanetArr(this.planetArr, this.selectedPlanet, destID, false);
                    this.dest2PlanetArr = this.utils.updatePlanetArr(this.planetArr, this.selectedPlanet, destID, true);
                    this.dest3PlanetArr = this.dest2PlanetArr;
                    this.dest4PlanetArr = this.dest2PlanetArr;
                    break;
            case 1: this.dest2PlanetArr = this.utils.updatePlanetArr(this.dest2PlanetArr, this.selectedPlanet, destID, false);
                    this.dest3PlanetArr = this.utils.updatePlanetArr(this.dest2PlanetArr, this.selectedPlanet, destID, true);
                    this.dest4PlanetArr = this.dest3PlanetArr;
                    break;
            case 2: this.dest3PlanetArr = this.utils.updatePlanetArr(this.dest3PlanetArr, this.selectedPlanet, destID, false);
                    this.dest4PlanetArr = this.utils.updatePlanetArr(this.dest3PlanetArr, this.selectedPlanet, destID, true);
                    break;
            case 3: this.dest4PlanetArr = this.utils.updatePlanetArr(this.dest4PlanetArr, this.selectedPlanet, destID, false);
                    break;
        }
        this.selectedPlanetBoolArr[destID] = true;
    }

    onVehicleSelect(destID:number){
        let idx = this.currentVehicleArr.indexOf(this.selectedVehicle[destID]);
        if(idx != undefined){
             this.currentVehicleArr[idx].totalNumber = this.currentVehicleArr[idx].totalNumber - 1;
            this.currentVehicleArr[idx].isDirty = true;
            if(this.selectedVehicleBoolArr[destID]){
                let element = this.currentVehicleArr.find(function(sel){
                    return sel.id === this.resource1[destID];
                });
                let indice = this.currentVehicleArr.indexOf(element);
                if(this.currentVehicleArr[indice].isDirty){
                    this.currentVehicleArr[indice].totalNumber = this.currentVehicleArr[indice].totalNumber + 1;
                    this.currentVehicleArr[indice].isDirty = false;
                }
            }
            this.selectedVehicleBoolArr[destID] = true;
            this.resource1[destID] = idx;
            this.isFindValid = this.selectedVehicleBoolArr[0] && this.selectedVehicleBoolArr[1] && this.selectedVehicleBoolArr[2] && this.selectedVehicleBoolArr[3];
            this.timeTaken = this.utils.updateTimeTaken(this.selectedVehicle, this.selectedPlanet);
        }
    }
    getResult(){
        let planetNames:string[] = this.utils.getPlanetNames(this.selectedPlanet);
        let vehicleNames:string[] = this.utils.getVehicleNames(this.selectedVehicle);
        this.falconeSvc.findFalconeSvc(planetNames,vehicleNames)
                    .then(res  => {
                            console.log(JSON.stringify(res));
                            this.status = res.status;
                            if(this.status === 'success'){
                                this.planetFound = res.planet_name;
                                this.isSuccess = true;
                            }
                            this.isResultDisplay = true;
                    });
    }
    goBack(){
        this.isFindValid = false;
        this.isResultDisplay = false;
        this.selectedPlanetBoolArr.length = 0; 
        this.selectedVehicleBoolArr.length = 0;
        this.resource1.length = 0;
        for(let i =0;i<4;i++){
            this.selectedPlanetBoolArr.push(false);
            this.selectedVehicleBoolArr.push(false);
            this.resource1.push(-1);
        }
        this.vehicleArr.length = 0;
        this.currentVehicleArr.length = 0;
       this.vehicleSvc.getVehicleDetails().then((vehicletDetailArr)=>{
            this.vehicleArr = vehicletDetailArr;
            this.currentVehicleArr = this.vehicleArr;
        });
       this.timeTaken = 0;
       this.selectedPlanet = [];
       this.selectedVehicle = [];
    }
}

