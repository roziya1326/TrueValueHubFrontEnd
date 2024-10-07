import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Material } from '../../core/Interfaces/Material.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialService } from '../../Services/material.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.css'
})
export class MaterialFormComponent {
  @Input() selectedMaterial :Material | null = null;
  @Output() materialFormChanged = new EventEmitter<boolean>();
  materialForm!: FormGroup;
  buttonColor: string = 'blue';
  isMaterialFormChanged: boolean = false;
  isInitialized: any;

  constructor(private fb: FormBuilder,private materialService :MaterialService, private toastr :ToastrService) {}

  ngOnInit(): void {
    this.materialForm = this.fb.group({
      materialDescription:[this.selectedMaterial?.materialDescription,Validators.required],
      cost:[this.selectedMaterial?.cost,Validators.required],
      processGroup: [this.selectedMaterial?.processGroup,Validators.required],
      subProcess: [this.selectedMaterial?.subProcess,Validators.required],
      materialCategory: [this.selectedMaterial?.materialCategory,Validators.required],
      family: [this.selectedMaterial?.family,Validators.required],
      grade: [this.selectedMaterial?.grade, Validators.required],
      volume: [this.selectedMaterial?.volume, Validators.required],
      price: [this.selectedMaterial?.price, Validators.required],
      density: [this.selectedMaterial?.density, Validators.required],
      moldBoxLength: [this.selectedMaterial?.moldBoxLength, Validators.required],
      moldBoxWidth: [this.selectedMaterial?.moldBoxWidth, Validators.required],
      moldBoxHeight: [this.selectedMaterial?.moldBoxHeight, Validators.required],
      moldSandWeight: [this.selectedMaterial?.moldSandWeight, Validators.required],
      mswr: [this.selectedMaterial?.mswr, Validators.required],
      netMaterialCost: [this.selectedMaterial?.netMaterialCost, Validators.required],
      totalMaterialCost: [this.selectedMaterial?.totalMaterialCost, Validators.required],
    });
    this.materialForm.valueChanges.subscribe(() => { 
      this.isMaterialFormChanged = true;     
      this.materialFormChanged.emit(true); 
    });
  }
  updateAndSave() {    
    if (this.selectedMaterial && this.isMaterialFormChanged) {
      const updatedMaterial: any = {};
      updatedMaterial.materialDescription = this.materialForm.get('materialDescription')?.value;
      updatedMaterial.cost = this.materialForm.get('cost')?.value;
      updatedMaterial.processGroup = this.materialForm.get('processGroup')?.value;
      updatedMaterial.subProcess = this.materialForm.get('subProcess')?.value;
      updatedMaterial.materialCategory = this.materialForm.get('materialCategory')?.value;
      updatedMaterial.family = this.materialForm.get('family')?.value;
      updatedMaterial.grade = this.materialForm.get('grade')?.value;
      updatedMaterial.volume = this.materialForm.get('volume')?.value;
      updatedMaterial.price = this.materialForm.get('price')?.value;
      updatedMaterial.density = this.materialForm.get('density')?.value;
      updatedMaterial.moldBoxLength = this.materialForm.get('moldBoxLength')?.value;
      updatedMaterial.moldBoxWidth = this.materialForm.get('moldBoxWidth')?.value;
      updatedMaterial.moldBoxHeight = this.materialForm.get('moldBoxHeight')?.value;
      updatedMaterial.moldSandWeight = this.materialForm.get('moldSandWeight')?.value;
      updatedMaterial.mswr = this.materialForm.get('mswr')?.value;
      updatedMaterial.netMaterialCost = this.materialForm.get('netMaterialCost')?.value;
      updatedMaterial.totalMaterialCost = this.materialForm.get('totalMaterialCost')?.value;
      updatedMaterial.partId = this.selectedMaterial.partId;
  
      updatedMaterial.materialId = this.selectedMaterial.materialId;
  
      this.materialService.updateMaterial(updatedMaterial.materialId, updatedMaterial).subscribe(
        (response) => {
          setTimeout(() => {}, 2000);
          this.toastr.success('Material Updated Successfully!', 'Success');
          this.materialFormChanged.emit(false);
        },
        (error) => {
          this.toastr.error('Failed to Update Material. Please try again.', 'Error');
        }
      );
    }
  }
}
