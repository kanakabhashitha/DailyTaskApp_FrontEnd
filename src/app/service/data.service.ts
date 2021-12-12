import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(protected httpClient:HttpClient) { }

  //getdata from API
  getData(){

    return this.httpClient.get('http://127.0.0.1:8000/api/tasks');

  }

  //inser data from API
  insertData(data: any){
    
    return this.httpClient.post('http://127.0.0.1:8000/api/addTask', data);

  }

  //delete the data from api
  deleteTask(id: any){

    return this.httpClient.delete('http://127.0.0.1:8000/api/deleteTask/'+id);

  }

  //get data using id
  getTaskByID(id: any){

    return this.httpClient.get('http://127.0.0.1:8000/api/task/'+id);

  }

  //update data
  updatetData(id:any, data:any){
    return this.httpClient.put('http://127.0.0.1:8000/api/updateTask/'+id, data);
  }


}
