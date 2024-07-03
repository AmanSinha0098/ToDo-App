import { CommonModule } from '@angular/common';
import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/tasks/task.service';
@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.css'
})
export class AddTaskModalComponent {
  @Input() defaultData: Task = {
    title: '',
    description: '',
    isCompleted: false
  };

  @Input() isUpdate = false;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  title: string = '';
  description: string = '';

  constructor(private taskService: TaskService) { }

  ngOnChanges() {
    this.title = this.defaultData.title;
    this.description = this.defaultData.description;
  }

  addTask() {
    if (!this.title || !this.description) {
      return;
    }

    let newTask: Task = {
      title: this.title,
      description: this.description,
      isCompleted: false, 
    };
  
    this.taskService.add(newTask).subscribe((res) => {
      this.close.emit();
    });
  }
  
  updateTask() {
    if (!this.title || !this.description) {
      return;
    }

    let updatedTask: Task = {
      id: this.defaultData.id,
      title: this.title,
      description: this.description,
      isCompleted: this.defaultData.isCompleted,
      createdOn:this.defaultData.createdOn
    };
  
    this.taskService.update(updatedTask.id!, updatedTask).subscribe((res) => {
      this.close.emit();
    });
  }
  
  handleForm() {
    if (this.isUpdate) {
      this.updateTask();
    } else {
      this.addTask();
    }
  }
  



  closeModal() {
    this.close.emit();
    this.description = '';
    this.title = '';
  }
}
