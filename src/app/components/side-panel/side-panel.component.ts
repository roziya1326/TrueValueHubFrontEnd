import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Part } from '../../core/Interfaces/Part.interface'
import { PartService } from '../../Services/part.service'
import { ItemListComponent } from '../item-list/item-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import $ from 'jquery';
import { Project } from '../../core/Interfaces/Project.interface';
import { TreeComponent } from "../tree/tree.component";
import { ProjectService } from '../../Services/project.service';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [ItemListComponent, FormsModule, CommonModule, TreeComponent],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent implements OnChanges{
  searchTerm: string = '';
  filteredItems: Project[] = [];

  @Output() partSelected = new EventEmitter<Part>();
  @Output() partSelectedDrop = new EventEmitter<string>();
  @Input() selectedProject: Project |null = null;
  @Input() selectedPart: Part |null = null;
  @Input() partChecked: Part |null = null;
  @Output() partCheckedTree = new EventEmitter<Part>();
  @Output() searchedProject = new EventEmitter<Project>();


  constructor(private projectService: ProjectService) {}
  ngOnChanges(): void {
    console.log(this.selectedProject);
    
    if(this.selectedProject){
      this.searchTerm = this.selectedProject?.projectName;
    }
  }
  onPartChecked(partChecked: Part) {
    this.partCheckedTree.emit(partChecked);
  }
  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement; 
    this.searchTerm = input.value;    

    if (this.searchTerm) {
      this.projectService.getProjectByName(this.searchTerm).subscribe(
        (projects: any) => {
          this.filteredItems = projects.$values; 
          console.log(this.filteredItems);
        }
      );
    } else {
      this.filteredItems = []; 
    }
  
  }
  selectPart(project: Project) {
    this.searchTerm = project.projectName; 
    this.filteredItems = []; 
    this.searchedProject.emit(project);
    // this.partSelectedDrop.emit(project.projectName); 
    // this.partSelected.emit(part); 

  }
  ngAfterViewInit(): void {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new (window as any).bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  
}
