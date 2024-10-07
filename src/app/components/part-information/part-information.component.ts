import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Part } from '../../core/Interfaces/Part.interface';
import { PartService } from '../../Services/part.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AccordionContent } from '../../core/Interfaces/AccordionContent.interface';
import { AccordionItem } from '../../core/Interfaces/AccordionItem.interface';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-part-information',
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    ConfirmPopupComponent,
    ReactiveFormsModule],
  templateUrl: './part-information.component.html',
  styleUrl: './part-information.component.css'
})
export class PartInformationComponent implements OnInit {
  @Input() selectedPart: Part | null = null;
  @Output() formChanged = new EventEmitter<boolean>();
  isUpdateEnabled: boolean = false;
  buttonColor: string = 'blue';
  selectedIndex: number | null = null;
  isLoading = false;
  isChanged = false;
  editIndex: number | null = null;
  partForm!: FormGroup;
  suppliers = [
    { id: 'Supplier1', name: 'Supplier 1' },
    { id: 'Supplier2', name: 'Supplier 2' },
    { id: 'Supplier3', name: 'Supplier 3' },
    { id: 'Supplier4', name: 'Supplier 4' },
  ];
  isPartFormChanged: boolean = false;
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
  deliverySites = [
    { id: 'site1', name: 'Site 1' },
    { id: 'site2', name: 'Site 2' },
    { id: 'site3', name: 'Site 3' },
  ];

  constructor(
    private partService: PartService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private http:HttpClient
  ) {}
  items: AccordionItem[] = [
  ];
  dropdownVisible: { [key: string]: boolean } = {};

  toggleDropdown(label: string) {
    this.dropdownVisible[label] = !this.dropdownVisible[label];
  }

  selectOption(field: any, option: string) {
    // Update the selected value to reflect the dropdown selection
    field.selecteValue = option; 
    field.value = option;
    this.isChanged = true;
    this.buttonColor = 'red';
    this.dropdownVisible[field.label] = false; // Hide the dropdown after selection
  }
  ngOnInit() {
    this.http.get<AccordionItem[]>('/assets/accordion-data.json').subscribe(data => {
      this.items = data;      
    });
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
      this.formChanged.emit(true); 
    });
  }
  ngOnChanges() {
    if (this.selectedPart) {
      this.updatePartInformation(this.selectedPart);
    }
  }
  updatePartInformation(part: Part) {
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
  updateAndSave() {
    this.isLoading = true;
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

      this.partService
        .updatePart(updatedPart.internalPartNumber, updatedPart)
        .subscribe(
          (response) => {
            setTimeout(() => {
              this.isLoading = false;
            }, 1000);
            this.toastr.success('Part Updated Successfully!', 'Success');
            this.isPartFormChanged = false;
            this.formChanged.emit(false); 

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
  }
  recalculateCost() {}
  
}
