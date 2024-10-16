import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ProjectService } from '../../Services/project.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-draft-new',
  standalone: true,
  imports: [AgGridModule],
  providers: [DatePipe],
  templateUrl: './draft-new.component.html',
  styleUrl: './draft-new.component.css'
})
export class DraftNewComponent {
  rowData: any[] = [];
  columnDefs = [
    { headerName: 'Project Id', field: 'projectId' ,cellRenderer: 'agGroupCellRenderer'},
    { headerName: 'Project Name',field: 'projectName' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Created Date', field: 'createdDate'},
    {
      headerName: 'Action',
      field: '',
      width: 190,
      cellRenderer: (params: any) => {
        return `<button class="edit-button btn btn-sm btn-outline-primary" data-action="edit"data-bs-toggle="tooltip" data-placement="left"title="Edit Project">
              <i class="bi bi-pencil-fill"></i>
            </button>`;
      },
      onCellClicked: (params: any) => {
        if (params.event.target) {
          this.onEditClick(params.data);
        }
      },
      cellStyle: { textAlign: 'center' },
      sortable:false,
      filter:false
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
        { headerName: 'Part ID', field: 'partId' , minWidth: 200 },
        { headerName: 'Part Name', field: 'partName', minWidth: 250 },
        { headerName: 'Supplier Name', field: 'supplierName', minWidth: 250 },
        { headerName: 'Delivery Site Name', field: 'deliverySiteName', minWidth: 230 }

      ],
      defaultColDef: {
        sortable: true,
        filter: true,
      }
    },
    getDetailRowData: (params: any) => {
      params.successCallback(params.data.parts);
    }
  };
 
  constructor(private projectService: ProjectService, private router: Router, private datePipe: DatePipe) {}

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
          createdDate: this.datePipe.transform(project.createdDate, 'dd/MM/yyyy'),
          parts: project.parts && project.parts.$values
            ? project.parts.$values.map((part: any) => ({
              partId: part.partId,
              partName: part.internalPartNumber,
              supplierName: part.supplierName,
              deliverySiteName:part.deliverySiteName
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
