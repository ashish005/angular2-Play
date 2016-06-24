/**
 * Created by mohit_000 on 23-Jun-16.
 */
/**
 * Created by mohit_000 on 23-Jun-16.
 */
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Injectable} from "@angular/core";
import {IPosition} from "./management.position.entity"


@Injectable() // To Tell that its a service
export class PositionService {
    private _positionServiceUrl = '../../../../mock-data/position.json';

    constructor(private _http:Http) {
    }


    getPosition():Observable<IPosition[]> {

        return this._http.get(this._positionServiceUrl)
            .map((response:Response) => <IPosition[]> response.json())

    }


}