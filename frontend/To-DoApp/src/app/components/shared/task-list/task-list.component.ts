import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { Task } from '../../../models/Task';
import { CommonModule } from '@angular/common';
import { AddTaskModalComponent } from '../../add-task-modal/add-task-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, AddTaskModalComponent, DeleteModalComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() updatedTask = new EventEmitter<Task>();
  @Output() deleteId = new EventEmitter<string>();

  showDeleteConfirmation: boolean = false;

  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  updateStatus(task: Task) {
    task.isCompleted = !task.isCompleted;
    this.updatedTask.emit(task);
  }

  selectedTaskId: string | null = null;

  toggleDescription(taskId: string): void {
    if (this.selectedTaskId === taskId) {
      this.selectedTaskId = null;
    } else {
      this.selectedTaskId = taskId;
    }
  }
  stopProp(event: Event) {
    event.stopPropagation();
  }
  calculateDuration(task: Task) {
    const taskDate = new Date(task.createdOn!);
    const currentDate = new Date();
    const msInHour = 3600000;
    const msInDay = 86400000;
    const msInWeek = 604800000;
    const msInMonth = 2629800000;
    const msInYear = 31557600000;

    const durationMs = currentDate.getTime() - taskDate.getTime();

    if (durationMs < msInDay) {
      const hours = Math.floor(durationMs / msInHour);
      return `${hours} hours ago`;
    } else if (durationMs < msInWeek) {
      const days = Math.floor(durationMs / msInDay);
      return `${days} days ago`;
    } else if (durationMs < msInMonth) {
      const weeks = Math.floor(durationMs / msInWeek);
      return `${weeks} weeks ago`;
    } else if (durationMs < msInYear) {
      const months = Math.floor(durationMs / msInMonth);
      return `${months} months ago`;
    } else {
      const years = Math.floor(durationMs / msInYear);
      return `${years} years ago`;
    }
  }


  getCheckboxIcon(isCompleted: boolean) {
    return isCompleted ? './../../../assets/images/checkbox_checked.svg' : './../../../assets/images/checkbox_unchecked.svg';
  }
  getDeleteIcon(isCompleted: boolean) {
    return isCompleted ? '../../../../assets/images/delete_completed.svg' : '../../../../assets/images/delete_active.svg';
  }
 
  invokeDelete() {
    this.showDeleteConfirmation = true;
  }
  deleteTask(id: string) {
    this.deleteId.emit(id);
  }
  taskToedit: Task = {
    title: '',
    description: '',
    isCompleted: false
  }
  editTask(task: Task) {
    this.taskToedit = task;
  }
  transformTitle(title: string): string {
    const limit: number = 20; 
    if (title.length > limit) {
      return title.substring(0, limit) + '...'; 
    } else {
      return title; 
    }
  }

  @ViewChild('tasksContainer', { static: false }) tasksContainer?: ElementRef;
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.tasksContainer && !this.tasksContainer.nativeElement.contains(event.target as Node)) {
      this.selectedTaskId = null;
    }
  }
}