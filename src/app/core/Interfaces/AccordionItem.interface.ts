import { AccordionContent } from "./AccordionContent.interface";

export interface AccordionItem {
    title: string;
    icon: string;
    progress: number;
    isExpanded: boolean;
    content: AccordionContent;
  }