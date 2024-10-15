import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ProjectService } from '../../Services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-draft-new',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './draft-new.component.html',
  styleUrl: './draft-new.component.css'
})
export class DraftNewComponent {
  rowData: any[] = [];
  autoGroupColumnDef = {
    headerName: 'Project Id',
    cellRendererParams: { suppressCount: true },  
    minWidth: 200,  
  };
  columnDefs = [
    { field: 'projectId', rowGroup: true, hide: true},
    { headerName: 'Project Name', field: 'projectName' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Created Date', field: 'createdDate'},
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

  detailCellRendererParams = {
    detailGridOptions: {
      columnDefs: [
        { headerName: 'Part ID', field: 'partId' , minWidth: 300 },
        { headerName: 'Part Name', field: 'partName', minWidth: 300 },
        { headerName: 'Supplier Name', field: 'supplierName', minWidth: 300 }
      ],
      defaultColDef: {
        sortable: true,
        filter: true,
      }
    },
    getDetailRowData: (params: any) => {
      params.successCallback(params.data.parts || []);
    }
  };
  gridOptions = {
    masterDetail: true,  // Enable master/detail mode
    detailCellRendererParams: this.detailCellRendererParams,
    columnDefs: this.columnDefs,
    defaultColDef: this.defaultColDef,
    groupDisplayType: 'singleColumn',

  };
  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit() {
    this.fetchDraftProjects();
  }

  fetchDraftProjects() {
    this.projectService.getDraftProjects().subscribe((response: any) => {
      if (response) {
        this.rowData = response.$values.map((project: any) => ({
          projectId: project.projectId,
          projectName: project.projectName,
          description: project.description,
          createdDate: project.createdDate,
          parts: project.parts && project.parts.$values
            ? project.parts.$values.map((part: any) => ({
              partId: part.partId,
              partName: part.internalPartNumber,
              supplierName: part.supplierName,
            }))
            : []
        }));
      }
    });
  }

  onEditClick(project: any) {
    this.router.navigate(['/costing'], { queryParams: { projectId: project.projectId } });
  }

  isRowMaster(dataItem: any) {
    return dataItem && dataItem.parts && dataItem.parts.length > 0;
  }
}
