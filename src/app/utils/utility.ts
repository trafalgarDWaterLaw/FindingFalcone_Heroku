import {Planet} from '../Models/planet.model';
import {Vehicle} from '../Models/vehicle.model';

export class Utility{

    updatePlanetArr(planetArr:Planet[], selectedPlanet:Planet[], destID:number, override:boolean){
        let diff:Planet[] = [];
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