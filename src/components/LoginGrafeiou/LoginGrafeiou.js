import React, { Component } from "react";
import { login } from "../../store/actions/LoginGrafeio/loginGrafeio";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import SimpleAppHeader from "../simpleAppheader/simpleAppheader";
class LoginGrafeiou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLogin: true
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    //this.handleChange= this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.username+this.state.password);
    //event.preventDefault();
    console.log(event.preventDefault());
    console.log(this.state.username);
    const formdata = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.onAuth(formdata);
    /*
  this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    this.props.history.push({
      pathname: "/recource/products",
      state: {
        username: this.state.username
      }
    });
    */
  }

  render() {
    //const { handleSubmit } = this.props;
    let spinner = null;
    if (this.props.loading) {
      spinner = <Spinner animation="border" />;
    }
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

     if(this.props.isLogedInGrafeio === true){
       console.log(this.props.isAdmin);
       this.props.history.push({
         pathname: "/office/sellers/greeting",
         username:this.props.username
       });
   }
  //  if(this.props.isAdmin === false ){
  //    this.props.history.push({
  //      pathname: "/recource/products",
  //    });
  //  }


    return (
      <>
        <SimpleAppHeader />
        <form onSubmit={this.handleSubmit}>
          {spinner}
          <div className="Container background_form">
            <div className="row mb-5">
              <div className="col ">
                <input
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleUsername}
                />
              </div>
            </div>
            <div className="row mb-5">
              <div className="col">
                <input
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handlePassword}
                />
              </div>
            </div>
            <div className="row offset-7">
              <div className="col-5">
                <input type="submit" value="Συνδεση" />
              </div>
              {errorMessage}
            </div>
          </div>
        </form>
      </>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    username: state.loginGrafeiou.userName,
    isLogedInGrafeio: state.loginGrafeiou.isLogedInGrafeio,
    loading: state.loginGrafeiou.loading,
    error: state.loginGrafeiou.error,
    ...props
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuth: formdata => dispatch(login(formdata))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginGrafeiou);
