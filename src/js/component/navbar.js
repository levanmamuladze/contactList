import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
	const location = useLocation();
	console.log(location.pathname);
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>
			<div className="ml-auto">
				{location.pathname === "/" 
				?<Link to="/manage-contact/">
					<button className="btn btn-success">Add new contact</button>
				</Link>
				:null}
			</div>
		</nav>
	);
};
