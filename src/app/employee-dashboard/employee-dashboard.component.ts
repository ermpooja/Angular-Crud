import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms'; 
import { ApiService } from '../shared/api.service';
import {MyEmpModel} from  './myemp.model';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue!: FormGroup;
  employeeModelobj : MyEmpModel = new MyEmpModel();
  employeeData !: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder:FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue  = this.formbuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],  
      salary:['']
    })
    this.getAllEmployee();
  }
    clickAddEmployee(){
      this.formValue.reset();
      this.showAdd = true;
      this.showUpdate = false;
    }
    postEmployeeDetails(){
      this.employeeModelobj.firstName = this.formValue.value.firstName;
      this.employeeModelobj.lastName = this.formValue.value.lastName;
      this.employeeModelobj.email = this.formValue.value.email;
      this.employeeModelobj.mobile = this.formValue.value.mobile;
      this.employeeModelobj.salary = this.formValue.value.salary;
      this.api.postEmployee(this.employeeModelobj)
        .subscribe(res=>{
          console.log(res);
          alert("Employee added successfully");
         
          let ref = document.getElementById("cancel");
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
        },
         error=>{
          alert("something went wrong");
        })
    }

    getAllEmployee()
    {
      this.api.getEmployee()
      .subscribe(res=>{
        this.employeeData = res.data;
        })
    }

    deleteEmployee(row:any){
      this.api.deleteEmployee(row.id)
      .subscribe(res=>{
        alert("Employee deleted");
        this.getAllEmployee();
      })
    }

    onEdit(row: any){
      this.showAdd = false;
      this.showUpdate = true;
      this.employeeModelobj.id = row.id;
      this.formValue.controls['firstName'].setValue(row.firstName);
      this.formValue.controls['lastName'].setValue(row.lastName);
      this.formValue.controls['email'].setValue(row.email);
      this.formValue.controls['mobile'].setValue(row.mobile);
      this.formValue.controls['salary'].setValue(row.salary);

    }

    updateEmployeeDetails(){
      this.employeeModelobj.firstName = this.formValue.value.firstName;
      this.employeeModelobj.lastName = this.formValue.value.lastName;
      this.employeeModelobj.email = this.formValue.value.email;
      this.employeeModelobj.mobile = this.formValue.value.mobile;
      this.employeeModelobj.salary = this.formValue.value.salary;
      this.api.updateEmployee(this.employeeModelobj,this.employeeModelobj.id)
      .subscribe(res=>{
        alert("Updated successfully");
        let ref = document.getElementById("cancel");
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
      })
    }

  
}
