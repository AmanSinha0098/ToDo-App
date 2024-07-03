import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { AddTaskModalComponent } from '../../add-task-modal/add-task-modal.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AddTaskModalComponent, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  headerTitle: string = "Dashboard"
  constructor(private route: Router, private authService: AuthService) {

  }
  ngOnInit(): void {
    this.route.events.subscribe((event: any) => {
      let str = this.route.url.substring(1);
      this.headerTitle = str[0].toUpperCase() + str.slice(1);
    });
    this.setUsedLinkPath((this.route.url).substring(1))
  }
  private setUsedLinkPath(path: string) {
    this.usedLink = this.options.find(option => option.link === path) || this.options[0];
  }
  logout() {
    this.authService.logout();
    this.route.navigate(['']);
  }
  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }


  isDropdownOpen = false;
  usedLink: any;
  options = [
    { optionName: 'Dashboard', link: 'dashboard' },
    { optionName: 'Active', link: 'active' },
    { optionName: 'Completed', link: 'completed' },
    { optionName: 'Pending', link: 'pending' },
  ];



  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  selectOption(option: any) {
    this.usedLink = option;
    this.isDropdownOpen = false;
  }

  get unUsedLink() {
    return this.options.filter(opt => opt.link !== this.usedLink.link);
  }

}
