import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Part } from '../../core/Interfaces/Part.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Material } from '../../core/Interfaces/Material.interface';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { AccordionItem } from '../../core/Interfaces/AccordionItem.interface';
import { MaterialFormComponent } from "../material-form/material-form.component";
import { MaterialTableComponent } from "../material-table/material-table.component";
import { Store } from '@ngrx/store';
import { updateTotalMaterialCost } from '../../store/actions/cost-summary.action';
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
  _materialSum: number = 0;
  @Input() isExpanded: boolean = false;

  isMaterialFormChanged: boolean = false;
  @ViewChild(MaterialTableComponent) materialTableComponent!:MaterialTableComponent;
  isInitialized: any;

  constructor(private store:Store) {}

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
    console.log(this.selectedPart);  
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.selectedPart);  

    if (this.selectedPart && changes['selectedPart'] ) {
      this.updateMaterialInformation(this.selectedPart);
    }
    
    if (changes['isExpanded']) {
      this.items.forEach(item => item.isExpanded = this.isExpanded);
    }
  }
  set materialSum(value: number) {
    this._materialSum = value;
    this.store.dispatch(updateTotalMaterialCost({ totalMaterialCost: this._materialSum }));
  }

  get materialSum(): number {
    return this._materialSum;
  }
  updateMaterialInformation(part: Part) {
    if (part.materials && part.materials.$values) {
      this.materials = part.materials.$values as Material[];
      if (this.materials) {
        console.log('Material List Loaded:', this.materials);
        
        this.materialSum = this.materials.reduce((sum, material) => {
          return sum + (material.totalMaterialCost || 0)+0;
        }, 0);
        
        console.log('Total Material Cost:', this.materialSum);
      } else {
        console.log('Material List is empty or null');
      }
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
