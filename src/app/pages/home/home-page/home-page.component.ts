import { Component} from '@angular/core';
import { NavbarComponent } from "../../../components/nav-bar/navbar.component";
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProjectService } from '../../../Services/project.service';
import { Project } from '../../../core/Interfaces/Project.interface';
import { PartDto } from '../../../core/Interfaces/PartDto.interface';
import { ToastrService } from 'ngx-toastr';
import { DraftComponent } from '../../../components/draft/draft.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule,MatButtonModule,MatInputModule,MatTabsModule, DraftComponent,CommonModule ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  
  createForm: FormGroup;
  draggedOver: boolean = false;
  selectedFile: File | null = null;
  isLoading = false; 
  selectedTabIndex: number = 0;
  selectedFileName: string | null = null; 
  selectedTab: string = 'create';

  constructor(private fb: FormBuilder, private projectService: ProjectService ,private toastr: ToastrService,
  ) {
    this.createForm = this.fb.group({
      projectId: [0,Validators.required],
      projectName: ['',Validators.required],
      description:['',Validators.required],
      parts: this.fb.array([],Validators.required) 
    });
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    this.draggedOver = false;
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  handleFiles(files: FileList) {
    const file = files[0]; 
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name; 
      this.readFileContent(file);
    }
  }

  readFileContent(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      this.parseJsonContent(content);
    };
    reader.readAsText(file); 
  }

  parseJsonContent(content: string) {
    try {
      const jsonData: Project = JSON.parse(content);     
      if (!this.validateJsonData(jsonData)) {
        return; 
      }  
  
      const partsArray = this.createForm.get('parts') as FormArray;
      partsArray.clear();
  
      jsonData.parts.forEach((part: PartDto) => { 
        partsArray.push(this.createPartFormGroup(part));
      });
  
      console.log("Parsed JSON Data: ", jsonData);
    } catch (error) {
      console.error("Error parsing JSON: ", error);
    }
  }

  createPartFormGroup(part: any): FormGroup {
    return this.fb.group({
      internalPartNumber: [part.internalPartNumber],
      supplierName: [part.supplierName],
      deliverySiteName: [part.deliverySiteName],
      drawingNumber: [part.drawingNumber],
      incoTerms: [part.incoTerms],
      annualVolume: [part.annualVolume],
      bomQty: [part.bomQty],
      deliveryFrequency: [part.deliveryFrequency],
      lotSize: [part.lotSize],
      manufacturingCategory: [part.manufacturingCategory],
      packagingType: [part.packagingType],
      productLifeRemaining: [part.productLifeRemaining],
      paymentTerms: [part.paymentTerms],
      lifetimeQuantityRemaining: [part.lifetimeQuantityRemaining],
      projectId: [part.projectId],
      parentId: [part.parentId],
      childParts: this.fb.array(part.childParts.map((childPart: PartDto)=> this.createChildPartFormGroup(childPart))) // Add child parts
    });
  }

  createChildPartFormGroup(childPart: any): FormGroup {
    return this.fb.group({
      internalPartNumber: [childPart.internalPartNumber],
      supplierName: [childPart.supplierName],
      deliverySiteName: [childPart.deliverySiteName],
      drawingNumber: [childPart.drawingNumber],
      incoTerms: [childPart.incoTerms],
      annualVolume: [childPart.annualVolume],
      bomQty: [childPart.bomQty],
      deliveryFrequency: [childPart.deliveryFrequency],
      lotSize: [childPart.lotSize],
      manufacturingCategory: [childPart.manufacturingCategory],
      packagingType: [childPart.packagingType],
      productLifeRemaining: [childPart.productLifeRemaining],
      paymentTerms: [childPart.paymentTerms],
      lifetimeQuantityRemaining: [childPart.lifetimeQuantityRemaining],
      projectId: [childPart.projectId],
      parentId: [childPart.parentId],
    });
  }
  ngOnInit() {
    document.addEventListener('drop', this.onFileDropped.bind(this));
    document.addEventListener('dragover', this.onDragOver.bind(this));
    document.addEventListener('dragleave', this.onDragLeave.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('drop', this.onFileDropped.bind(this));
    document.removeEventListener('dragover', this.onDragOver.bind(this));
    document.removeEventListener('dragleave', this.onDragLeave.bind(this));
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.draggedOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.draggedOver = false;
  }

  onSubmit() {
    if (this.createForm.valid) {
    this.isLoading = true;      
      this.projectService.createProject(this.createForm.value).subscribe(response => {
        setTimeout(() => {
          this.isLoading = false;  
          this.selectedTab = 'draft';
        }, 1000);
        this.toastr.success('Project Added Successfully!', 'Success');
        console.log('Upload successful', response);
      });
    }
  }
  validateJsonData(jsonData: any): boolean {
    if (!jsonData.parts || !Array.isArray(jsonData.parts)) {
      this.toastr.error('Invalid data: "parts" must be an array.', 'Validation Error');      
      return false;
    }
  
    for (const part of jsonData.parts) {
      if (!this.validatePart(part)) {
        return false; 

      }
    }
  
    return true; 
  }
  
  validatePart(part: any): boolean {
    const requiredFields = [
      'internalPartNumber',
      'supplierName',
      'deliverySiteName',
      'drawingNumber',
      'incoTerms',
      'annualVolume',
      'bomQty',
      'deliveryFrequency',
      'lotSize',
      'manufacturingCategory',
      'packagingType',
      'productLifeRemaining',
      'paymentTerms',
      'lifetimeQuantityRemaining',
      'projectId',
      'parentId',
      'childParts'
    ];
  
    for (const field of requiredFields) {
      if (!(field in part)) {
        this.toastr.error(`Invalid data: "${field}" is missing in a part.`, 'Validation Error');
        return false;
      }
    }
  
    if (!Array.isArray(part.childParts)) {
      this.toastr.error('Invalid data: "childParts" must be an array.', 'Validation Error');
      console.log("errorr");

      return false;
    }
  
    for (const childPart of part.childParts) {
      if (!this.validateChildPart(childPart)) {
        return false; 
      }
    }
  
    return true; 
  }
  
  validateChildPart(childPart: any): boolean {
    const requiredFields = [
      'internalPartNumber',
      'supplierName',
      'deliverySiteName',
      'drawingNumber',
      'incoTerms',
      'annualVolume',
      'bomQty',
      'deliveryFrequency',
      'lotSize',
      'manufacturingCategory',
      'packagingType',
      'productLifeRemaining',
      'paymentTerms',
      'lifetimeQuantityRemaining',
      'projectId',
      'parentId'
    ];
  
    for (const field of requiredFields) {
      if (!(field in childPart)) {
        this.toastr.error(`Invalid data: "${field}" is missing in a child part.`, 'Validation Error');
        return false;
      }
    }
  
    return true; 
  }
  
}
