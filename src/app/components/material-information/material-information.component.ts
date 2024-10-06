import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Part } from '../../core/Interfaces/Part.interface';
import { PartService } from '../../Services/part.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Material } from '../../core/Interfaces/Material.interface';
import { MaterialService } from '../../Services/material.service';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AccordionItem } from '../../core/Interfaces/AccordionItem.interface';
@Component({
  selector: 'app-material-information',
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    ConfirmPopupComponent,
    ReactiveFormsModule,],
  templateUrl: './material-information.component.html',
  styleUrl: './material-information.component.css'
})
export class MaterialInformationComponent {
  @Input() selectedPart: Part | null = null;
  materials: Material[] = [];
  buttonColor: string = 'blue';
  selectedIndex: number | null = null;
  isLoading = false;
  isChanged = false;
  editingMaterialId: number | null = null;
  editIndex: number | null = null;
 
  isMaterialFormChanged: boolean = false;

  constructor(
    private materialService: MaterialService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  onModelChange(index: number) {
    this.isChanged = true;
    this.buttonColor = 'red';
    this.isMaterialFormChanged = true;

    if (this.selectedMaterial) {
      // Update the material in the array as changes happen
      if (this.editIndex) {
        this.materials[this.editIndex] = { ...this.selectedMaterial };
        this.selectedIndex = this.editIndex;
      }
    }
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
      this.updatePartInformation(this.selectedPart);
    }
  }

  updatePartInformation(part: Part) {
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

  expandAll() {
    this.items.forEach((item) => (item.isExpanded = true));
  }

  collapseAll() {
    this.items.forEach((item) => (item.isExpanded = false));
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
  updateAndSave() {
    this.isLoading = true;

    if (this.isMaterialFormChanged) {
      this.updateAndSaveMaterial();
    } else {
      this.isLoading = false;
    }
  }
  recalculateCost() {}

  editingIndex: number | null = null;
  selectedMaterial: any = null;
  selectedMaterialId: number = 0;

  toggleEditForm(index: number, materialId: number) {
    console.log(index);
    this.editIndex = index;
    if (this.editingIndex === index) {
      // Close the edit form
      this.editingIndex = null;
      this.selectedMaterial = null;
    } else {
      // Open the edit form and set the selected material
      this.editingIndex = index;
      this.selectedMaterial = { ...this.materials[index] };
      this.selectedMaterialId = materialId;
    }
  }

  updateAndSaveMaterial() {
    const materialInfo = this.items.find(
      (item) => item.title === 'Material Information'
    );
    const materialIdToBeUpdated = this.selectedMaterialId;
    if (materialIdToBeUpdated === null) {
      console.error('Material ID is null. Cannot update material.');
      return;
    }
    console.log(this.selectedIndex,'',this.selectedMaterial)
    if (this.selectedIndex !== null && this.selectedMaterial) {
      const updatedMaterial: any = {};
      updatedMaterial.materialDescription = this.materials[this.selectedIndex].materialDescription;
      updatedMaterial.cost = this.materials[this.selectedIndex].cost;
      updatedMaterial.processGroup = this.materials[this.selectedIndex].processGroup;
      updatedMaterial.subProcess = this.materials[this.selectedIndex].subProcess;
      updatedMaterial.materialCategory = this.materials[this.selectedIndex].materialCategory;
      updatedMaterial.family = this.materials[this.selectedIndex].family;
      updatedMaterial.grade = this.materials[this.selectedIndex].processGroup;
      updatedMaterial.volume = this.materials[this.selectedIndex].volume;
      updatedMaterial.price = this.materials[this.selectedIndex].price;
      updatedMaterial.density = this.materials[this.selectedIndex].density;
      updatedMaterial.moldBoxLength = this.materials[this.selectedIndex].moldBoxLength;
      updatedMaterial.moldBoxWidth = this.materials[this.selectedIndex].moldBoxWidth;
      updatedMaterial.moldBoxHeight = this.materials[this.selectedIndex].moldBoxHeight;
      updatedMaterial.moldSandWeight = this.materials[this.selectedIndex].moldSandWeight;
      updatedMaterial.mswr = this.materials[this.selectedIndex].mswr;
      updatedMaterial.netMaterialCost = this.materials[this.selectedIndex].netMaterialCost;
      updatedMaterial.totalMaterialCost = this.materials[this.selectedIndex].totalMaterialCost;
      updatedMaterial.partId = this.materials[this.selectedIndex].partId;

      updatedMaterial.materialId = materialIdToBeUpdated;
      console.log('Final updated material:', updatedMaterial);

      this.materialService
        .updateMaterial(updatedMaterial.materialId, updatedMaterial)
        .subscribe(
          (response) => {
            setTimeout(() => {
              this.isLoading = false;
            }, 2000);
            this.toastr.success('Material Updated Successfully!', 'Success');
            this.isMaterialFormChanged = false;
            this.buttonColor = 'blue';
          },
          (error) => {
            this.isLoading = false;
            this.toastr.error(
              'Failed to Update Material. Please try again.',
              'Error'
            );
          }
        );
    }
  }
  addMaterial(partNo: number) {
    // Create an empty material object with default values
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
      partId: partNo,
    };

    this.materialService.addMaterial(partNo, newMaterial).subscribe(
      (material) => {
        this.toastr.success('Material Added Successfully!', 'Success');

        this.materials.push(material);
      },
      (error) => {
        this.toastr.error('Failed to add Material. Please try again.', 'Error');
      }
    );
  }

  showConfirmPopup: boolean = false;
  materialToDeleteId: number | null = null;

  showDeleteConfirmation(materialId: number): void {
    console.log(materialId);
    
    this.materialToDeleteId = materialId;
    this.showConfirmPopup = true;
  }
  cancelDelete() {
    this.showConfirmPopup = false;
    this.materialToDeleteId = null;
  }

  confirmDelete(): void {
    this.isLoading = true;
    if (this.materialToDeleteId !== null) {
      this.materialService.deleteMaterial(this.materialToDeleteId).subscribe(
        (response) => {
          this.removeMaterialFromList(this.materialToDeleteId!);
          setTimeout(() => {
            this.isLoading = false;
          }, 2000);
          this.materialToDeleteId = null;
          this.toastr.success('Material deleted successfully!', 'Success');
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error(
            'Failed to delete material. Please try again.',
            'Error'
          );
        }
      );
    } else {
      this.isLoading = false;
    }
    this.showConfirmPopup = false;
  }

  removeMaterialFromList(materialId: number): void {
    this.materials = this.materials.filter(
      (material) => material.materialId !== materialId
    );
  }
}
