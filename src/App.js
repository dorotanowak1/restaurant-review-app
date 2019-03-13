import React, { Component } from "react";
import "./App.css";
import Map from "./Map";
import RestaurantList from "./RestaurantList";
import AddressForm from "./AddressForm";
import { Grid } from "semantic-ui-react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: 15,
      center: {
        lat: 51.5082934,
        lng: -0.0983035
      },
      isMarkerShown: false,
      markers: [],
      restaurants: [],
      addressFormVisible: false,
      newLat: 0,
      newLng: 0
    };

    this.AddNewPlaceHandler = this.AddNewPlaceHandler.bind(this);

    this.getRestaurantsFromAPI = this.getRestaurantsFromAPI.bind(this);
    this.getRestaurantsFromJSON = this.getRestaurantsFromJSON.bind(this);

    this.addMarker = this.addMarker.bind(this);
    this.addMarkers = this.addMarkers.bind(this);
    this.addRestaurant = this.addRestaurant.bind(this);
    this.addRestaurants = this.addRestaurants.bind(this);

    this.resetMarkersAndRestaurant = this.resetMarkersAndRestaurant.bind(this);
  }
  // address form component
  openAddressFormModal = () => {
    this.setState({ addressFormVisible: true });
  };
  closeAddressFormModal = () => {
    this.setState({ addressFormVisible: false });
  };
  // for adding new restaurant
  AddNewPlaceHandler(event) {
    event.preventDefault();

    this.addRestaurant(
      this.setRestaurant(
        event.target.elements[0].value,
        event.target.elements[1].value,
        []
      )
    );
    this.addMarker(
      Number(event.target.elements.lat.value),
      Number(event.target.elements.lng.value)
    );
    event.target.elements[0].value = "";
    event.target.elements[1].value = "";
    event.target.elements[2].value = "";

    this.closeAddressFormModal();
  }

  addRestaurant(newRestaurant) {
    const restaurants = this.state.restaurants;
    this.setState({ restaurants: restaurants.concat([newRestaurant]) });
  }

  // add a bunch of markers to the map
  addMarkers(newMarkers) {
    const markers = this.state.markers;
    this.setState({ markers: markers.concat(newMarkers) });
  }
  // add a bunch restaurants to restaurants list
  addRestaurants(newRestaurants) {
    const restaurants = this.state.restaurants;
    this.setState({ restaurants: restaurants.concat(newRestaurants) });
  }

  // add single marker to map
  addMarker(lat, lng) {
    const markers = this.state.markers;
    this.setState({
      markers: markers.concat([{ lat: lat, lng: lng }])
    });
  }
  // returns properly formatted restaurant object
  setRestaurant(name, address, ratings, averageRating, placeId, imgUrl) {
    let average = 0;
    let restaurant = {
      name: name,
      address: address,
      ratings: ratings,
      averageRating: average,
      placeId: "-1",
      fetchReviews: false,
      imgUrl: imgUrl
    };

    if (ratings.length > 0) {
      average =
        restaurant.ratings.map(rating => rating.stars).reduce((a, b) => a + b) /
        restaurant.ratings.length;
    }
    if (averageRating) {
      restaurant.averageRating = averageRating;
    } else {
      restaurant.averageRating = average;
    }

    if (placeId) {
      restaurant.placeId = placeId;
    } else {
      restaurant.placeId = "-1";
    }

    return restaurant;
  }
  // opens the form and gets lat lng
  addNewPlace(e) {
    this.setState({
      addressFormVisible: true,
      newLat: e.latLng.lat(),
      newLng: e.latLng.lng()
    });
  }
  // reset marker array
  resetMarkersAndRestaurant() {
    this.setState({ markers: [], restaurants: [] });
  }
  // gets restaurants from google api
  getRestaurantsFromAPI(lat, lng) {
    const url =
      "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      lat +
      "," +
      lng +
      "&radius=2000&type=restaurant&key=AIzaSyDpZpcBF6Q7iisYJXN4_hbI2DUZbmrmauk";

    this.resetMarkersAndRestaurant();
    fetch(url)
      .then(data => data.json())
      .then(resp => {
        let newMarkers = [];
        let newRestaurants = [];
        resp.results.forEach(r => {
          const imgUrl =
            "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=" +
            r.geometry.location.lat +
            "," +
            r.geometry.location.lng +
            "&pitch=10&fov=90&heading=235&key=key";
          newMarkers = newMarkers.concat([
            {
              lat: r.geometry.location.lat,
              lng: r.geometry.location.lng,
              restaurantName: r.name
            }
          ]);
          newRestaurants.push(
            this.setRestaurant(
              r.name,
              r.vicinity,
              [],
              r.rating,
              r.place_id,
              imgUrl
            )
          );
        });
        this.addMarkers(newMarkers);
        this.addRestaurants(newRestaurants);
      });
  }

  getRestaurantsFromJSON() {
    fetch("data.json")
      .then(data => data.json())
      .then(resp => {
        let markers = [];
        let restaurants = [];
        resp.forEach(r => {
          markers = markers.concat([
            {
              lat: r.lat,
              lng: r.long,
              restaurantName: r.restaurant
            }
          ]);
          restaurants.push(
            this.setRestaurant(r.restaurant, r.address, r.ratings, r.rating)
          );
        });
        this.addMarkers(markers);
        this.addRestaurants(restaurants);
      });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState(prevState => ({
          center: {
            ...prevState.center,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          isMarkerShown: true
        }));
      });
    }
  }

  componentDidMount() {
    this.getLocation();
    this.getRestaurantsFromJSON();
  }

  render() {
    return (
      <div>
        <Grid divided="vertically">
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={11}>
              <Map
                zoom={this.state.zoom}
                center={this.state.center}
                markers={this.state.markers}
                restaurants={this.state.restaurants}
                onClick={e => this.addNewPlace(e)}
                getRestaurants={this.getRestaurantsFromAPI}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={5} className="rlist">
              <RestaurantList restaurants={this.state.restaurants} />

              <AddressForm
                open={this.state.addressFormVisible}
                onClose={this.closeAddressFormModal}
                lat={this.state.newLat}
                lng={this.state.newLng}
                handleSubmit={this.AddNewPlaceHandler}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
