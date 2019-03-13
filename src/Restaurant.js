import React from "react";
import Trigger from "./Trigger";
import Review from "./Review";
import { Divider, Button } from "semantic-ui-react";
import "./App.css";
import Loader from "./Loader";

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      restaurant: props.restaurant,
      reviewFormVisible: false
    };
    this.openReviewFormModal = this.openReviewFormModal.bind(this);
    this.closeReviewFormModal = this.closeReviewFormModal.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    this.addReview = this.addReview.bind(this);
    this.getReviewsFromAPI = this.getReviewsFromAPI.bind(this);
    this.getStreetView = this.getStreetView.bind(this);
  }

  toggleOpen() {
    this.getReviewsFromAPI();
    const isHidden = this.state.isHidden;
    this.setState({ isHidden: !isHidden });
  }

  closeReviewFormModal = () => {
    this.setState({ reviewFormVisible: false });
  };

  openReviewFormModal = () => {
    this.setState({ reviewFormVisible: true });
  };

  addReview(comment, stars) {
    const restaurant = this.state.restaurant;
    restaurant.ratings = restaurant.ratings.concat([
      { comment: comment, stars: stars }
    ]);
    this.setState({ restaurant: restaurant });
  }

  handleReviewSubmit(event) {
    event.preventDefault();
    this.addReview(
      event.target.elements[0].value,
      event.target.elements[1].value,
      event.target.elements[2].value
    );

    this.closeReviewFormModal();
  }

  getStreetView(lat, lng) {
    const viewurl =
      "https://maps.googleapis.com/maps/api/streetview?size=100x100&location=" +
      lat +
      "," +
      lng +
      "&pitch=10&fov=90&heading=235&key=AIzaSyDpZpcBF6Q7iisYJXN4_hbI2DUZbmrmauk";

    fetch(viewurl)
      .then(data => data.json())
      .then(resp => {
        resp.results.forEach(r => {
          console.log(r);
        });
      });
  }

  getReviewsFromAPI() {
    if (this.state.restaurant.placeId !== "-1") {
      const apiurl =
        "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
        this.state.restaurant.placeId +
        "&key=key";

      if (this.state.restaurant.fetchReviews === false) {
        fetch(apiurl)
          .then(data => data.json())
          .then(resp => {
            resp.result.reviews.forEach((r, i) => {
              this.addReview(r.text, r.rating);
            });
            const restaurant = this.state.restaurant;
            restaurant.fetchReviews = true;
            this.setState({ restaurant: restaurant });
          });
      }
    } else {
      const restaurant = this.state.restaurant;
      restaurant.fetchReviews = true;
      this.setState({ restaurant: restaurant });
    }
  }

  render() {
    const RestImg = (
      <img
        src={this.state.restaurant.imgUrl}
        alt={this.state.restaurant.name}
      />
    );
    let review = !this.state.restaurant.fetchReviews ? (
      <Loader />
    ) : (
      this.state.restaurant.ratings.map((r, index) => {
        return (
          <Review comment={r.comment} stars={r.stars} key={"ratings" + index} />
        );
      })
    );

    return (
      <div>
        <p onClick={this.toggleOpen.bind(this)} className="ui header">
          {this.state.restaurant.name}
        </p>
        <p>{this.state.restaurant.address}</p>
        <br />

        {!this.state.isHidden && review}
        <br />
        {!this.state.isHidden && RestImg}
        <br />

        <Button onClick={this.openReviewFormModal}>Add review</Button>

        <Trigger
          className="trigger"
          closeReviewFormModal={this.closeReviewFormModal}
          reviewFormVisible={this.state.reviewFormVisible}
          index={this.props.idx}
          handleSubmit={this.handleReviewSubmit}
        />
        <br />

        <Divider />
      </div>
    );
  }
}

export default Restaurant;
