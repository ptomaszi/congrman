export class Contact {
  _id: string;
  name: string;
  email: string;
  jobTitle: string;
  telephone: string;

  constructor(obj: any) {
    this._id = obj._id;
    this.name = obj.name;
    this.email = obj.email;
    this.jobTitle = obj.jobTitle;
    this.telephone = obj.telephone;
  }
}