import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
	const location = useLocation();

	return (
		<nav className="navbar navbar-light bg-light mb-3 p-3">
			<div className="container">
			<Link to="/" className="navbar-brand d-flex align-items-center">
				<i className="fa-solid fa-address-card px-2 fs-2"></i><span>CONTACT LIST</span>
			</Link>
			<div className="ml-auto">

				<Link to={location.pathname === "/"?"/manage-contact/":null}>
					<button className="btn btn-success" disabled={location.pathname !== "/"}>Add new contact</button>
				</Link>

			</div>
			</div>
		</nav>
	);
};
