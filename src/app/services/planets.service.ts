import {Injectable} from '@angular/core';
import {Planet} from '../models/planet.model';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable() export class PlanetService{

    private planetArr:Planet[];
    private endpointUrl = 'https://findfalcone.herokuapp.com/planets';
    constructor(private http:Http){
        this.planetArr = [];
        }
    
    getPlanetDetails(){
        this.getAllPlanets();
        console.log('*********************************Planet Details retrieved**********************');
        console.log(this.planetArr.length);
        return Promise.resolve(this.planetArr);
    }

    private parseResponse(res:any){
         for (let i=0;i<res.length;i++){ 
            let dummy:Planet = new Planet(); 
            dummy.id = i;
            dummy.name = res[i].name;
            dummy.distance = parseInt(res[i].distance);
            this.planetArr.push(dummy);
        }
        console.log(this.planetArr);
    }
    getAllPlanets(){
         this.http.get(this.endpointUrl)
                        .subscribe(res => {
                            res = res.json();
                            console.log(res);
                            this.parseResponse(res);
                            console.log(this.planetArr);
                        });
    }

}