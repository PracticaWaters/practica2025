export class Format {
  id!: number;
  nume!: string;

  constructor(format?: Partial<Format>) {
    Object.assign(this, format);
  }
}
