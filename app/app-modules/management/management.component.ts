/**
 * Created by wiznidev on 6/21/16.
 */
import { Component , ViewChild } from '@angular/core';
import { GridComponent }  from '../../common/app.common.components';

@Component({
    template: `<grid [columnDefs]='columnDefs'></grid>`,
    directives: [GridComponent]
})
export class ManagementComponent {
    @ViewChild(GridComponent) GridComponent: GridComponent;
    columnDefs:[{}]
    constructor() {
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
        let self = this;
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', './mock-data/employee.json');
        httpRequest.send();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var httpResponse = JSON.parse(httpRequest.responseText);
                self.GridComponent.updateGridData(httpResponse);
            }
        };
        /*getHeroes() {
            this.heroService.getHeroes().then(heroes => this.heroes = heroes);
         }*/
    }
}