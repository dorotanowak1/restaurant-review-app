import React from "react";
import "./App.css";
import { Rating, Button, Form } from "semantic-ui-react";
import { Icon, Input } from "semantic-ui-react";

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      rating: "3",
      email: ""
    };
  }

  handleRate = (e, { rating, maxRating }) => {
    this.setState({ rating, maxRating });
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Form.Field>
          <label>Comment</label>

          <textarea
            type="text"
            required="required"
            value={this.state.comment}
            placeholder="Comment"
            onChange={e => {
              this.setState({ comment: e.target.value });
            }}
          />
        </Form.Field>
        <br />
        <Form.Field>
          <label>Rating</label>

          <Rating
            icon="star"
            required="required"
            value={this.state.rating}
            onRate={this.handleRate}
            defaultRating={3}
            maxRating={5}
          />
          <input type="hidden" name="rates" value={this.state.rating} />

          <br />
        </Form.Field>
        <br />
        <Form.Field>
          <label>Your e-mail (optional) </label> <br />
          <Input
            iconPosition="left"
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
            placeholder="email"
          >
            <Icon name="at" />
            <input />
          </Input>
        </Form.Field>
        <br />
        <br />
        <Button className="submit" type="submit" value="submit">
          Submit your review
        </Button>
      </Form>
    );
  }
}
export default ReviewForm;
