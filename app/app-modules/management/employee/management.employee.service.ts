/**
 * Created by mohit_000 on 23-Jun-16.
 */
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Injectable} from "@angular/core";
import {IEmployee} from "./management.employee.entity"


@Injectable() // To Tell that its a service
export class EmployeeService {
    private _employeeServiceUrl = '../../../../mock-data/employee.json';

    constructor(private _http:Http) {
    }


    getEmployee():Observable<IEmployee[]> {

        return this._http.get(this._employeeServiceUrl)
            .map((response:Response) => <IEmployee[]> response.json())

    }


}