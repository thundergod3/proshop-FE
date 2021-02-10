import React from "react";
import { Form, Button } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Formik } from "formik";

const SearchBox = ({ history }: RouteComponentProps): JSX.Element => (
	<Formik
		initialValues={{ keyword: "" }}
		onSubmit={(values, action) => {
			if (values.keyword.trim()) {
				history.push(`/search/${values.keyword}`);
			} else {
				history.push("/");
			}
		}}>
		{(props) => (
			<Form onSubmit={props.handleSubmit} inline>
				<Form.Control
					type="text"
					name="q"
					onChange={props.handleChange("keyword")}
					placeholder="Search Products..."
					className="mr-sm-2 ml-sm-5"></Form.Control>
				<Button type="submit" variant="outline-success" className="p-2">
					Search
				</Button>
			</Form>
		)}
	</Formik>
);

export default withRouter(SearchBox);
