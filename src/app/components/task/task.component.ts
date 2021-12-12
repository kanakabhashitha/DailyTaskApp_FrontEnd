import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Task } from 'src/app/task';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: any;
  task = new Task();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.getTaskData();

  }

  getTaskData(){

    this.dataService.getData().subscribe(res => {
      this.tasks = res;
    });

  }

  insertData(){

    this.dataService.insertData(this.task).subscribe(res => {
      this.getTaskData();
    });

  }

  deleteTask(id:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.dataService.deleteTask(id).subscribe(res => {
          this.getTaskData();
        });
      }
  
    })
    
  }

  
  updateForm = true;
  insertFormState = 'block';
  updateFormState = 'none';
 
  getTaskDataById(id: any){

    this.insertFormState = 'none';
    this.updateFormState = 'block';

    this.dataService.getTaskByID(id).subscribe(res => {
      this.tasks = res;
    })

  }

  updatetData(id: any){

    this.insertFormState = 'block';
    this.updateFormState = 'none';

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to Update this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Updated!',
          'Your file has been updated.',
          'success'
        )

        this.dataService.updatetData(id, this.task).subscribe(rs => {
          this.getTaskData();
        });

      }
    })



  }

  cancelButton(){

    this.insertFormState = 'block';
    this.updateFormState = 'none';

  }

  markAsTaskCompleted(id:any){

    this.task.isCompleted = 1;
    this.dataService.updatetData(id, this.task).subscribe(rs => {
      this.getTaskData();
    })

  }

  markAsTaskNotCompleted(id:any){

    this.task.isCompleted = 0;
    this.dataService.updatetData(id, this.task).subscribe(rs => {
      this.getTaskData();
    })

  }

  //validation
  insertTaskForm = new FormGroup({

    Task: new FormControl('', [Validators.required, Validators.minLength(5)]),
    TargetDate: new FormControl('')

  });

  get Task(){
    return this.insertTaskForm.get('Task');
  }

}
