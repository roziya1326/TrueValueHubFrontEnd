import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Material } from '../../core/Interfaces/Material.interface';
import { MaterialFormComponent } from '../material-form/material-form.component';
import { MaterialService } from '../../Services/material.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { Part } from '../../core/Interfaces/Part.interface';


@Component({
  selector: 'app-material-table',
  standalone: true,
  imports: [MaterialFormComponent,CommonModule,ConfirmPopupComponent],
  templateUrl: './material-table.component.html',
  styleUrl: './material-table.component.css'
})
export class MaterialTableComponent {
  @Input() materialList :Material[] |null = null;
  @Input() selectedPart :any |null = null;
  @Output() materialFormChanged = new EventEmitter<boolean>();

  selectedMaterial: Material | null = null;
  showConfirmPopup: boolean = false;
  materialToDeleteId: number | null = null;
  editIndex:number|null = null;
  editingIndex: number | null = null;
  @ViewChild(MaterialFormComponent) materialFormComponent!:MaterialFormComponent;
  buttonColor: string = 'blue';
  isInitialized: number = 0;

  constructor(
    private materialService: MaterialService,
    private toastr: ToastrService,
  ) {}
  toggleEditForm(index: number) {
    this.editIndex = index;
    if (this.editingIndex === index) {
      // Close the edit form
      this.editingIndex = null;
      this.selectedMaterial = null;
    } else {
      // Open the edit form and set the selected material
      this.editingIndex = index;
      if(this.materialList){
        this.selectedMaterial = { ...this.materialList[index] };
      }
    }
  }
  showDeleteConfirmation(materialId: number): void {    
    this.materialToDeleteId = materialId;
    this.showConfirmPopup = true;
  }
  cancelDelete() {
    this.showConfirmPopup = false;
    this.materialToDeleteId = null;
  }
  addMaterial() {
  if(this.selectedPart){ 
    const newMaterial: Material = {
      materialId: 0,
      materialDescription: 'string',
      cost: 0,
      processGroup: 'string',
      subProcess: 'string',
      materialCategory: 'string',
      family: 'string',
      grade: 'string',
      volume: 0,
      price: 0,
      density: 0,
      moldBoxLength: 0,
      moldBoxWidth: 0,
      moldBoxHeight: 0,
      moldSandWeight: 0,
      mswr: 0,
      netMaterialCost: 0,
      totalMaterialCost: 0,
      partId: this.selectedPart.partId,
    };    
    this.materialService.addMaterial(newMaterial.partId, newMaterial).subscribe(
      (material) => {
        this.toastr.success('Material Added Successfully!', 'Success');
        if(this.materialList){
          this.materialList.push(material);
        }
      },
      (error) => {
        this.toastr.error('Failed to add Material. Please try again.', 'Error');
      }
    );
  }
  }
  
  confirmDelete(): void {
    // this.isLoading = true;
    if (this.materialToDeleteId !== null) {
      this.materialService.deleteMaterial(this.materialToDeleteId).subscribe(
        (response) => {
          this.removeMaterialFromList(this.materialToDeleteId!);
          setTimeout(() => {
            // this.isLoading = false;
          }, 2000);
          this.materialToDeleteId = null;
          this.toastr.success('Material deleted successfully!', 'Success');
        },
        (error) => {
          // this.isLoading = false;
          this.toastr.error(
            'Failed to delete material. Please try again.',
            'Error'
          );
        }
      );
    } else {
      // this.isLoading = false;
    }
    this.showConfirmPopup = false;
  }

  removeMaterialFromList(materialId: number): void {
    if(this.materialList){
      this.materialList = this.materialList.filter(
        (material) => material.materialId !== materialId
      );
    }
  }
  updateAndSave(){
    if(this.materialFormComponent){
      this.materialFormComponent.updateAndSave();
    }
  }
  onFormChanged(isMaterialChanged: boolean) {
    this.materialFormChanged.emit(isMaterialChanged); 
  }
}
