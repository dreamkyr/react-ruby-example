import React from "react";

class IncidentSuggestTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestTag: {},
    }

    this.state.suggestTag = this.props.suggestTag;
    this.itemClick = this.itemClick.bind(this);
    this.itemDelete = this.itemDelete.bind(this);
  }

  itemClick(event) {
    var tag = this.state.suggestTag;
    if (tag.isAdded == 0) {
      tag.isAdded = 1;
    } else {
      return;
    }
    this.props.itemClick(tag);
    this.setState({ suggestTag: tag });
  }

  itemDelete(e) {
    e.stopPropagation()
    var tag = this.state.suggestTag;
    if (tag.isAdded == 1) {
      tag.isAdded = 0;
    } else {
      return;
    }
    this.props.itemClick(tag);
    this.setState({ suggestTag: tag });
  }

  render() {
    const { suggestTag } = this.state

    return (
      <div>
        <a href="#" className={suggestTag.isAdded == 1 ? "btn btn-primary btn-pill btn-sm mr-1 mb-1" : "btn btn-outline-primary btn-pill btn-sm mr-1 mb-1"} onClick={this.itemClick}>{suggestTag.name}
          {suggestTag.isAdded == 1 &&
            <i className="fa fa-times-circle ml-1" onClick={this.itemDelete}></i>
          }
        </a>
      </div>
    );
  }
}

export default IncidentSuggestTag
