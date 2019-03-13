import React, { Component } from "react";
import Restaurant from "./Restaurant";
import Rating from "./Rating";
import About from "./About";
import "./App.css";
import Header from "./Header";
class RestaurantList extends Component {
  constructor(props) {
    super(props);

    this.state = { minRating: 0, maxRating: 5 };
  }

  handleChangeMin = e => {
    // console.log(e.target.value);
    this.setState({ minRating: e.target.value });
  };
  handleChangeMax = e => this.setState({ maxRating: e.target.value });

  render() {
    return (
      <div className="ui raised very padded text container segment">
        <div className="rlist">
          <Header />
          <About />
          <br />
          <br />
          <br />
          <Rating
            minRating={this.state.minRating}
            maxRating={this.state.maxRating}
            handleChangeMin={this.handleChangeMin}
            handleChangeMax={this.handleChangeMax}
          />

          {this.props.restaurants
            .filter(
              r =>
                r.averageRating >= this.state.minRating &&
                r.averageRating <= this.state.maxRating
            )
            .map((r, index) => {
              return (
                <div key={index}>
                  <br />
                  <Restaurant idx={index} restaurant={r} />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default RestaurantList;
