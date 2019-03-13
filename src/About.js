import React from "react";
import { Icon, Popup } from "semantic-ui-react";

const about = () => (
  <Popup
    position="left center"
    trigger={<Icon size="huge" link name="info circle" />}
    content="
    to add new restaurant click anywhere on the map"
    basic
  />
);

export default about;
