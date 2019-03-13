import React, { Component } from "react";
import { compose, withProps, lifecycle, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker
} from "react-google-maps";

const styles = require("./Styles.json");

const MapWithAMakredInfoWindow = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDpZpcBF6Q7iisYJXN4_hbI2DUZbmrmauk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            center: refs.map.getCenter()
          });

          if (refs.map.getBounds() || refs.map.getZoom() > 19) {
            this.props.getRestaurants(
              this.state.center.lat(),
              this.state.center.lng()
            );
          }
        }
      });
    }
  }),

  withStateHandlers(
    props => ({
      isOpen: true
    }),

    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),

  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    onBoundsChanged={props.onBoundsChanged}
    markers={props.markers}
    defaultZoom={props.zoom}
    defaultCenter={props.center}
    onClick={props.onClick}
    onCenterChanged={props.onCenterChanged}
    defaultOptions={{
      styles: styles,
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      rotateControl: false,
      fullscreenControl: false
    }}
    disableDefaultUI
  >
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        value={marker}
        position={marker}
        onClick={props.handleClick.bind(this, marker)}
      >
        {props.selectedMarker === marker && (
          <InfoWindow onCloseClick={props.onToggleOpen}>
            <span>{marker.restaurantName}</span>
          </InfoWindow>
        )}
      </Marker>
    ))}
    <Marker
      position={props.center}
      key={"one"}
      icon={{ url: "https://png.icons8.com/ios/50/000000/marker-filled.png" }}
    />
  </GoogleMap>
));

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMarker: false
    };
  }

  handleClick = (marker, event) => {
    this.setState({ selectedMarker: marker });
  };

  render() {
    return (
      <div className="map">
        <MapWithAMakredInfoWindow
          selectedMarker={this.state.selectedMarker}
          handleClick={this.handleClick}
          markers={this.props.markers}
          restaurants={this.props.restaurants}
          isMarkerShown={this.props.isMarkerShown}
          zoom={this.props.zoom}
          center={this.props.center}
          onClick={this.props.onClick}
          ref={this.props.onMapMounted}
          getRestaurants={this.props.getRestaurants}
          onBoundsChanged={this.props.onBoundsChanged}
          onCenterChanged={this.props.onCenterChanged}
        />
      </div>
    );
  }
}

export default Map;
