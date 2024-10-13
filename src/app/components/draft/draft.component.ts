import { Component } from '@angular/core';
import { ProjectService } from '../../Services/project.service';
import { AgGridModule } from 'ag-grid-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-draft',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './draft.component.html',
  styleUrl: './draft.component.css'
})
export class DraftComponent {
  rowData: any[] = [];
  selectedProject: any = null; 
  columnDefs = [
    { headerName: 'Project ID', field: 'projectId' },
    { headerName: 'Project Name', field: 'projectName' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Created Date', field: 'createdDate' },
    {
      headerName: 'Action',
      field: '',
      cellRenderer: (params: any) => {
        return `<button class="edit-button btn btn-sm btn-outline-primary" data-action="edit">
              <i class="bi bi-pencil-fill"></i>
            </button>`;
      },
      onCellClicked: (params: any) => {
        if (params.event.target) {          
          this.onEditClick(params.data);  
        }
      },
      width: 200,
      cellStyle: { textAlign: 'center' }
    }
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };
  
 
  

  constructor(private projectService: ProjectService, private router:Router) {}

  ngOnInit() {
    this.fetchDraftProjects();
  }

  fetchDraftProjects() {
    this.projectService.getDraftProjects().subscribe((response: any) => {
      if (response && response.$values) {
        this.rowData = response.$values.map((project: any) => ({
          projectId: project.projectId,
          projectName: project.projectName,
          description: project.description,
          createdDate:project.createdDate,
          parts: project.parts && project.parts.$values ? project.parts.$values.map((part: any) => ({
            partId: part.partId,
            partName: part.internalPartNumber, 
            supplierName: part.supplierName 
          })) : []
        }));
        this.rowData.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
      }
    });
  }
 
  onEditClick(project: any) {
    this.projectService.setProjectData(project);    
    this.router.navigate(['/costing'], { queryParams: { projectId: project.projectId } });

  }

  isRowMaster(dataItem: any) {
    console.log('Checking row master for:', dataItem);
  
    return dataItem && dataItem.parts && dataItem.parts.length > 0;
  }

}
