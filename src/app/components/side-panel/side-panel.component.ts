import { Component, EventEmitter, Output } from '@angular/core';
import { Part } from '../../core/Interfaces/Part.interface'
import { PartService } from '../../Services/part.service'
import { ItemListComponent } from '../item-list/item-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [ItemListComponent,FormsModule,CommonModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent {
  searchTerm: string = '';
  filteredItems: Part[] = [];

  @Output() partSelected = new EventEmitter<Part>();
  @Output() partSelectedDrop = new EventEmitter<string>();


  constructor(private partService: PartService) {}

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement; 
    this.searchTerm = input.value;

    if (this.searchTerm) {
      this.partService.getPartById(this.searchTerm).subscribe(
        (parts: Part[]) => {
          this.filteredItems = parts; // Assign parts to filteredItems array
          console.log(parts); // Debugging
        },
        (error) => {
          console.error('Error fetching parts:', error);
          this.filteredItems = []; // Clear on error
        }
      );
    } else {
      this.filteredItems = []; // Clear if no search term
    }
  
  }
  selectPart(part: Part) {
    this.searchTerm = part.internalPartNumber; // Update input with selected part
    this.filteredItems = []; // Clear the dropdown
    this.partSelectedDrop.emit(part.internalPartNumber); // Emit the internal part number if needed
    this.partSelected.emit(part); // Emit the entire part object

  }
}
