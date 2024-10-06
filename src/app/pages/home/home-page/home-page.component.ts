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
import { CostPageComponent } from '../../Costing/cost-page/cost-page.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule,MatButtonModule,MatInputModule,MatTabsModule ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  
  createForm: FormGroup;
  draggedOver: boolean = false;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private projectService: ProjectService ,private toastr: ToastrService,
  ) {
    this.createForm = this.fb.group({
      projectId: [0],
      projectName: [''],
      description:[''],
      parts: this.fb.array([]) // Initialize an empty FormArray for parts
    });
  }

  // When files are dropped in the drop zone
  onFileDropped(event: DragEvent) {
    event.preventDefault();
    this.draggedOver = false;
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  // When a file is selected using the input button
  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  // Handling files from both drop and input selection
  handleFiles(files: FileList) {
    const file = files[0]; // Assuming only one file is being uploaded
    if (file) {
      this.selectedFile = file;
      this.readFileContent(file);
    }
  }

  // Read file content
  readFileContent(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      this.parseJsonContent(content);
    };
    reader.readAsText(file); // Read the file as text
  }

  // Parse JSON content from the file
  parseJsonContent(content: string) {
    try {
      const jsonData: Project = JSON.parse(content); // Specify type here      
  
      // Clear any existing parts in the FormArray
      const partsArray = this.createForm.get('parts') as FormArray;
      partsArray.clear();
  
      // Populate parts array
      jsonData.parts.forEach((part: PartDto) => { // Specify type here
        partsArray.push(this.createPartFormGroup(part));
      });
  
      console.log("Parsed JSON Data: ", jsonData);
    } catch (error) {
      console.error("Error parsing JSON: ", error);
    }
  }

  // Create a FormGroup for a part
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

  // Create a FormGroup for a child part
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

  // Prevent default drag behavior to allow drop
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.draggedOver = true;
  }

  // Reset visual indicator when dragging leaves the drop zone
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.draggedOver = false;
  }

  // Handle form submission
  onSubmit() {
    if (this.createForm.valid) {
      console.log(this.createForm.value);
      
      // Send formData via HTTP request to the backend
      this.projectService.createProject(this.createForm.value).subscribe(response => {
        this.toastr.success('Project Added Successfully!', 'Success');
        console.log('Upload successful', response);
      });
    }
  }
  
}
