import {Component, bind} from '@angular/core';
import {ROUTER_PROVIDERS, Routes, ROUTER_DIRECTIVES} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

import {ManagementComponent}  from './app-modules/management/management.component';
import {ReportsComponent}    from './app-modules/reports/reports.component';
import {TransactionsComponent}  from './app-modules/transactions/transactions.component';
import {AdminComponent}    from './app-modules/admin/admin.component';
import {EmployeeComponent} from './app-modules/management/employee/management.employee.component'
import {PositionComponent} from './app-modules/management/position/management.position.component'
import {PositionAssignmentComponent} from './app-modules/management/position-assignment/management.position-assignment.component'
import  {EmployeeEligibiltyComponent} from './app-modules/management/employee-eligibilty/management.employee-eligibilty.component'
import  {SalesDataLoadComponent} from './app-modules/salesmanagement/salesdataload/salesmanagement.salesdataload.component'
import {SfeDataLoadComponent} from './app-modules/salesmanagement/sfedataload/salesmanagement.sfeload.component'
import {QuizDataLoadComponent} from "./app-modules/salesmanagement/quizresultupload/salesmanagement.quizresultupload.component";
import {AssignSchemeToPosition} from "./app-modules/incentive-management/assign-scheme-position/incentive-management.assign-scheme-position.component";
import {IncentiveCalculation} from "./app-modules/incentive-management/incentive-calculation/incentive-management.incentive-calculation.component";

@Component({
    moduleId : module.id,
    selector: 'esfi',
    templateUrl: 'header.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS,HTTP_PROVIDERS]
})

@Routes([
    {path: '/', component: ManagementComponent},
    {path: 'management', component: ManagementComponent},
    {path: 'employee', component: EmployeeComponent},
    {path: 'position', component: PositionComponent},
    {path: 'positionassignment', component: PositionAssignmentComponent},
    {path: 'employeeligibilty', component: EmployeeEligibiltyComponent},
    {path: 'salesdataload', component: SalesDataLoadComponent},
    {path: 'sfedataload', component: SfeDataLoadComponent},
    {path: 'quizdataload', component: QuizDataLoadComponent},
    {path:'incentivecalculation',component:IncentiveCalculation},
    {path:'assignschemetoposition',component:AssignSchemeToPosition},
    {path: 'reports', component: ReportsComponent},
    {path: 'transactions', component: TransactionsComponent},
    {path: 'admin', component: AdminComponent}
])

export class AppComponent {
}