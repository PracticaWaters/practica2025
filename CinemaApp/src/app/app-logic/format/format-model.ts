export class FormatModel {
  id!: number;
  name!:string;
  
   constructor(formatData?: Partial<FormatModel>) {
    Object.assign(this, formatData);
  }
}
