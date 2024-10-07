import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Part } from '../../core/Interfaces/Part.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Material } from '../../core/Interfaces/Material.interface';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { AccordionItem } from '../../core/Interfaces/AccordionItem.interface';
import { MaterialFormComponent } from "../material-form/material-form.component";
import { MaterialTableComponent } from "../material-table/material-table.component";
@Component({
  selector: 'app-material-information',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ConfirmPopupComponent,
    ReactiveFormsModule, MaterialFormComponent, MaterialTableComponent],
  templateUrl: './material-information.component.html',
  styleUrl: './material-information.component.css'
})
export class MaterialInformationComponent {
  @Input() selectedPart: Part | null = null;
  @Output() materialFormChanged = new EventEmitter<boolean>();
  materials: Material[] = [];
  buttonColor: string = 'blue';
  selectedIndex: number | null = null;
  isLoading = false;
  isChanged = false;
  editingMaterialId: number | null = null;
  editIndex: number | null = null;
 
  isMaterialFormChanged: boolean = false;
  @ViewChild(MaterialTableComponent) materialTableComponent!:MaterialTableComponent;
  isInitialized: any;

  constructor() {}

  onModelChange(index: number) {
    this.isChanged = true;
    this.buttonColor = 'red';
    this.isMaterialFormChanged = true;
  }
  items: AccordionItem[] = [
    {
      title: 'Material Information',
      icon: 'fa fa-info-circle',
      progress: 80,
      isExpanded: false,
      content: {
        type: 'form',
        data: [this.materials],
      }
    }
  ];
  ngOnInit() {
  }
  ngOnChanges() {
    if (this.selectedPart) {
      this.updateMaterialInformation(this.selectedPart);
    }
  }

  updateMaterialInformation(part: Part) {
    if (part.materials && part.materials.$values) {
      this.materials = part.materials.$values as Material[];
    } else {
      this.materials = [];
    }   
    this.buttonColor = 'blue';
  }

  toggleItem(item: { isExpanded: boolean }) {
    item.isExpanded = !item.isExpanded;
  }

  isIterable(data: any): boolean {
    return (
      Array.isArray(data) &&
      data.length > 0 &&
      data !== null &&
      data !== undefined
    );
  }

  showInfo(message: string) {
    alert(message);
  }
  recalculateCost() {}
  updateAndSave(){
    if(this.materialTableComponent){
      this.materialTableComponent.updateAndSave();
    }

  }
  onFormChanged(isChanged: boolean) {
 
  this.materialFormChanged.emit(isChanged); 
 }
 
}
