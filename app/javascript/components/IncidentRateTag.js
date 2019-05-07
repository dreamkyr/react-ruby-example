import React from "react";
import Rating from './IncidentRating';
import Tag from "./IncidentTags";

class IncidentRateTag extends React.Component {
	constructor(props) {
    super(props)
    this.state={rating: 0, ratingForTag: 0};
    if(this.props.rating){
      this.state.rating = this.props.rating;
    }
    this.state.tags = this.props.tags;
    this.updateRating = this.updateRating.bind(this);
  }

  updateRating(changedRating) {
    if (changedRating!==this.state.rating){
      this.setState({rating: changedRating});
    }
  }

  render () {
    
    const {rating, tags} = this.state;
    
    return (
      <div>
        <div className="reactRatingWrapper">
          <label>Rate your experience with this police officer.</label>
          <Rating
            rating={rating}
            onChangeRating={this.updateRating}
          />
        </div>
        {this.state.rating > 0 &&
          <div>
            <label>How did the police officer make you feel?</label>
            <Tag
              tags={tags}
              rating={rating}
            />
          </div>
        }
      </div>
    );
  }
}

export default IncidentRateTag
