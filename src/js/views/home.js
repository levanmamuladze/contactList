import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const handleDeleteContact = (contact) => {
    setContactToDelete(contact);
  };

  const confirmDeleteContact = () => {
    if (contactToDelete) {
      actions.deleteContact(contactToDelete.id);
      setContactToDelete(null);
    }
  };

  // const handleEditContact = (contact) => {
  //   actions.setEditContact(contact);
  // };

  return (
    <div className="container">
      <div className="row">
        {store.contacts.length === 0 ? <h3 className="m-5">Getting contacts...</h3>:null}
        {store.contacts.map((contact) => (
          <div className="col-sm-12 col-md-6 col-lg-4 mb-3" key={contact.id}>
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">{contact.full_name}</h5>
                <p className="card-text"><i className="fa-solid fa-envelope px-2"></i>{contact.email}</p>
                <p className="card-text"><i className="fa-solid fa-location-dot px-2"></i>{contact.address}</p>
                <p className="card-text"><i className="fa-solid fa-phone px-2"></i>{contact.phone}</p>
                <p className="card-text"><i className="fa-regular fa-calendar-days px-2"></i>{contact.agenda_slug}</p>
                <div className="d-flex">
                  <Link to={`/manage-contact/${contact.id}`}>
                    <button type="button" className="btn text-primary"><i className="fa-solid fa-user-pen"></i></button>
                  </Link>
                  <button type="button" className="btn text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleDeleteContact(contact)}><i className="fa-solid fa-trash-can"></i></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Delete contact</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            You really want to delete this lovely person?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)} data-bs-dismiss="modal">Close</button>
              <button className="btn btn-danger" onClick={() => confirmDeleteContact()}>Delete</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* <div className="modal fade" id="deleteContact" aria-labelledby="deleteContactLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Delete contact
              </h5>
              <button onClick={() => setShowDeleteModal(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              You really want to delete this lovely person?
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => confirmDeleteContact()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
