import { PartDto } from "./PartDto.interface";

export interface Project {
    projectId: number;
    projectName: string;
    parts: PartDto[];
  }