import React, { Component } from "react";
import './NavigationDrawer.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { toggleNavigator } from '../../store/actions/navigator';
import {login} from '../../store/actions/loginAuth';
class NavigationDrawer extends Component {

  render() {
    const { showNav } = this.props;
    let sideNavStyle = { width: showNav ? "250px" : "0" };
    let adminExtras=null;
    if(this.props.isAdmin===true){
    adminExtras = (
       <>
       <Dropdown className="mb-2 dropdownStylingnav">
        <Dropdown.Toggle className="btnwidthdrawer" variant="info" id="dropdown-basic">
          Χρήστες
        </Dropdown.Toggle>
      </Dropdown>
      <Link to="/recource/user_management">-Διαχείρηση</Link>
      <Link to="/recource/user_management/add">-Προσθήκη νέου</Link>
     </>
  );
}
    return (
      <React.Fragment>
        <div name="side-nav" className="side-nav" style={sideNavStyle}>
          <h2 className="mb-5 text-dark">Κατηγοριες</h2>
          <Link to="#" onClick={this.props.closeNav} className="close-nav">
            &times;
          </Link>
          <Dropdown className="mb-3 dropdownStylingnav">
            <Dropdown.Toggle className="btnwidthdrawer" variant="info" id="dropdown-basic">
              Προιοντα
            </Dropdown.Toggle>
          </Dropdown>
          <Link to="#">-Προιοντα Φωτογραφιας</Link>
          <Link to="#">-Δωρα</Link>
          <Link to="#">-Υλικα εργαστηρίου</Link>
          <Link to="#" className="mb-3">-Προσθήκη νέου</Link>
          {adminExtras}
        </div>
      </React.Fragment>
    );
  }
}

const toggleButton = (props) => {
  return (
    <span onClick={props.openNav} className="open-nav">
      &#9776;
    </span>
  );
}

const mapStateToProps = (state, props) => {
  return {
    showNav: state.navigator.open,
    isAdmin: state.login.isAdmin,
    ...props,
  }
};

const handleEscKey = (e, toggleNavigation) => {
  if (e.key === "Escape") {
    document.removeEventListener("keydown", handler);
    toggleNavigation();
  }
};
let handler = null;
const mapDispatchToProps = dispatch => {
  if (handler === null){
    handler = e => handleEscKey(e, () => dispatch(toggleNavigator()));
  }
  return {
    openNav: e => {
      e.preventDefault();
      document.addEventListener("keydown", handler);
      dispatch(toggleNavigator());
    },
    closeNav: e => {
      e.preventDefault();
      document.removeEventListener("keydown", handler);
      dispatch(toggleNavigator());
    }
  }
}
export const navigationToggleButton  = connect((state, props) => ({ ...props }), mapDispatchToProps)(toggleButton);
export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer);
