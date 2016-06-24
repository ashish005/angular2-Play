/**
 * Created by wiznidev on 6/22/16.
 */
import { Component , ViewChild } from '@angular/core';
import { GridComponent }  from './../../.././common/app.common.components';
import { PositionService } from './management.position.service'

@Component({

    moduleId:module.id,
    templateUrl:'management.position.component.html',
    directives: [GridComponent],
    providers: [PositionService] // Whatever service we are using we have to declare here
})

export class PositionComponent{

    @ViewChild(GridComponent) GridComponent: GridComponent;
    columnDefs:[{}]
    constructor(private _positionservice:PositionService){
        this.columnDefs = [
            {headerName: "Postion Name", field: "positionName"},
            {headerName: "brand", field: "brand"}

        ];

        this.callService();
    }

    callService() {


        let self = this


        // we use subscribe so that we can use the service data async
        // means if we want to use the same service on multiple places ,
        // everyone will get updated data if they have subscribed the same service
        this._positionservice.getPosition().subscribe(res=>{
            self.GridComponent.updateGridData(res);
        });
    }

}