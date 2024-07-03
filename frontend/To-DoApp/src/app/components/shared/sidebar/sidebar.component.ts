import { Component } from '@angular/core';
import { RouterModule,RouterLink,RouterLinkActive } from '@angular/router';
import { AddTaskModalComponent } from '../../add-task-modal/add-task-modal.component';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,RouterLink,RouterLinkActive,AddTaskModalComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
}
