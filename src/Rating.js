import React from "react";
import { Rating, Divider } from "semantic-ui-react";

const rating = props => {
  return (
    <div className="filter">
      <h5> FILTER </h5>
      <h6 className="rating">From ONE</h6>
      <input
        type="range"
        min={1}
        max={5}
        value={props.minRating}
        onChange={props.handleChangeMin}
      />

      <Rating rating={props.minRating} maxRating={5} disabled />

      <h6 className="rating">To FIVE</h6>
      <input
        type="range"
        min={1}
        max={5}
        value={props.maxRating}
        onChange={props.handleChangeMax}
      />

      <Rating rating={props.maxRating} maxRating={5} disabled />

      <Divider />
    </div>
  );
};

export default rating;
