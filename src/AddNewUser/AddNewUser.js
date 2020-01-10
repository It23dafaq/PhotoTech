import React, { Component } from 'react';
//import '../NavigateButton/Navigatebtn.css';
import Button from 'react-bootstrap/Button';


class AddNewUser extends Component {
  constructor(props){
    super(props);
  }

  handleNewItem = () => {
    console.log(this.props);
     this.props.history.push("/products/add");
  }

  render () {
    return (
          <Button className="widthbtn mb-2" variant="secondary" onClick={this.handleNewItem}>Προσθήκη νέου</Button>
    );
  }
}

export default AddNewUser;
