import React from "react";
import ReviewForm from "./ReviewForm";
import { Modal } from "semantic-ui-react";

class Trigger extends React.Component {
  render() {
    return (
      <Modal
        open={this.props.reviewFormVisible}
        onClose={this.props.closeReviewFormModal}
      >
        <Modal.Header>REVIEW</Modal.Header>
        <Modal.Content>
          <ReviewForm
            index={this.props.index}
            handleSubmit={this.props.handleSubmit}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default Trigger;
