import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {EmployeeData} from 'src/app/models/employeeListModel'
import {employeeListModel} from 'src/app/models/employeeListModel'
import {EmployeeServiceService} from 'src/app/services/employee-service.service'
import {ActivatedRoute,Router} from '@angular/router'



@Component({
  selector: 'app-create-update-employee',
  templateUrl: './create-update-employee.component.html',
  styleUrls: ['./create-update-employee.component.css']
})
export class CreateUpdateEmployeeComponent implements OnInit {

  employeeObject:EmployeeData
  imgurl:any='';
  type:string;

  constructor(private e_service:EmployeeServiceService,private activeRoute:ActivatedRoute, private router:Router) {
    this.employeeObject = new EmployeeData();
        this.activeRoute.params.subscribe(
              params=>
              {
                //console.log(params['add'])
                this.type=params['type']
                      if(params['type']=="add")
                      {
                        this.imgurl="/assets/prof_img.jpg"
                        this.employeeObject = new EmployeeData();
                      }
                      else if(params['type']=="update")
                      {
                        this.employeeObject= this.e_service.employeeListObject.data.find(item=>item.id==params['id'])
                        this.imgurl =this.employeeObject.avatar
                    
                      }

                
              }
        )
    
    //this.employeeObject.first_name
   }
   //To update employee data
   updateEmployee(employeeObject:EmployeeData)
   {
     try 
     {
        this.e_service.employeeListObject.data
                                    .find(item=>item.id==employeeObject.id).first_name=employeeObject.first_name
        this.e_service.employeeListObject.data
                                    .find(item=>item.id==employeeObject.id).last_name=employeeObject.last_name
        this.e_service.employeeListObject.data
                                    .find(item=>item.id==employeeObject.id).email=employeeObject.email
        this.e_service.employeeListObject.data
                                    .find(item=>item.id==employeeObject.id).avatar=this.imgurl
          
        this.router.navigateByUrl('/employeeList');
       
     } 
     catch (error) 
     {
       console.log(error)
     }
        


   }
   //To add new  Employee
   addEmployee()
   {
     //console.log(this.employeeObject);
     try
     {
      if(this.e_service.employeeListObject.data.length>0)
        {
              let last:any = this.e_service.employeeListObject.data[this.e_service.employeeListObject.data.length-1];
              this.employeeObject.id= last.id +1
              this.employeeObject.avatar=this.imgurl
              this.e_service.employeeListObject.data.push(this.employeeObject)
        }
        else
        {
          let object =[];
          this.employeeObject.id= 1
          this.employeeObject.avatar=this.imgurl
          object.push(this.employeeObject)
          this.e_service.employeeListObject.data=object
        }
        this.router.navigateByUrl('/employeeList'); 
     }
     catch(Error)
     {
       console.log(Error)
     }
     
        
    
     
   }

 onSelectFile(event)
  {
        if (event.target.files && event.target.files[0])
         {
                var reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]); 
                reader.onload = (event) => { 
                                            this.imgurl = reader.result;
                                          }
          }
  }

  ngOnInit() {
  }

}
