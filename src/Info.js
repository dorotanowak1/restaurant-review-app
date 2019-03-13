import React, { Component } from "react";
import { InfoWindow } from "react-google-maps";
class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen
    };
  }

  onToggleOpen = e => {
    const isOpen = this.state.isOpen;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    return (
      <div>
        {this.state.isOpen && (
          <InfoWindow onCloseClick={this.onToggleOpen}>
            <span>hello</span>
          </InfoWindow>
        )}
      </div>
    );
  }
}
export default Info;
