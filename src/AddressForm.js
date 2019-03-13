import React from "react";
import { Button, Modal, Form, Input } from "semantic-ui-react";
import "./App.css";
class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: "",
      address: "",
      website: ""
    };

    this.resetForm = this.resetForm.bind(this);
  }

  resetForm() {
    this.setState({ restaurant: "", address: "", website: "" });
  }
  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <Modal.Header>Add a new restaurant</Modal.Header>
        <Modal.Content>
          <Form
            onSubmit={e => {
              this.props.handleSubmit(e);
              this.resetForm();
            }}
          >
            <Form.Field>
              <label>Restaurant</label>
              <br />
              <Input
                type="text"
                required="required"
                placeholder="restaurant"
                value={this.state.restaurant}
                onChange={e => {
                  this.setState({ restaurant: e.target.value });
                }}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <label>Address</label>
              <br />
              <Input
                type="text"
                required="required"
                placeholder="address"
                value={this.state.address}
                onChange={e => {
                  this.setState({ address: e.target.value });
                }}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <label>Website (optional) </label>
              <br />
              <Input
                type="text"
                value={this.state.website}
                onChange={e => {
                  this.setState({ website: e.target.value });
                }}
                label="http://"
                placeholder="website"
              />
              <input type="hidden" name="lat" value={this.props.lat} />
              <input type="hidden" name="lng" value={this.props.lng} />

              <br />
            </Form.Field>
            <br />
            <Button className="submit" type="submit" value="submit">
              Add a restaurant
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}
export default AddressForm;
