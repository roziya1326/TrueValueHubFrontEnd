import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Part } from '../../core/Interfaces/Part.interface';
import { Material } from '../../core/Interfaces/Material.interface';
import $ from 'jquery';
import 'jstree';
import { Project } from '../../core/Interfaces/Project.interface';
interface TreeNode {
  text: string;
  children?: TreeNode[];
  partData?: Part;
  materialData?:Material;
  data?:Part
}


@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.css'
})
export class TreeComponent {
  @Input() selectedPart: any | null = null;
@Output() partChecked = new EventEmitter<Part>();
@ViewChild('treeContainer', { static: true }) treeContainer!: ElementRef;
@Input() selectedProject: Project | null = null;

treeData: TreeNode[] = [];
selectedNode: TreeNode | null = null;

ngOnChanges() {
  if (this.selectedProject) {
    this.treeData = this.convertProjectToTreeNode(this.selectedProject);
    this.initializeJsTree();
  }
}

convertProjectToTreeNode(project: any): TreeNode[] {
  const parts = project.parts || [];
  return parts.$values.map((part: any) => this.convertPartToTreeNode(part)).flat();
}

convertPartToTreeNode(part: any): TreeNode[] {
  const childrenNodes = Array.isArray(part.childParts?.$values)
    ? part.childParts.$values.map((child: any) => this.convertPartToTreeNode(child))
    : [];
  
  const materialsData = Array.isArray(part.materials?.$values)
    ? part.materials.$values
    : Array.isArray(part.materials)
      ? part.materials
      : []; 

  const extendedPartData = {
    ...part,
    materials: {
      $values: materialsData 
    }
  };

  return [{
    text: part.internalPartNumber, 
    partData: extendedPartData, 
    children: childrenNodes.flat(),
    data: extendedPartData 
  }];
}

onSelect(node: TreeNode) {
  if (this.selectedNode === node) {
    this.selectedNode = null; 
  } else {
    this.selectedNode = node;
    
    if (node.partData) {
      this.selectedPart = node.partData; 
      this.partChecked.emit(this.selectedPart);
    }
  }
}

ngAfterViewInit() {
  this.initializeJsTree();
}

initializeJsTree() {
  $(this.treeContainer.nativeElement).jstree("destroy").empty();

  $(this.treeContainer.nativeElement).jstree({
    core: {
      data: this.treeData
    },
    plugins: ['checkbox','state'], 
    checkbox: {
      keep_selected_style: false,
     
      }
  }).on('ready.jstree', () => {
    $(this.treeContainer.nativeElement).jstree('open_all');
  });

  $(this.treeContainer.nativeElement).on('select_node.jstree', (e, data) => {
    const selectedNode = data.node;
    console.log(selectedNode, "yeee");

    
    if (selectedNode.data) {
      this.selectedPart = selectedNode.data; 
      this.partChecked.emit(this.selectedPart);
    }
    
  });
}
initializeJsTree1(): void {
  // If the selectedProject or its parts are not yet loaded, skip initialization
  
    

    // Initialize or refresh the jsTree
    // $('#projectTree').jstree(true)?.destroy(); // Destroy existing tree if any
    if ($('#treeContainer').jstree(true)) {
      $('#treeContainer').jstree(true).destroy();
    }
    $('#treeContainer').jstree({
      core: {
        data: this.treeData
      },
      plugins: ['checkbox'], // Enable checkbox plugin
    checkbox: {
      keep_selected_style: true, // Optional: To manage selected style via CSS
      three_state: true, // If true, parents get selected if children are selected
      cascade: 'undetermined',
      tie_selection:true // Manage checkbox behavior for parent-child relations
    }
    });
    
  $('#treeContainer').on('select_node.jstree', (e, data) => {
    const selectedNode = data.node;
    console.log(selectedNode, "yeee");
    
    if (selectedNode.data) {
      this.selectedPart = selectedNode.data; 
      this.partChecked.emit(this.selectedPart);
    }
  });
  
 
}
}
