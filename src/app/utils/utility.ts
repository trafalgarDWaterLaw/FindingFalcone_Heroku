import {Planet} from '../models/planet.model';
import {Vehicle} from '../models/vehicle.model';

export class Utility{

    InitializeVehicle(size:number){
        let selecVehArr:Vehicle[] = [];
        let dummy:Vehicle;
        dummy.id = -1;
        dummy.isDirty = false;
        dummy.maxDistance = 0;
        dummy.name = '';
        dummy.speed = 0;
        dummy.totalNumber = 0;
        for(let i=0;i<size;i++){
            console.log('pushing dummy ' + dummy + ' In Array vehicle');
            selecVehArr.push(dummy);
        }
        return selecVehArr;
    }
    InitializePlanet(size:number){
        let selecPlanArr:Planet[] = [];
        let dummy:Planet;
        dummy.id = -1;
        dummy.name = '';
        dummy.distance = 0;
        for(let i=0;i<size;i++){
            console.log('pushing dummy ' + dummy + ' In Array Planet');
            selecPlanArr.push(dummy);
        }
        return selecPlanArr;
    }
    updatePlanetArr(planetArr:Planet[], selectedPlanet:Planet[], destID:number, override:boolean){
        let diff:Planet[] = [];
        console.log('Planet Array reached is ' + planetArr + 'with selected planet as ' + selectedPlanet);
        console.log('Inside UpdatePlanet Array for destID '+ destID + 'and the Override flag is ' + override);
        for(let i=0;i<planetArr.length;i++){
        let elementFound =  selectedPlanet.find(function(sel){
            if(override){
                return planetArr[i].id === sel.id;
            }
            else{
                if(destID != selectedPlanet.indexOf(sel))
                    return planetArr[i].id === sel.id;
            }
            });
            if(elementFound === undefined){
                diff.push(planetArr[i]);
            }
        }
    return diff;
    }

    

    getPlanetNames(selectedPlanet:Planet[]){
        let planetnames:string[] = [];
        for(let i=0;i<selectedPlanet.length;i++){
            planetnames.push(selectedPlanet[i].name);
        }
        console.log('***********Planet Names ' + planetnames);
        return planetnames;
    }
    getVehicleNames(selectedVehicle:Vehicle[]){
        let vehiclenames:string[] = [];
        for(let i=0;i<selectedVehicle.length;i++){
            vehiclenames.push(selectedVehicle[i].name);
        }
        console.log('***********Vehicle Names ' + vehiclenames);
        return vehiclenames;
    }
    updateTimeTaken(selectedVehicle:Vehicle[], selectedPlanet:Planet[]){
        let timeTaken = 0;
         for(let i=0;i<selectedVehicle.length;i++){
             if(selectedVehicle[i].totalNumber >= 0){
                 console.log('Total number of selected vehicle is '+ selectedVehicle[i].totalNumber)
                timeTaken = timeTaken + (selectedPlanet[i].distance/selectedVehicle[i].speed);
             }
        }
        return timeTaken;
    }
}