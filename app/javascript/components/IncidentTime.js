import React from "react";
import TimePicker from 'react-datepicker';
import moment from 'moment';

class IncidentTime extends React.Component {
	constructor(props) {
	  super(props)
	  
    if (this.props.date) {
      this.state = {date: new Date(this.props.date)}
    }else{
      this.state = {date: new Date()}
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
    var element = document.getElementById("incident_date_time");
    element.value = moment.utc(this.state.date).format('hh:mm A ZZ');
  }

  render () {
  	const {date} = this.state

    return (
      <TimePicker
        ref={e=>this.timepicker = e}
        selected={moment(date)}
        placeholderText="Pick a Time"
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        dateFormat="LT"
        timeCaption="Time"
        className="form-control"
        onChange={(date) => {this.setState({date: date})}}
      />
    );
  }
}

export default IncidentTime
