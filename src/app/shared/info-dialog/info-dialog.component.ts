import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.css'
})
export class InfoDialogComponent {
  @Input() infoMessage: string = '';

}
