import { Customer } from "../models/customer";
import { api } from "../../../core/api/api";

const url = "customers";

export const getCustomers = async () => {
  const result = await api.get<Customer[]>(url);
  return result.data.map((c: Customer) => new Customer(c));
}

export const addCustomer = async (customer: Customer) => {
  return await api.post(url, customer);
}

export const editCustomer = async (customer: Customer) => {
  return await api.put(`${url}\\${customer._id}`, customer);
}

export const deleteCustomer = async (id: string) => {
  return await api.delete(`${url}\\${id}`);
}