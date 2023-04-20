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
			  }
		}
	};
};

export default getState;