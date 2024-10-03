import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-popup.component.html',
  styleUrl: './confirm-popup.component.css',
})
export class ConfirmPopupComponent {
  @Input() message: string = 'Are you sure?';
  @Input() show: boolean = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
    this.show = false; // Hide popup after confirming
  }

  onCancel() {
    this.cancel.emit();
    this.show = false; // Hide popup after canceling
  }
}
