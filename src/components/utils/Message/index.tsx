import React from "react";
import { Alert } from "react-bootstrap";

interface Props {
	variant?: string;
	children: any;
}

const Message = ({ variant = "info", children }: Props): JSX.Element => <Alert variant={variant}>{children}</Alert>;

export default Message;
