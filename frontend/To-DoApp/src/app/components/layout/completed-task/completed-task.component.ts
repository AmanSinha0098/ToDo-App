import { Component } from '@angular/core';
import { TaskService } from '../../../services/tasks/task.service';
import { Task } from '../../../models/Task';
import { TaskListComponent } from '../../shared/task-list/task-list.component';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-completed-task',
  standalone: true,
  imports: [TaskListComponent],
  templateUrl: './completed-task.component.html',
  styleUrl: './completed-task.component.css',
  providers: [DatePipe]
})
export class CompletedTaskComponent {
  tasks:Task[]=[];
  currDate: Date = new Date();
  date: string = "";
  dataSubscription!:Subscription;
  constructor(private taskServices: TaskService,private datePipe: DatePipe) {
  }
  fetchCompletedTasks(){
    this.taskServices.get("completed").subscribe((data) => {
      this.tasks = data;
    })
  }
  updateTaskStatus(task: Task) {
    console.log(task);
    this.taskServices.update(task.id!,task).subscribe( {
      next:(x)=>{console.log("updated successful",x),this.fetchCompletedTasks();},
      error:(e)=>{console.log(e)}
      })
  }
  ngOnInit(): void {
    this.fetchCompletedTasks()
;    this.date = this.datePipe.transform(this.currDate, 'EEEE,dd MMMM yyyy') || '';
    this.dataSubscription=this.taskServices.dataChnaged$.subscribe(()=>{
      this.fetchCompletedTasks();
    })
  };
}
