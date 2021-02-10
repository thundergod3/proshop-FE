import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface Props {
	pages: number;
	page: number;
	isAdmin?: boolean;
	keyword?: string;
}

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }: Props): JSX.Element => (
	<>
		{pages > 1 && (
			<Pagination>
				{[...Array(pages).keys()].map(
					(x: number): JSX.Element => (
						<LinkContainer
							key={x + 1}
							to={
								!isAdmin
									? keyword
										? `/search/${keyword}/page/${x + 1}`
										: `/page/${x + 1}`
									: `/admin/products/${x + 1}`
							}>
							<Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
						</LinkContainer>
					)
				)}
			</Pagination>
		)}
	</>
);

export default Paginate;
