import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [newContact, setNewContact] = useState({});

  const handleAddContact = () => {
	actions.addContact(newContact);
	setNewContact({});
  };
  return (
    <div className="container">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={newContact.full_name || ""}
          onChange={(e) =>
            setNewContact({ ...newContact, full_name: e.target.value })
          }
        />
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={newContact.email || ""}
          onChange={(e) =>
            setNewContact({ ...newContact, email: e.target.value })
          }
        />
        <label htmlFor="address" className="form-label">
          address
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          value={newContact.address || ""}
          onChange={(e) =>
            setNewContact({ ...newContact, address: e.target.value })
          }
        />
        <label htmlFor="phone" className="form-label">
          phone
        </label>
        <input
          type="number"
          className="form-control"
          id="phone"
          value={newContact.phone || ""}
          onChange={(e) =>
            setNewContact({ ...newContact, phone: e.target.value.toString() })
          }
        />
        <label htmlFor="agenda" className="form-label">
          agenda
        </label>
        <input
          type="text"
          className="form-control"
          id="agenda"
          value={newContact.agenda_slug || ""}
          onChange={(e) =>
            setNewContact({ ...newContact, agenda_slug: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <Link >
  <button
    type="submit"
    className="btn btn-primary"
    onClick={handleAddContact}
  >
    Submit
  </button>
</Link>
    </div>
  );
};

