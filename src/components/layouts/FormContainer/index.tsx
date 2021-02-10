import React from "react";
import { Container, Row, Col } from "react-bootstrap";

interface Props {
	children: any;
}

const FormContainer = ({ children }: Props): JSX.Element => {
	return (
		<Container className="my-4">
			<Row className="justify-content-md-center">
				<Col xs={12} md={6}>
					{children}
				</Col>
			</Row>
		</Container>
	);
};

export default FormContainer;
