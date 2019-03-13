import React from "react";
import { Container } from "semantic-ui-react";
import { Rating } from "semantic-ui-react";
import { Message } from "semantic-ui-react";

const review = props => {
  return (
    <Container>
      <Message>
        <h6>{props.comment}</h6>
        <br />
        <Rating
          icon="star"
          defaultRating={props.stars}
          maxRating={5}
          disabled
        />
      </Message>

      <br />
      <br />
    </Container>
  );
};

export default review;
