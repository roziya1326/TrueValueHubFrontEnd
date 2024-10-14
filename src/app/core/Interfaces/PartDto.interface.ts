export interface PartDto {
    partId: number;
    internalPartNumber: string;
    supplierName: string;
    deliverySiteName: string;
    drawingNumber: string;
    incoTerms: string;
    annualVolume: number;
    bomQty: number;
    deliveryFrequency: number;
    lotSize: number;
    manufacturingCategory: string;
    packagingType: string;
    productLifeRemaining: number;
    paymentTerms: string;
    lifetimeQuantityRemaining: number;
    projectId: number;
    parentId: number;
    childParts?: PartDto[];
  }