import React, { Component } from "react";
import "./MainMenu.css";
import Cards from "../../components/Card/Card";
import SimpleAppHeader from "../../components/simpleAppheader/simpleAppheader";

class MainMenu extends Component {

  render() {
if (JSON.parse(localStorage.getItem('isLogedIn')) === true) {
  localStorage.setItem('isLogedIn',false);
  //localStorage.clear();
  window.location.reload()

}

    return (
      <>
      <SimpleAppHeader/>
      <div className="Container ">
        <h2 className="mb-5 text-center">Επιλέξτε Κατηγορία</h2>
        <div className="row justify-content-center">
          <div className="col">
            <Cards refe="/admin" name="Διαχειριστής Προγράμματος" />
          </div>
          <div className="col">
            <Cards refe="/lab" name="Εργαστήριο Αιγινίου" />
          </div>
          <div className="col">
            <Cards refe="/LoginOffice" name="Γραφείο Θεσσαλονίκης" />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col ">
            <Cards refe="/LoginSellers" name="Πωλητές" />
          </div>
          <div className="col">
            <Cards refe="/LoginPhotografers" name="Φωτογράφοι" />
          </div>
          <div className="col">
            <Cards refe="/recource" name="Πρόγραμμα Αποθήκης" />
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default MainMenu;
