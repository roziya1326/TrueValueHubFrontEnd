export interface AccordionContent {
    type: 'form' | 'text' | 'html';
    data: any;
    datas?: {
        label: string;
        value: string;
        placeholder?: string;
        infoMessage?: string;
        options?: string[];
    }[];
  }