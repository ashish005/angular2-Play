/**
 * Created by wiznidev on 6/21/16.
 */

import { Component , ViewChild } from '@angular/core';
import { GridComponent }  from './../../.././common/app.common.components';
import { EmployeeService } from './management.employee.service'

@Component({
    moduleId: module.id,
    templateUrl: 'management.employee.component.html',
    directives: [GridComponent],
    providers: [EmployeeService] // Whatever service we are using we have to declare here
})
export class EmployeeComponent{

    @ViewChild(GridComponent) GridComponent: GridComponent;
    columnDefs:[{}]
    constructor(private _employeeservice:EmployeeService) {
        this.columnDefs = [
            {headerName: "Employee No", field: "employeeNo"},
            {headerName: "LastName", field: "lastName"},
            {headerName: "FirstName", field: "firstName"},
            {headerName: "Email", field: "email"},
            {headerName: "Joining Date", field: "joiningDate"}
        ];



        this.callService();
    }

    callService() {


        let self = this


        // we use subscribe so that we can use the service data async
        // means if we want to use the same service on multiple places ,
        // everyone will get updated data if they have subscribed the same service
        this._employeeservice.getEmployee().subscribe(res=>{
            self.GridComponent.updateGridData(res);
        });
    }
}