export class Format{
    id?: number;
    name?: string;
    
    constructor(formatData?: Partial<Format>) {
    Object.assign(this, formatData);
  }
}