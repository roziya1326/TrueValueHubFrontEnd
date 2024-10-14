import { Component } from '@angular/core';
import { ProjectService } from '../../Services/project.service';
import { AgGridModule } from 'ag-grid-angular';
import { Router } from '@angular/router';
import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";
LicenseManager.setLicenseKey('[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-067942}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{15 November 2024}____[v3]_[0102]_MTczMTYyODgwMDAwMA==0f38fbd34b7ae4abb7c4e7ab5499fcc2');

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
  detailCellRendererParams = {
    detailGridOptions: {
      columnDefs: [
        { headerName: 'Part ID', field: 'partId' },
        { headerName: 'Part Name', field: 'partName' },
        { headerName: 'Supplier Name', field: 'supplierName' }
      ],
      defaultColDef: {
        sortable: true,
        filter: true,
      }
    },
    getDetailRowData: (params: any) => {
      console.log('Detail row data (parts):', params.data.parts);  // Add logging here
      if (params.data.parts) {
        console.log('Passing parts data to detail grid');
      } else {
        console.log('No parts available for this row');
      }
      params.successCallback(params.data.parts || []);  // Ensure the parts array is passed, even if empty
    }
  };
  
  
  

  constructor(private projectService: ProjectService, private router:Router) {}

  ngOnInit() {
    this.fetchDraftProjects();
  }

  fetchDraftProjects() {
   this.projectService.getDraftProjects().subscribe((response: any) => { 
      if (response ) {
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
        console.log(this.rowData);
        
      }
    });
  }
 
  onEditClick(project: any) {
    this.projectService.setProjectData(project);    
    this.router.navigate(['/costing'], { queryParams: { projectId: project.projectId } });

  }

  isRowMaster(dataItem: any) {
    console.log('Checking if row is master:', dataItem);
    const isMaster = dataItem && dataItem.parts && dataItem.parts.length > 0;
    console.log('Is row master:', isMaster); // Log if it's considered a master row
    return isMaster; // Must return true for rows with parts
  }
  

}
