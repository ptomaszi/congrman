export class Customer {
  _id: string;
  key: string;
  name: string;
  address: string;
  email: string;
  active: boolean;
  constructor(obj: any) {
    this._id = obj._id;
    this.key = obj._id;
    this.name = obj.name;
    this.address = obj.address;
    this.email = obj.email;
    this.active = obj.active;
  }
}