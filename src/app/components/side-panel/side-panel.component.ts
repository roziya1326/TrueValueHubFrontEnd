import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
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
export class SidePanelComponent implements AfterViewInit{
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
          this.filteredItems = parts; 
          console.log(parts); 
        },
        (error) => {
          console.error('Error fetching parts:', error);
          this.filteredItems = []; 
        }
      );
    } else {
      this.filteredItems = []; 
    }
  
  }
  selectPart(part: Part) {
    this.searchTerm = part.internalPartNumber; 
    this.filteredItems = []; 
    this.partSelectedDrop.emit(part.internalPartNumber); 
    this.partSelected.emit(part); 

  }
  ngAfterViewInit(): void {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new (window as any).bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
}
