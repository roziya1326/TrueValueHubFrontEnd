export interface Material {
    materialId: number;
    materialDescription: string;
    cost: number;
    processGroup: string;
    subProcess: string;
    materialCategory: string;
    family: string;
    grade: string;
    volume: number;
    price: number;
    density: number;
    moldBoxLength: number;
    moldBoxWidth: number;
    moldBoxHeight: number;
    moldSandWeight: number;
    mswr: number;  
    netMaterialCost: number;
    totalMaterialCost: number;

    // Foreign key reference to the Part
    partId: number;
}
