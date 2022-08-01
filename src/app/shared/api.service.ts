import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url ="http://localhost/";
  constructor(private http:HttpClient) { }

  postEmployee(data: any){
    return this.http.post<any>(this.url+"calendly/api/save-hero", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

getEmployee()
{
  return this.http.get<any>(this.url+'calendly/api/get-hero')
  .pipe(map((res:any)=>
  {
    return res;
  }))
}


updateEmployee(data:any,id:number){
  return this.http.post<any>(this.url+'calendly/api/update/'+id,data)
  .pipe(map((res:any)=>{
    return res;
  }))

}
//delete
deleteEmployee(id:number){
  return this.http.delete<any>(this.url+'calendly/api/delete/'+id)
  .pipe(map((res:any)=>{
    return res;
  }))

}
}
