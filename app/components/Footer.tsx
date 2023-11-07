"use client"

import React from "react";
 function Footer() {
	const [hydrated, setHydrated] = React.useState(false);
	React.useEffect(() => {
		// This forces a rerender, so the date is rendered
		// the second time but not the first
		setHydrated(true);
	}, []);
	if (!hydrated) {
		// Returns null on first render, so the client and server match
		return null;
	}

	const year = new Date().getFullYear();
	return <div className="text-center p-20 bg-black">&copy; {year} Harikrishna Nair </div>;
}

export default Footer;
