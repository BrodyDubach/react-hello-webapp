const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: []
		},
		actions: {
			createContact: async(name, email, address, phone) => {
				let response = await fetch("https://playground.4geeks.com/apis/fake/contact/", {
					method: "POST",
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						"full_name": name,
						"email": email,
						"agenda_slug": "brodysAgenda",
						"address": address,
						"phone": phone
					})
				})
				let data = await response.json();
			},
			getContacts: async() => {
				let response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/brodysAgenda")
				let data = await response.json()
				setStore({contacts: data})
			},
			getEachContact: async(id) => {
				let response = await fetch("https://playground.4geeks.com/apis/fake/contact/" + id)
				let data = await response.json()
				return data
			},
			updateContact: async(id, name, email, address, phone) => {
				let response = await fetch("https://playground.4geeks.com/apis/fake/contact/" + id, {
					method: "PUT",
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						"full_name": name,
						"email": email,
						"agenda_slug": "brodysAgenda",
						"address": address,
						"phone": phone
					})
				})
				let data = await response.json();
			},
			deleteContact: async(id) => {
				console.log("hey")
				let response = await fetch("https://playground.4geeks.com/apis/fake/contact/" + id, {
					method: "DELETE",
					headers: { 'Content-Type': 'application/json' },
				})
				let data = await response.json();
				console.log(data)
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
