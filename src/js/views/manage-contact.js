import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const ManageContact = () => {
    const { store, actions } = useContext(Context);
    const [contactData, setContactData] = useState({});
    const params = useParams();

    useEffect(() => {
        if(params.id) setContactData(getContact());
    }, [])

    const handleAddContact = () => {
        if(params.id){
            actions.updateContact(contactData);    
        }else{
            actions.addContact(contactData);
        }
    }
    
    const getContact = async () => {
        const response = await fetch("https://assets.breatheco.de/apis/fake/contact/" + params.id);
        const data = await response.json();
        setContactData(data);
    }

    return (
        <div className="container">
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" className="form-control" id="name"
                value={contactData.full_name || ""}
                onChange={(e) =>
                    setContactData({ ...contactData, full_name: e.target.value })
                }
            />

            <label htmlFor="email" className="form-label">Email address:</label>
            <input type="email" className="form-control" id="email"
                value={contactData.email || ""}
                onChange={(e) =>
                    setContactData({ ...contactData, email: e.target.value })
                }
            />

            <label htmlFor="address" className="form-label">Address:</label>
            <input type="text" className="form-control" id="address"
                value={contactData.address || ""}
                onChange={(e) =>
                    setContactData({ ...contactData, address: e.target.value })
                }
            />

            <label htmlFor="phone" className="form-label">Phone:</label>
            <input type="number" className="form-control" id="phone"
                value={contactData.phone || ""}
                onChange={(e) =>
                    setContactData({ ...contactData, phone: e.target.value.toString() })
                }
            />

            <label htmlFor="agenda" className="form-label">Agenda:</label>
            {/* <input type="text" className="form-control" id="agenda"
                value={contactData.agenda_slug || "levan-claudio"}
                onChange={(e) =>
                    setContactData({ ...contactData, agenda_slug: e.target.value })
                }
            /> */}

            <select id="agenda" className="form-select" aria-label="Default select example"
                onChange={(e) =>
                    setContactData({ ...contactData, agenda_slug: e.target.value })
                }
            >
                <option defaultValue={'selected'}>Select an Agenda</option>
                <option value={contactData.agenda_slug || "levan-claudio"}>{contactData.agenda_slug || "levan-claudio"}</option>
            </select>

            <Link >
                <button type="submit" className="btn btn-primary" onClick={handleAddContact}>{params.id?"Save contact" : "Add new contact"}</button>
            </Link>
        </div>
    );
};