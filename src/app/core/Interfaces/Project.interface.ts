import { PartDto } from "./PartDto.interface";

export interface Project {
    projectId: number;
    projectName: string;
    createdDate: Date;
    parts: PartDto[];
  }