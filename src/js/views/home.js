import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const handleDeleteContact = (contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
  };

  const confirmDeleteContact = () => {
    if (contactToDelete) {
      actions.deleteContact(contactToDelete.id);
      setShowDeleteModal(false);
      setContactToDelete(null);
    }
  };

  const handleEditContact = (contact) => {
    actions.setEditContact(contact);
  };

  return (
    <div className="container">
      <div className="row text-center">
        {store.contacts.length === 0 ? <h3 className="m-5">Getting contacts...</h3>:null}
        {store.contacts.map((contact) => (
          <div className="col-md-4 mb-3" key={contact.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{contact.full_name}</h5>
                <p className="card-text">{contact.email}</p>
                <p className="card-text">{contact.address}</p>
                <p className="card-text">{contact.phone}</p>
                <p className="card-text">{contact.agenda_slug}</p>
                <div className="d-flex justify-content-between">
                  <Link to={`/manage-contact/${contact.id}`}>
                    <button type="button" className="btn btn-primary"><i class="fa-solid fa-user-pen"></i></button>
                  </Link>
                  <button type="button" className="btn btn-danger" onClick={() => handleDeleteContact(contact)}><i class="fa-solid fa-trash-can"></i></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={`modal ${showDeleteModal ? "d-block" : "d-none"}`}>
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
      </div>
    </div>
  );
};
