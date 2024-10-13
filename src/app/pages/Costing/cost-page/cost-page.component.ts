import { Component,OnInit } from '@angular/core';
import { SidePanelComponent } from '../../../components/side-panel/side-panel.component';
import { NavbarComponent } from "../../../components/nav-bar/navbar.component";
import { ItemListComponent } from '../../../components/item-list/item-list.component';
import { CostSummaryComponent } from '../../../components/cost-summary/cost-summary.component';
import { Part } from '../../../core/Interfaces/Part.interface';
import { MessageService } from 'primeng/api';
import { ItemListNewComponent } from "../../../components/item-list-new/item-list-new.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../core/Interfaces/Project.interface';
import { ProjectService } from '../../../Services/project.service';
@Component({
  selector: 'app-cost-page',
  standalone: true,
  imports: [SidePanelComponent, NavbarComponent, ItemListComponent, CostSummaryComponent, ItemListNewComponent],
  templateUrl: './cost-page.component.html',
  styleUrl: './cost-page.component.css',
  providers: [MessageService]

})
export class CostPageComponent {
  selectedProject: Project |null = null;
  constructor(private route: ActivatedRoute, private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const projectId = params['projectId'];
    });
  }

  selectedPart: Part | null = null;
  

  onPartSelected(part: Part) {
    this.selectedPart = part;
    console.log('Selected part:', this.selectedPart); 
  }
}
