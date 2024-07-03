import { Component } from '@angular/core';
import { RouterOutlet,RouterModule, Router,RouterLinkActive } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, RouterLinkActive,AuthComponent,SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'To-DoApp';
}
