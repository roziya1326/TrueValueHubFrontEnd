import { Component,OnInit } from '@angular/core';
import { NavbarComponent } from "../../../components/nav-bar/navbar.component";
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community';
interface RowData {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
  }
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent, AgGridAngular],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor() {
    // Constructor logic (if any)
    console.log('HomePageComponent constructed');
  }
 gridOptions: any;
    columnDefs: ColDef[] = [
      { field: 'ProjectId', headerName: 'Project Id' },
      { field: 'Project Name', headerName: 'Project Name' },
      { field: 'Project Description', headerName: 'Project Description' },
      { field: 'price', headerName: 'Created Date' },
      { field: 'color', headerName: 'Action' }
    ];
    rowData: any[] = [
      { ProjectId: '1', ProjectName: 'Camry', ProjectDescription: 2023, CreatedDate: 25000, color: 'Blue' },
      { ProjectId: '2', ProjectName: 'Civic', ProjectDescription: 2022, CreatedDate: 22000, color: 'Red' },
      { ProjectId: '3', ProjectName: 'Camry', ProjectDescription: 2023, CreatedDate: 25000, color: 'Blue' },
      { ProjectId: '4', ProjectName: 'Civic', ProjectDescription: 2022, CreatedDate: 22000, color: 'Red' },
      { ProjectId: '5', ProjectName: 'Camry', ProjectDescription: 2023, CreatedDate: 25000, color: 'Blue' },
      { ProjectId: '6', ProjectName: 'Civic', ProjectDescription: 2022, CreatedDate: 22000, color: 'Red' },
      
    ];
  ngOnInit(): void {
    // Initialization logic
    console.log('HomePageComponent initialized');
    this.gridOptions = {
      columnDefs: this.columnDefs,
      rowData: this.rowData,
      // Add CSS classes for table-like appearance
      suppressHorizontalScroll: true,
      rowStyle: { borderBottom: '1px solid #ccc' },
      headerStyle: { fontWeight: 'bold', backgroundColor: '#f2f2f2' }
    };
  }
  
  
 
  
   
  
    
  
}
