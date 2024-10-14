import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Part } from '../../core/Interfaces/Part.interface';
import { PartDto } from '../../core/Interfaces/PartDto.interface';
import { Material } from '../../core/Interfaces/Material.interface';

interface TreeNode {
  name: string;
  children?: TreeNode[];
  partData?: Part;
  materialData?:Material;
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


  treeData: TreeNode[] = [];

  selectedNode: TreeNode | null = null;

  ngOnChanges() {
    if (this.selectedPart) {
      console.log(this.selectedPart);
      
      this.treeData = this.convertPartToTreeNode(this.selectedPart);
    }
  }

  convertPartToTreeNode(part: any): TreeNode[] {
    // Ensure childParts is an array, even if it's null or undefined
    const childrenNodes = Array.isArray(part.childParts?.$values)
    ? part.childParts.$values.map((child: any) => this.convertPartToTreeNode(child)) 
    : [];
    console.log(part);
    const materialsData = Array.isArray(part.materials?.$values)
    ? part.materials.$values // If it has $values, use that array
    : Array.isArray(part.materials) // If it's a direct array, use it
      ? part.materials
      : []; // Default to an empty array if no materials

  // Extend partData to include both the part data and normalized materials data
  const extendedPartData = {
    ...part,
    materials: {
      $values: materialsData // Ensure materials are in the $values format
    }
  };

  return [{
    name: part.internalPartNumber, 
    partData: extendedPartData, // Include extended part data with all materials
    children: childrenNodes.flat() // Flatten the array of child nodes
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
  
}
