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
			addContact: async (newContact) => {
				console.log(newContact);
				const response = await fetch("https://assets.breatheco.de/apis/fake/contact/", {
				  method: "POST",
				  headers: { "Content-Type": "application/json" },
				  body: JSON.stringify(newContact),
				});
				const data = await response.json();
				setStore({ contacts: [...getStore().contacts, data] });
			  },
			

		}
	};
};

export default getState;
