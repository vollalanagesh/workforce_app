import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router'
import {EmployeeServiceService} from 'src/app/services/employee-service.service'
import {EmployeeData} from 'src/app/models/employeeListModel'


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employeeDetailObject:EmployeeData
  constructor(private activeRoute:ActivatedRoute,private e_service:EmployeeServiceService,private router:Router) 
  { 
        this.employeeDetailObject = new EmployeeData();
          this.activeRoute.params.subscribe(
            params=>
            {
              console.log(params['id'])

              this.employeeDetailsObject= this.e_service.employeeListObject.data.find(item=>item.id==params['id'])
              
              }
          )
  }
  public get employeeDetailsObject():EmployeeData
  {
    return this.employeeDetailObject
  }
  public set employeeDetailsObject(value:EmployeeData)
  {
    this.employeeDetailObject=value;
  }

  removeEmployee(employeeID:number)
  {
    try
    {
       let c = this.e_service.employeeListObject.data.findIndex(item=>item.id==employeeID)
        this.e_service.employeeListObject.data.splice(c,1)
        this.router.navigateByUrl('/employeeList');
    }
    catch(Error)
    {
      console.log(Error);
    }
        
  }
  ngOnInit() {
  }

}
