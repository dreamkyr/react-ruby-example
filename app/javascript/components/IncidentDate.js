import React from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class IncidentDate extends React.Component {
	constructor(props) {
	  super(props)
    if (this.props.date) {
      this.state = {date: moment.utc(this.props.date, "MM/DD/YYYY")}
    } else{
      this.state = {date: moment()}
    }
    this.updateFormValue = this.updateFormValue.bind(this);
  }
  
  componentDidMount(){
    this.updateFormValue();
  }

  componentDidUpdate(prevProps) {
    this.updateFormValue();
  }
  
  updateFormValue(){
    var element = document.getElementById("incident_date_date");
    element.value = moment.utc(this.state.date).format("MM/DD/YYYY");
  }

  render () {
    const {date} = this.state

    return (
      <DatePicker
        ref={e=>this.datepicker = e}
        selected={date}
        placeholderText="Pick a day"
        dateFormat="MM/DD/YYYY"
        todayButton={"Today"}
        maxDate={moment()}
        className="form-control"
        onChange={(date) => {this.setState({date: date})}}
      />
    );
  }
}

export default IncidentDate
