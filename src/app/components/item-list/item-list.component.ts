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

export interface AccordionContent {
  type: 'form' | 'text' | 'html';
  data: any;
}

export interface AccordionItem {
  title: string;
  icon: string;
  progress: number;
  isExpanded: boolean;
  content: AccordionContent;
}

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ConfirmPopupComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent implements OnInit {
  @Input() selectedPart: Part | null = null;
  materials: Material[] = [];
  isUpdateEnabled: boolean = false;
  buttonColor: string = 'blue';
  selectedIndex: number | null = null;
  isLoading = false;
  isChanged = false;
  editingMaterialId: number | null = null;
  editIndex: number | null = null;
  partForm!: FormGroup;
  suppliers = [
    { id: 'Supplier1', name: 'Supplier 1' },
    { id: 'Supplier2', name: 'Supplier 2' },
    { id: 'Supplier3', name: 'Supplier 3' },
    { id: 'Supplier4', name: 'Supplier 4' },
  ];
  isPartFormChanged: boolean = false;
  isMaterialFormChanged: boolean = false;
  manufacturingCategories = [
    { id: 'option1', name: 'option1' },
    { id: 'option2', name: 'option2' },
    { id: 'option3', name: 'option3' },
    { id: 'option4', name: 'option4' },
  ];
  packingTypes = [
    { id: 'option1', name: 'option1' },
    { id: 'option2', name: 'option2' },
    { id: 'option3', name: 'option3' },
    { id: 'option4', name: 'option4' },
  ];

  constructor(
    private partService: PartService,
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
      title: 'Part Information',
      icon: 'fa fa-file',
      progress: 100,
      isExpanded: false,
      content: {
        type: 'form',
        data: [
          {
            label: 'Internal Part Number',
            value: '',
            placeholder: 'Enter internal part number',
            infoMessage: 'This is the internal part number for identification.',
          },
          {
            label: 'Supplier Name',
            value: '',
            placeholder: 'Enter supplier name',
            infoMessage: 'Enter the name of the supplier.',
          },
          {
            label: 'Delivery Site Name',
            value: '',
            placeholder: 'Enter delivery site name',
            infoMessage: 'Select the delivery site.',
          },
          {
            label: 'Drawing Number',
            value: '',
            placeholder: 'Enter drawing number',
            infoMessage: 'Enter the drawing number.',
          },
          {
            label: 'Inco Terms',
            value: '',
            placeholder: 'Enter inco terms',
            infoMessage: 'Specify the incoterms.',
          },
          {
            label: 'Annual Volume',
            value: '',
            placeholder: 'Enter annual volume',
            infoMessage: 'Specify the annual volume.',
          },
          {
            label: 'BOM Quantity',
            value: '',
            placeholder: 'Enter BOM quantity',
            infoMessage: 'Enter the quantity for BOM.',
          },
          {
            label: 'Delivery Frequency',
            value: '',
            placeholder: 'Enter delivery frequency',
            infoMessage: 'Specify the delivery frequency.',
          },
          {
            label: 'Lot Size',
            value: '',
            placeholder: 'Enter lot size',
            infoMessage: 'Specify the lot size.',
          },
          {
            label: 'Manufacturing Category',
            value: '',
            placeholder: 'Select manufacturing category',
            options: ['Category A', 'Category B', 'Category C'],
            infoMessage: 'Select the manufacturing category.',
          },
          {
            label: 'Packaging Type',
            value: '',
            placeholder: 'Select packaging type',
            options: ['Type A', 'Type B', 'Type C'],
            infoMessage: 'Select the packaging type.',
          },
          {
            label: 'Product Life Remaining',
            value: '',
            placeholder: 'Enter product life remaining',
            infoMessage: 'Specify the remaining product life.',
          },
          {
            label: 'Payment Terms',
            value: '',
            placeholder: 'Enter payment terms',
            infoMessage: 'Specify the payment terms.',
          },
          {
            label: 'Lifetime Quantity Remaining',
            value: '',
            placeholder: 'Enter lifetime quantity remaining',
            infoMessage: 'Specify the remaining quantity.',
          },
          { label: 'Part Complexity',
            value: '', 
            options: ['Low', 'Medium', 'High'],
            infoMessage: 'This is the internal part number for identification.' 
          }
        ],
      },
    },
    {
      title: 'Supporting Documents',
      icon: 'fa fa-file-alt',
      progress: 100,
      isExpanded: false,
      content: {
        type: 'text',
        data: [
          {
            label: 'Internal Part Number',
            value: 'CNC Lathe - Turning Groove 02 (1)',
            disabled: true,
            infoMessage: 'This is the internal part number for identification.',
          },
          {
            label: 'Supplier Name',
            value: 'Target Vendor - India',
            infoMessage: 'This is the internal part number for identification.',
          },
          {
            label: 'Delivery Site Name',
            value: 'Test Site - United States - CA',
            infoMessage: 'This is the internal part number for identification.',
          },
        ],
      },
    },

    {
      title: 'Cost Information',
      icon: 'fa-dollar-sign',
      progress: 80,
      isExpanded: false,
      content: {
        type: 'form',
        data: [
          {
            label: 'Estimated Cost',
            value: '1000 USD',
            infoMessage: 'This is the internal part number for identification.',
          },
          {
            label: 'Final Cost',
            value: '1200 USD',
            infoMessage: 'This is the internal part number for identification.',
          },
        ],
      },
    },
    {
      title: 'Material Information',
      icon: 'fa fa-info-circle',
      progress: 80,
      isExpanded: false,
      content: {
        type: 'form',
        data: [this.materials],
      },
    },
    {
      title: 'Manufacturing Information',
      icon: 'fa fa-industry',
      progress: 80,
      isExpanded: false,
      content: {
        type: 'form',
        data: [
          {
            label: 'Estimated Cost',
            value: '1000 USD',
            infoMessage: 'This is the internal part number for identification.',
          },
          {
            label: 'Final Cost',
            value: '1200 USD',
            infoMessage: 'This is the internal part number for identification.',
          },
        ],
      },
    },
    {
      title: 'Tooling',
      icon: 'fa fa-toolbox',
      progress: 0,
      isExpanded: false,
      content: {
        type: 'form',
        data: [
          {
            label: 'Estimated Cost',
            value: '1000 USD',
            infoMessage: 'This is the internal part number for identification.',
          },
          {
            label: 'Final Cost',
            value: '1200 USD',
            infoMessage: 'This is the internal part number for identification.',
          },
        ],
      },
    },
    {
      title: 'Secondary Process',
      icon: 'fa fa-cogs',
      progress: 0,
      isExpanded: false,
      content: {
        type: 'form',
        data: [
          {
            label: 'Estimated Cost',
            value: '1000 USD',
            infoMessage: 'This is the internal part number for identification.',
          },
          {
            label: 'Final Cost',
            value: '1200 USD',
            infoMessage: 'This is the internal part number for identification.',
          },
        ],
      },
    },
    {
      title: 'Purchased (Catalogue) Parts Information',
      icon: 'fa fa-calendar',
      progress: 0,
      isExpanded: false,
      content: {
        type: 'form',
        data: [
          {
            label: 'Estimated Cost',
            value: '1000 USD',
            infoMessage: 'This is the internal part number for identification.',
          },
          {
            label: 'Final Cost',
            value: '1200 USD',
            infoMessage: 'This is the internal part number for identification.',
          },
        ],
      },
    },
    {
      title: 'Overhead & Profit',
      icon: 'fa fa-dollar-sign',
      progress: 100,
      isExpanded: false,
      content: {
        type: 'form',
        data: [
          {
            label: 'Estimated Cost',
            value: '1000 USD',
            infoMessage: 'This is the internal part number for identification.',
          },
          {
            label: 'Final Cost',
            value: '1200 USD',
            infoMessage: 'This is the internal part number for identification.',
          },
        ],
      },
    },
    {
      title: 'Packaging',
      icon: 'fa fa-box',
      progress: 100,
      isExpanded: false,
      content: {
        type: 'form',
        data: [
          {
            label: 'Estimated Cost',
            value: '1000 USD',
            infoMessage: 'This is the internal part number for identification.',
          },
          {
            label: 'Final Cost',
            value: '1200 USD',
            infoMessage: 'This is the internal part number for identification.',
          },
        ],
      },
    },
    {
      title: 'Logistics Cost',
      icon: 'fa fa-truck',
      progress: 100,
      isExpanded: false,
      content: {
        type: 'form',
        data: [
          {
            label: 'Estimated Cost',
            value: '1000 USD',
            infoMessage: 'This is the internal part number for identification.',
          },
          {
            label: 'Final Cost',
            value: '1200 USD',
            infoMessage: 'This is the internal part number for identification.',
          },
        ],
      },
    },
  ];
  dropdownVisible: { [key: string]: boolean } = {};

  toggleDropdown(label: string) {
    this.dropdownVisible[label] = !this.dropdownVisible[label];
  }

  selectOption(field: any, option: string) {
    // Update the selected value to reflect the dropdown selection
    field.selecteValue = option; // Store the selected value
    field.value = option;
    this.isChanged = true;
    this.buttonColor = 'red';
    this.dropdownVisible[field.label] = false; // Hide the dropdown after selection
  }
  ngOnInit() {
    // Initialize FilteredItems with all items
    this.partForm = this.fb.group({
      internalPartNumber: [{ value: '', disabled: true }, Validators.required],
      supplierName: ['', [Validators.required, Validators.minLength(3)]],
      deliverySiteName: ['', [Validators.required, Validators.minLength(3)]],
      drawingNumber: ['', [Validators.required, Validators.min(1)]],
      incoTerms: ['', [Validators.required, Validators.min(1)]],
      annualVolume: ['', [Validators.required, Validators.min(1)]],
      bomQty: ['', [Validators.required, Validators.min(1)]],
      deliveryFrequency: ['', [Validators.required, Validators.min(1)]],
      lotSize: ['', [Validators.required, Validators.min(1)]],
      manufacturingCategory: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
      packagingType: ['', [Validators.required, Validators.minLength(3)]],
      productLifeRemaining: ['', [Validators.required, Validators.min(0)]],
      paymentTerms: ['', Validators.required],
      lifetimeQuantityRemaining: ['', [Validators.required, Validators.min(1)]],
      partComplexity:['', [Validators.required, Validators.min(1)]]
    });

    this.partForm.valueChanges.subscribe(() => {
      this.isPartFormChanged = true;
      this.buttonColor = 'red';
    });
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
    this.partForm.patchValue({
      internalPartNumber: part.internalPartNumber,
      supplierName: part.supplierName,
      deliverySiteName: part.deliverySiteName,
      drawingNumber: part.drawingNumber,
      incoTerms: part.incoTerms,
      annualVolume: part.annualVolume,
      bomQty: part.bomQty,
      deliveryFrequency: part.deliveryFrequency,
      lotSize: part.lotSize,
      manufacturingCategory: part.manufacturingCategory,
      packagingType: part.packagingType,
      productLifeRemaining: part.productLifeRemaining,
      paymentTerms: part.paymentTerms,
      lifetimeQuantityRemaining: part.lifetimeQuantityRemaining,
      partComplexity:part.partComplexity
    });
    this.isUpdateEnabled = false;
    this.buttonColor = 'blue';
    this.isPartFormChanged = false;
  }
  onFieldChange() {
    this.isUpdateEnabled = true;
    this.buttonColor = 'red';
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

    const partInfo = this.partForm.value;
    let internalPartNumber = this.partForm.get('internalPartNumber')?.value;

    if (this.isChanged) {
      console.log('Form has changed. Save the data.');
      this.isChanged = false; // Reset the flag after saving
      this.buttonColor = 'blue'; // Reset button color after saving
    }
    console.log(this.partForm.value);
    if (this.isPartFormChanged && this.partForm.valid) {
      const updatedPart: any = {
        internalPartNumber: this.partForm.get('internalPartNumber')?.value,
        supplierName: this.partForm.get('supplierName')?.value,
        deliverySiteName: this.partForm.get('deliverySiteName')?.value,
        drawingNumber: this.partForm.get('drawingNumber')?.value,
        incoTerms: this.partForm.get('incoTerms')?.value,
        annualVolume: this.partForm.get('annualVolume')?.value,
        bomQty: this.partForm.get('bomQty')?.value,
        deliveryFrequency: this.partForm.get('deliveryFrequency')?.value,
        lotSize: this.partForm.get('lotSize')?.value,
        manufacturingCategory: this.partForm.get('manufacturingCategory')
          ?.value,
        packagingType: this.partForm.get('packagingType')?.value,
        productLifeRemaining: this.partForm.get('productLifeRemaining')?.value,
        paymentTerms: this.partForm.get('paymentTerms')?.value,
        lifetimeQuantityRemaining: this.partForm.get(
          'lifetimeQuantityRemaining'
        )?.value,
        partComplexity: this.partForm.get(
          'partComplexity'
        )?.value,
      };

      console.log('Updated Part:', updatedPart);
      this.partService
        .updatePart(updatedPart.internalPartNumber, updatedPart)
        .subscribe(
          (response) => {
            setTimeout(() => {
              this.isLoading = false;
            }, 1000);
            this.toastr.success('Part Updated Successfully!', 'Success');
            this.isPartFormChanged = false;
            this.buttonColor = 'blue';
          },
          (error) => {
            this.isLoading = false;
            this.toastr.error(
              'Failed to Update Part. Please try again.',
              'Error'
            );
          }
        );
    } else {
      this.isLoading = false;
      if (this.isPartFormChanged) {
        this.toastr.error('Validation Error, Please try again.', 'Warning');
      }
    }

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
    this.materialToDeleteId = materialId;
    this.showConfirmPopup = true;
  }
  cancelDelete() {
    this.showConfirmPopup = false;
    this.materialToDeleteId = null;
  }
  deliverySites = [
    { id: 'site1', name: 'Site 1' },
    { id: 'site2', name: 'Site 2' },
    { id: 'site3', name: 'Site 3' },
  ];

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
