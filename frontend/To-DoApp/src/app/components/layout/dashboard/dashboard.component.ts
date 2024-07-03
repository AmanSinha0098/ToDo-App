import { Component, DoCheck, OnInit } from '@angular/core';
import { HeroSectionComponent } from '../../hero-section/hero-section.component';
import { TaskListComponent } from '../../shared/task-list/task-list.component';
import { TaskService } from '../../../services/tasks/task.service';
import { DeleteModalComponent } from '../../shared/delete-modal/delete-modal.component';
import { Task } from '../../../models/Task';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { Kpi } from '../../../models/Kpi';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeroSectionComponent, TaskListComponent, DeleteModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  currDate: Date = new Date();
  date: string = "";
  percentCompleted: number = 0;
  percentActive: number = 0;
  dataSubscription!: Subscription;
  showDeleteConfirmation: boolean = false;
  constructor(private taskServices: TaskService, private datePipe: DatePipe) { }
  fetchTasks() {
    this.taskServices.get("all").subscribe((data) => {
      let temp: any = data;
      this.tasks = temp;
      this.tasks = this.tasks.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
      console.log(this.tasks);
    })
     this.taskServices.getKpi().subscribe((data) => {
      this.percentCompleted = data.completed;  
      this.percentActive=data.active;
    })
  }
  ngOnInit(): void {
    this.fetchTasks();
    this.date = this.datePipe.transform(this.currDate, 'EEEE,dd MMMM yyyy') || '';
    this.dataSubscription = this.taskServices.dataChnaged$.subscribe(() => {
      this.fetchTasks();
    })
  };

 
  updateTaskStatus(task: Task) {
    console.log(task);
    this.taskServices.update(task.id!, task).subscribe({
      next: (x) => { console.log("updated successful", x); this.fetchTasks(); },
      error: (e) => { console.log(e) }
    })
  }

  deleteTask(id: string) {
    console.log(id);
    this.taskServices.delete(id).subscribe({
      next: (x) => { console.log("delete successful", x); this.fetchTasks(); },
      error: (e) => { console.log(e) }
    })
  }
  deleteAll() {
    this.tasks.forEach(task => {
      this.taskServices.delete(task.id!).subscribe({
        next: (x) => { console.log("delete successful", x); this.fetchTasks(); }
      })
    });
  }
  invokeDelete() {
    this.showDeleteConfirmation = true;
  }
}
