import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
	const location = useLocation();

	return (
		<nav className="navbar navbar-light bg-light mb-3 p-3">
			<div className="container">
			<Link to="/" className="navbar-brand">
				<span><i class="fa-solid fa-address-card px-2"></i>CONTACT LIST</span>
			</Link>
			<div className="ml-auto">
				{location.pathname === "/" 
				?<Link to="/manage-contact/">
					<button className="btn btn-success">Add new contact</button>
				</Link>
				:null}
			</div>
			</div>
		</nav>
	);
};
