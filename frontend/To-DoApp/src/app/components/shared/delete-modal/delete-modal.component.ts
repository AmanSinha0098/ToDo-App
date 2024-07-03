import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  @Input() show: boolean = false;
  @Output() hide:EventEmitter<boolean>=new EventEmitter<boolean>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  yes(){
    this.delete.emit();
    this.no();
  }
  no(){
    this.hide.emit();
  }
}
