import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import './ProductDetails.css';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ProductHeader from '../../../../components/ProductHeader/ProductHeader';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/products';

class ProductSpecs extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      errorMessage: '',
      remain: 1000,
      number: 10,
      show: false
    };
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  addNumber = () => {
    console.log(this.state.number);
    const firstRemain = Number(this.state.remain);
    const addedValue = Number(this.state.number);
    const sum = firstRemain + addedValue;
    console.log(sum);
    this.setState({ remain: sum });
  }

  removeNumber = () => {
    const firstRemain = Number(this.state.remain);
    if (!(Number(this.state.number) > firstRemain)) {
      const addedValue = Number(this.state.number);
      const sum = firstRemain - addedValue;
      this.setState({ remain: sum });
    } else {
      this.setState({ errorMessage: 'Δεν μπορεις να αφαιρεσεις τοσο μεγαλο αποθεμα' });
      alert('Δεν μπορεις να αφαιρεσεις τοσο μεγαλο αποθεμα');
    }

  }

  numberChanged = (event) => {

    this.setState({ number: event.target.value });
    console.log("inside number changed");
  }



  render() {
    let products;
    let showEverything;
    if (!this.props.productSpecks) {
       console.log("Get products called");
      
     }else {
       products = this.props.productSpecks;

        showEverything = (
         <React.Fragment>
         <div className="Container">
         <ProductHeader/>
         <div className="row">
           <div className="col-5 border">
             <img alt="Product" className="imgflex" src={products.originalname} />
           </div>
           <div className="col mb-2 border ml-4 ">
             <div className="row">
               <div className="col border-bottom">
                 <h4>Περιγραή Προιόντος</h4>
                 <p >{products.productDetail}</p>
               </div>
             </div>
             <div className="row">
               <div className="col border-bottom mb-2">
                 <div className="row">
                   <h5>Κωδικος :</h5>
                   <p contentEditable={true} suppressContentEditableWarning={true}>{products.productCode}</p>
                 </div>
                 <div className="row">
                   <h5>Κaτηγορία :</h5>
                   <p contentEditable={true} suppressContentEditableWarning={true}>{products.productCategory}</p>
                 </div>
                 <div className="row">
                   <h5>Υποκατηγορία :</h5>
                   <p contentEditable={true} suppressContentEditableWarning={true}>{products.productSubcategory}</p>
                 </div>
                 <div className="row">
                   <h5 >Διαθεσιμότητα :</h5>
                   <p>{products.productQuantity}</p>
                 </div>
                 <div className="row">
                   <h5>θέση :</h5>
                   <p>{products.productPosition}</p>
                 </div>
                 <div className="row">
                   <h5>Τάξεις :</h5>
                   <p>{products.productOrder}</p>
                 </div>
               </div>
             </div>
             <div className="row">
               <div className="col">
                 <Button className="buttonWidth mb-2 mr-1 mb-3 mt-2 " variant="info">Αποθήκευση</Button>
                 <Button className="buttonWidth mb-2 mr-1 mb-3 mt-2" variant="info">Διαγραφή Προιόντος</Button>
                 <Button className="buttonWidth mb-2 mb-3 mt-2" variant="info" onClick={this.handleShow}>Επεξεργασία αποθέματος</Button>
               </div>
             </div>
           </div>
         </div>
         <Modal aria-labelledby="contained-modal-title-vcenter" show={this.state.show} onHide={this.handleClose}>
           <Modal.Header closeButton="closeButton">
             <Modal.Title id="contained-modal-title-vcenter">
               Επεξεργασια Αποθέματος
               <h5>Συνολικό Απόθεμα {this.state.remain}</h5>
             </Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <Container>
               <Row className="show-grid mb-4">
                 <Col xs={12} md={8}>
                   <input type="number" placeholder="Αριθμος για αφαιρεση η προσθεση αποθεματος" onChange={(event) => this.numberChanged(event)} />
                 </Col>
               </Row>
               <Row className="show-grid">
                 <Col xs={6} md={4}>
                   <Button className="mb-2 mr-1" variant="info" onClick={this.addNumber}>Πρόσθεση</Button>
                 </Col>
                 <Col xs={6} md={4}>
                   <Button className=" mb-2 mr-1" variant="info" onClick={this.removeNumber}>Αφαίρεση</Button>
                 </Col>
               </Row>
             </Container>
           </Modal.Body>
           <Modal.Footer>
             <Button onClick={this.handleClose}>Close</Button>
           </Modal.Footer>
         </Modal>
       </div>
     </React.Fragment>
       )
     }
    return (

      <>
        {showEverything}
      </>
      );
  }
}
const mapStateToProps = (state, props) => {
  return {
    ...props,
    productSpecks: state.products.productSpecks
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setProductSpecks: (productSpecks) => dispatch(actions.setProductsSpecks(productSpecks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSpecs);
