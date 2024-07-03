import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterLink,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body-container',
  standalone: true,
  imports: [SidebarComponent,RouterOutlet,RouterLink,HeaderComponent],
  templateUrl: './body-container.component.html',
  styleUrl: './body-container.component.css'
})
export class BodyContainerComponent  {

  updateStatus(){
    console.log("update status called");
  }
  
}

