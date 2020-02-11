export class Receipt {
  id: string;
  branch: number;
  congregation: number;
  worldWide: number;
  date: Date
  constructor(obj?: any) {
    this.id = "";
    this.branch = obj ? obj.branch : 0;
    this.congregation = obj ? obj.congregation : 0;
    this.worldWide = obj ? obj.worldWide : 0;
    this.date = obj ? obj.date : new Date();
  }
}