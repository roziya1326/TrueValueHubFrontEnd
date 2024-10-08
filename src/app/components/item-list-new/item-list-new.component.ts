import { Component, Input, OnInit, ViewChild } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { Part } from '../../core/Interfaces/Part.interface';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { PartInformationComponent } from "../part-information/part-information.component";
import { MaterialInformationComponent } from "../material-information/material-information.component";
import { MaterialFormComponent } from '../material-form/material-form.component';
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
  isInitialized: number = 0; 
  isMaterialInitialized : number = 0;
  @ViewChild('partInfoComponent') partInfoComponent!: PartInformationComponent;
  @ViewChild(MaterialInformationComponent) materialInformationComponent!:MaterialInformationComponent;
  ngOnInit() {
    this.buttonColor = 'blue';
    this.isInitialized++; // Mark as initialized
  }
  save() {
    if (this.partInfoComponent) {
      this.partInfoComponent.updateAndSave(); 
    }
    if(this.materialInformationComponent){      
      this.materialInformationComponent.updateAndSave();
    }
  }

  onFormChanged(isChanged: boolean) {
    this.isInitialized++; 
    if (this.isInitialized >=3) {
      isChanged? this.buttonColor = 'red':this.buttonColor = 'blue';
    }
  }
  onMaterialFormChanged(isMaterialChanged: boolean) {
    this.isMaterialInitialized++; 
    if (this.isMaterialInitialized >=1) {
    isMaterialChanged? this.buttonColor = 'red':this.buttonColor = 'blue';
    }
  }
  isExpanded = false;

  expandAll() {
    this.isExpanded = true;
  }

  collapseAll() {
    this.isExpanded = false;
    this.buttonColor = "blue";
  }
  recalculateCost(){
  }
}
