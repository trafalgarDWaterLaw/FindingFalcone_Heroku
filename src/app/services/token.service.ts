import {Injectable} from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable() export class TokenService{

    private tokenendpointUrl = 'https://findfalcone.herokuapp.com/token';
    constructor(private http:Http){
            }

    getToken(){
            let headers = new Headers({'Accept': 'application/json'});
            let body = '';
            this.http.post(this.tokenendpointUrl,body, {headers: headers})
                    .subscribe((res) => {
                    res = res.json();
                    this.parseResponseToken(res);
                    console.log('Token is ************ ' +sessionStorage.getItem("token"));
                });
    }

    private parseResponseToken(res:any){
        let token = res.token;
        if(token != undefined){
            sessionStorage.setItem("token", token);
        }
    }
}