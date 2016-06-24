/**
 * Created by wiznidev on 6/21/16.
 */
import { Component, ViewChild, Injectable } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-ng2/main';
import { PopupComponent } from '../esfi-popup/esfi-popup';

@Component({
    selector: 'grid',
    inputs: ['columnDefs'],
    template:`<ag-grid-ng2
    style="width: 100%; height: 100%;" class="ag-blue"
    [gridOptions]="gridOptions"
    [columnDefs]="columns"
    [rowData]="rowData"
    rowHeight="30">
</ag-grid-ng2>
<popup></popup>`,
    directives: [ AgGridNg2, PopupComponent ]
})

export class GridComponent {
    private gridOptions;
    private  columnDefs;
    private  EditComponent;
    @ViewChild(PopupComponent) PopupComponent: PopupComponent;
    ngOnInit() {
        let columnDefs = this.columnDefs;
        columnDefs.push({
            headerName: "",
            suppressMenu: true,
            suppressSorting: true,
            template:`<button type="button" data-action-type="view" class="btn btn-default crud-action">View</button>
                <button type="button" data-action-type="remove" class="btn btn-default crud-action">Remove</button>`
            });
        this.gridOptions = {
            rowData: null,
            enableColResize: true,
            suppressCellSelection:true,
            debug: false,
            //rowSelection: 'single',
            //rowDeselection: true,
            columnDefs: columnDefs,
            rowModelType: 'virtual',
            enableServerSideSorting: true,
            enableServerSideFilter: true
        };
        this.EditComponent = '';
    }

    setRowData(allOfTheData) {
        var dataSource = {
            rowCount: null, // behave as infinite scroll
            pageSize: 100,
            overflowSize: 100,
            maxConcurrentRequests: 2,
            maxPagesInCache: 2,
            getRows: function (params) {
                //console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                // At this point in your code, you would call the server, using $http if in AngularJS.
                // To make the demo look real, wait for 500ms before returning
                setTimeout( function() {
                    // take a slice of the total rows
                    var rowsThisPage = allOfTheData.slice(params.startRow, params.endRow);
                    // if on or after the last page, work out the last row.
                    var lastRow = -1;
                    if (allOfTheData.length <= params.endRow) {
                        lastRow = allOfTheData.length;
                    }
                    // call the success callback
                    params.successCallback(rowsThisPage, lastRow);
                }, 500);
            }
        };
        this.gridOptions.api.setDatasource(dataSource);
        this.gridOptions.api.addEventListener('rowClicked', this.onRowClicked.bind(this));
    }
    sortAndFilter(allOfTheData, sortModel, filterModel) {
        return this.sortData(sortModel, this.filterData(filterModel, allOfTheData))
    }

    sortData(sortModel, data) {
        var sortPresent = sortModel && sortModel.length > 0;
        if (!sortPresent) {
            return data;
        }
        // do an in memory sort of the data, across all the fields
        var resultOfSort = data.slice();
        resultOfSort.sort(function(a,b) {
            for (var k = 0; k<sortModel.length; k++) {
                var sortColModel = sortModel[k];
                var valueA = a[sortColModel.colId];
                var valueB = b[sortColModel.colId];
                // this filter didn't find a difference, move onto the next one
                if (valueA==valueB) {
                    continue;
                }
                var sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
                if (valueA > valueB) {
                    return sortDirection;
                } else {
                    return sortDirection * -1;
                }
            }
            // no filters found a difference
            return 0;
        });
        return resultOfSort;
    }

    filterData(filterModel, data) {
        var filterPresent = filterModel && Object.keys(filterModel).length > 0;
        if (!filterPresent) {
            return data;
        }

        var resultOfFilter = [];
        for (var i = 0; i<data.length; i++) {
            var item = data[i];

            if (filterModel.age) {
                var age = item.age;
                var allowedAge = parseInt(filterModel.age.filter);
                // EQUALS = 1;
                // LESS_THAN = 2;
                // GREATER_THAN = 3;
                if (filterModel.age.type == 1) {
                    if (age !== allowedAge) {
                        continue;
                    }
                } else if (filterModel.age.type == 2) {
                    if (age >= allowedAge) {
                        continue;
                    }
                } else {
                    if (age <= allowedAge) {
                        continue;
                    }
                }
            }

            if (filterModel.year) {
                if (filterModel.year.indexOf(item.year.toString()) < 0) {
                    // year didn't match, so skip this record
                    continue;
                }
            }

            if (filterModel.country) {
                if (item.country.toLowerCase().indexOf(filterModel.country.filter) < 0) {
                    // country didn't match, so skip this record
                    continue;
                }
            }

            resultOfFilter.push(item);
        }

        return resultOfFilter;
    }

    updateGridData(httpResponse) {
        this.setRowData(httpResponse);
    }

    public onActionViewClick(data: any){

        this.PopupComponent.modal.open();
        this.PopupComponent.modal.data = data;
        console.log("View action clicked", data);
    }

    public onActionRemoveClick(data: any, e:any){
        //e.api.rowRenderer.renderedRows[e.rowIndex].destroy();
        console.log("Remove action clicked", data);
    }

    public onRowClicked(e) {
        if (e.event.target !== undefined) {
            let data = e.data, self = this;
            let actionType = e.event.target.getAttribute("data-action-type");

            if(actionType) {
                let _actionTypes = {
                    "view" : { action: this.onActionViewClick.bind(this)},
                    "remove" : { action: this.onActionRemoveClick.bind(this)},
                };
                 _actionTypes[actionType].action(data, e);
            }
            return;
        }
    }
}