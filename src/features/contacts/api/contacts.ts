import { Contact } from "../models/contact";
import { api } from "../../../core/api/api";

const url = "contacts";

export const getContacts = async () => {
  const result = await api.get<Contact[]>(url);
  return result.data.map((c: Contact) => new Contact(c));
}

export const addContact = async (contact: Contact) => {
  return await api.post(url, contact);
}

export const editContact = async (contact: Contact) => {
  return await api.put(`${url}\\${contact._id}`, contact);
}

export const deleteContact = async (id: string) => {
  return await api.delete(`${url}\\${id}`);
}