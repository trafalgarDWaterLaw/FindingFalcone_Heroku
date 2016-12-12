import {Injectable} from '@angular/core';
import {Vehicle} from '../Models/vehicle.model';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable() export class VehicleService{

    private vehicleArr:Vehicle[];
    private endpointUrl = 'https://findfalcone.herokuapp.com/vehicles';
    constructor(private http:Http){
        this.vehicleArr = [];
        }
    
    getVehicleDetails(){
        this.getAllVehicles();
        return Promise.resolve(this.vehicleArr);
    }

    private parseResponse(res:any){
         for (let i=0;i<res.length;i++){ 
            let dummy:Vehicle = new Vehicle(); 
            dummy.id = i;
            dummy.name = res[i].name;
            dummy.totalNumber = parseInt(res[i].total_no);
            dummy.maxDistance = parseInt(res[i].max_distance);
            dummy.speed = parseInt(res[i].speed);
            dummy.isDirty = false;
            this.vehicleArr.push(dummy);
        }
        console.log(this.vehicleArr);
    }
    private getAllVehicles(){
         this.http.get(this.endpointUrl)
                        .subscribe(res => {
                            res = res.json();
                            console.log(res);
                            this.parseResponse(res);
                            console.log(this.vehicleArr);
                        });
    }

}