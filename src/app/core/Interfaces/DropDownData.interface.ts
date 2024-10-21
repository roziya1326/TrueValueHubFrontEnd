export interface Supplier {
    id: string;
    name: string;
  }
  
 export interface ManufacturingCategory {
    id: string;
    name: string;
  }
  
 export interface PackingType {
    id: string;
    name: string;
  }
  
 export interface DeliverySite {
    id: string;
    name: string;
  }
  
 export interface Data {
    suppliers: Supplier[];
    manufacturingCategories: ManufacturingCategory[];
    packingTypes: PackingType[];
    deliverySites: DeliverySite[];
  }
  