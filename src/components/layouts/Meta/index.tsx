import React from "react";
import { Helmet } from "react-helmet";

interface Props {
	title?: string;
	description?: string;
	keywords?: string;
}

const Meta = ({
	title = "Welcome To ProShop",
	description = "We sell the best products for cheap",
	keywords = "electronics, buy electronics, cheap electronics",
}: Props): JSX.Element => (
	<Helmet>
		<title>{title}</title>
		<meta name="description" content={description} />
		<meta name="keywords" content={keywords} />
	</Helmet>
);

export default Meta;
