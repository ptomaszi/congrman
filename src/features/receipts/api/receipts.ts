import { Receipt } from "../models/receipt";
import firebase from "firebase";

export const getReceipts = async () => {
  const database = firebase.database();
  const result = await database.ref("/receipts").once("value");
  const values = result.val();
  const receipts: Receipt[] = [];
  for (let key of Object.keys(values)) {
    const obj = values[key];
    const receipt = new Receipt(obj);
    receipt.id = key;
    receipt.date = new Date(obj.year, obj.month, obj.day);
    receipts.push(receipt);
  }
  return receipts;
}