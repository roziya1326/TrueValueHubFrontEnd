import { AfterViewInit, Component } from '@angular/core';
import { ProjectService } from '../../Services/project.service';
import { AgGridModule } from 'ag-grid-angular';
import { Router, withDebugTracing } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';

import "ag-grid-enterprise";

import { AutoWidthCalculator, LicenseManager } from "ag-grid-enterprise";
LicenseManager.setLicenseKey('[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-067942}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{15 November 2024}____[v3]_[0102]_MTczMTYyODgwMDAwMA==0f38fbd34b7ae4abb7c4e7ab5499fcc2');

@Component({
  selector: 'app-draft',
  standalone: true,
  imports: [AgGridModule,MatTooltipModule],
  templateUrl: './draft.component.html',
  styleUrl: './draft.component.css'
})
export class DraftComponent  {
  rowData: any[] = [];
  selectedProject: any = null; 
  columnDefs = [
    { headerName: 'Project ID', field: 'projectId', minWidth: 10  },
    { headerName: 'Project Name', field: 'projectName',width:-10 },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Created Date', field: 'createdDate' },
    {
      headerName: 'Action',      
      field: '',
      width:2,
      cellRenderer: (params: any) => {
        return `<button class="edit-button btn btn-sm btn-outline-primary" data-action="edit"  >
              <i class="bi bi-pencil-fill"></i>
            </button>`;
      },
     
      onCellClicked: (params: any) => {
        if (params.event.target) {          
          this.onEditClick(params.data);  
        }
      },
      sortable: false,
      filter: false,
    }
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
  };
  detailCellRendererParams = {
    detailGridOptions: {
      columnDefs: [
        { headerName: 'Part ID', field: 'partId',width:5 },
        { headerName: 'Part Name', field: 'partName' ,width:5},
        { headerName: 'Supplier Name', field: 'supplierName',width:5 }
      ],
      defaultColDef: {
        sortable: true,
        filter: true,
      },
      width:10
    },
    getDetailRowData: (params: any) => {
      console.log('Detail row data (parts):', params.data.parts);  
      if (params.data.parts) {
        console.log('Passing parts data to detail grid');
      } else {
        console.log('No parts available for this row');
      }
      params.successCallback(params.data.parts || []);  
    }
  };
  
  
  

  constructor(private projectService: ProjectService, private router:Router, private datePipe: DatePipe) {}

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
          createdDate:this.datePipe.transform(project.createdDate, 'dd/MM/yyyy'),
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
    this.router.navigate(['/costing'], { queryParams: { projectId: project.projectId } });
  }

  isRowMaster(dataItem: any) {
    const isMaster = dataItem && dataItem.parts && dataItem.parts.length > 0;
    return isMaster; 
  }
  

}
