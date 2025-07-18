export class Seat{
    row:string;
    number:number;
    occupied:boolean;
    selected:boolean;

    constructor(row:string,number:number,occupied:boolean=false){
        this.row=row;
        this.number=number;
        this.occupied=occupied;
        this.selected=false;
    }

    toggleSelection():void{
        if(!this.occupied){
            this.selected=!this.selected;
        }
    }

    get id():string{
          return `${this.row}-${this.number}`;
    }
}