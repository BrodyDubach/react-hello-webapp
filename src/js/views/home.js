import React, { useState, useEffect, useContext } from "react";
import { ContactCard } from "../component/contactCard";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [contacts, setContacts] = useState([])

	useEffect(() => {
		async function loadContacts() {
			// if (store.contacts.length < 1) {
			// 	await actions.createContact("Valerie", "email@email.com", "123 Main St", "404-404-4040")
			// }
			await actions.getContacts()
			setContacts(store.contacts)
		}
		loadContacts()
	}, [])

	return (
		<div className="text-center mt-5">
			{contacts?.map((contact, index) => (
				<ContactCard key={index + 1} id={contact.id} name={contact.full_name} email={contact.email} phone={contact.phone} address={contact.address} />
			))}
		</div>
	)
};
