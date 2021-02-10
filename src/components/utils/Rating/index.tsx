import React from "react";

import "./style.scss";

interface Props {
	rating: number | any;
	text?: string;
	color?: string;
}

const Rating = ({ rating, text, color = "#f8e825" }: Props): JSX.Element => (
	<div className="rating">
		{Array.from([0, 1, 2, 3, 4]).map(
			(item): JSX.Element => (
				<span key={item}>
					<i
						className={
							rating >= item + 1
								? "fas fa-star"
								: rating >= item + 0.5
								? "fas fa-star-half-alt"
								: "far fa-star"
						}
						style={{ color }}></i>
				</span>
			)
		)}
		<span className="">{text && text}</span>
	</div>
);

export default Rating;
