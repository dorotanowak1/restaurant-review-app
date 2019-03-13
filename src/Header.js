import React from "react";
import { Header, Icon } from "semantic-ui-react";

const header = () => (
  <div className="header">
    <Header as="h2" icon textAlign="center">
      <Icon size="huge" name="food" />
      Restaurants finder
      <Header.Subheader>Restaurants near you.</Header.Subheader>
    </Header>
  </div>
);

export default header;
