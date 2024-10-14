import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Part } from '../../core/Interfaces/Part.interface'
import { PartService } from '../../Services/part.service'
import { ItemListComponent } from '../item-list/item-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import $ from 'jquery';
import { Project } from '../../core/Interfaces/Project.interface';
import { TreeComponent } from "../tree/tree.component";

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [ItemListComponent, FormsModule, CommonModule, TreeComponent],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent implements OnChanges{
  searchTerm: string = '';
  filteredItems: Part[] = [];

  @Output() partSelected = new EventEmitter<Part>();
  @Output() partSelectedDrop = new EventEmitter<string>();
  @Input() selectedProject: Project |null = null;
  @Input() selectedPart: Part |null = null;
  @Input() partChecked: Part |null = null;
  @Output() partCheckedTree = new EventEmitter<Part>();


  constructor(private partService: PartService) {}
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
      this.partService.getPartById(this.searchTerm).subscribe(
        (parts: Part[]) => {
          this.filteredItems = parts; 
        },
        (error) => {
          console.error('Error fetching parts:', error);
          this.filteredItems = []; 
        }
      );
    } else {
      this.filteredItems = []; 
    }
  
  }
  selectPart(part: Part) {
    this.searchTerm = part.internalPartNumber; 
    this.filteredItems = []; 
    this.partSelectedDrop.emit(part.internalPartNumber); 
    this.partSelected.emit(part); 

  }
  ngAfterViewInit(): void {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new (window as any).bootstrap.Tooltip(tooltipTriggerEl);
    });
    // this.initializeJsTree();
  }
  

  // initializeJsTree() {
  //   // Initialize jsTree with checkbox plugin
  //   $('#tree-container').jstree({
  //     'core': {
  //       'data': [
  //         {
  //           'text': 'Item 1',
  //           'children': [
  //             { 'text': 'Sub Item 1-1', 'id': 'item1-1' },
  //             { 'text': 'Sub Item 1-2', 'id': 'item1-2' }
  //           ]
  //         },
  //         { 'text': 'Item 2', 'id': 'item2' }
  //       ]
  //     },
  //     'checkbox': {
  //       'keep_selected_style': false,
  //       'three_state': false // Disables cascading selection (parents/children)
  //     },
  //     'plugins': ['checkbox']
  //   });

  //   // Allow only one checkbox to be selected at a time
  //   $('#tree-container').on('changed.jstree', (e: any, data: any) => {
  //     if (data.action === 'select_node') {
  //       const selectedNodes = $('#tree-container').jstree('get_selected', true);
  //       // Uncheck all nodes except the currently selected one
  //       selectedNodes.forEach((node: any) => {
  //         if (node.id !== data.node.id) {
  //           $('#tree-container').jstree('deselect_node', node.id);
  //         }
  //       });
  //     }
  //   });
  // }

  
}
