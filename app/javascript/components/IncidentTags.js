import React from "react";
import SuggestTag from "./IncidentSuggestTag";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class IncidentTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      rating: 0,
      suggestions: [],
      suggestTags: [],
    };

    this.initTags = this.initTags.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.updateFormValue = this.updateFormValue.bind(this);
    // this.loadSuggestions = this.loadSuggestions.bind(this);
    this.loadSuggestionTags = this.loadSuggestionTags.bind(this);
    this.onTagItemClick = this.onTagItemClick.bind(this);
    this.initTags(false);
  }

  componentDidUpdate() {

    if (this.state.rating != this.props.rating) {
      var element = document.getElementById("incident_tags_list");
      element.value = '';
      this.setState({suggestTags: []});
      let isChangedRating = true;
      this.initTags(isChangedRating);
    }
  }

  initTags(isChangedRating) {
    var rating = document.getElementById("incident_rating").value;
    this.state.rating = rating;
    this.loadSuggestionTags(rating, isChangedRating);
  }

  loadSuggestionTags(rating, isChangedRating) {
    var tags = this.props.tags;
    if (isChangedRating) {
      tags = [];
    }

    var min_rating = 1;
    var max_rating = 5;
    if (rating == 1) {
      min_rating = 1;
      max_rating = 2;
    } else if (rating == 5) {
      min_rating = 4;
      max_rating = 5;
    } else {
      min_rating = parseInt(rating) - 1;
      max_rating = parseInt(rating) + 1;
    }
    var savedTagArr = [];
    if (tags && tags.length > 0) {
      tags.map(tag => {
        savedTagArr.push({ id: tag, text: tag, name: tag, isAdded: 1, isSuggestTag: 0 });
      });
      
    }
    $.ajax({
      url: "/api/v1/tags/suggested?min_rating=" + min_rating + "&max_rating=" + max_rating,
      type: "GET",
      success: response => {
        var filteredArr = [];
        response.data.map(item => {

          item.isAdded = 0;
          item.id = item.name;
          item.text = item.name;
          item.isSuggestTag = 1;
          let index =  savedTagArr.findIndex(tag => item.text == tag.text);
          if(index >= 0){
            item.isAdded = 1;
            savedTagArr[index] = item
          }else{
            let originIndex = response.data.findIndex(tag=> item.text == tag.text);
            savedTagArr.splice(originIndex, 0, item);
            savedTagArr.join();
          }
        });
        this.setState({ suggestTags: savedTagArr });
      }
    });
  }

  updateFormValue(tags) {
    var element = document.getElementById("incident_tags_list");
    var submitArr = tags.filter((tag, index) => tag.isAdded != 0);
    element.value = submitArr.map(tag => tag.id).toString();
  }

  handleDelete(i) {
    const { suggestTags } = this.state;
    if (i < 0) {
      if (suggestTags[suggestTags.length - 1].isSuggestTag == 0) {
        suggestTags.pop();
        this.updateFormValue(suggestTags);
        this.setState({ suggestTags: suggestTags });
      }
      return;
    }
    var tagArr = [];
    if (suggestTags[i].isSuggestTag != 1) {
      tagArr = suggestTags.filter((tag, index) => index !== i)
      this.updateFormValue(tagArr);
    } else {
      tagArr = suggestTags;
      var tempArr = suggestTags.filter((tag, index) => tag.isAdded !== 0)
      this.updateFormValue(tempArr);
    }
    this.setState({
      suggestTags: tagArr,
    });
  }

  handleAddition(tag) {
    if (tag.isAdded == null || tag.isSuggestTag == null) {
      tag.name = tag.text;
      tag.isAdded = 1;
      tag.isSuggestTag = 0;
    }
    let index = this.state.suggestTags.findIndex(item => item.text == tag.text);
    if (index < 0) {
      tag.name = tag.text;
      tag.isAdded = 1;
      tag.isSuggestTag = 0;
      this.setState(state => ({ suggestTags: [...state.suggestTags, tag] }));
      var tempArr = [...this.state.suggestTags, tag];
      tempArr = tempArr.filter((tag, index) => tag.isAdded !== 0)
      this.updateFormValue(tempArr);
    } else {
      if (tag.isSuggestTag == 1) {
        var tempArr = this.state.suggestTags;
        tempArr[index] = tag;
        this.setState({ suggestTags: tempArr });
        this.updateFormValue(tempArr);
      }
    }
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
    this.updateFormValue(newTags);
  }

  onTagItemClick(tag) {
    this.state.suggestTags.map(suggestTag => {
      if (suggestTag.name == tag.name) {
        if (tag.isAdded == 1) {
          this.handleAddition(tag);
        } else {
          this.handleDelete(this.state.suggestTags.indexOf(suggestTag));
        }
      }
    });
  }

  suggestTagView(suggestTags) {
    let view = [];
    suggestTags.map(suggestTag => {
      view.push(
        <SuggestTag
          itemClick={this.onTagItemClick}
          suggestTag={suggestTag}
          key={suggestTag.name}
        />
      );
    }
    );

    return view;
  }

  render() {

    const { tags, suggestions, suggestTags } = this.state;

    return (
      <div>
        <div className="suggestTagWrapper">
          {this.suggestTagView(suggestTags)}
        </div>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          delimiters={delimiters}
          classNames={{
            tags: 'tagsClass',
            tagInput: 'tagInputClass',
            tagInputField: 'tagInputFieldClass form-control',
            selected: 'selectedClass',
            tag: 'tagClass',
            remove: 'removeClass',
            suggestions: 'suggestionsClass',
            activeSuggestion: 'activeSuggestionClass'
          }}
        />
      </div>
    );
  }
}

export default IncidentTags