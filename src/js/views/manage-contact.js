import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const ManageContact = () => {
  const { store, actions } = useContext(Context);
  const [contactData, setContactData] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) setContactData(getContact());
  }, []);
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  useEffect(() => {
    
  }, [store.updateContactStatus])

  const handleContact = () => {
    params.id
      ? actions.updateContact(contactData)
      : actions.addContact(contactData);

    store.updateContactStatus = true;
    setButtonClicked(true);
  };

  const getContact = async () => {
    const response = await fetch(
      "https://assets.breatheco.de/apis/fake/contact/" + params.id
    );
    const data = await response.json();
    setContactData(data);
  };

  const goToHomePage = () => {
    store.updateContactStatus = false;
    navigate("/");
  }

  return (
    <div className="container">
      <div className="row">
        <h1>{params.id ? "Edit contact" : "Add a new contact"}</h1>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Name"
          value={contactData.full_name || ""}
          onChange={(e) =>
            setContactData({ ...contactData, full_name: e.target.value })
          }
          onFocus={() => {
            setButtonClicked(false);
          }}
        />
        <label htmlFor="name">Name:</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="email"
          className={`form-control ${
            contactData.email && !isValidEmail(contactData.email)
              ? "is-invalid"
              : ""
          }`}
          id="email"
          placeholder="Email address"
          value={contactData.email || ""}
          onChange={(e) =>
            setContactData({ ...contactData, email: e.target.value })
          }
          onFocus={() => setButtonClicked(false)}
        />
        <label htmlFor="email">Email address:</label>
        {contactData.email && !isValidEmail(contactData.email) && (
          <div className="invalid-feedback">
            Please enter a valid email address.
          </div>
        )}
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="address"
          placeholder="Address"
          value={contactData.address || ""}
          onChange={(e) =>
            setContactData({ ...contactData, address: e.target.value })
          }
          onFocus={() => {
            setButtonClicked(false);
          }}
        />
        <label htmlFor="address">Address:</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="number"
          className="form-control"
          id="phone"
          placeholder="Phone"
          value={contactData.phone || ""}
          onChange={(e) =>
            setContactData({ ...contactData, phone: e.target.value.toString() })
          }
          onFocus={() => {
            setButtonClicked(false);
          }}
        />
        <label htmlFor="phone">Phone:</label>
      </div>

      <div className="form-floating mb-3">
        <select
          id="agenda"
          className="form-select"
          aria-label="Default select example"
          onChange={(e) =>
            setContactData({ ...contactData, agenda_slug: e.target.value })
          }
          onFocus={() => {
            setButtonClicked(false);
          }}
        >
          <option>Select an Agenda</option>
          <option
            value={contactData.agenda_slug || "levan-claudio"}
            selected={contactData.agenda_slug}
          >
            {contactData.agenda_slug || "levan-claudio"}
          </option>
        </select>
        <label htmlFor="agenda">Agenda:</label>
      </div>

      <div className="row my-3">
        <Link>
          <button
            type="button"
            className="btn btn-primary w-100"
            data-bs-toggle="modal"
            data-bs-target="#goToHomePage"
            onClick={handleContact}
            disabled={
              buttonClicked ||
              !contactData.full_name ||
              !contactData.email ||
              !contactData.address ||
              !contactData.phone ||
              !contactData.agenda_slug
            }
          >
            {params.id ? "Save" : "Add"}
          </button>
        </Link>

        <Link to="/">
          <span className="">or get back to home page</span>
        </Link>
      </div>

      {/* MODAL "GO TO HOME PAGE" */}
      <div className="modal fade" id="goToHomePage" tabIndex="-1" aria-labelledby="goToHomePageLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" >{params.id ? "Contact edit" : "New contact"}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              {store.updateContactStatus
                ? <div className="modal-body">
                    Successfully{params.id ? " edited " : " added "}contact!
                  </div>
                : <div className="modal-body">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
              }
              <div className="modal-footer">
                <button className="btn btn-success" onClick={() => goToHomePage()} data-bs-dismiss="modal" disabled={!store.updateContactStatus}>Go to home page</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
