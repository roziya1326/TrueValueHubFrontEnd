// src/jstree.d.ts
declare module 'jstree' {
    interface JQuery {
      jstree(options?: any): JQuery; // Add more specific types as needed
      on(event: string, handler: (e: Event, data: any) => void): this;
    }
  }
  