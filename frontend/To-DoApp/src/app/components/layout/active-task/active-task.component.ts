import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from '../../shared/task-list/task-list.component';
import { TaskService } from '../../../services/tasks/task.service';
import { Task } from '../../../models/Task';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-active-task',
  standalone: true,
  imports: [TaskListComponent],
  templateUrl: './active-task.component.html',
  styleUrl: './active-task.component.css',
  providers: [DatePipe]
})
export class ActiveTaskComponent implements OnInit {
  tasks:Task[]=[];
  currDate: Date = new Date();
  date: string = "";
  dataSubscription!:Subscription;
  constructor(private taskServices: TaskService,private datePipe:DatePipe) {
  }
  ngOnInit(): void {
    this.fetchActiveTasks();
    this.date = this.datePipe.transform(this.currDate, 'EEEE,dd MMMM yyyy') || '';
    this.dataSubscription=this.taskServices.dataChnaged$.subscribe(()=>{
      this.fetchActiveTasks();
    })
  };
  fetchActiveTasks(){
    this.taskServices.get("active").subscribe((data) => {
      this.tasks = data;
    })
  }
  updateTaskStatus(task: Task) {
    console.log(task);
    this.taskServices.update(task.id!,task).subscribe( {
      next:(x)=>{console.log("updated successful",x),this.fetchActiveTasks();},
      error:(e)=>{console.log(e)}
      })
  }
}
