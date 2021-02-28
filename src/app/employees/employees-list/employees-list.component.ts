import { Component, OnInit } from '@angular/core';
import {EmployeeServiceService} from 'src/app/services/employee-service.service'
import {employeeListModel} from 'src/app/models/employeeListModel'

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  constructor(private e_service:EmployeeServiceService) { 

  }
  employeeList: any=[];
  p=1
  
  ngOnInit() {

          this.employeeList=this.e_service.employeeList_localDB()
    
  }

}
