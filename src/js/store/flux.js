import { json } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts:[],
			newContact:{}
		},
		actions: {
			getAllContacts: async  ()=>{
				const response = await fetch ("https://assets.breatheco.de/apis/fake/contact/agenda/levan-claudio");
				const data = await response.json();
				setStore({contacts: data});
			},
			addContact: async (contactData) => {
				console.log(contactData);
				const response = await fetch("https://assets.breatheco.de/apis/fake/contact/", {
				  method: "POST",
				  headers: { "Content-Type": "application/json" },
				  body: JSON.stringify(contactData),
				});
				const data = await response.json();
				setStore({ contacts: [...getStore().contacts, data] });
			  },
			updateContact: async (contactData) => {
				const response = await fetch("https://assets.breatheco.de/apis/fake/contact/" + contactData.id, {
				  method: "PUT",
				  headers: { "Content-Type": "application/json" },
				  body: JSON.stringify(contactData),
				});
				const data = await response.json();
				setStore({ contacts: [...getStore().contacts, data] });
			  },
			  deleteContact: async contactId => {
				const response = await fetch(`https://assets.breatheco.de/apis/fake/contact/${contactId}`, {
				  method: "DELETE",
				  headers: { "Content-Type": "application/json" }
				});
				if (response.ok) {
				  const newContactList = getStore().contacts.filter(contact => contact.id !== contactId);
				  setStore({ contacts: newContactList });
				} 
				
			  }
		}
	};
};

export default getState;