import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Part } from '../../core/Interfaces/Part.interface';
import { PartDto } from '../../core/Interfaces/PartDto.interface';
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
  @Input() selectedPart: Part | null = null;
  @Output() partChecked = new EventEmitter<Part>();
  @ViewChild('treeContainer', { static: true }) treeContainer!: ElementRef;
  @Input() selectedProject: Project | null = null;


  treeData: TreeNode[] = [];

  selectedNode: TreeNode | null = null;

  ngOnChanges() {
    if (this.selectedPart) {
      console.log(this.selectedPart);
      
      this.treeData = this.convertPartToTreeNode(this.selectedPart);
      this.initializeJsTree();
    }
  }

  convertPartToTreeNode(part: any): TreeNode[] {
    const childrenNodes = Array.isArray(part.childParts?.$values)
    ? part.childParts.$values.map((child: any) => this.convertPartToTreeNode(child)) 
    : [];
    console.log(part);
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
        this.partChecked.emit(node.partData);
      }
    }
  }
  ngAfterViewInit() {
    this.initializeJsTree();
  }

  initializeJsTree() {
    $(this.treeContainer.nativeElement).jstree("destroy").empty();

    $(this.treeContainer.nativeElement).jstree({
      'core': {
        'data': this.treeData
      },
      'plugins': ['checkbox'],
      'checkbox': {
        'keep_selected_style': false
      }
    });

    $(this.treeContainer.nativeElement).on('select_node.jstree', (e, data) => {
      const selectedNode = data.node;
      console.log(selectedNode,"yeee");
      
      if (selectedNode.data) {
        this.partChecked.emit(selectedNode.data);
      }
    });
  }
}
