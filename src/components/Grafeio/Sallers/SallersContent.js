import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {connect} from 'react-redux';
import {navigationToggleButton as NavigationToggleButton} from '../NavigationGrafeio/NavigationGrafeio';
import NavigationGrafeio from "../NavigationGrafeio/NavigationGrafeio";
import Calendar from 'react-calendar';
import {getSeller,createSellersAppointment} from '../../../store/actions/Grafeio/sallers';
import SellersHeader from "../SellersHeader/sellersHeader";
import Button from "react-bootstrap/Button";
import "./SallersContent.css";
import 'react-calendar/dist/Calendar.css';
import Overlay from 'react-bootstrap/Overlay';
import { Popover } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
class SellersContent extends Component {
           constructor(props){
             super(props);

             this.state = {
               ShowDetailedCalendar: false,
               date:new Date(2020,0,1),
               Month:null,
               year:null,
               day:null,
               filteredAppointmets:null,
               name:null,
               time:null,
               schoolName:null,
               email:null,
               nameYpeuthinou:null,
               PhoneYpeuthinou:null,
               topothesia:null
             }

           }
  onChange = (date) => {
    let temp=this.props.appointments;

  let test=  temp.filter(appointments => new Date(parseInt(appointments.year,10),parseInt(appointments.month,10)-1,parseInt(appointments.day,10)).toLocaleDateString() === date.toLocaleDateString() );
    const year=date.toLocaleDateString().substring(4,9).replace('/','');
    const month=date.toLocaleDateString().substring(0,2).replace('/','');
    const day=date.toLocaleDateString().substring(2,4).replace('/','');
    this.setState({ date:date,filteredAppointmets:test,year:year,month:month,day:day});
  }
  handleAddnew = () => {
    console.log(this.props);
    this.props.history.push({
      pathname: "/recource/products/add",
      //state: {username: this.state.username}
    });

  }
  timeOnChangeHandler = event => {
    event.persist();
    console.log(event);
    this.setState({ time: event.target.value});
  }
  SchoolnameOnChangeHandler = event => {
    event.persist();
    console.log(event);
    this.setState({ schoolName: event.target.value});
  }
  TopothesiaOnChangeHandler = event => {
    event.persist();
    console.log(event);
    this.setState({ topothesia: event.target.value});
  }
  nameYpeuthinouOnChangeHandler = event => {
    event.persist();
    console.log(event);
    this.setState({ nameYpeuthinou: event.target.value});
  }
  PhoneYpeuthinouOnChangeHandler = event => {
    event.persist();
    console.log(event);
    this.setState({ PhoneYpeuthinou: event.target.value});
  }
  emailOnChangeHandler = event => {
    event.persist();
    console.log(event);
    this.setState({ email: event.target.value});
  }
  NewAppointmentHandler = () => {

      this.setState({ShowDetailedCalendar:true});
  }
  NewAppointmentcall = () => {
    if(this.state.schoolName != null && this.state.nameYpeuthinou != null && this.state.PhoneYpeuthinou != null && this.state.topothesia != null && this.state.email != null){
      const appointment = {};
      appointment.year = this.state.year;
      appointment.month =this.state.month;
      appointment.day = this.state.day;
      appointment.time = this.state.time;
      appointment.sellerid = this.props.sellers[0]._id;
      appointment.school = this.state.schoolName;
      appointment.NameResponse = this.state.nameYpeuthinou;
      appointment.PhoneResponse=this.state.PhoneYpeuthinou;
      appointment.email=this.state.email;
      appointment.topothesh=this.state.topothesia;
       console.log(appointment);

      // this.props.updateProduct(product);
      // this.props.history.goBack();
      this.props.createSellersAppointment(appointment);
   }

  }
  MonthChangeHandler = event => {
    event.persist();
    console.log(event);
      this.setState({
                      Month:event.target.selectedIndex+1,
                      date:new Date(2020,event.target.selectedIndex,1)
       });
  }
  onClickCalendar = event => {
    event.persist();
    console.log(event);
      // this.setState({
      //                 Month:event.target.selectedIndex+1,
      //                 date:new Date(2020,event.target.selectedIndex,1)
      //  });
  }

  render() {
    let sellers = null;
    let showSellers = null;
    let SpesificView = null;
    let appointment=null;


   if(this.state.filteredAppointmets !==null){
     console.log(this.state.filteredAppointmets);
    appointment = (
      this.state.filteredAppointmets.map((appointments,index) => (
        <div key={index}>
      <p className="smallText" >{appointments.time}</p>
      <p className="smallText" >{appointments.school}</p>
      </div>
    )))
   }

    if (this.props.sellers != null) {
      showSellers = this.props.sellers.map((sellers, index) => (<div key={index}>
        <p className="smallText">Ονομα:{sellers.sellername}</p>
        <p className="smallText">email: {sellers.email}</p>
        <p className="smallText">Τηλ: 6978492740</p>
        <p className="smallText">Περιοχες: {sellers.region}</p>
        <p className="smallText">username: {sellers.fullName}</p>
      </div>))
    };
    if(this.state.ShowDetailedCalendar){
      const popover = (
      <Popover id="popover-basic arrow">
        <Popover.Content className="popoverWidth_Height detailSailler">
          <div className="smallText detailSailler" > Ημερομηνία : {this.state.date.toLocaleDateString()}</div>
          <div className="smallText detailSailler smallFormpop" > Ωρα :  <input type="time"style={{width: "70%",height: "25px","borderTop": "hidden","borderLeft": "hidden","borderRight": "hidden"}} className="smallText detailSailler" name="name" onChange={this.timeOnChangeHandler} /> </div>
          <div className="smallText detailSailler smallFormpop" > Σxoleio : <input type="text" style={{width: "70%",height: "25px","borderTop": "hidden","borderLeft": "hidden","borderRight": "hidden"}}className="smallText detailSailler" name="name" onChange={this.SchoolnameOnChangeHandler}/>  </div>
          <div className="smallText detailSailler smallFormpop" > Topothesia :   <input type="text"style={{width: "65%",height: "25px","borderTop": "hidden","borderLeft": "hidden","borderRight": "hidden"}} className="smallText detailSailler " name="name" onChange={this.TopothesiaOnChangeHandler} /> </div>
          <div className="smallText detailSailler smallFormpop" > onoma ipefthinou :  <input type="text" style={{width: "55%",height: "25px","borderTop": "hidden","borderLeft": "hidden","borderRight": "hidden"}}className="smallText detailSailler " name="name" onChange={this.nameYpeuthinouOnChangeHandler}/>  </div>
          <div className="smallText detailSailler smallFormpop" > thl ipefthinou :  <input type="number" className="smallText detailSailler pStyle" name="name"style={{width: "60%",height: "25px","borderTop": "hidden","borderLeft": "hidden","borderRight": "hidden"}} onChange={this.PhoneYpeuthinouOnChangeHandler} /> </div>
          <div className="smallText detailSailler smallFormpop" > email :  <input type="email" name="name" style={{width: "70%" ,height: "25px","borderTop": "hidden","borderLeft": "hidden","borderRight": "hidden" }}className="smallText detailSailler" onChange={this.emailOnChangeHandler}/> </div>
          <Button className="mb-3 mt-5" variant="info" onClick={this.NewAppointmentcall}>Νέο ραντεβού</Button>
        </Popover.Content>
      </Popover>
      );


      SpesificView=(
        <>
        <Calendar
         className="mb-5"
         onChange={this.onChange}
         value={this.state.date}
         onSelect={this.onClickCalendar}
       />

     <div className="row">
       <div className="col-5">
     <h5 className="text-center" >{this.state.date.toLocaleDateString()}</h5>
          {appointment}
       </div>
       <div className="col offset-5">
          {popover}
       </div>
      </div>
      </>
      )
    }else{
      if(this.props.appointments!=null){
      SpesificView=(

          this.props.appointments.map((appointments,index) => (
            <div key={index}>
          <p>{appointments.day}/{appointments.month}/{appointments.year}</p>
          </div>
          ))

      )
    }
    }
    return (<React.Fragment>
      <SellersHeader/>
      <div className="container mb-5 offset-3">
        <div className="row">
          <div className="col-4 mr-5">
            <div className="row">
              <div className="col border detailSailler">
                <h5>Στοιχεία πωλητη:</h5>
                {showSellers}
              </div>
            </div>
            <div className="row">
              <Button className="mb-3 mt-5" variant="info" onClick={this.NewAppointmentHandler}>+Νέο ραντεβού</Button>
            </div>
            <div className="row">
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Ανα/μήνα</Form.Label>
                <Form.Control as="select" custom="custom" onChange={this.MonthChangeHandler}>
                  <option>Ιανουάριος</option>
                  <option>Φεβρουάριος</option>
                  <option>Μαρτιος</option>
                  <option>Απρίλιος</option>
                  <option>Μαιος</option>
                  <option>Ιουνος</option>
                  <option>Ιουλιος</option>
                  <option>Αυγουστος</option>
                  <option>Σεμπτεμβριος</option>
                  <option>Οκτωμβριος</option>
                  <option>Νοεμβριος</option>
                  <option>Δεκεμβριος</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>
          <div className="col-4 border">
              {SpesificView}
          </div>
          <div className="row">
            <div className="col">
              <Button className="mb-3 mr-2" variant="info">Εξαγωγή pdf</Button>
              <Button className="mb-3" variant="info">Εκτύπωση</Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>)
  };
};

const mapStateToProps = (state, props) => {
  return {
    sellers: state.sellers.filterSellers,
    appointments: state.sellers.filterAppointments,
    loading: state.sellers.loading,
    SellerCode: state.loginGrafeiou.SellerCode,
    error: state.sellers.error,
    ...props
  }
};
const mapDispatchToProps = dispatch => {
  return {
    getSellers: (formdata) => dispatch(getSeller(formdata)),
    createSellersAppointment:(data) => dispatch(createSellersAppointment(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SellersContent);
