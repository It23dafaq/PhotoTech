import React,{Component} from 'react';
import Row from 'react-bootstrap/Row';
import Category from '../../Data/Category'
import Dropdawn from '../Dropdawn/Dropdawn';
import Button from 'react-bootstrap/Button';
import { withRouter } from "react-router";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
class ProductHeader  extends Component {
  constructor(props){
    super(props);

  }

  handleAddnew = () => {
    console.log(this.props);
    this.props.history.push({
      pathname: "/products/add",
      //state: {username: this.state.username}
    });

  }
  render(){
    return   (
  <React.Fragment>
   <Container>
    <Row className="text-center mb-4">
       <Col>
      <h1>Προιόντα:</h1>
      </Col>
    </Row>
    <Row>
        {Category.map((category, index) => (<Dropdawn key={category.name} category={category}/>))}
        <Button className="widthbtn mb-2" variant="secondary" onClick={this.handleAddnew}>Προσθήκη νέου</Button>
      </Row>
      </Container>
      </React.Fragment>
 )
}
};
export default withRouter(ProductHeader);
