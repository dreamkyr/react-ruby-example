import React from "react";
import Rating from "react-rating";

class IncidentRating extends React.Component {
	constructor(props) {
    super(props)
    this.state={rating: 0};
    if(this.props.rating){
      this.state.rating = this.props.rating;
    }
  }

  componentDidUpdate(prevProps) {
    var element = document.getElementById("incident_rating");
    element.value = this.ratingView.state.value;
    this.props.onChangeRating(this.ratingView.state.value);
  }
  
  render () {
    
    const {rating} = this.state;
    
    return (
      <Rating
        ref={e=>this.ratingView = e}
        initialRating={rating}
        style={{color: 'orange'}}
        emptySymbol="fa fa-star-o fa-3x"
        fullSymbol="fa fa-star fa-3x"
        onChange={(rate) => {this.setState({rating: rate})}}
      />
    );
  }
}

export default IncidentRating
