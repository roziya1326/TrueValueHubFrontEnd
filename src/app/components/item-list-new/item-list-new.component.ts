import { Component, Input, OnInit, ViewChild } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { Part } from '../../core/Interfaces/Part.interface';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { PartInformationComponent } from "../part-information/part-information.component";
import { MaterialInformationComponent } from "../material-information/material-information.component";
@Component({
  selector: 'app-item-list-new',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ConfirmPopupComponent,
    ReactiveFormsModule, PartInformationComponent, MaterialInformationComponent],
  templateUrl: './item-list-new.component.html',
  styleUrl: './item-list-new.component.css'
})
export class ItemListNewComponent implements OnInit{
 
  @Input() selectedPart: Part | null = null;
  isLoading = false;
  buttonColor: string = 'blue';
  isInitialized: number = 0; // Flag to track initialization
  @ViewChild('partInfoComponent') partInfoComponent!: PartInformationComponent;
  ngOnInit() {
    // Set button color back to blue on initialization
    this.buttonColor = 'blue';
    this.isInitialized++; // Mark as initialized
  }
  savePart() {
    if (this.partInfoComponent) {
      this.partInfoComponent.updateAndSave(); 
    }
  }

  onFormChanged(isChanged: boolean) {
    this.isInitialized++; 
    if (isChanged && this.isInitialized >2) {
      this.buttonColor = 'red'; 
    }
  }
  expandAll() {
  }

  collapseAll() {
  }
  recalculateCost(){

  }
  updateAndSave(){}
}
