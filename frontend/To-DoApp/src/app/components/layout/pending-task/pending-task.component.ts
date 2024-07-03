import { Component, importProvidersFrom } from '@angular/core';
import { Task } from '../../../models/Task';
import { Subscription } from 'rxjs';
import { TaskService } from '../../../services/tasks/task.service';
import { DatePipe } from '@angular/common';
import { TaskListComponent } from '../../shared/task-list/task-list.component';

@Component({
  selector: 'app-pending-task',
  standalone: true,
  imports: [TaskListComponent],
  templateUrl: './pending-task.component.html',
  styleUrl: './pending-task.component.css',
  providers: [DatePipe]
})
export class PendingTaskComponent {
  tasks: Task[] = [];
  currDate: Date = new Date();
  date: string = "";
  dataSubscription!: Subscription;
  constructor(private taskServices: TaskService, private datePipe: DatePipe) {
  }
  fetchPendingTasks() {
    this.taskServices.get("pending").subscribe((data) => {
      this.tasks = data;
    })
  }
  updateTaskStatus(task: Task) {
    console.log(task);
    this.taskServices.update(task.id!, task).subscribe({
      next: (x) => { console.log("updated successful", x), this.fetchPendingTasks(); },
      error: (e) => { console.log(e) }
    })
  }
  ngOnInit(): void {
    this.fetchPendingTasks()
      ; this.date = this.datePipe.transform(this.currDate, 'EEEE,dd MMMM yyyy') || '';
    this.dataSubscription = this.taskServices.dataChnaged$.subscribe(() => {
      this.fetchPendingTasks();
    })
  };
}
