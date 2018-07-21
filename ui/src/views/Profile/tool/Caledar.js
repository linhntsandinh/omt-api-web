import React, { Component } from 'react';

import { FormGroup, CardBody, CardHeader, Col, Row, InputGroup, InputGroupAddon,Input} from 'reactstrap';



class MyCaledar extends Component {
    state = {
        dd:0,
        mm:0,
        yy:0,
    }


    onSetState(e){
        //this.setState({[e.target.name]: e.target.value});
        //this.setState({[e.target.name]: e.target.value});
    }


    render() {

        const arr = [1,2,3,4,5];
        return (
            <Row id={"rowcaleda"}>
                <FormGroup>
                    <Input onChange={this.props.onChange}
                        type="select" name="dd" id="exampleSelect">
                        <option  >{this.props.dd}</option>
                        <option  value={1234}>2</option>
                        <option  value={4321}>3</option>

                        {
                            arr.map( (number)=> <option key={number.toString()}>{number}</option> )
                        }
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input onChange={this.props.onChange}
                        type="select" name="mm" id="exampleSelect">
                        <option >{this.props.mm}</option>
                        <option>12</option>
                        <option>13</option>

                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input onChange={this.props.onChange}
                        type="select" name="yy" id="exampleSelect">
                        <option >{this.props.yy}</option>
                        <option>1991</option>
                        <option>1992</option>

                    </Input>
                </FormGroup>
            </Row>
        );
    }
}

export default MyCaledar;